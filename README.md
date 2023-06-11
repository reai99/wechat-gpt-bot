<h1 align="left">wechat-gpt-bot🤖</h1>
> 花费几分钟时间即可免费发布自己的chatgpt微信机器人

#### 支持
* 支持chatgpt上下文意境对话
* 支持对接微信进行自动对话
* 允许开启唤起机器人的群组/私聊
* 在群组中设置唤醒微信机器人的关键词或者@进行匹配
* 支持配置在群组中回复是否自动@用户和显示问题
* 支持问题前缀配置
* 支持图片问答（markdown形式）
* 支持Railway快速部署
* 其他


##### 一键部署
支持快速一键部署，只要准备好自己的OPEN_AI_KEY即可
 [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/fo7Gyc?referralCode=_XyUDD)



#### 环境
> Node >= 16.x

#### 启动
```
npm i
npm run start
```

#### 配置

| 参数 | 描述  | 案例 
|------|-----------|-----
|OPEN_AI_API_KEY | 填入你的OPEN_AI_API_KEY |sk-xxxxxx|
|REVERSE_PROXY_URL |反向代理地址，如果你的网站在国外可以调用官方地址，如果不是可以节约案例地址 |https://ai.devtool.tech/proxy/v1/chat/completions
|GROUP_CHAT_MATCH_TOPIC_LIST|允许开启唤起机器人的群组 | ["测试GPT"]|
|GROUP_CHAT_MATCH_KEY |在群组中设置唤醒微信机器人的关键词|@热爱z79|
|GROUP_CHAT_IS_TIP_REPLY_USER |在群组中回复是否自动@用户| true|
| GROUP_CHAT_IS_SHOW_QUESTION |在群组中是否显示问题|true|
|GROUP_IS_MENTION_MTACH |群组是否开启@自己进行匹配| false |
|SIGLE_CHAT_MATCH_KEY | 在私聊中设置唤醒微信机器人的关键词|热爱z79 |
| SIGLE_CHAT_IS_SHOW_QUESTION | 在私聊中是否显示问题 | true |
|CHAT_GPI_REPLY_PREFIX | Chatgpt回复前缀 | [热爱助手]|


#### 开始配置你的机器人吧🤖️

##### 1、获取你的chatGpt的OPENAI_API_KEY
> - 打开 [https://platform.openai.com/overview](https://platform.openai.com/overview) 并登录注册，进入网页。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/2777249/1675413138418-d5df2543-bd37-41cc-a16c-505c5a38e88d.png)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/2777249/1675413190188-4cf10947-ea7f-479d-9550-0dec9d40c0e2.png?x-oss-process=image%2Fresize%2Cw_1500%2Climit_0)

注意：如何你没有chatGpt的账号，你可以参考如下文档进行注册账号
> https://nujuo8y1qx.feishu.cn/docx/AdqEdlT52oBiawx6Vv2cc89DnLb

##### 2、进入项目config文件下填写自己 `OPEN_AI_API_KEY`
##### 3、代理地址配置
进入服务器间快速开始

```
docker run -d -p 80:80 --name chatgpt-api-proxy mirrors2/chatgpt-api-proxy

可选 -e OPENAI_API_KEY={nide_api_key}

```
官方的：`https://api.openai.com/v1/chat/completions`

你的： `你的域名/v1/chat/completions` 或者 `你的服务器ip和端口/v1/chat/completions`

如果你不想那么麻烦可以使用免费的代理地址：https://ai.devtool.tech/proxy/v1/chat/completions

##### 4、进入config文件进行其他参数的配置，参考上面👆配置项

##### 5、命令行启动项目，命令行会出现一张二维码，使用需要作为机器人的微信号扫码登陆即可。
![029a275fd3d22f9e7ab6e4a757a99570](https://github.com/reai99/wechat-gpt-bot/assets/45794057/96643c7d-c7ba-46e5-a73c-0f5357801ac5)

#### 交流
欢迎添加微信号进行交流
![7ee2c25303c9540acd3211f2871a175c](https://github.com/reai99/wechat-gpt-bot/assets/45794057/9867b3c0-42cd-490c-bd6b-2fb2c83dea42)

