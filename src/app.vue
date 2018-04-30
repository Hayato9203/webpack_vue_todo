<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
  </div>
</template>

<script>
import Header from '@/todo/header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style scoped>
#app {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0;
  bottom: 0
}

#cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #555;
  opacity: 0.5;
  z-index: -1;
}
</style>