<template>
  <div class="main">
    <nav>
      <div class="brand">Chat app</div>
    </nav>

    <div class="content">
      <router-view></router-view>
    </div>
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

    .content {
      padding: 20px;
    }
  }
</style>
