<template>
  <div id="app">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      text: 'TEST'
    }
  },
}
</script>

<style>
#app {
  color: brown;
}
</style>
