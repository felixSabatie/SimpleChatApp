<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style lang="scss">
  .main {
    nav {
      padding: 10px 10px;
      font-size: 20px;
      font-weight: bold;
      color: #eee;
      box-shadow: 0 2px 8px #181818;
      background-color: #162228;
    }

  }
</style>
