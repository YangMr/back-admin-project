<template>
  <div class="role">
    <!-- 搜索 -->
    <el-form
      :inline="true"
      ref="roleForm"
      :model="roleForm"
      class="demo-form-inline"
    >
      <el-form-item label="角色名称:">
        <el-input size="mini" v-model="roleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          @click="searchRole"
          >查询</el-button
        >
        <el-button size="mini" @click="reload" icon="el-icon-refresh"
          >重置</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="open"
          icon="el-icon-circle-plus-outline"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 权限列表  -->
    <el-table
      ref="multipleTable"
      :data="roleList"
      border
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column
        label="序号"
        align="center"
        type="index"
        width="60"
      ></el-table-column>
      <el-table-column prop="name" align="center" label="角色名称">
      </el-table-column>
      <el-table-column
        prop="remark"
        align="center"
        label="备注"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleRole(scope.row.id)"
            >分配权限</el-button
          >
          <el-button
            type="success"
            size="mini"
            @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 20, 50]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>

    <!-- 封装的弹窗组件 -->
    <edit :title="edit.title" :visible="edit.visible" :formData="edit.formData" :remoteFunction="close"/> 
    
    <!-- 封装的权限弹窗组件 -->
    <premission :title="premission.title" :id="premission.id" :visible="premission.visible" :remoteFunction="pclose"></premission>
  </div>
</template>

<script>
import { getRoleList, deleteRoleData,findRoleData } from "../../api/role";
import Edit from "../../components/role/edit"
import Premission from "../../components/role/premission"
export default {
  name: "",
  data() {
    return {
      roleList: [],
      roleForm: {},
      page: {
        current: 1,
        size: 20,
        total: 0,
      },
      formData : {},
      edit : {
          title : "",
          visible : false,
          formData : {}
      },
      premission : {
          title : "",
          visible : false,
          formData : {},
          id : null
      }
    };
  },
  components: {Edit,Premission},
  created() {
    //调用获取权限列表方法
    this.initData();
  },
  methods: {
    //获取权限列表方法
    async initData() {
      const result = await getRoleList(
        this.roleForm,
        this.page.current,
        this.page.size
      );
      if (result.data.code == 20000) {
        this.page.total = result.data.data.total;
        this.roleList = result.data.data.records;
      } else {
        this.$message.error("获取权限列表失败");
      }
    },

    //分配权限按钮方法
    handleRole(id) {
      this.premission.visible = true;
      this.premission.title = "分配权限";
      this.premission.id = id;
    },
    //编辑按钮方法
    async handleEdit(id) {
      const result = await findRoleData(id);
      if(result.data.code == 20000){
          this.edit.formData = result.data.data;
          this.edit.visible = true;
          this.edit.title = "编辑";
      }else{
          this.$message.error("查询数据失败");
      }
    },
    //删除按钮方法
    handleDelete(id) {
      this.$confirm("确认删除这条记录吗??", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await deleteRoleData(id);
          if (result.data.code == 20000) {
            this.initData();  
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
              this.$message.error("删除权限数据失败")
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //分页条数变化时触发的方法
    handleSizeChange(val) {
      this.page.size = val;
      this.initData();
    },
    //分页页码发生变化时触发的方法
    handleCurrentChange(val) {
      this.page.current = val;
      this.initData();
    },

    //查询按钮方法
    searchRole() {
      this.initData();
    },
    //重置按钮方法
    reload() {
        this.roleForm = {};
        this.initData();
    },
    //新增按钮方法
    open() {
        this.edit.visible = true;
        this.edit.title = "新增";
        this.edit.formData = {};
    },
    pclose(){
        this.premission.visible = false;
        this.initData();
    },

    //关闭子组件弹窗方法
    close(){
        this.edit.visible = false;
        this.initData();
    }
  },
};
</script>


<style scoped>
.role {
  padding: 20px;
}
</style>