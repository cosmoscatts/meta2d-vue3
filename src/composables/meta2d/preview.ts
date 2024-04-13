import { deepClone } from '@meta2d/core'

const visible = ref(false)

export function usePreview() {
  function preview() {
    // 先停止动画，避免数据波动
    meta2d.stopAnimate()
    // 本地存储
    const data = deepClone(meta2d.data())
    const json = JSON.stringify(data)
    localStorage.setItem('meta2d', json)
    visible.value = true
  }

  return {
    visible,
    preview,
  }
}
