/**
 * type
 */

export default {
  componentsList: [
    {
      id: "",
      componentName: "图片",
      componentCode: "banner",
      componentType: 1,
      queueNumber: 0,
      componentInfo: {
        visible: 1, //1显示
        drawable: 0 //0 不可自由拖拽  1可移动
      },
      componentData: {
        pictureHeight: 200,
        intervalTime: 3,
        imgList: [
          {
            imgUrl:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598092514179&di=0e18ba763cacbc72ec4f92fb14a8db34&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-26%2F59f182e5c1157.jpg",
            name: "图片幻灯片",
            links: {
              type: 0,
              links: ""
            }
          },
          {
            imgUrl:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598520775223&di=4c3ef550e8cd483bd22cdbabb4e5bc08&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-10%2F5a55b29e06143.jpg",
            name: "图片幻灯片",
            links: {
              type: 0,
              links: ""
            }
          }
        ]
      }
    },
    {
      id: "",
      componentName: "带文本叠加图片",
      componentCode: "imageText",
      componentType: 1,
      queueNumber: 0,
      componentInfo: {
        visible: 1, //1显示
        drawable: 0 //0 不可自由拖拽  1可移动
      },
      componentData: {
        imgUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598092514179&di=0e18ba763cacbc72ec4f92fb14a8db34&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-10-26%2F59f182e5c1157.jpg",
        text: ""
      }
    },
    {
      id: "",
      componentName: "带文本图片",
      componentCode: "imageRow",
      componentType: 1,
      queueNumber: 0,
      componentInfo: {
        visible: 1, //1显示
        drawable: 0 //0 不可自由拖拽  1可移动
      },
      componentData: {}
    }
  ],
  goodsClassList: [
    {
      id: "",
      componentName: "商品列表",
      componentCode: "goodsList",
      componentType: 1,
      queueNumber: 0,
      componentInfo: {
        visible: 1, //1显示
        drawable: 0 //0 不可自由拖拽  1可移动
      },
      componentData: {}
    }
  ]
};
