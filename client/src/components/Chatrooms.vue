<template>
  <div class="chatrooms">
    <h2>Chatrooms works</h2>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'chatrooms',
    computed: {
      ...mapGetters(['connected', 'chatrooms'])
    },
    created() {
      if(!this.connected) {
        this.$router.push('/login')
      }
      this.getChatroomsFromServer()
    },
    methods: {
      ...mapActions(['getChatroomsFromServer'])
    }
  }
</script>
