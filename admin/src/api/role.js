import request from "../utils/request"


//角色列表分页接口 和 查询接口
export function getRoleList(query,current = 1,size = 20){
    return request({
        url : "/system/role/search",
        method : "POST",
        data : {
            ...query,
            current,
            size
        }
    })
}

//新增数据接口
export function addRoleData(data){
    return request({
        url : "/system/role",
        method : "POST",
        data
    })
}

//编辑数据接口
export function updateRoleData(data){
    return request({
        url : "/system/role",
        method : "PUT",
        data
    })
}

//删除数据接口
export function deleteRoleData(id){
    return request({
        // url : "/system/role/" + id
        url : `/system/role/${id}`,
        method : 'DELETE'
    })
}

//查询单条数据接口
export function findRoleData(id){
    return request({
        // url : "/system/role/" + id
        url : `/system/role/${id}`,
        method : 'GET'
    })
}

//获取已有权限的接口数据
export function getMenuRole(id){
    return request({
        url : `/system/role/${id}/menu/ids`,
        method : 'GET'
    })
}

//设置权限接口
export function setMenuRole(id,data){
    return request({
        url : `/system/role/${id}/menu/save`,
        method : 'POST',
        data 
    })
}

