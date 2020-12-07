//引入axios的配置文件
import request from "../utils/request"

//菜单列表数据接口，不用分页
export function getMenuList(data = {}){
    return request({
        url : "/system/menu/search",
        method : "POST",
        data
    })
}

//新增菜单接口
export function addMenuData(data = {}){
    return request({
        url : "/system/menu",
        method : "POST",
        data
    })
}

//编辑菜单接口
export function updateMenuData(data = {}){
    return request({
        url : "/system/menu",
        method : "PUT",
        data
    })
}

//查询菜单详情接口
export function findMenuData(id){
    return request({
        url : `system/menu/${id}`,
        method : "GET"
    })
}

//删除菜单接口
export function deleteMenuData(id){
    return request({
        url : `system/menu/${id}`,
        method : "DELETE"
    })
}