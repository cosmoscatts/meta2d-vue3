/**
 * 时序图和类图
 */
export const timeAndClass = {
  key: 'timeAndClass',
  name: '时序图和类图',
  show: true,
  list: [
    {
      name: '生命线',
      icon: 'l-lifeline',
      id: 44,
      data: {
        text: '生命线',
        width: 150,
        height: 400,
        textHeight: 50,
        name: 'lifeline',
      },
    },
    {
      name: '激活',
      icon: 'l-focus',
      id: 45,
      data: {
        text: '激活',
        width: 12,
        height: 200,
        name: 'sequenceFocus',
      },
    },
    {
      name: '简单类',
      icon: 'l-simple-class',
      id: 46,
      data: {
        text: 'Topolgoy',
        width: 270,
        height: 200,
        textHeight: 200,
        name: 'simpleClass',
        textAlign: 'center',
        textBaseline: 'top',
        textTop: 10,
        list: [
          {
            text: '- name: string\n+ setName(name: string): void',
          },
        ],
      },
    },
    {
      name: '类',
      icon: 'l-class',
      id: 47,
      data: {
        text: 'Topolgoy',
        width: 270,
        height: 200,
        textHeight: 200,
        name: 'interfaceClass',
        textAlign: 'center',
        textBaseline: 'top',
        textTop: 10,
        list: [
          {
            text: '- name: string',
          },
          {
            text: '+ setName(name: string): void',
          },
        ],
      },
    },
  ],
};
