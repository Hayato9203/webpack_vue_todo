<template>
  <div class="helper">
    <span class="left">{{unCompletedNum}} items left</span>
    <span class="tabs">
      <span v-for="state in states" :key="state" :class="[state, filter === state ? 'actived' : '']" @click="toggleFilter(state)">{{state}}</span>
    </span>
    <span class="clear" @click="clearAllCompleted">Clear Complated</span>
  </div>
</template>

<script>
  export default {
    props: {
      filter: {
        type: String, required: true
      },
      todos: {
        type: Array, required: true
      }
    },
    data() {
      return {
        states: ['all', 'active', 'completed']
      }
    },
    methods: {
      clearAllCompleted () {
        this.$emit('clear')
      },
      // 点击all, active, completed时显示不同的内容
      toggleFilter (state) {
        this.$emit('toggle', state)
      }
    },
    // 计算属性
    computed: {
      // 获得未完成的todo长度
      unCompletedNum () {
        return this.todos.filter(todo => !todo.completed).length
      }
    }
  }
</script>

<style lang="stylus" scoped>
.helper {
  font-weight 100
  display flex
  justify-content space-between
  padding 5px 0
  line-height 30px
  background-color #ffffff
  font-size 14px
  font-smoothing: antialiased;
}
.left, .clear, .tabs {
  padding 0 10px
  box-sizing border-box
}
.left, .clear {
  width 150px
}
.left {
  text-align left
}
.clear {
  text-align: right
  cursor pointer
}
.tabs {
  width 200px
  display flex
  justify-content space-around
  * {
      display inline-block
      padding 0 10px
      cursor pointer
      border 1px solid rgba(175, 47, 47, 0)
      &.actived {
        border-color rgba(175, 47, 47, 0.4)
        border-radius 5px
      }
  }
}
</style>