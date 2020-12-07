<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form
      :model="formData"
      :rules="rules"
      ref="formData"
      label-width="100px"
      style="width: 400px"
    >
      <el-form-item label="类型:" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
          <el-radio :label="3" v-if="id == 'show' || id !== null"
            >按钮</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称:" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限标识:" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="请求地址:" prop="url" v-if="formData.type !== 3">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item label="图标:" prop="icon" v-if="formData.type !== 3">
        <el-input v-model="formData.icon"></el-input>
      </el-form-item>
      <el-form-item label="排序:" prop="sort">
        <el-input-number
          v-model="formData.sort"
          :min="1"
          :max="9999"
          style="width: 100%"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitData">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addMenuData, findMenuData, updateMenuData } from "../../api/menu";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    id: null,
    remoteFunction: Function,
  },
  name: "",
  data() {
    return {
      formData: {
        parentId: 0,
        type: "",
        name: "",
        code: "",
        url: "",
        icon: "",
        sort: "",
        remark: "",
      },
      rules: {
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入权限标识", trigger: "blur" }],
      },
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs["formData"].resetFields();
          this.formData = {
            parentId: 0,
            type: "",
            name: "",
            code: "",
            url: "",
            icon: "",
            sort: "",
            remark: "",
          };
        });
        console.log(this.id);
        if (this.id !== null && this.id !== "show") {
          this.findData();
        }
      }
    },
  },
  components: {},
  methods: {
    //关闭弹窗之前会触发的方法
    handleClose() {
      this.remoteFunction();
    },
    //取消按钮方法
    cancel() {
      this.remoteFunction();
    },
    //点击确定按钮,提交数据的方法
    submitData() {
      if (this.id) {
        this.updateData();
      } else {
        this.addData();
      }
    },

    //新增数据
    addData() {
      console.log(this.formData);
      this.$refs["formData"].validate(async (valid) => {
        const result = await addMenuData(this.formData);
        if (result.data.code == 20000) {
          this.remoteFunction();
          this.$message({
            type: "success",
            message: "新增成功",
          });
        } else {
          this.$message.error("新增数据失败");
        }
      });
    },

    //修改数据
    updateData() {
      this.$refs["formData"].validate(async (valid) => {
        const result = await updateMenuData(this.formData);
        if (result.data.code == 20000) {
          this.remoteFunction();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        } else {
          this.$message.error("修改数据失败");
        }
      });
    },

    //查询单条数据
    async findData() {
      const result = await findMenuData(this.id);
      console.log(result.data);
      if (result.data.code == 20000) {
        this.formData = result.data.data;
      } else {
        this.$message.error("查询数据失败");
      }
    },
  },
};
</script>


<style scoped>
</style>