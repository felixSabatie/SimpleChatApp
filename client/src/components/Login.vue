<template>
  <div class="login">
    <form v-on:submit.prevent="login">
      <h2>Login</h2>
      <input class="f-input" id="name-input" type="text" placeholder="Enter your username..." v-model="name">
      <button class="f-button" type="submit">Login</button>
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

<style lang="scss">
  .login {
    width: 300px;
    padding: 30px 50px;
    background-color: #162228;
    border-radius: 2px;
    box-shadow: 2px 4px 6px #181818;
    margin: auto;
    text-align: center;

    .f-input {
      width: 100%;
      display: block;
    }

    .f-button {
      margin-top: 15px;
    }
  }
</style>
