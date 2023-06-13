import Koa from 'koa';
import route from 'koa-router';
import ChatGpt from "./lib/chatgpt.js";
import Config from './config.js';

const app = new Koa();
const router = route();
const chatGptClient: any = new ChatGpt();

router.post('/api/common/reply', async (ctx) => {
  const { ToUserName, FromUserName, Content, CreateTime } = ctx.request.body;

  const question = (Content || '').trim();

  try {
    let reply = await chatGptClient.sendMessageToChatGpt(question, { id: ToUserName });
    reply = Config.dealReply(reply, question);

    ctx.body = {
      ToUserName: FromUserName,
      FromUserName: ToUserName,
      CreateTime: +new Date(),
      MsgType: 'text',
      Content: reply,
    };
  } catch (error) {
    ctx.body = {
      ToUserName: FromUserName,
      FromUserName: ToUserName,
      CreateTime: +new Date(),
      MsgType: 'text',
      Content: question,
    }
  }
});

app.use(router.routes());
app.listen(8080);
console.log('Server listen in:' + 8080);
