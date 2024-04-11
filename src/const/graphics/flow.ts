/**
 * 流程图
 */
export const flow = {
  key: 'flow',
  name: '流程图',
  show: true,
  list: [
    {
      name: '开始/结束',
      icon: 'l-flow-start',
      id: 21,
      data: {
        text: '开始/结束',
        width: 120,
        height: 40,
        borderRadius: 0.5,
        name: 'rectangle',
      },
    },
    {
      name: '流程',
      icon: 'l-rectangle',
      id: 22,
      data: {
        text: '流程',
        width: 120,
        height: 40,
        name: 'rectangle',
      },
    },
    {
      name: '判定',
      icon: 'l-diamond',
      id: 23,
      data: {
        text: '判定',
        width: 120,
        height: 60,
        name: 'diamond',
      },
    },
    {
      name: '数据',
      icon: 'l-flow-data',
      id: 24,
      data: {
        text: '数据',
        width: 120,
        height: 50,
        name: 'flowData',
        offsetX: 0.14,
      },
    },
    {
      name: '准备',
      icon: 'l-flow-ready',
      id: 25,
      data: {
        text: '准备',
        width: 120,
        height: 50,
        name: 'hexagon',
      },
    },
    {
      name: '子流程',
      icon: 'l-flow-subprocess',
      id: 26,
      data: {
        text: '子流程',
        width: 120,
        height: 50,
        name: 'flowSubprocess',
      },
    },
    {
      name: '数据库',
      icon: 'l-db',
      id: 27,
      data: {
        text: '数据库',
        width: 80,
        height: 120,
        name: 'flowDb',
      },
    },
    {
      name: '文档',
      icon: 'l-flow-document',
      id: 28,
      data: {
        text: '文档',
        width: 120,
        height: 100,
        name: 'flowDocument',
      },
    },
    {
      name: '内部存储',
      icon: 'l-internal-storage',
      id: 29,
      data: {
        text: '内部存储',
        width: 120,
        height: 80,
        name: 'flowInternalStorage',
      },
    },
    {
      name: '外部存储',
      icon: 'l-extern-storage',
      id: 30,
      data: {
        text: '外部存储',
        width: 120,
        height: 80,
        name: 'flowExternStorage',
      },
    },
    {
      name: '队列',
      icon: 'l-flow-queue',
      id: 31,
      data: {
        text: '队列',
        width: 100,
        height: 100,
        name: 'flowQueue',
      },
    },
    {
      name: '手动输入',
      icon: 'l-flow-manually',
      id: 32,
      data: {
        text: '手动输入',
        width: 120,
        height: 80,
        name: 'flowManually',
      },
    },
    {
      name: '展示',
      icon: 'l-flow-display',
      id: 33,
      data: {
        text: '展示',
        width: 120,
        height: 80,
        name: 'flowDisplay',
      },
    },
    {
      name: '并行模式',
      icon: 'l-flow-parallel',
      id: 34,
      data: {
        text: '并行模式',
        width: 120,
        height: 50,
        name: 'flowParallel',
      },
    },
    {
      name: '注释',
      icon: 'l-flow-comment',
      id: 35,
      data: {
        text: '注释',
        width: 100,
        height: 100,
        name: 'flowComment',
      },
    },
  ],
}
