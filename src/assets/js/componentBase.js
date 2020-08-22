//更新组件内容信息 componentData    
// 校验与源数据差距  *后期用户手动更新升级
export function updateComponentData(newObj, oldObj, componentCode) {
  for (const key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      // 添加key
      const element = newObj[key];
      // 匹配没有得key并添加
      if (oldObj[key] == 'undefined' || oldObj[key] == undefined) {
        oldObj[key]=element
      }
      //  我的服务 
      if (componentCode == 'my-service') {
        if (key == 'list') {
          let arr = newObj[key];
          let arr1 = oldObj[key];
          let fil = arr.filter(v => !arr1.some(b => v.id === b.id && b.type != 'custom'));
          let union = arr1.concat(fil)
          // patch 用于修复老数据（修改图标）
          union.forEach((element,i) => {
            let ce=arr.filter(e => element.id == e.id);
            ce[0] && (element.img=ce[0].img)
          });
          oldObj[key] = union;
        }
      } else if (componentCode == 'wallet') {//钱包
        if (key == 'list') {
          let arr = newObj[key];
          let arr1 = oldObj[key];
          let fil = arr.filter(v => !arr1.some(b => v.id === b.id));
          let union = arr1.concat(fil)
          oldObj[key] = union;
        }
      }
    }
  }
  return
};

// 生成组件列表内唯一ID
// value 组件展示列表
export function uniqueId(value) {
  if (value.length < 1) {
    return value.length;
  } else {
    let item = value.reduce((item1, item2) => {
      return +item1.id > +item2.id ? item1 : item2;
    });
    return +item.id + 1;
  }
}