/**
 * `page_code` tinyint(3) DEFAULT '1' COMMENT '页面code(1,首页。2，分类。3，个人中心。4，活动页。5，自定义)'
 * 
 * type:页面类型
 */

import commonComponentModel from '@/store/commonComponentModel.js';
import defaultComponentModel from '@/store/defaultComponentModel.js';
import interiorComponentModel from '@/store/interiorComponentModel.js'
//查询页面默认组件 底部栏
export function getPageDefComponent(type = 0) {
    switch (+type) {
        case 0:
            return []

        //1  类型首页 添加footer
        case 1:
            return ['footer']

        //3  类型个人中心 添加footer
        case 3:
            return ['footer']

        default:
            return []

    }
}
//查询页面内置组件 返回默认数据列表
export function getPageInteriorComponent(type=1){
    let data;
    switch (+type) {
        case 3:
            data=JSON.parse(JSON.stringify(interiorComponentModel.PERSONALCENTER))
            break; 
        default:
            data=[];
            break;
    }
    return data
}

/*
*获取某个组件源数据 
*@type 组件类型
*@compoonentCode 组件code
*/
export function getComponentOriginData(type,componentCode){
    console.log('getComponent',type,'---!!')
    if (type==3) {//获取个人中心内置组件
        let data=interiorComponentModel.PERSONALCENTER;
        for (const item of data) {
            if (item.componentCode==componentCode) {
                return JSON.parse(JSON.stringify(item))
            }
        }
    }else if(type==1){
        for (const iterator in commonComponentModel) {
            for (const item of commonComponentModel[iterator]) {
                if (item.componentCode==componentCode) {
                    return JSON.parse(JSON.stringify(item))
                }
            }
        }
    }
}
