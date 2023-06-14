import Koa from "koa";
import route from "koa-router";
import cors from 'koa2-cors';
import crypto from "crypto";
import ChatGpt from "./lib/chatgpt.js";
import Config from "./config.js";

const app = new Koa();
const router = route();
const chatGptClient: any = new ChatGpt();

// 微信配置
const webchatToken = "reaiWechat";

// 跨域设置
app.use(
  cors({
    origin: (ctx) => "*",
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

router.get("/", async (ctx) => {
  const { signature, timestamp, nonce, echostr } = ctx.query;
  let hash = crypto.createHash("sha1");
  const arr = [webchatToken, timestamp, nonce].sort();
  hash.update(arr.join(""));
  const shasum = hash.digest("hex");
  if (shasum === signature) {
    return (ctx.body = echostr);
  }
  ctx.status = 401;
  ctx.body = "Invalid signature";
});

// 消息回复
router.post("/api/common/reply", async (ctx) => {
  const { ToUserName, FromUserName, Content, CreateTime } = ctx.request.body;

  const question = (Content || "").trim();

  try {
    let reply = await chatGptClient.sendMessageToChatGpt(question, {
      id: ToUserName,
    });
    reply = Config.dealReply(reply, question);

    ctx.body = {
      ToUserName: FromUserName,
      FromUserName: ToUserName,
      CreateTime: +new Date(),
      MsgType: "text",
      Content: reply,
    };
  } catch (error) {
    ctx.body = {
      ToUserName: FromUserName,
      FromUserName: ToUserName,
      CreateTime: +new Date(),
      MsgType: "text",
      Content: question,
    };
  }
});

app.use(router.routes());
app.listen(80);
console.log("Server listen in:" + 80);
