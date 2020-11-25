<template>
  <div class="category">
    <!-- 搜索 -->
    <el-form
      ref="searchCategory"
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
    >
      <el-form-item label="分类名称:">
        <el-input v-model="searchMap.user" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select
          v-model="searchMap.status"
          size="mini"
          filterable
          clearable
          style="width: 85px"
        >
          <el-option
            v-for="(item, index) in status"
            :key="index"
            :label="item.statusText"
            :value="item.statusCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="searchCategory"
          >查询</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-refresh"
          @click="searchReset('searchCategory')"
          >重置</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="open"
          size="mini"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 分类列表 -->
    <el-table :data="categoryList" stripe border style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="name" align="center" label="分类名称">
      </el-table-column>
      <el-table-column prop="sort" align="center" label="排序">
      </el-table-column>
      <el-table-column prop="remark" align="center" label="备注">
      </el-table-column>
      <el-table-column prop="status" align="center" label="状态" width="160">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | filterStatus">
            {{ scope.row.status ? "正常" : "禁用" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
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

    <!-- 列表分页 -->
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

    <!-- 新增对话框 -->
    <app-edit :title="edit.title" :visible="edit.visible" :formData="edit.formData" :remoteFunction="close"></app-edit>
  </div>
</template>

<script>
const status = [
  {
    statusCode: 0,
    statusText: "禁用",
  },
  {
    statusCode: 1,
    statusText: "正常",
  },
];
import AppEdit from "../../components/category/edit";
import { getCategoryList, deleteCategoryData,findCategoryData } from "../../api/category";
export default {
  name: "",
  data() {
    return {
      edit: {
        visible: false,
        formData: {
          
        },
        title : ""
      },
      dialogFormVisible: true,
      categoryList: [],
      searchMap: {},
      status,
      page: {
        current: 1,
        size: 20,
        total: 0,
      },
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    //获取分类列表的数据
    async getCategory() {
      const response = await getCategoryList(
        this.searchMap,
        this.page.current,
        this.page.size
      );
      const result = response.data.data;
      this.categoryList = result.records;
      this.page.total = result.total;
    },

    //编辑按钮绑定的方法
    async handleEdit(id) {
      this.edit.visible = true;
      this.edit.title = "编辑";

      const result = await findCategoryData(id);
      console.log(result);
      if(result.data.code == 20000){
        this.edit.formData = result.data.data

        console.log(this.edit.formData)
      }else{
        this.$message({
          message : "查询数据失败",
          type : "error"
        })
      }
    },

    //删除按钮绑定的方法
    handleDelete(id) {
      this.$confirm("确认删除这条记录吗??", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await deleteCategoryData(id);
          if (result.data.code == 20000) {
            //更新分类列表数据
            this.getCategory();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              type: "warning",
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

    //当分页页码发生变化的时候会触发的方法
    handleCurrentChange(val) {
      //设置当前点击的页码
      this.page.current = val;
      //更新分类列表
      this.getCategory();
    },

    //当分页条数发生变化的时候会触发的方法
    handleSizeChange(val) {
      //设置当前选择的条数
      this.page.size = val;
      //更新分类列表
      this.getCategory();
    },

    //查询分类方法
    searchCategory() {
      //重新更新列表的数据
      this.getCategory();
    },

    //重置方法
    searchReset(formName) {
      //清空表单的数据
      this.searchMap = {};
      //重新更新列表的数据
      this.getCategory();
    },

    //打开新增弹框方法
    open() {
      this.edit.title = "新增";
      this.edit.visible = true;
    },

    //关闭新增弹窗方法
    close(){
      this.edit.visible = false;
      //重新更新列表的数据
      this.getCategory();

    }
  },
  filters: {
    //过滤分类的状态
    filterStatus(status) {
      return status == 0 ? "danger" : "success";
    },
  },
  components: {
    //新增或编辑组件
    AppEdit,
  },
};
</script>


<style scoped>
.category {
  padding: 20px;
}
</style>