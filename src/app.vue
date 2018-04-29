<template>
    <div id="text">
        {{text}}
    </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      text: "TEST"
    }
  }
}
</script>

<style scoped>
#text {
  color: brown;
}
</style>