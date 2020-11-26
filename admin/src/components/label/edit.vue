<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="400px"
  >
    <el-form
      :model="formData"
      ref="formData"
      :rules="rules"
      label-width="85px"
      label-position="right"
      style="width: 300px"
    >
      <el-form-item label="标签名称:" prop="name">
        <el-input v-model="formData.name" ></el-input>
      </el-form-item>
      <el-form-item label="分类名称:" prop="categoryId">
        <el-select v-model="formData.categoryId" >
          <el-option
            v-for="(item, index) in categoryNameList"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitData">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-form-item>
    </el-form>
   
  </el-dialog>
</template>

<script>
import {addLabelData,updateLabelData} from "../../api/label"
export default {
  props: {
    formData: {
        type : Object,
        default : {}
    },  
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    categoryNameList: {
      type: Array,
      default: [],
    },
    remoteFunction: Function,
  },
  name: "",
  data() {
    return {
      rules: {
        name: [{ required: true, message: "标签名不能为空", trigger: "blur" }],
        categoryId: [
          { required: true, message: "分类名不能为空", trigger: "change" },
        ],
      }
    };
  },

  methods: {
    //关闭弹窗方法  
    handleClose() {
      this.remoteFunction();
    },

    //点击取消按钮方法
    cancel(){
        this.remoteFunction();
        this.$refs["formData"].resetFields();
    },

    //提交数据方法
    submitData(){
        if(this.formData.id){
            this.updateLabel();
        }else{
            this.addLabel();
        }
        
    },

    //新增数据方法
    addLabel(){
        this.$refs["formData"].validate(async valid=>{
            if(valid){
                const result = await addLabelData(this.formData);
                console.log(result)
                if(result.data.code == 20000){
                    this.remoteFunction();
                    this.$refs["formData"].resetFields();
                    this.$message({
                        message : "新增成功!",
                        type : "success"
                    })
                }else{
                    this.$message({
                        message : "新增失败!",
                        type : "error"
                    })
                }
            }   
        })
    },

    //修改数据方法
    updateLabel(){
        this.$refs["formData"].validate(async valid=>{
            if(valid){
                const result = await updateLabelData(this.formData);
                console.log(result)
                if(result.data.code == 20000){
                    this.remoteFunction();
                    this.$refs["formData"].resetFields();
                    this.$message({
                        message : "修改成功!",
                        type : "success"
                    })
                }else{
                    this.$message({
                        message : "修改失败!",
                        type : "error"
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