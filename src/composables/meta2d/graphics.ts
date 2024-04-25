import { activity, baseShape, errorTree, flow, mind, point, timeAndClass } from '~/const'

export const defaultGraphicsDataKey = [
  'baseShape',
  'point',
  'activity',
  'errorTree',
  'flow',
  'mind',
  'timeAndClass',
]

export const commonGraphicsDataMap = {
  activity,
  baseShape,
  point,
  errorTree,
  flow,
  mind,
  timeAndClass,
} as any

export const fixedGraphicsDataKey = ['baseShape']

export const allGraphicsDataNameMap = {
  baseShape: '基本形状',
  point: '监测信号',
  activity: '活动图',
  errorTree: '故障树',
  flow: '流程图',
  mind: '脑图',
  timeAndClass: '时序图和类图',
}

export const allGraphicsDataKey = Object.keys(allGraphicsDataNameMap)
