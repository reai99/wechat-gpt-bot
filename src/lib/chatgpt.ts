import { ChatGPTClient } from '@waylaidwanderer/chatgpt-api';

const clientOptions = {
  modelOptions: {
    // You can override the model name and any other parameters here, like so:
    model: 'gpt-3.5-turbo',
    // I'm overriding the temperature to 0 here for demonstration purposes, but you shouldn't need to override this
    // for normal usage.
    temperature: 0,
    // Set max_tokens here to override the default max_tokens of 1000 for the completion.
    // max_tokens: 1000,
  },
  // (Optional) Davinci models have a max context length of 4097 tokens, but you may need to change this for other models.
  // maxContextTokens: 4097,
  // (Optional) You might want to lower this to save money if using a paid model like `text-davinci-003`.
  // Earlier messages will be dropped until the prompt is within the limit.
  // maxPromptTokens: 3097,
  // (Optional) Set custom instructions instead of "You are ChatGPT...".
  // promptPrefix: 'You are Bob, a cowboy in Western times...',
  // (Optional) Set a custom name for the user
  // userLabel: 'User',
  // (Optional) Set a custom name for ChatGPT
  // chatGptLabel: 'ChatGPT',
  // (Optional) Set to true to enable `console.debug()` logging
  debug: false,
};

const cacheOptions = {
  // Options for the Keyv cache, see https://www.npmjs.com/package/keyv
  // This is used for storing conversations, and supports additional drivers (conversations are stored in memory by default)
  // For example, to use a JSON file (`npm i keyv-file`) as a database:
  // store: new KeyvFile({ filename: 'cache.json' }),
};

export default class ChatGpt {
  private chatGPT: any;
  private chatOption: any;

  constructor() {
    this.chatGPT = new ChatGPTClient(
      process.env.OPEN_AI_API_KEY,
      {
        ...clientOptions,
        reverseProxyUrl: process.env.REVERSE_PROXY_URL,
      },
      cacheOptions
    );
    this.chatOption = {};
  }

  getChatGptReply = async (content: any, contactId: string) => {
    const data = await this.chatGPT.sendMessage(
      content,
      this.chatOption[contactId]
    );
    const { response, conversationId, messageId } =  data;
    this.chatOption[contactId] = { conversationId, parentMessageId: messageId };
    return response;
  }

  sendMessageToChatGpt = async (content: any, contact: any) => {
    const { id: contactId } = contact || {};
    const reply = await this.getChatGptReply(content, contactId);
    return reply;
  }

}
