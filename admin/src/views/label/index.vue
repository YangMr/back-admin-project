<template>
  <div class="label">
    <!-- 搜索 -->
    <el-form :inline="true" ref="labelForm" :model="labelForm" class="demo-form-inline">
      <el-form-item label="标签名称:" prop="name">
        <el-input v-model="labelForm.name" size="mini" ></el-input>
      </el-form-item>
      <el-form-item label="分类名称:" prop="categoryName">
        <el-select v-model="labelForm.categoryName"  clearable filterable size="mini" >
          <el-option v-for="(item,index) in categoryNameList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="seachLabel">查询</el-button>
        <el-button size="mini" icon="el-icon-refresh" @click="reset">重置</el-button>
        <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="open">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 标签列表 -->
    <el-table :data="labelList" stripe border style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" prop="name" label="标签名称">
      </el-table-column>
      <el-table-column align="center" prop="categoryName" label="分类名称">
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

    <!-- 新增和编辑的弹出框组件 -->
    <app-edit :visible="edit.visible" :formData="edit.formData"  :title="edit.title" :remoteFunction="close" :categoryNameList="categoryNameList"></app-edit>
  </div>
</template>

<script>
import {geNormalCategory} from "../../api/category"
import { getLabelList, deleteLabelData ,findLabelData} from "../../api/label"
import AppEdit from "../../components/label/edit"
export default {
  name: "",
  data() {
    return {
      edit : {
        visible : false,
        title : "",
        formData : {},
      },
      
      categoryNameList : [],  
      labelList: [],
      labelForm: {},
      page: {
        total: 0,
        current: 1,
        size: 20,
      },
    };
  },
  created() {
    //调用获取标签列表的方法
    this.getInit();

    //调用获取所有正常状态的分类接口方法
    this.getNormalCategoryName();
  },
  methods: {
    //获取标签列表的数据
    async getInit() {
      const result = await getLabelList(
        this.labelForm,
        this.page.current,
        this.page.size
      );
      if (result.data.code == 20000) {
        this.page.total = result.data.data.total;
        this.labelList = result.data.data.records;
      } else {
        this.$message({
          message: "获取数据失败",
          type: "error",
        });
      }
    },

    //获取所有正常状态的分类接口
    async getNormalCategoryName(){
        const result = await geNormalCategory();
        if(result.data.code == 20000){
            this.categoryNameList = result.data.data;
        }else{
            this.$message({
                message : "获取数据失败!",
                type : "error"
            })
        }
    },

    //设置点击编辑按钮的方法
    handleEdit(id) {
      this.edit.visible = true;
      this.edit.title = "编辑";
      this.handleFindLabel(id)
    },

    //查询标签单条数据方法
    async handleFindLabel(id){
       const result = await findLabelData(id);
       if(result.data.code == 20000){
           this.edit.formData = result.data.data;
       }else{
           this.$message({
               message : "查询数据失败!",
               type : "error"
           })
       }
    },

    //设置点击删除按钮的方法
    handleDelete(id) {
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await deleteLabelData(id);
          if (result.data.code == 20000) {
            this.getInit();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
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

    //设置点击页码触发的方法
    handleCurrentChange(val) {
      this.page.current = val;
      this.getInit();
    },

    //设置选择条数触发的方法
    handleSizeChange(val) {
      this.page.size = val;
      this.getInit();
    },

    //条件查询方法
    seachLabel(){
        this.getInit();
    },

    //条件查询表单重置方法
    reset(){
        this.$refs["labelForm"].resetFields();
        this.getInit();
    },

    //打开弹窗方法
    open(){
        this.edit.visible = true;
        this.edit.title = "新增"
    },

    //关闭弹窗的方法
    close(){
        this.edit.visible = false;
        this.getInit();
    }
  },
  components: {
      AppEdit
  },
};
</script>


<style scoped>
.label {
  padding: 20px;
}
</style>