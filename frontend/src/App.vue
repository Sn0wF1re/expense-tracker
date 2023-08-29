<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
    <footer>&copy Sn0wF1re. All rights reserved {{ date }}</footer>
  </div>
</template>

<script>
import { ref } from 'vue';
  export default {
    setup() {
      const date = ref(null);

      date.value = new Date().getFullYear();

      return { date };
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background: #000;
}

nav a {
  font-weight: bold;
  color: #cbd2da;
}

nav a.router-link-exact-active {
  color: #42b983;
}

footer {
  background-color: black;
  color: white;
  bottom: 0;
  padding: 1.5rem;
}
</style>
