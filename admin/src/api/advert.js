import request from "../utils/request"

//获取广告列表搜索分页接口 
export function getAdverList(query,current = 1, size = 20){
    return request({
        url : "/article/advert/search",
        method : "POST",
        data : {
            ...query,
            current,
            size
        }
    })
}

//删除广告接口
export function deleteAdverListData(id){
    return request({
        url : `/article/advert/${id}`,
        method : "DELETE"
    })
}

//新增广告接口
export function addAdverData(data){
    return request({
        url : "/article/advert",
        method : "POST",
        data
    })
}

//查询广告详情接口
export function findAdverData(id){
    return request({
        url : `/article/advert/${id}`,
        method : "GET"
    })
}

//上传图片接口
export function uploadAdvertData(file){
    return request({
        url : "/article/file/upload",
        method : "POST",
        data : {
            file
        }
    })
}

//修改广告接口
export function updateAdvertData(data){
    return request({
        url : "/article/advert",
        method : "PUT",
        data
    })
}