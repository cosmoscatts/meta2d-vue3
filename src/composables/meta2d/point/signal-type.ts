import type { Pen } from '@meta2d/core'

export const signalOptions = [
  { value: 'A', label: '加速度' },
  { value: 'V', label: '速度' },
  { value: 'D', label: '位移' },
  { value: 'T', label: '温度' },
]

/**
 * 获取测点信号类型（AVDT）
 * 目前是根据信号名称进行匹配
 */
export function getSignalTypeValue(pen?: Pen) {
  if (!pen)
    return ''

  const children = pen.children

  if (!children)
    return ''

  const pens = children.map(id => meta2d.findOne(id))

  if (!pens || !pens.length || pens.length !== 7)
    return ''

  return signalOptions.find(i => i.label === pens[2]!.text)?.value || ''
}
