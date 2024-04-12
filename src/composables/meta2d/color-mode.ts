import {
  defaultBackgroundColorMap,
  defaultGridColorMap,
  defaultPenColorMap,
  defaultRuleColorMap,
  getDefaultBackgroundColor,
  getDefaultGridColor,
  getDefaultPenColor,
  getDefaultRuleColor,
} from '~/const'

export function listenDarkModeChange() {
  function setBackground() {
    const currentBackground = meta2d.store.data.background
    const list = [defaultBackgroundColorMap.LIGHT, defaultBackgroundColorMap.DARK] as string[]

    if (!currentBackground || list.includes(currentBackground))
      meta2d.setBackgroundColor(getDefaultBackgroundColor())
  }

  function setGridColor() {
    const currentGridColor = meta2d.store.data.gridColor
    const list = [defaultGridColorMap.LIGHT, defaultGridColorMap.DARK] as string[]

    if (!currentGridColor || list.includes(currentGridColor)) {
      meta2d.setGrid({
        gridColor: getDefaultGridColor(),
      })
    }
  }

  function setRuleColor() {
    const currentRuleColor = meta2d.store.data.ruleColor
    const list = [defaultRuleColorMap.LIGHT, defaultRuleColorMap.DARK] as string[]

    if (!currentRuleColor || list.includes(currentRuleColor)) {
      meta2d.setRule({
        ruleColor: getDefaultRuleColor(),
      })
    }
  }

  function setPenColor() {
    const list = [defaultPenColorMap.LIGHT, defaultPenColorMap.DARK] as string[]

    Object.values(meta2d.store.pens).filter(Boolean).forEach((pen) => {
      const color = pen.color
      if (!color || list.includes(color)) {
        meta2d.setValue({
          id: pen.id,
          color: getDefaultPenColor(),
        })
      }
    })
  }

  function resetColor() {
    setBackground()
    setGridColor()
    setRuleColor()
    setPenColor()
    meta2d.render()
  }
  resetColor()

  watch(isDark, resetColor)
}
