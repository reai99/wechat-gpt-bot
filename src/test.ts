import inquirer from 'inquirer';
import ChatGpt from './lib/chatgpt.js';

test();

const ChatGPTClient = new ChatGpt();

function test(tip = '请输入你想问的问题?') {
  inquirer.prompt([
    {
      name: 'input',
      type: 'input',
      message: `[chatgpt]${tip}\n`,
    }
  ]).then(async (res) => {
    const input = (res.input || '').trim();
    if (({ '退出': 1, 'exit': 1 })[input]) {
      console.log('退出成功');
      process.exit();
      return;
    }
    const reply = await ChatGPTClient.sendMessageToChatGpt(input, { id: 'test_process' });
    console.log(reply);
    test('请继续...');
  })
}