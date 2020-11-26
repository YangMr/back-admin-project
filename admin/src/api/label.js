//导入axios配置文件
import request from "../utils/request"

//标签列表分页接口
export function getLabelList(query,current,size){
    return request({
        url : "/article/label/search",
        method : "POST",
        data : {
            ...query,
            current,
            size
        }
    })
}
//新增标签接口
export function addLabelData(data){
    return request({
        url : "/article/label",
        method : "POST",
        data
    })
}
//删除标签接口
export function deleteLabelData(id){
    return request({
        url : `/article/label/${id}`,
        method : "DELETE"
    })
}
//查询标签单条数据接口
export function findLabelData(id){
    return request({
        url : `/article/label/${id}`,
        method : "GET"
    })
}
//修改标签接口
export function updateLabelData(data){
    return request({
        url : "/article/label",
        method : "PUT",
        data
    })
}

