<template>
  <div class="chatroom-item">
    <router-link :to="'/chatrooms/' + chatroom.id">{{ chatroom.name }}</router-link>
  </div>
</template>

<script>
  export default {
    name: 'chatroom-item',
    props: ['chatroom']
  }
</script>
