<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="60%"
  >
    <el-form :model="formData" label-width="85px" label-position="right">
      <el-form-item label="标题:">
        <el-input v-model="formData.title" readonly></el-input>
      </el-form-item>
      <el-form-item label="标签:">
        <el-cascader disabled clearable></el-cascader>
      </el-form-item>
      <el-form-item label="主图:">
        <img :src="formData.imageUrl" class="avatar" />
      </el-form-item>
      <el-form-item label="是否公开:">
        <el-radio-group v-model="formData.ispublic" disabled>
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="0">不公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介:">
        <el-input
          type="textarea"
          readonly
          v-model="formData.summary"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容:">
        <mavon-editor
          v-model="formData.mdContent"
          :editable="false"
        ></mavon-editor>
      </el-form-item>

      <el-form-item align="center">
        <el-button type="primary" @click="auditSuccess">审核通过</el-button>
        <el-button type="danger" @click="auditFail">审核不通过</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import {
  findArticleData,
  articleSuccess,
  articleFail,
} from "../../api/article";
export default {
  props: {
    id: null,
    visible: {
      default: false,
      type: Boolean,
    },
    title: {
      type: String,
      default: "",
    },
    remoteFunction: Function,
  },
  name: "",
  data() {
    return {
      formData: {},
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.getFindArticleData();
      }
    },
  },
  methods: {
    //关闭窗口方法
    handleClose() {
      this.remoteFunction();
    },

    //获取文章详情方法
    async getFindArticleData() {
      const result = await findArticleData(this.id);
      console.log(result);
      if (result.data.code == 20000) {
        this.formData = result.data.data;
      } else {
        this.$message({
          message: "查询失败!",
          type: "error",
        });
      }
    },

    //审核通过方法
    async auditSuccess() {
      const result = await articleSuccess(this.id);
      if (result.data.code == 20000) {
        this.$message({
          message: "审核通过!",
          type: "success",
        });
        this.remoteFunction();
      } else {
        this.$message({
          message: "审核失败!",
          type: "error",
        });
      }
    },

    //审核不通过方法
    async auditFail() {
      const result = await articleFail(this.id);
      if (result.data.code == 20000) {
        this.$message({
          message: "审核未通过!",
          type: "success",
        });
        this.remoteFunction();
      } else {
        this.$message({
          message: "审核失败!",
          type: "error",
        });
      }
    },
  },
  components: {
    mavonEditor,
  },
};
</script>


<style scoped>
.avatar {
  width: 178px;
  height: 178px;
}
</style>