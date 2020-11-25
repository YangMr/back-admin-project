<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="500px"
  >
    <el-form
      :model="formData"
      style="width: 400px"
      label-position="right"
      label-width="100px"
      :rules="rules"
      ref="formData"
      status-icon
    >
      <el-form-item label="分类名称:" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="状态:" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1" >正常</el-radio>
          <el-radio :label="0" >禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序:" prop="sort">
        <el-input-number
          v-model="formData.sort"
          :min="1"
          :max="9999"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注" v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="submit">确 定</el-button>
        <el-button size="mini">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {addCategoryData,updateCategoryData} from "../../api/category"
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
    formData: {
      type: Object,
      default: {},
    },
    remoteFunction: Function,
  },
  name: "",
  data() {
    return {
        rules : {
            name : [
                {required: true, message: "分类名称不能为空",trigger: "blur"}
            ],
            status : [
                {required: true, message: "状态不能为空",trigger: "change"}
            ],
            sort : [
                {required: true, message: "排序不能为空",trigger: "change"}
            ]
        }
    };
  },
  methods: {
      //关闭弹窗方法
    handleClose() {
      this.$refs["formData"].resetFields();  
      this.remoteFunction();
    },

    //提交数据
    submit(){
        if(this.formData.id){
            this.updateCategory()
        }else{
            this.addCategory();
        }
    },

    //新增数据方法
    addCategory(){
        this.$refs["formData"].validate(async valid=>{
            if(valid){
                const result = await addCategoryData(this.formData);
                if(result.data.code == 20000){
                    this.remoteFunction();
                    this.$message({
                        type: "success",
                        message: "新增成功"
                    })
                }else{
                    this.$message({
                        type: "success",
                        message: "新增失败"
                    })
                }
            }
        })
    },

    //修改数据方法
    updateCategory(){
        this.$refs["formData"].validate(async valid=>{
            if(valid){
                const result = await updateCategoryData(this.formData);
                if(result.data.code == 20000){
                    this.remoteFunction();
                    this.$message({
                        type: "success",
                        message: "新增成功"
                    })
                }else{
                    this.$message({
                        type: "success",
                        message: "修改失败"
                    })
                }
            }
        })
    }
  },
  components: {},
};
</script>


<style scoped>
</style>