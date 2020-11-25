<template>
  <el-main>
    <AppHeader></AppHeader> 
    <div class="app-main">
      <router-view></router-view>
    </div>
  </el-main>
</template>

<script>
import AppHeader from "./AppHeader"
export default {
  name: "",
  data() {
    return {};
  },
  created() {
    
  },
  components: {
    AppHeader
  },
};
</script>


<style scoped>
.el-main{
  padding:0;
  background-color: #fff;
  margin-left: 210px;
}
.app-main{
  padding-top:62px;
}
</style>