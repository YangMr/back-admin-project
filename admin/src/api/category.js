//引入axios请求配置文件
import request from '../utils/request'

//获取分类管理分页接口
export function getCategoryList(name,status,current = 1,size = 10){
    return request({
        url : "/article/category/search",
        method : "POST",
        data : {
            name,
            status,
            current,
            size
        }
    })
};

//新增分类接口
export function addCategoryData(data){
    return request({
        url : "/article/category",
        method : "POST",
        data
    })
}

//删除分类接口
export function deleteCategoryData(id){
    return request({
        url : `/article/category/${id}`,
        method : 'DELETE'
    })
}

//查询单条分类数据接口
export function findCategoryData(id){
    return request({
        url : `/article/category/${id}`,
        method : 'GET'
    })
}

//修改分类接口
export function updateCategoryData(){
    return request({
        url : "/article/category",
        method : 'PUT'
    })
}