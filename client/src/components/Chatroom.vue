<template>
  <div class="chatroom">
    <h2>Room</h2>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'chatroom',
    props: ['roomId'],
    computed: {
      ...mapGetters(['io'])
    },
    data() {
      return {
        messages: [],
      }
    },
    created() {
      this.io.emit('roomConnect', this.roomId)
    }
  }
</script>
