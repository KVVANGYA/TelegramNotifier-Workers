# TelegramNotifier-Workers

TelegramNotifier-Workers 是一个使用 Workers 将网络请求转换为 Telegram 通知的项目。

## 功能

- 监听特定路径的 HTTP 请求
- 从请求中提取参数并发送 Telegram 消息
- 处理错误并返回相应的 HTTP 响应

## 安装

1. 克隆此仓库到本地：

   ```bash
   git clone https://github.com/KVVANGYA/TelegramNotifier-Workers.git
   ```

2. 进入项目目录：

   ```bash
   cd TelegramNotifier-Workers
   ```

3. 配置你的 Workers 环境。

## 使用

1. 部署 Workers 脚本。

2. 发送请求到 `/notify` 路径，附带以下查询参数：
   - `token`: Telegram 机器人令牌
   - `chatid`: Telegram 聊天 ID
   - `message`: 要发送的消息（可选，默认为 "URL 被请求了！"）

示例请求：

   ```url
   https://your-worker-url/notify?token=YOUR_TELEGRAM_BOT_TOKEN&chatid=YOUR_CHAT_ID&message=Hello%20World
   ```


## 贡献

欢迎贡献！请 fork 此仓库并提交 pull request。

## 许可证

此项目使用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。
