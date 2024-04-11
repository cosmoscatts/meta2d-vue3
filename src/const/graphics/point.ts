/**
 * 自定义测量点组合图元
 */

import { s8 } from '@meta2d/core'

interface Option {
  id?: string
  dataId?: string
  tags?: string[]
}

export const signalInfoMap = {
  A: {
    nameText: '加速度',
    valueText: '测点值（m/s²）',
  },
  V: {
    nameText: '速度',
    valueText: '测点值（m/s）',
  },
  D: {
    nameText: '位移',
    valueText: '测点值（m）',
  },
  T: {
    nameText: '温度',
    valueText: '测点值（°C）',
  },
}

/**
 * 创建测量点组合图元工具方法，参数为占位符显示名称
 */
export function createBaseCombinePoint(
  pointNameText: string, // 测点名称
  signalNameText: string, // 信号名称
  signalValueText: string, // 信号状态 / 值
  timeText: string,
  opts: Option = {}, // 用于直接自动生成测点，给定 id, dataId 和 tags, dataId 为 `point-signalType`, tags 为 ['equipId', 'pointId', 'hasPointId']
) {
  const parentId = opts?.id || s8()
  const parentDataId = opts?.dataId || ''
  const parentTags = opts?.tags || []

  const [s1, s2, s3, s4, s5, s6, s7] = Array.from({ length: 7 }, () => s8())
  const parentName = `point-combine-${getRandomStr(6)}`
  const createTag = (prop: string) => `__${parentName}_${prop}`

  const defaultValueTags = [
    createTag('textColor'),
    createTag('fontFamily'),
    createTag('fontSize'),
    createTag('fontWeight'),
    createTag('fontStyle'),
    createTag('textAlign'),
    createTag('textBaseline'),
    createTag('valueTextColor'),
  ]
  const valueTags = parentDataId
    ? [...defaultValueTags, `${parentDataId}__value`]
    : defaultValueTags

  const defaultTimeTags = [
    createTag('textColor'),
    createTag('fontFamily'),
    createTag('fontSize'),
    createTag('fontWeight'),
    createTag('fontStyle'),
    createTag('textAlign'),
    createTag('textBaseline'),
  ]
  const timeTags = parentDataId
    ? [...defaultTimeTags, `${parentDataId}__time`]
    : defaultTimeTags

  const result = [
    {
      id: parentId,
      dataId: parentDataId,
      tags: parentTags,
      width: 120,
      height: 100,
      name: parentName,
      children: [s1, s2, s3, s4, s5, s6, s7],
    },
    {
      id: s1,
      tags: [
        createTag('color'),
        createTag('background'),
        createTag('dash'),
        createTag('borderRadius'),
        createTag('globalAlpha'),
      ],
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      name: 'rectangle',
      disableInput: true,
      borderRadius: 0.05,
      background: '#FFB65D',
      globalAlpha: 0.75,
    },
    {
      x: 0,
      y: 0,
      width: 1,
      height: 0.25,
      id: s2,
      tags: [
        createTag('textColor'),
        createTag('fontFamily'),
        createTag('fontSize'),
        createTag('fontWeight'),
        createTag('fontStyle'),
        createTag('textAlign'),
        createTag('textBaseline'),
      ],
      name: 'text',
      text: pointNameText,
      disableInput: true,
      disableRotate: true,
      disableSize: true,
      disableAnchor: true,
    },
    {
      x: 0,
      y: 0.25,
      width: 1,
      height: 0.25,
      id: s3,
      tags: [
        createTag('textColor'),
        createTag('fontFamily'),
        createTag('fontSize'),
        createTag('fontWeight'),
        createTag('fontStyle'),
        createTag('textAlign'),
        createTag('textBaseline'),
      ],
      name: 'text',
      text: signalNameText,
      disableInput: true,
      disableRotate: true,
      disableSize: true,
      disableAnchor: true,
    },
    {
      x: 0,
      y: 0.5,
      width: 1,
      height: 0.25,
      id: s4,
      tags: valueTags,
      name: 'text',
      text: signalValueText,
      disableInput: true,
      disableRotate: true,
      disableSize: true,
      disableAnchor: true,
    },
    {
      x: 0,
      y: 0.75,
      width: 1,
      height: 0.25,
      id: s5,
      tags: timeTags,
      name: 'text',
      text: timeText,
      disableInput: true,
      disableRotate: true,
      disableSize: true,
      disableAnchor: true,
    },
    {
      x: 0,
      y: 0.24,
      width: 1,
      height: 0.001,
      id: s6,
      tags: [createTag('color')],
      name: 'line',
      disableRotate: true,
      disableSize: true,
      disableAnchor: true,
    },
    {
      x: 0.15,
      y: 0.325,
      width: 0.1,
      height: 0.1,
      id: s7,
      tags: [createTag('signalBackground')],
      name: 'circle',
      background: '#00B42A',
      color: '#00B42A',
      disableInput: true,
      disableRotate: true,
      disableSize: true,
      disableAnchor: true,
    },
  ]

  return result
}

export const point = {
  key: 'point',
  name: '监测信号',
  show: true,
  list: [
    {
      name: '加速度',
      icon: 'i-fluent:fast-acceleration-20-regular',
      id: s8(),
      point: true,
      data: createBaseCombinePoint('测点名称', signalInfoMap.A.nameText, signalInfoMap.A.valueText, '时间'),
    },
    {
      name: '速度',
      icon: 'i-fluent:top-speed-20-regular',
      id: s8(),
      point: true,
      data: createBaseCombinePoint('测点名称', signalInfoMap.V.nameText, signalInfoMap.V.valueText, '时间'),
    },
    {
      name: '位移',
      icon: 'i-fluent:location-ripple-16-regular',
      id: s8(),
      point: true,
      data: createBaseCombinePoint('测点名称', signalInfoMap.D.nameText, signalInfoMap.D.valueText, '时间'),
    },
    {
      name: '温度',
      icon: 'i-fluent:temperature-16-regular',
      id: s8(),
      point: true,
      data: createBaseCombinePoint('测点名称', signalInfoMap.T.nameText, signalInfoMap.T.valueText, '时间'),
    },
  ],
}
