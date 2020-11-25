<template>
  <div class="category">
    <!-- 搜索 -->
    <el-form :inline="true" :model="searchMap" class="demo-form-inline">
      <el-form-item label="分类名称:">
        <el-input v-model="searchMap.user" size="mini" ></el-input>
      </el-form-item>
      <el-form-item label="状态:" >
        <el-select v-model="searchMap.region" size="mini" filterable clearable style="width:85px">
          <el-option v-for="(item,index) in status" :key="index" :label="item.statusText
          " :value="item.statusCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 分类列表 -->
    <el-table :data="categoryList" stripe border style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="name" align="center" label="分类名称" >
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
  </div>
</template>

<script>
const status = [
  {
    statusCode : 0,
    statusText : "禁用"    
  },
  {
    statusCode : 1,
    statusText : "正常"    
  },
];
import { getCategoryList } from "../../api/category";
export default {
  name: "",
  data() {
    return {
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
      console.log(result);
      this.categoryList = result.records;
      this.page.total = result.total;
    },

    //编辑按钮绑定的方法
    handleEdit(index) {
      console.log(index);
    },

    //删除按钮绑定的方法
    handleDelete(index) {
      console.log(index);
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
  },
  filters: {
    filterStatus(status) {
      return status == 0 ? "danger" : "success";
    },
  },
  components: {},
};
</script>


<style scoped>
.category {
  padding: 20px;
}
</style>