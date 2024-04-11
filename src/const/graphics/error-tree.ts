/**
 * 故障树
 */
export const errorTree = {
  key: 'errorTree',
  name: '故障树',
  show: true,
  list: [
    {
      name: '与门',
      icon: 'l-ANDmen',
      data: {
        name: 'andGate',
        width: 100,
        height: 150,
      },
    },
    {
      name: '基本事件',
      icon: 'l-jibenshijian',
      data: {
        name: 'basicEvent',
        width: 100,
        height: 150,
      },
    },
    {
      name: '未展开事件',
      icon: 'l-weizhankaishijian',
      data: {
        name: 'unexpandedEvent',
        width: 100,
        height: 150,
      },
    },
    {
      name: '优先AND门',
      icon: 'l-youxianANDmen',
      data: {
        name: 'priorityAndGate',
        width: 100,
        height: 150,
      },
    },
    {
      name: '禁止门',
      icon: 'l-jinzhimen',
      data: {
        name: 'forbiddenGate',
        width: 100,
        height: 150,
      },
    },
    {
      name: '事件',
      icon: 'l-shijian',
      data: {
        name: 'event',
        width: 100,
        height: 150,
      },
    },
    {
      name: '开关事件',
      icon: 'l-kaiguanshijian',
      data: {
        name: 'switchEvent',
        width: 100,
        height: 150,
      },
    },
    {
      name: '条件事件',
      icon: 'l-tiaojianshijian',
      data: {
        name: 'conditionalEvent',
        width: 150,
        height: 100,
      },
    },
    {
      name: '转移符号',
      icon: 'l-zhuanyifuhao',
      data: {
        name: 'transferSymbol',
        width: 100,
        height: 150,
      },
    },
    {
      name: '或门',
      icon: 'l-ORmen',
      data: {
        name: 'orGate',
        width: 100,
        height: 150,
      },
    },
    {
      name: '异或门',
      icon: 'l-yihuomen',
      data: {
        name: 'xorGate',
        width: 100,
        height: 150,
      },
    },
    {
      name: '表决门',
      icon: 'l-biaojuemen',
      data: {
        name: 'votingGate',
        width: 100,
        height: 150,
      },
    },
  ],
}
