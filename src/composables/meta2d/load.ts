import type { Meta2dData } from '@meta2d/core'

export function loadMeta2dData() {
  // 读取本地存储
  const dataStr = localStorage.getItem('meta2d')

  if (!dataStr)
    return

  const data = JSON.parse(dataStr) as Meta2dData
  data.locked = 0
  meta2d.open(data)
}
