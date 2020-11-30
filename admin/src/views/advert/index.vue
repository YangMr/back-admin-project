<template>
  <div class="advert">
    <!-- 广告搜索 -->
    <el-form :inline="true" ref="advertForm" :model="advertForm" class="demo-form-inline">
      <el-form-item label="广告标题:" prop="title">
        <el-input v-model="advertForm.title" size="mini" ></el-input>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-select v-model="advertForm.status" size="mini" >
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="正常" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" icon="el-icon-search" @click="searchAdvert">查询</el-button>
        <el-button  size="mini" icon="el-icon-refresh" @click="reset">重置</el-button>
         <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="open">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 广告列表   -->
    <el-table :data="advertList" stripe border style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" prop="title" label="广告标题">
      </el-table-column>
      <el-table-column align="center" label="广告图片">
        <template slot-scope="scope">
          <el-image
            style="width: 90px; height: 60px"
            :src="scope.row.imageUrl"
            :preview-src-list="[scope.row.imageUrl]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="advertUrl" label="广告链接">
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 0">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sort" label="排序">
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
        </template></el-table-column
      ></el-table
    >

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

    <!-- 弹窗 -->
    <edit :title="edit.title" :visible="edit.visible" :remoteFunction="close" :id="edit.id"></edit>
  </div>
</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Edit from "../../components/advert/edit"
import { getAdverList,deleteAdverListData } from "../../api/advert";
export default {
  name: "",
  data() {
    return {
      advertForm: {},
      advertList: [],
      page: {
        current: 1,
        size: 20,
        total: 0,
      },
      edit : {
        title : "",
        visible : false,
        id : null
      }
    };
  },
  created() {
    this.getInit();
  },
  methods: {
    //获取广告列表方法
    async getInit() {
      const result = await getAdverList(
        this.advertForm,
        this.page.current,
        this.page.size
      );
      if (result.data.code == 20000) {
        this.page.total = result.data.data.total;
        this.advertList = result.data.data.records;
      } else {
        this.$message({
          type: "error",
          message: "获取数据失败!",
        });
      }
    },

    //编辑按钮方法
    handleEdit(id) {
      this.edit.visible = true;
      this.edit.title = "编辑";
      this.edit.id= id;
    },

    //删除按钮方法
    async handleDelete(id) {
      const result = await deleteAdverListData(id);
      if(result.data.code == 20000){
         this.$message({
          type : "success",
          message : "删除成功"
        })
        this.getInit();
      }else{
        this.$message({
          type : "error",
          message : "删除失败"
        })
      }
    },

    //条数发生变化方法
    handleSizeChange(val) {
      this.page.size = val;
      this.getInit();
    },

    //页码发生变化方法
    handleCurrentChange(val) {
      this.page.current = val;
      this.getInit();
    },

    //搜索广告方法
    searchAdvert(){
      this.getInit();
    },

    //搜索表单重置方法
    reset(){
      this.$refs["advertForm"].resetFields();
      this.getInit();
    },

    //打开弹窗
    open(){
      this.edit.title = "新增";
      this.edit.visible = true;
    },

    //关闭弹窗
    close(){
      this.edit.visible = false;
      this.getInit();
    }
  },
  components: {
    Edit
  },
};
</script>


<style scoped>
.advert {
  padding: 20px;
}
</style>