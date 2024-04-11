export const defaultGridColor = '#aaa3'
export enum defaultRuleColorMap {
  DARK = '#C5C5C5',
  LIGHT = '#4E5969',
}
export enum defaultPenColorMap {
  DARK = '#F6F6F6',
  LIGHT = '#1D2129',
}

export const getDefaultRuleColor = () => isDark.value ? defaultRuleColorMap.DARK : defaultRuleColorMap.LIGHT
export const getDefaultPenColor = () => isDark.value ? defaultPenColorMap.DARK : defaultPenColorMap.LIGHT

export const defaultOptions = {
  grid: true,
  gridColor: defaultGridColor,
  gridSize: 15,
  rule: true,
  ruleColor: getDefaultRuleColor(),
  color: getDefaultPenColor(),
  disableScale: true,
}
