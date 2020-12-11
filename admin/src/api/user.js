import request from "../utils/request"

//用户管理列表、分页、查询接口
export function getUserList(query,current,size){
    return request({
        url : "/system/user/search",
        method : "POST",
        data : {
            ...query,
            current,
            size
        }
    })
}

//用户管理新增接口
export function addUserData(data){
    return request({
        url : "/system/user",
        method : "POST",
        data
    })
}

//用户管理删除接口
export function deleteUserData(id){
    return request({
        url : `/system/user/${id}`,
        method : "DELETE"
    })
}

//用户管理单条数据查询接口
export function findUserData(id){
    return request({
        url : `/system/user/${id}`,
        method : "GET"
    })
}

//用户管理编辑修改接口
export function updateUserData(data){
    return request({
        url : "/system/user",
        method : "PUT",
        data
    })
}

//用户管理设置角色接口
export function setRoleData(id,data){
    return request({
        url : `/system/user/${id}/role/save`,
        method : "POST",
        data
    })
}

//用户管理密码修改接口
export function updatePassword(data){
    return request({
        url : "/system/user/password",
        method : "PUT",
        data
    })
}