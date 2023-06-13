import ChatGpt from "./lib/chatgpt.js";
import BindWeChat from './lib/wechat.js';
import prompt from "./prompt/index.js";
import Config from './config.js';
import dotenv from 'dotenv';

dotenv.config();

let chatGptClient: any = null;
const CONCAT_IS_INIT_PROMPT_MAP = {};

function initProcess() {
 // 初始化ChatGpt 
 chatGptClient = new ChatGpt();
// 绑定微信机器人
 new BindWeChat({}, replyMessage);
}

const initPrompt = async (id: any) => {
  for(let i = 0, len = prompt.length; i< len; i++) {
    await chatGptClient.sendMessageToChatGpt(prompt[i], { id });
  }
}

const replyMessage = async (concat: any, content: string, options: any) => {
  const { id } = concat;
  
   // 初始化prompt
  if(!CONCAT_IS_INIT_PROMPT_MAP[id]) {
    CONCAT_IS_INIT_PROMPT_MAP[id] = 1;
    await initPrompt(id);
  }

  const question = content.trim();

  console.log('问题:', question)

  let reply = await chatGptClient.sendMessageToChatGpt(question, { id });

  reply = Config.dealReply(reply, question, options);

  // 推送微信
  concat.say(reply);
  console.log('回答:', reply);

}


initProcess();