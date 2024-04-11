import { defaultPenColorMap, defaultRuleColorMap, getDefaultPenColor, getDefaultRuleColor } from '~/const'

export function listenDarkModeChange() {
  const options = meta2d.getOptions()
  if (!options)
    return

  function setRuleColor() {
    if (!options.rule)
      return

    const currentRuleColor = options.ruleColor
    const list = [defaultRuleColorMap.LIGHT, defaultRuleColorMap.DARK] as string[]

    if (!currentRuleColor || list.includes(currentRuleColor)) {
      meta2d.setRule({
        ruleColor: getDefaultRuleColor(),
      })
    }
  }

  function setPenColor() {
    if (!options.rule)
      return

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
    setRuleColor()
    setPenColor()
    meta2d.render()
  }

  watch(isDark, resetColor)
}
