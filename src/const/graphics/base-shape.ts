/**
 * 基本形状
 */
export const baseShape = {
  key: 'baseShape',
  name: '基本形状',
  show: true,
  list: [
    {
      name: '正方形',
      icon: 'l-rect',
      id: 1,
      data: {
        width: 100,
        height: 100,
        name: 'square',
      },
    },
    {
      name: '矩形',
      icon: 'l-rectangle',
      id: 2,
      data: {
        width: 200,
        height: 50,
        borderRadius: 0.1,
        name: 'rectangle',
      },
    },
    {
      name: '圆',
      icon: 'l-circle',
      id: 3,
      data: {
        width: 100,
        height: 100,
        name: 'circle',
      },
    },
    {
      name: '三角形',
      icon: 'l-triangle',
      id: 4,
      data: {
        width: 100,
        height: 100,
        name: 'triangle',
      },
    },
    {
      name: '菱形',
      icon: 'l-diamond',
      id: 5,
      data: {
        width: 100,
        height: 100,
        name: 'diamond',
      },
    },
    {
      name: '五边形',
      icon: 'l-pentagon',
      id: 6,
      data: {
        width: 100,
        height: 100,
        name: 'pentagon',
      },
    },
    {
      name: '六边形',
      icon: 'l-hexagon',
      id: 7,
      data: {
        width: 100,
        height: 100,
        name: 'hexagon',
      },
    },
    {
      name: '五角星',
      icon: 'l-pentagram',
      id: 8,
      data: {
        width: 100,
        height: 100,
        name: 'pentagram',
      },
    },
    {
      name: '左箭头',
      icon: 'l-arrow-left',
      id: 9,
      data: {
        width: 120,
        height: 60,
        name: 'leftArrow',
      },
    },
    {
      name: '右箭头',
      icon: 'l-arrow-right',
      id: 10,
      data: {
        width: 120,
        height: 60,
        name: 'rightArrow',
      },
    },
    {
      name: '双向箭头',
      icon: 'l-twoway-arrow',
      id: 11,
      data: {
        width: 150,
        height: 60,
        name: 'twowayArrow',
      },
    },
    {
      name: '云',
      icon: 'l-cloud',
      id: 13,
      data: {
        width: 100,
        height: 100,
        name: 'cloud',
      },
    },
    {
      name: '消息框',
      icon: 'l-msg',
      id: 14,
      data: {
        textTop: -0.1,
        width: 100,
        height: 100,
        name: 'message',
      },
    },
    {
      name: '文件',
      icon: 'l-file',
      id: 15,
      data: {
        width: 80,
        height: 100,
        name: 'file',
      },
    },
    {
      name: '立方体',
      icon: 'l-cube',
      id: 18,
      data: {
        width: 60,
        height: 100,
        name: 'cube',
        z: 0.25,
        props: {
          custom: [
            {
              key: 'z',
              label: 'Z',
              type: 'number',
              min: 0,
              placeholder: '<= 1 即宽度的比例',
            },
            {
              key: 'backgroundFront',
              label: '前背景色',
              type: 'color',
            },
            {
              key: 'backgroundUp',
              label: '顶背景色',
              type: 'color',
            },
            {
              key: 'backgroundRight',
              label: '右背景色',
              type: 'color',
            },
          ],
        },
      },
    },
    {
      name: '人',
      icon: 'l-people',
      id: 19,
      data: {
        width: 70,
        height: 100,
        name: 'people',
      },
    },
  ],
};
