<template>
  <el-dialog :title="title" :visible.sync="visible" width="500px" :before-close="handleClose">
    <el-form :model="formData" :rules="rules" ref="formData" label-width="80px" style="width:400px">
      <el-form-item label="角色名称" prop="name" >
        <el-input v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="submitData">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script>
import {addRoleData,updateRoleData} from "../../api/role"
export default {
  name: "",
  props : {
      title : {
          type: String,
          default: ""
      },
      visible : {
          type: Boolean,
          default: false
      },
      formData : {
          type: Object,
          default : {}
      },
      remoteFunction: Function,
  },
  data() {
    return {
        rules : {
            name : [
                {required: true, message : "请输入要查询的名称", trigger:"blur"}
            ]
        }
    };
  },
  components: {},
  methods: {
      //确定按钮方法
      submitData(){
          if(this.formData.id){
              this.updateData()
          }else{
              this.addData()
          }
          
      },

      //关闭弹窗之前触发
      handleClose(){
          this.$refs["formData"].resetFields();
          this.remoteFunction();
      },

      //新增数据方法
      async addData(){
          const result = await addRoleData(this.formData);
          if(result.data.code == 20000){
              this.handleClose()
              this.$message({
                  type : "success",
                  message : "新增成功"
              });
              
          }else{
              this.$message.error("新增权限数据失败");
          }
      },

      //执行编辑确定按钮的方法
      async updateData(){
          const result = await updateRoleData(this.formData);
          console.log(result);
          if(result.data.code == 20000){
              this.handleClose()
              this.$message({
                  type : "success",
                  message : "修改成功"
              });
          }else{
              this.$message.error("修改权限数据失败");
          }
      }
  }
};
</script>


<style scoped>
</style>