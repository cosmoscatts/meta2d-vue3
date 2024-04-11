/**
 * 获取连线类型
 */

export function getLineTypeInfo() {
  const lineTypes = [
    { name: '曲线', icon: '#l-curve2', value: 'curve' },
    { name: '线段', icon: '#l-polyline', value: 'polyline' },
    { name: '直线', icon: '#l-line', value: 'line' },
    { name: '脑图曲线', icon: '#l-mind', value: 'mind' },
  ]
  const currentLineType = ref('curve')

  function changeLineType(value: string) {
    currentLineType.value = value
    if (meta2d) {
      meta2d.store.options.drawingLineName = value
      if (meta2d.canvas.drawingLineName)
        meta2d.canvas.drawingLineName = value
      meta2d.store.active?.forEach((pen) => {
        meta2d.updateLineType(pen, value)
      })
    }
  }

  return {
    currentLineType,
    lineTypes,
    changeLineType,
  }
}
