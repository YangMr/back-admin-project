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
         <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
   ```

   

### 2.5 封装项目api接口

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