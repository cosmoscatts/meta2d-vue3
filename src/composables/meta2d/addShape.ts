import type { Pen } from '@meta2d/core';
import { deepClone } from '@meta2d/core';

export function addMeta2dShape(event: DragEvent | MouseEvent, name: string) {
  event.stopPropagation();

  let data;

  if (name === 'text') {
    // 构建一个文本图元
    data = {
      text: 'text',
      width: 100,
      height: 20,
      name: 'text',
    };
  }
  else if (name === 'line') {
    // 构建一个直线图元
    data = {
      anchors: [
        { id: '0', x: 1, y: 0 },
        { id: '1', x: 0, y: 1 },
      ],
      width: 100,
      height: 100,
      name: 'line',
      lineName: 'line',
      type: 1,
    };
  }

  if (event instanceof DragEvent) {
    if (event.dataTransfer)
      event.dataTransfer.setData('Meta2d', JSON.stringify(data));
  }
  else {
    meta2d.canvas.addCaches = deepClone([data]) as Pen[];
  }
}
