# 后台管理系统项目

[toc]



## 一、使用git与github管理项目

### 1.1 在github上创建后台管理系统项目的远程仓库

1. 访问github.com
2. 点击+号 > 选择new resp -> 填写项目信息 -> 创建仓库

### 1.2 在本地使用git克隆远程的项目仓库

```
git clone git@github.com:YangMr/back-admin-project.git
```

### 1.3 使用vue-cli创建项目

```
vue create admin
```

### 1.4 将本地仓库的项目推送到远程仓库

```
git add .

git commit -m "初始化项目"

git push
```

## 二、对项目进行基础环境的配置

### 2.1 使用开发分支对项目进行开发

1. 创建dev分支

   ```
   git checkout -b dev
   ```

2. 推送到dev分支

   ```
   git push origin dev
   ```

### 2.2 对vue.config.js文件进行配置

```
module.exports = {
    //项目打包时的路径,解决打包时白屏问题
    publicPath : "./", 
    //配置vue-cli的服务器
    devServer : {
        //当项目启动完成式,自动打开浏览器进行预览
        open : true,
        //设置项目启动的端口号
        port : 9999,
        //设置访问项目的主机名
        host : "localhost",
        //设置是否开启https协议
        https : false,
    },
    //关闭eslint
    lintOnSave : false,
     // 打包时, 不生成 .map 文件, 加快打包构建
     productionSourceMap: false,
}
```



### 2.3 设置项目的浏览器标题以及浏览器的图标

> 在public目录下找到index.html文件,修改title的内容以及ico的图标

### 2.4 安装element-ui与axios以及项目所需要的一些插件

1. 安装element-ui与axios

   ```
   cnpm install axios element-ui --save
   ```

2. 使用element-ui

   ```
   import ElementUI from 'element-ui';
   import 'element-ui/lib/theme-chalk/index.css';
   
   Vue.use(ElementUI);
   ```

3. 测试elemen-ui是否引入成功

   ```
   <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
         <el-breadcrumb-item>活动列表</el-breadcrumb-item>
         <el-breadcrumb-item>活动详情</el-breadcrumb-item></el-breadcrumb>
   ```

   

### 2.5 封装项目api接口

#### 2.5.1 封装axios请求的配置

1. 在src目录下创建utils文件夹
2. 在utils文件夹内创建request.js
3. 在request.js文件内引入axios
4. 在request.js文件内创建axios实例
5. 在request.js文件内创建请求拦截与响应拦截
6. 在request.js文件内导出axios实例

> 具体内容请参考一下代码

```
//引入axios
import axios from 'axios'

//创建axios实例
const request = axios.create({
    //配置请求的公共地址
    baseUrl: "",
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
```



#### 2.5.2 封装api接口



### 2.6 配置跨域

### 2.7 配置路由

### 2.8 实现页面整体框架布局

## 三、对功能模块进行开发

### 3.1 首页模块

### 3.2 博客管理模块

#### 3.2.1 实现分类管理

#### 3.2.2 实现标签管理

#### 3.2.3 实现文章管理

### 3.3 广告管理模块

### 3.4 系统管理模块

#### 3.4.1 实现用户管理

#### 3.4.2 实现角色管理

#### 3.4.3 实现菜单管理

## 四、对项目进行部署以及上线