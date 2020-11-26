//引入axios请求配置文件
import request from '../utils/request'

//获取分类管理分页接口
export function getCategoryList(query,current = 1,size =20){
    return request({
        url : "/article/category/search",
        method : "POST",
        data : {  
            ...query,
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

//查询所有正常状态的分类接口
export function geNormalCategory(){
    return request({
        url : "/article/category/list",
        method : 'GET'
    })
}