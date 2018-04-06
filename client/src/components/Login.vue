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
  import {mapGetters} from 'vuex'

  export default {
    name: 'login',
    computed: {
      ...mapGetters(['socket'])
    },
    data() {
      return {
        name: ''
      }
    },
    methods: {
      login() {
        this.io.emit('login', this.name)
      }
    }
  }
</script>
