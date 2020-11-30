<template>
  <div class="advert">
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
      :total="page.total">
    </el-pagination>
  </div>
</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAdverList } from "../../api/advert";
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
    handleEdit(id){
        console.log(id);
    },

    //删除按钮方法
    handleDelete(id){
      console.log(id)
    },

    //条数发生变化方法
    handleSizeChange(val){
        this.page.size = val;
        this.getInit();
    },

    //页码发生变化方法
    handleCurrentChange(val){
        this.page.current = val;
        this.getInit();
    }
  },
  components: {},
};
</script>


<style scoped>
.advert {
  padding: 20px;
}
</style>