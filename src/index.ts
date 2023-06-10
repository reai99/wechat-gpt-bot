import ChatGpt from "./lib/chatgpt.js";
import BindWeChat from './lib/wechat.js';
import prompt from "./prompt/index.js";
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

  // 增加回复前缀
  if(process.env.CHAT_GPI_REPLY_PREFIX) reply = `${process.env.CHAT_GPI_REPLY_PREFIX} ` + reply;

  // 是否显示问题
  if((process.env.GROUP_CHAT_IS_SHOW_QUESTION && options?.isGroup) || (process.env.SIGLE_CHAT_IS_SHOW_QUESTION && !options?.isGroup)) {
    reply = question + '\n----------\n' + reply;
  }

  // 群组新增@对应用户
  if(process.env.GROUP_CHAT_IS_TIP_REPLY_USER && options?.isGroup) {
    reply = `@${options.userName} \n ${reply}`; 
  }

  // 推送微信
  concat.say(reply);
  console.log('回答:', reply);

}


initProcess();