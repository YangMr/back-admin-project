<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="500px"
  >
    <el-form :model="formData" ref="formData" label-width="120px" :rules="rules" style="width: 400px">
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="formData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称:" prop="nickName">
        <el-input v-model="formData.nickName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="mobile">
        <el-input v-model="formData.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input v-model="formData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="账号过期:" prop="isAccountNonExpired">
        <el-radio-group v-model="formData.isAccountNonExpired">
          <el-radio :label="1" border>未过期</el-radio>
          <el-radio :label="0" border>已过期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码过期:" prop="isCredentialsNonExpired">
        <el-radio-group v-model="formData.isCredentialsNonExpired">
          <el-radio :label="1" border>未过期</el-radio>
          <el-radio :label="0" border>已过期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账号锁定:" prop="isAccountNonLocked">
        <el-radio-group v-model="formData.isAccountNonLocked">
          <el-radio :label="1" border>未锁定</el-radio>
          <el-radio :label="0" border>已锁定</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item align="left">
        <el-button type="primary" @click="submitData">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {addUserData,updateUserData} from "../../api/user"
export default {
  name: "",
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
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" },
        ],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        isAccountNonExpired: [{ required: true, message: "请选择", trigger: "change" }],
        isCredentialsNonExpired: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        isAccountNonLocked: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },
  components: {},
  methods: {
    //关闭弹窗之前要触发的方法  
    handleClose() {
      this.$refs["formData"].resetFields();  
      this.remoteFunction();

    },
    //点击确定按钮触发的方法
    submitData(){
        if(this.formData.id){
            this.updateData()
        }else{
            this.addData()
        }
    },
    //新增数据方法
    addData(){
        this.$refs["formData"].validate(async valid=>{
            if(valid){
                this.formData.password = this.formData.username;
                const result = await addUserData(this.formData);
                if(result.data.code == 20000){
                    this.handleClose();
                    this.$message({
                        type : "success",
                        message : "新增成功"
                    })
                }else{
                    this.$message.error("新增失败");
                }
            }
        })
       
    },

    //修改数据方法
    updateData(){
        this.$refs["formData"].validate(async valid=>{
            if(valid){
                this.formData.password = this.formData.username;
                const result = await updateUserData(this.formData);
                if(result.data.code == 20000){
                    this.handleClose();
                    this.$message({
                        type : "success",
                        message : "修改成功"
                    })
                }else{
                    this.$message.error("修改失败");
                }
            }
        })
    }
  },
};
</script>

<style scoped></style>
