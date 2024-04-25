import type { Pen } from '@meta2d/core'

export enum SelectionMode {
  File = 'file',
  Pen = 'pen',
  Equip = 'equip',
  Point = 'point',
  Line = 'line',
}

const selections = reactive<{
  mode: SelectionMode
  pen?: Pen
  pens?: Pen[]
}>({
  mode: SelectionMode.File,
  pen: undefined,
  pens: [],
})

export function useMeta2dSelection() {
  const select = (pens?: Pen[]) => {
    if (!pens || pens.length !== 1) {
      selections.mode = SelectionMode.File
      selections.pen = undefined

      if (pens?.length)
        selections.pens = pens
      else
        selections.pens = []
      return
    }

    // name 为 'image' 默认为设备
    // name 以 'point-combine' 开头 默认为测点
    // 其余为基础图元
    const pen = pens[0]
    const penName = pen.name || ''
    if (penName === 'image')
      selections.mode = SelectionMode.Equip
    else if (penName.startsWith('point-combine'))
      selections.mode = SelectionMode.Point
    else if (pen.type === 1)
      selections.mode = SelectionMode.Line
    else
      selections.mode = SelectionMode.Pen

    selections.pen = pen
    selections.pens = pens
  }

  return {
    selections,
    select,
  }
}
