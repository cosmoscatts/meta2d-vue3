import type { Meta2d } from '@meta2d/core'

/**
 * 连接 MQTT
 */
export function useMeta2dMqtt() {
  function init() {
    const params = {
      mqtt: 'url',
      mqttTopics: 'topic1/#,topoc2', // 多个主题用，分割
      mqttOptions: {
        clientId: 'string',
        username: 'string',
        password: 'string',
        // 如果 clientId 不为空，默认会随机重新生成一个 clientId，避免连接冲突
        // 如果设置 customClientId = true，不随机生成，使用用户自定义的固定的 clientId
        customClientId: false,
      },
    }
    meta2d.connectMqtt(params)

    // 自定义数据格式
    meta2d.socketFn = (_e: string, _context?: {
      meta2d?: Meta2d
      type?: string
      topic?: string
      url?: string
    }) => {
      // Do sth
      // meta2d.setValue(pen)

      // return false //表示仅执行自定义的回调函数方法
      // return true //表示除了执行自定义的回调方法外，还会执行核心库方法
      return false
    }
  }

  function close() {
    meta2d.closeMqtt()
  }

  return {
    init,
    close,
  }
}
