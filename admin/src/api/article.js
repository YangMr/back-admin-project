//引入axios配置文件
import request from "../utils/request"

//获取文章列表分页接口 - 文章查询接口
export function getArticleList(query,current = 1, size = 20){
    return request({
        url : "/article/article/search",
        method : "POST",
        data : {
            ...query,
            current,
            size
        }
    })
}

//查看文章详情接口
export function findArticleData(id){
    return request({
        url : `/article/article/${id}`
    })
}


//文章删除接口
export function deleteArticleData(id){
    return request({
        url : `/article/article/${id}`,
        method : 'DELETE'
    })
}

//审核通过接口
export function articleSuccess(id){
    return request({
        url : `/article/article/audit/success/${id}`,
        method : 'GET'
    })
}

//审核不通过接口
export function articleFail(id){
    return request({
        url : `/article/article/audit/fail/${id}`,
        method : 'GET'
    })
}
