import { WechatyBuilder } from 'wechaty';
import qrcodeTerminal from "qrcode-terminal";

export default class BindWeChat {

  private wechaty: any = null;
  private isScanInit: boolean = false;
  private listener: any;

  constructor(options: any, listener: any) {
    this.isScanInit = false;
    this.listener = listener;
    this.init(options)
  }

  init(options: any) {
    try {
      this.wechaty = WechatyBuilder.build(options);
      this.wechaty
      .on("scan", this.handleScan)
      .on("login", this.handleLogin)
      .on("logout", this.handleLogout)
      .on("message", this.handleMessage)
      .start()
      .then(() => console.log("开始登陆微信..."))
      .catch((e: any) => {
        console.error(e);
        process.exit();
      });
    } catch (error) {
      console.log(error)
    }
  }

  handleScan = (qrcode: any) => {
    if(this.isScanInit) {
      console.log('请确认登陆...');
      return;
    }
    qrcodeTerminal.generate(qrcode, { small: true }); // 在console端显示二维码
    const qrcodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`
    console.log(qrcodeImageUrl);
    this.isScanInit = true;
  }

  handleLogin = (user: any) => {
    const date = new Date();
    console.log(`🚀 ${user} 登陆成功，当前时间：${date} `);
  }

  handleLogout = (user: any) => {
    console.log(`🚀 ${user} 退出成功！`);
  }

  handleMessage = async (msg: any) => {
    const contact = msg.talker();
    const content = msg.text().trim();
    const room = msg.room();
    const userName = contact.name();

    if(msg.type() !== this.wechaty.Message.Type.Text) return;

    if(room) {
      const groupTopic = (room.topic && await room.topic()) || "";
      const isAllowActiveGroup = !process.env.GROUP_CHAT_MATCH_TOPIC_LIST?.length || (process.env.GROUP_CHAT_MATCH_TOPIC_LIST.includes(groupTopic))
      if(
        isAllowActiveGroup &&
        (
          (process.env.GROUP_IS_MENTION_MTACH && await msg.mentionSelf()) || 
          (process.env.GROUP_CHAT_MATCH_KEY && RegExp(`^${process.env.GROUP_CHAT_MATCH_KEY}`).test(content))
        )
      ) {
        const pattern = RegExp(`^${process.env.GROUP_CHAT_MATCH_KEY}`);
        this.handleReplyMessage(room, content.replace(pattern, ''), { userName, isGroup: true });
      }
    }else {
      const pattern = RegExp(`^${process.env.SIGLE_CHAT_MATCH_KEY}`);
      if(pattern.test(content)) {
        this.handleReplyMessage(contact, content.replace(pattern, ''), { userName });
      }
    }
  }

  handleReplyMessage = (concat: any, content: string, options = {}) => {
    if(typeof this.listener === 'function') {
      this.listener(concat, content, options);
    }
  }
}

