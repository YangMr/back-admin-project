<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    v-loading="loading"
    :before-close="handleClose"
  >
    <el-form ref="formData" label-width="80px">
      <el-tree
        :data="roleData"
        show-checkbox
        node-key="id" 
        ref="tree"
        :default-expanded-keys="[1, 3]"
        :default-checked-keys="rids"
        :props="defaultProps"
      >
      </el-tree>

      <el-form-item align="left">
        <el-button size="mini" type="primary" @click="submitForm"
          >确 定</el-button
        >
        <el-button size="mini" @click="handleClose">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {getMenuList} from "../../api/menu"
import {getMenuRole,setMenuRole} from "../../api/role"
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
    id : null,
    remoteFunction: Function,
  },
  data() {
    return {
        rids : [],
        loading : false,
        roleData : [
           
        ],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
    };
  },
  watch: {
      visible(val) {
          this.getRoleMenu()
      }
  },
  components: {},
  methods: {
    handleClose() {
      this.remoteFunction();
    },
    //获取菜单数据
    async getRoleMenu(){
        this.loading = true;
        const result = await getMenuList();
        if(result.data.code == 20000){
            this.loading = false;
            this.roleData = result.data.data;
            this.getHasRole();
        }else{
            this.$message.error("获取菜单数据失败")
        }
    },
    //获取已有权限的数据
    async getHasRole(){
        const result = await getMenuRole(this.id);
        console.log(result);
        if(result.data.code == 20000){
            this.rids = result.data.data;
        }else{
            this.$message.error("获取已有权限数据失败")
        }
    },
    async submitForm() {
        const checkData = this.$refs.tree.getCheckedNodes();
        const result = await setMenuRole(this.id,checkData);
        if(result.data.code == 20000){
            this.handleClose();
            this.$message({
                type: "success",
                message: "新增权限成功"
            })
        }else{
            this.$message.error("分配权限失败");
        }
    },
  },
};
</script>


<style scoped>
</style>