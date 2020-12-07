<template>
  <div class="menu">
    <!-- 搜所  -->
    <el-form
      :inline="true"
      :model="searchForm"
      ref="searchForm"
      class="demo-form-inline"
    >
      <el-form-item label="菜单名称:" prop="name">
        <el-input
          v-model="searchForm.name"
          size="mini"
          placeholder="审批人"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="search"
          >查询</el-button
        >
        <el-button size="mini" icon="el-icon-refresh" @click="reload"
          >重置</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          size="mini"
          @click="add"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 菜单列表  -->
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      highlight-current-row
      stripe
      :default-expand-all="false"
    >
      <el-table-column type="index" align="center" label="序号" sortable>
      </el-table-column>
      <el-table-column prop="name" align="center" label="名称" sortable>
      </el-table-column>
      <el-table-column prop="url" align="center" label="请求地址" sortable>
      </el-table-column>
      <el-table-column prop="code" align="center" label="权限标识" sortable>
      </el-table-column>
      <el-table-column align="center" label="类型" sortable>
        <!-- 1: 目录 2:按钮 3:菜单 -->
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">目录</span>
          <span v-if="scope.row.type == 2">按钮</span>
          <span v-if="scope.row.type == 3">菜单</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图标" sortable>
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="sort" align="center" label="排序" sortable>
      </el-table-column>
      <el-table-column label="操作" width="260" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAdd(scope.row.id)"
            >新增</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗组件  -->
    <edit
      :title="edit.title"
      :visible="edit.visible"
      :id="edit.id"
      :remoteFunction="close"
    ></edit>
  </div>
</template>

<script>
import { getMenuList, deleteMenuData } from "../../api/menu";
import Edit from "../../components/menu/edit";
export default {
  name: "",
  data() {
    return {
      menuList: [],
      searchForm: {},
      edit: {
        title: "",
        visible: false,
        id: null,
      },
    };
  },
  components: {
    Edit,
  },
  created() {
    this.initData();
  },
  methods: {
    //获取菜单列表方法
    async initData() {
      const result = await getMenuList(this.searchForm);
      console.log(result.data);
      if (result.data.code == 20000) {
        this.menuList = result.data.data;
      } else {
        this.$message.error("获取菜单列表失败");
      }
    },

    //新增按钮方法
    handleAdd(id) {
      this.edit.title = "新增";
      this.edit.visible = true;
      this.edit.id = "show";
    },

    //编辑按钮方法
    handleEdit(id) {
      this.edit.id = id;
      this.edit.title = "编辑";
      this.edit.visible = true;
    },

    //删除按钮方法
    handleDelete(id) {
      this.$confirm("确认删除当前节点与子节点记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await deleteMenuData(id);
          if (result.data.code == 20000) {
            this.initData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //查询按钮方法
    search() {
      this.initData();
    },

    //重置按钮方法
    reload() {
      this.$refs["searchForm"].resetFields();
      this.initData();
    },

    //新增按钮方法
    add() {
      this.edit.title = "新增";
      this.edit.visible = true;
    },

    //关闭弹窗的方法
    close() {
      this.edit.visible = false;
      this.initData();
      this.edit.id = null;
    },
  },
};
</script>


<style scoped>
.menu {
  padding: 20px;
}
</style>