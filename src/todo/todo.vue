<template>
  <section class="real-app">
    <input type="text" class="input" autofocus="autofocus" placeholder="TODO" @keyup.enter="addTodo">
    <!-- @del监听子组件$emit的'del'事件' -->
    <item :todo="todo" v-for="todo in todos" :key="todo.id" @del="deleteTodo"></item>
    <!-- 给子组件传数据 -->
    <tabs :filter="filter" :todos="todos"></tabs>
  </section>
</template>

<script>
import Item from "@/todo/item.vue";
import Tabs from "@/todo/tabs.vue";

let id = 0;
export default {
  data() {
    return {
      todos: [],
      filter: "all"
    };
  },
  methods: {
    addTodo(e) {
      if (e.target.value.trim() !== '') {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        });
      }
      // 每次增加todo之后清空内容
      e.target.value = "";
    },
    // 父组件监听子组件'del'事件所触发的方法,使用chrome的vue插件看效果
    deleteTodo (id) {
      // 找到该id就是todo里面的id就删掉
      this.todos.splice(
        this.todos.findIndex(
          todo => todo.id === id), 1)
    }
  },
  components: {
    Item,
    Tabs
  }
};
</script>

<style lang="less" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
