export default {
  // 填入你的OPEN_AI_API_KEY
  OPEN_AI_API_KEY: "",
  // 反向代理地址，简单说就是你的在国外服务器地址，如何获取看README
  REVERSE_PROXY_URL: "https://ai.devtool.tech/proxy/v1/chat/completions",
  // 允许开启唤起机器人的群组
  GROUP_CHAT_MATCH_TOPIC_LIST: ["测试GPT"],
  // 在群组中设置唤醒微信机器人的关键词
  GROUP_CHAT_MATCH_KEY: "@热爱z79",
  // 在群组中回复是否自动@用户
  GROUP_CHAT_IS_TIP_REPLY_USER: true,
  // 在群组中是否显示问题
  GROUP_CHAT_IS_SHOW_QUESTION: true,
  // 在私聊中设置唤醒微信机器人的关键词
  SIGLE_CHAT_MATCH_KEY: "热爱z79",
  // 在私聊中是否显示问题
  SIGLE_CHAT_IS_SHOW_QUESTION: true,
  // 重置上下文的关键词，如可设置为reset
  RESET_KEY: "reset",
  // Chatgpt回复前缀
  CHAT_GPI_REPLY_PREFIX: "[热爱助手]",
  // 群组是否开启@自己进行匹配
  GROUP_IS_MENTION_MTACH: false,
}