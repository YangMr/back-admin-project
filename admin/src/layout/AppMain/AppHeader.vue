<template>
  <div class="main-header">我是主体页面头部的内容</div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
};
</script>


<style scoped>
.main-header{
  width : 100%;
  height: 60px;
  line-height: 60px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px #777;
  position: fixed;
  top:0;
  left: 210px;
  background-color: #fff;
  z-index : 99;
}
</style>