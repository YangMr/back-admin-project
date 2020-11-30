<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="600px"
  >
    <el-form
      :model="formData"
      label-width="100px"
      status-icon
      ref="formData"
      :rules="rules"
      style="width: 500px"
    >
      <el-form-item label="广告图片:" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          action=""
          accept="image/*"
          :show-file-list="false"
          :http-request="advertUpload"
        >
          <img
            v-if="formData.imageUrl"
            :src="formData.imageUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="广告标题:" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="广告链接:" prop="advertUrl">
        <el-input v-model="formData.advertUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="跳转方式:" prop="advertTarget">
        <el-select v-model="formData.advertTarget" placeholder="请选择">
          <el-option label="新窗口" value="_blank"></el-option>
          <el-option label="当前窗口" value="_self"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告位置:" prop="position">
        <el-input-number
          v-model="formData.position"
          :min="1"
          :max="9999"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="排序:" prop="sort">
        <el-input-number
          v-model="formData.sort"
          :min="1"
          :max="9999"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitData"
          >确 定</el-button
        >
        <el-button size="mini">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  uploadAdvertData,
  deleteAdvertImg,
  addAdverData,
  findAdverData,
  updateAdvertData
} from "../../api/advert";
export default {
  props: {
    id: null,
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    remoteFunction: Function,
  },
  name: "",
  data() {
    return {
      formData: {
        imageUrl: "",
      },
      rules: {
        imageUrl: [
          { required: true, message: "请上传广告图片", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入广告标题", trigger: "blur" }],
        advertUrl: [
          { required: true, message: "请输入广告链接", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        position: [
          { required: true, message: "请输入广告位置", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
    };
  },
  watch: {
    visible(val) {
      if (val) {
          if(this.id){
              this.findAdvert();
          }
        
      }
    },
  },
  methods: {
    //关闭弹窗之前触发的方法
    handleClose() {
      this.remoteFunction();
    },

    //图片上传方法
    async advertUpload(file) {
      //实例化new FormData 对象
      const data = new FormData();
      //将上传的文件信息保存到 new FormData
      data.append("file", file.file);
      //调用图片上传接口
      const result = await uploadAdvertData(data);
      if (result.data.code == 20000) {
        this.formData.imageUrl = result.data.data;
      } else {
        this.$message({
          type: "error",
          message: "图片上传失败",
        });
      }
    },

    //点击确定按钮执行的方法
    submitData() {
        if(this.id){
            this.updateAdver()
        }else{
            this.addData();
        }
      
    },

    //新增数据方法
    addData() {
      this.$refs["formData"].validate(async (valid) => {
        if (valid) {
          const result = await addAdverData(this.formData);
          if (result.data.code == 20000) {
            this.remoteFunction();
            this.$message({
              type: "success",
              message: "新增成功",
            });
            this.$refs["formData"].resetFields();
          } else {
            this.$message({
              type: "error",
              message: "新增失败",
            });
          }
        }
      });
    },

    //查询广告详情
    async findAdvert() {
      const result = await findAdverData(this.id);
      if (result.data.code == 20000) {
        this.formData = result.data.data;
        console.log(this.formData)
      } else {
        this.$message({
          type: "error",
          message: "获取失败",
        });
      }
    },

    //修改方法
    async updateAdver(){
        this.$refs["formData"].validate(async (valid) => {
        if (valid) {
          const result = await updateAdvertData(this.formData);
          if (result.data.code == 20000) {
            this.remoteFunction();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "修改失败",
            });
          }
        }
      });
        
    }
  },
  components: {},
};
</script>


<style scoped>
.avatar-uploader .el-upload {
  /* border: 1px dashed #d9d9d9;
    border-radius: 6px; */
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>