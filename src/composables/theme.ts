export const colors: [string, string, string][] = [
  ['red', '浪漫红', '#F53F3F'],
  ['orangered', '晚秋红', '#F77234'],
  ['orange', '活力橙', '#FF7D00'],
  ['gold', '黄昏', '#F7BA1E'],
  ['yellow', '柠檬黄', '#FADC19'],
  ['lime', '新生绿', '#9FDB1D'],
  ['green', '仙野绿', '#00B42A'],
  ['cyan', '碧涛青', '#14C9C9'],
  ['blue', '海蔚蓝', '#3491FA'],
  ['arcoblue', '极致蓝', '#165DFF'],
  ['purple', '暗夜紫', '#722ED1'],
  ['pinkpurple', '青春紫', '#D91AD9'],
  ['gray', '中性灰', '#86909C'],
  ['magenta', '品红', '#F5319D'],
];

export interface ThemeColor {
  prop: string
  name: string
  hex: string
  rgb: string
}

export const defaultThemeColors: ThemeColor[] = colors.map(([prop, name, hex]) => {
  return {
    prop,
    name,
    hex,
    rgb: `rgb(var(--${prop}-6))`,
  };
});

export function createPrimaryColor(colorProp: string) {
  if (!defaultThemeColors.map(i => i.prop).includes(colorProp))
    return;
  Array.from({ length: 10 }).forEach((_, index) => {
    document.body.style.setProperty(`--primary-${index + 1}`, `var(--${colorProp}-${index + 1})`);
  });
}
