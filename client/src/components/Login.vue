<template>
  <div class="login">
    <form v-on:submit.prevent="login">
      <label for="name-input">Name :</label>
      <input id="name-input" type="text" v-model="name">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'login',
    computed: {
      ...mapGetters(['socket', 'connected'])
    },
    data() {
      return {
        name: ''
      }
    },
    created() {
      if(this.connected) {
        this.redirectToHome()
      }
    },
    methods: {
      ...mapActions({
        loginStore: 'login'
      }),

      login() {
        this.loginStore({name: this.name})
        this.redirectToHome()
      },

      redirectToHome() {
        this.$router.push('/chatrooms')
      }
    }
  }
</script>
