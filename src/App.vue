<template>
  <div class="app">
    <div>
      <Header></Header>
    </div>
    <div class="router">
    <router-view/>
   </div>
    <div >
      <Footer></Footer>
    </div>
</div>
</template>

<script setup>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: auto;
  font-family: 'SUIT', sans-serif;
  min-height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
Footer{
  position : relative;
  transform : translateY(-100%);
}
.router{
  min-height: 675px;
  overflow-x:hidden;
  align-content: center;
}
</style>
