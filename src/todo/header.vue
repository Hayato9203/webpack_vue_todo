<template>
  <div class="header">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: 'TODO'
      }
    },
  }
</script>

<style lang="less" scoped>
.header {
  text-align: center;
  h1 {
    font-size: 100px;
    color: cornsilk;
    font-weight: 100px;
    margin: 20px
  }
}
</style>