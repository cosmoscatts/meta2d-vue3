export function dragStart(e: DragEvent | MouseEvent, elem: any) {
  if (!elem)
    return

  e.stopPropagation()

  const data = elem.data
  if (e instanceof DragEvent)
    e.dataTransfer?.setData('Meta2d', JSON.stringify(data))
}
