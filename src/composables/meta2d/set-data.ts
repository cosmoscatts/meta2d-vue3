/**
 * 更新测点实时数据
 */

export interface PointData {
  id: string
  value: number
  time: string
}

const unitMap = {
  A: 'm/s²',
  V: 'm/s',
  D: 'm',
  T: '°C',
}

export function setPointData({ id, value, time }: PointData) {
  if (!meta2d)
    return

  const [valueTag, timeTag] = [`${id}__value`, `${id}__time`]

  const index = valueTag.indexOf('__value')
  const signalType = valueTag.slice(index - 1, index) as keyof typeof unitMap

  const valuePens = meta2d.find(valueTag)
  valuePens.forEach((pen) => {
    const valueText = value ? Number(value).toFixed(1) : 0
    const newText = `${valueText} ${unitMap[signalType]}`
    meta2d.setValue({ id: pen.id, text: newText })
  })

  const timePens = meta2d.find(timeTag)
  timePens.forEach((pen) => {
    meta2d.setValue({ id: pen.id, text: time })
  })

  meta2d.render()
}
