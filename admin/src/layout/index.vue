<template>
  <div class="layout">
    <el-container>
      <app-aside></app-aside>
      <app-main></app-main>
    </el-container>
  </div>
</template>

<script>
import AppAside from "./AppAside"
import AppMain from "./AppMain"
export default {
  name: "",
  data() {
    return {
        
    };
  },
  components: {
    AppAside,
    AppMain
  },
};
</script>


<style scoped>
.layout {
  height: 100%;
}
.el-container {
  min-height: 100%;
}
</style>