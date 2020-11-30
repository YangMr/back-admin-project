<template>
  <div class="article">
    <!-- 文章搜索 -->
    <el-form :inline="true" :model="articleForm" ref="articleForm" class="demo-form-inline">
        <el-form-item label="文章标题:" prop="title">
            <el-input size="mini" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
            <el-select v-model="articleForm.status"  clearable filterable size="mini">
                <el-option label="未审核" :value="1"></el-option>
                <el-option label="审核通过" :value="2"></el-option>
                <el-option label="审核未通过" :value="3"></el-option>
                <el-option label="已删除" :value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="el-icon-search"  size="mini" @click="articleSearch">查询</el-button>
            <el-button size="mini" icon="el-icon-refresh" @click="reset">重置</el-button>
        </el-form-item>
    </el-form>

    <!-- 文章列表 -->
    <el-table :data="articleList" highlight-current-row stripe border style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" prop="title" label="文章标题" >
      </el-table-column>
      <el-table-column align="center" prop="viewCount" label="浏览数">
      </el-table-column>
      <el-table-column align="center" prop="thumhup" label="点赞数" >
      </el-table-column>
      <el-table-column align="center" label="是否公开" >
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.ispublic == 1">公开</el-tag>
          <el-tag type="danger" v-if="scope.row.ispublic == 0">不公开</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <!-- 2 审核通过 1 未审核 0 已删除 3审核未通过 -->
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 2">审核通过</el-tag>
          <el-tag v-if="scope.row.status == 1">未审核</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 0">已删除</el-tag>
          <el-tag type="warning" v-if="scope.row.status == 3">审核未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="最后更新时间" min-width="120">
          <template slot-scope="scope">
              {{getFormat(scope.row.updateDate)}}
          </template>
      </el-table-column>
      <el-table-column align="left" label="操作" width="220"> 
          <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleView(scope.row.id)" >查看</el-button>
              <el-button size="mini" v-if="scope.row.status == 1" type="success" @click="openAudit(scope.row.id)">审核</el-button>
              <el-button size="mini" v-if="scope.row.status !== 0" type="danger">删除</el-button>
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
      :total="page.total">
    </el-pagination>

    <!-- 查看详情组件 -->
    <app-audit :visible="audit.visible" :displayAudit="audit.displayAudit" :title="audit.title" :id="audit.id" :remoteFunction="close"></app-audit>
  </div>
</template>

<script>
import AppAudit from "../../components/article/audit"
import {format} from "../../utils/date"
import { getArticleList ,} from "../../api/article";
export default {
  name: "",
  data() {
    return {
      articleForm: {},
      articleList: [],
      page: {
        total: 0,
        size: 20,
        current: 1,
      },
      audit : {
          visible : false,
          id : null,
          title : "",
          displayAudit : null
      }
    };
  },
  created() {
    //调用获取文章列表方法
    this.getInit();
  },
  methods: {
    //获取文章列表方法
    async getInit() {
      const result = await getArticleList(
        this.articleForm,
        this.page.current,
        this.page.size
      );
      if (result.data.code == 20000) {
        this.page.total = result.data.data.total;
        this.articleList = result.data.data.records;
      } else {
        this.$message({
          type: "error",
          message: "请求数据失败!",
        });
      }
    },

    //格式化时间方法
    getFormat(date){
       return format(date)
    },

    //查看按钮方法
    handleView(id){
        this.audit.visible = true;
        this.audit.title = "查看";
        this.audit.id = id;
        this.audit.displayAudit = false;
    },

    //页码发生变化触发的方法
    handleCurrentChange(val){
        this.page.current = val;
        this.getInit();
    },

    //当选择条数会触发的方法
    handleSizeChange(val){
        this.page.size = val;
        this.getInit();
    },

    //文章搜索方法
    articleSearch(){
        this.getInit();
    },

    //文章搜索重置方法
    reset(){
        this.$refs["articleForm"].resetFields();
        this.getInit();
    },

    //审核按钮方法
    openAudit(id){
        this.audit.visible = true;
        this.audit.title ="审核文章";
        this.audit.id = id;
        this.audit.displayAudit = true;
    },

    //关闭提示框的方法
    close(){
        this.audit.visible = false;
        this.getInit();
    }
  },
  components: {
      AppAudit
  },
};
</script>


<style scoped>
.article {
  padding: 20px;
}
</style>