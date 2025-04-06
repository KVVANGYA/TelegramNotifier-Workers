addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * 处理传入的请求并发送 Telegram 通知
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url)
  
  // 检查路径是否为 /notify
  if (url.pathname === '/notify') {
    const token = url.searchParams.get('token')
    const chatId = url.searchParams.get('chatid')
    let message = url.searchParams.get('message') || 'URL 被请求了！'

    // 对 message 参数进行 URL 解码
    message = decodeURIComponent(message)

    if (!token || !chatId) {
      return new Response('缺少 token 或 chatid 参数。', { status: 400 })
    }

    try {
      await sendTelegramMessage(token, chatId, message)
      return new Response('通知已发送。', { status: 200 })
    } catch (error) {
      console.error('Error sending Telegram message:', error.message); // Log the specific error
      return new Response(`发送通知时出错: ${error.message}`, { status: 500 })
    }
  }

  return new Response('无效的请求。', { status: 400 })
}

/**
 * 发送消息到 Telegram
 * @param {string} token Telegram 机器人令牌
 * @param {string} chatId Telegram 聊天 ID
 * @param {string} message 要发送的消息
 */
async function sendTelegramMessage(token, chatId, message) {
  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`

  // 将 \n 转换为实际的换行符
  let formattedMessage = message.replace(/\\n/g, '\n')

  // Escape MarkdownV2 special characters
  formattedMessage = escapeMarkdownV2(formattedMessage)

  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: formattedMessage,
      parse_mode: 'MarkdownV2'  // 添加 Markdown 解析模式
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`发送 Telegram 消息失败: ${errorText}`)
  }
}

/**
 * Escapes characters for Telegram MarkdownV2 parse mode.
 * @param {string} text The text to escape.
 * @returns {string} The escaped text.
 */
function escapeMarkdownV2(text) {
  // Characters to escape: _ * [ ] ( ) ~ ` > # + - = | { } . !
  return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
}
