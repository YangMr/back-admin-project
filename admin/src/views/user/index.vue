<template>
  <div class="user">
    <!-- 用户管理搜索 -->
    <el-form
      :inline="true"
      :model="userForm"
      ref="userForm"
      size="mini"
      class="demo-form-inline"
    >
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="mobile">
        <el-input v-model="userForm.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 用户管理列表   -->
    <el-table :data="userList" stripe border style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="username" align="center" label="用户名"> </el-table-column>
      <el-table-column prop="nickName" align="center" label="昵称"> </el-table-column>
      <el-table-column prop="mobile" align="center" label="手机号"> </el-table-column>
      <el-table-column prop="email" align="center" label="邮箱"> </el-table-column>
      <el-table-column
        prop="isAccountNonExpired"
        align="center"
        label="账号过期"
        width="80"
      >
        <template slot-scope="scope">
          <!-- // 帐户是否过期(1 未过期，0已过期) -->
          <el-tag type="success" v-if="scope.row.isAccountNonExpired == 1">正常</el-tag>
          <el-tag type="danger" v-if="scope.row.isAccountNonExpired == 0">过期</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="isAccountNonLocked"
        align="center"
        label="账号锁定"
        width="80"
      >
        <template slot-scope="scope">
          <!-- // 帐户是否锁定(1 未过期，0已过期) -->
          <el-tag type="success" v-if="scope.row.isAccountNonLocked == 1">正常</el-tag>
          <el-tag type="danger" v-if="scope.row.isAccountNonLocked == 0">锁定</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="isCredentialsNonExpired"
        align="center"
        label="密码过期"
        width="80"
      >
        <template slot-scope="scope">
          <!-- // 密码是否过期(1 未过期，0已过期) -->
          <el-tag type="success" v-if="scope.row.isCredentialsNonExpired == 1"
            >正常</el-tag
          >
          <el-tag type="danger" v-if="scope.row.isCredentialsNonExpired == 0"
            >过期</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="isEnabled" align="center" label="是否可用" width="80">
        <template slot-scope="scope">
          <!-- // 是否可用(1 可用，0已删除) -->
          <el-tag type="success" v-if="scope.row.isEnabled == 1">可用</el-tag>
          <el-tag type="danger" v-if="scope.row.isEnabled == 0">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="340">
        <template slot-scope="scope" v-if="scope.row.isEnabled == 1">
          <el-button type="success" size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
          <el-button type="primary" size="mini" @click="handleSetRole(scope.row.id)"
            >设置角色</el-button
          >
          <el-button type="primary" size="mini" @click="handleChangePass(scope.row.id)"
            >修改密码</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>

    <!-- 新增用户管理提示框 -->
    <edit
      :title="edit.title"
      :visible="edit.visible"
      :formData="edit.formData"
      :remoteFunction="close"
    ></edit>

    <!-- 设置角色提示框 -->
    <el-dialog :title="role.title" :visible.sync="role.visible" width="65%">
        <role :control="role.control" ></role>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "../../api/user";
import Edit from "../../components/user/edit";
import Role from "../role"
export default {
  name: "",
  data() {
    return {
      role : {
          title : "",
          visible : false,
          control : ""
      },
      userForm: {},
      userList: [],
      page: {
        current: 1,
        size: 20,
        total: 0,
      },
      edit: {
        title: "",
        visible: false,
        formData: {},
      },
    };
  },
  components: { Edit,Role },
  created() {
    this.initData();
  },
  methods: {
    //初始化数据,获取用户管理列表接口的数据,包含了分页, 查询
    async initData() {
      const result = await api.getUserList(
        this.userForm,
        this.page.current,
        this.page.size
      );
      if (result.data.code == 20000) {
        this.userList = result.data.data.records;
        this.page.total = result.data.data.total;
      } else {
        this.$message.error("数据获取失败");
      }
      console.log(result);
    },

    //编辑按钮的方法
    async handleEdit(id) {
      this.edit.visible = true;
      this.edit.title = "编辑";
      const result = await api.findUserData(id);
      if (result.data.code == 20000) {
        this.edit.formData = result.data.data;
      } else {
        this.$message.error("查询数据失败");
      }
    },

    //删除按钮的方法
    handleDelete(id) {
      console.log(id);
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await api.deleteUserData(id);
          if (result.data.code == 20000) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.initData();
          } else {
            this.$message({
              type: "error",
              message: "删除失败!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //设置角色按钮的方法
    handleSetRole(id) {
      this.role.visible = true;
      this.role.title = "设置角色";
      this.role.control = "hide"
    },

    //修改密码按钮的方法
    handleChangePass(id) {
      console.log(id);
    },

    //当分页的条数改变的时候所触发的方法
    handleSizeChange(val) {
      this.page.size = val;
      this.initData();
    },

    //当分页页码发生改变的时候所触发的方法
    handleCurrentChange(val) {
      this.page.current = val;
      this.initData();
    },

    //查询按钮方法
    handleSearch() {
      this.initData();
    },

    //重置按钮方法
    handleReset() {
      this.$refs["userForm"].resetFields();
      this.initData();
    },

    //新增按钮方法
    handleAdd() {
      this.edit.visible = true;
      this.edit.title = "新增——默认密码与用户名一致";
    },

    //关闭弹窗方法
    close() {
      this.edit.formData = {};
      this.edit.visible = false;

      this.initData();
    },
  },
};
</script>

<style scoped>
.user {
  padding: 20px;
}
</style>
