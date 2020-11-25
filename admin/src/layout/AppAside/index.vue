<template>
  <el-aside>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#304155"
      text-color="#BFCBD9"
      :router="true"
      :collapse="isCollapse"
    >
      <el-menu-item index="/index" align="left">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/blog" align="left">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span slot="title">博客管理</span>
        </template>
        <el-menu-item index="/blog/article">
          <template slot="title">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">文章管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/blog/category">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">分类管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/blog/label">
          <template slot="title">
            <i class="el-icon-collection-tag"></i>
            <span slot="title">标签管理</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/advert" align="left">
        <i class="el-icon-picture-outline-round"></i>
        <span slot="title">广告管理</span>
      </el-menu-item>
      <el-submenu index="/system" align="left">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item index="/system/user">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/system/role">
          <template slot="title">
            <i class="el-icon-coin"></i>
            <span slot="title">角色管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/system/menu">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">菜单管理</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="5" align="left">
        <i class="el-icon-link"></i>
        <span slot="title"
          ><a class="link" href="https://www.baidu.com">积云教育官网</a></span
        >
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  props: {
    isCollapse: {
        type : Boolean,
        default : false
    },
  },
  name: "",
  data() {
    return {};
  },
  components: {},
};
</script>


<style scoped>
.el-aside {
  width: auto !important;
  background-color: #304155;
  color: #333;
  text-align: center;
  position : fixed;
  z-index:9999;
  height : 100% !important;
}
.link {
  text-decoration: none;
  color: #bfcbd9;
}
.el-menu{
    width : 210px;
    border-right: none;
}
.el-submenu .el-menu-item {
    background-color:#1E2D3D !important;
}
.el-submenu .el-menu-item:hover{
  background-color : #001529 !important; 
}
</style>