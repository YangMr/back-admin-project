import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout";

Vue.use(VueRouter);

const routes = [
  //根路由
  {
    path : "/",
    name : "Layout",
    redirect : "/index",
    component: Layout
  },
  //首页路由
  {
    path: "/index",
    component : Layout,
    children : [
      {
        path : "/",
        name : "Index",
        component: () =>import("../views/index")
      }
    ]
  },
  //文章管理
  {
    path: "/blog",
    component : Layout,
    children : [
      {
        path : "article",
        name : "Article",
        component: () =>import("../views/article")
      }
    ]
  },
  //分类管理
  {
    path: "/blog",
    component : Layout,
    children : [
      {
        path : "category",
        name : "Category",
        component: () =>import("../views/category")
      }
    ]
  },
  //标签管理
  {
    path: "/blog",
    component : Layout,
    children : [
      {
        path : "label",
        name : "Label",
        component: () =>import("../views/label")
      }
    ]
  },
  //广告管理
  {
    path: "/advert",
    component : Layout,
    children : [
      {
        path : "/",
        name : "Advert",
        component: () =>import("../views/advert")
      }
    ]
  },

  //用户管理
  {
    path: "/system",
    component : Layout,
    children : [
      {
        path : "user",
        name : "User",
        component: () =>import("../views/user")
      }
    ]
  },
  //角色管理
  {
    path: "/system",
    component : Layout,
    children : [
      {
        path : "role",
        name : "Role",
        component: () =>import("../views/role")
      }
    ]
  },
  //菜单管理
  {
    path: "/system",
    component : Layout,
    children : [
      {
        path : "menu",
        name : "Menu",
        component: () =>import("../views/menu")
      }
    ]
  },

  //当访问非路由页面的时候跳转到根路由
  {
    path : "*",
    redirect : "/"
  }
];

const router = new VueRouter({
  routes
});

export default router;
