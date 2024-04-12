import { getDefaultPenColor } from '~/const'

export function dragStart(e: DragEvent | MouseEvent, elem: any) {
  if (!elem)
    return

  e.stopPropagation()

  const data = elem.data
  const color = getDefaultPenColor()
  const _data = Array.isArray(data)
    ? [...data]
    : [data]
  _data.forEach((item) => {
    if (!item.color)
      item.color = color
  })

  if (e instanceof DragEvent)
    e.dataTransfer?.setData('Meta2d', JSON.stringify(_data))
}
