//引入axios
import axios from 'axios'

console.log(process.env.VUE_APP_BASE_API)
//创建axios实例
const request = axios.create({
    //配置请求的公共地址
    baseURL: process.env.VUE_APP_BASE_API,
    //配置请求的超时时间
    timeout: 5 * 1000
    //还可以配置更多内容,请查看axios中文文档
})


// 添加请求拦截器
axios.interceptors.request.use(function (config) {

    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

//导出axios实例对象
export default request
