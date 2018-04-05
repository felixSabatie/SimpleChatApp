<template>
  <div class="main">
    <h1>Chat app</h1>

    <Chatroom room-id="1"></Chatroom>
  </div>
</template>

<script>
  import Chatroom from './components/Chatroom'

  export default {
    name: 'App',
    components: {
      Chatroom
    }
  }
</script>
