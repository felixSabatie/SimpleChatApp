<template>
  <div class="chatroom-item">
    {{ chatroom.name }}
  </div>
</template>

<script>
  export default {
    name: 'chatroom-item',
    props: ['chatroom']
  }
</script>
