<template>
  <div>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div class="title"><h1>ToDo App Vue js</h1></div>
    <Todo />
  </div>
  </div>
</template>

<script>
import Todo from "./components/Todo/Todo.vue";

export default {
  name: "app",
  components: {
    Todo
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  font-family: Karla, sans-serif;
  font-size: 16px;
  margin: 0;
}

::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background-clip: padding-box;
  background-color: #b4c7d0;
  border: 3px solid transparent;
  border-radius: 5px;
}

::-webkit-scrollbar-track-piece {
  background: 0 0;
}

#app {
  max-width: 500px;
  margin: 50px auto;
  padding: 0 10px;
}

img {
  display: block;
  width: 80px;
  height: 80px;
  margin: 0 auto 15px auto;
}

.title h1 {
  font-size: 25px;
  color: #41b883;
  text-align: center;
}
</style>
