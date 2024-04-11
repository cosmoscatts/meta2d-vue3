/**
 * 活动图
 */
export const activity = {
  key: 'activity',
  name: '活动图',
  show: true,
  list: [
    {
      name: '开始',
      icon: 'l-inital',
      id: 36,
      data: {
        text: '',
        width: 30,
        height: 30,
        name: 'circle',
        background: '#555',
        lineWidth: 0,
      },
    },
    {
      name: '结束',
      icon: 'l-final',
      id: 37,
      data: {
        width: 30,
        height: 30,
        name: 'activityFinal',
      },
    },
    {
      name: '活动',
      icon: 'l-action',
      id: 38,
      data: {
        text: '活动',
        width: 120,
        height: 50,
        borderRadius: 0.25,
        name: 'rectangle',
      },
    },
    {
      name: '决策/合并',
      icon: 'l-diamond',
      id: 39,
      data: {
        text: '决策/合并',
        width: 120,
        height: 50,
        name: 'diamond',
      },
    },
    {
      name: '垂直泳道',
      icon: 'l-swimlane-v',
      id: 40,
      data: {
        text: '垂直泳道',
        width: 200,
        height: 500,
        name: 'swimlaneV',
        textBaseline: 'top',
        textTop: 20,
        // textHeight: ,
        lineTop: 0.08,
      },
    },
    {
      name: '水平泳道',
      icon: 'l-swimlane-h',
      id: 41,
      data: {
        text: '水平泳道',
        width: 500,
        height: 200,
        name: 'swimlaneH',
        textWidth: 0.01,
        textLeft: 0.04,
        textAlign: 'left',
        lineLeft: 0.08,
      },
    },
    {
      name: '垂直分岔/汇合',
      icon: 'l-fork-v',
      id: 42,
      data: {
        text: '垂直分岔/汇合',
        width: 10,
        height: 150,
        name: 'forkV',
        fillStyle: '#555',
        strokeStyle: 'transparent',
      },
    },
    {
      name: '水平分岔/汇合',
      icon: 'l-fork',
      id: 43,
      data: {
        text: '水平分岔/汇合',
        width: 150,
        height: 10,
        name: 'forkH',
        fillStyle: '#555',
        strokeStyle: 'transparent',
      },
    },
  ],
}
