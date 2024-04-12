export enum defaultGridColorMap {
  DARK = '#434345',
  LIGHT = '#E4E4E6',
}
export enum defaultRuleColorMap {
  DARK = '#C5C5C5',
  LIGHT = '#4E5969',
}
export enum defaultPenColorMap {
  DARK = '#F6F6F6',
  LIGHT = '#1D2129',
}
export enum defaultBackgroundColorMap {
  DARK = '#182033',
  LIGHT = '#fbfbff',
}

export const getDefaultGridColor = () => isDark.value ? defaultGridColorMap.DARK : defaultGridColorMap.LIGHT
export const getDefaultRuleColor = () => isDark.value ? defaultRuleColorMap.DARK : defaultRuleColorMap.LIGHT
export const getDefaultPenColor = () => isDark.value ? defaultPenColorMap.DARK : defaultPenColorMap.LIGHT
export const getDefaultBackgroundColor = () => isDark.value ? defaultBackgroundColorMap.DARK : defaultBackgroundColorMap.LIGHT

export function getDefaultOptions() {
  return {
    grid: true,
    gridColor: getDefaultGridColor(),
    gridSize: 15,
    rule: true,
    ruleColor: getDefaultRuleColor(),
    color: getDefaultPenColor(),
    disableScale: true,
    background: getDefaultBackgroundColor(),
    activeColor: '#722ED1',
    hoverColor: '#A871E3',
  }
}
