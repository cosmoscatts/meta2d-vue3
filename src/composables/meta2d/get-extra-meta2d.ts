/**
 * 全局 meta2d 对象保存的是最后一次创建的 meta2d 对象
 *
 * 如果次画布在主画布后面实例化（比如主画布页面弹窗一个次画布），则我们需要转换一下
 *
 * https://doc.le5le.com/document/119752831
 */

import { Meta2d, type Options } from '@meta2d/core'

export function getExtraMeta2d(id: string, options?: Options) {
  const mainMeta2d = (globalThis as any).meta2d
  const newMeta2d = new Meta2d(id, options)
  ;(globalThis as any).meta2d = mainMeta2d
  return newMeta2d
}
