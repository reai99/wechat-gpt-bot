
const dealReply = (reply: string, question: string, options?: any) => {

  options = options || {};

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
   
   return reply;
}

export default {
  dealReply,
}