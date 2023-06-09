import ChatGpt from "./lib/chatgpt.js";
import BindWeChat from './lib/wechat.js';
import config from "./config/index.js";

let chatGptClient: any = null;

function initProcess() {
 // 初始化ChatGpt 
 chatGptClient = new ChatGpt();
// 绑定微信机器人
 new BindWeChat({}, replyMessage);
}

const replyMessage = async (concat: any, content: string, options: any) => {
  const { id } = concat;
  const question = content.trim();
  console.log('问题:', question)
  let reply = await chatGptClient.sendMessageToChatGpt(question, { id });

  // 增加回复前缀
  if(config.CHAT_GPI_REPLY_PREFIX) reply = `${config.CHAT_GPI_REPLY_PREFIX} ` + reply;

  // 是否显示问题
  if((config.GROUP_CHAT_IS_SHOW_QUESTION && options?.isGroup) || (config.SIGLE_CHAT_IS_SHOW_QUESTION && !options?.isGroup)) {
    reply = question + '\n----------\n' + reply;
  }

  // 群组新增@对应用户
  if(config.GROUP_CHAT_IS_TIP_REPLY_USER && options?.isGroup) {
    reply = `@${options.userName} \n ${reply}`; 
  }

  // 推送微信
  concat.say(reply);
  console.log('回答:', reply);

}


initProcess();