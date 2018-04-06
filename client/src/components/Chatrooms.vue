<template>
  <div class="chatrooms">
    <h2>Chatrooms works</h2>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'chatrooms',
    computed: {
      ...mapGetters(['connected'])
    },
    created() {
      if(!this.connected) {
        this.$router.push('/login')
      }
    }
  }
</script>
