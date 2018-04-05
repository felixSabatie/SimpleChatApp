<template>
  <div class="chatroom">
    <h2>Room</h2>
    <div class="messages">
      <div class="message" v-for="message of messages">
        {{ message }}
      </div>
    </div>

    <form class="message-form" v-on:submit.prevent="sendMessage">
      <label for="message-input"></label>
      <input id="message-input" type="text" v-model="currentMessage">
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'chatroom',
    props: ['roomId'],
    computed: {
      ...mapGetters(['socket'])
    },
    data() {
      return {
        messages: [],
        currentMessage: ''
      }
    },
    created() {
      this.socket.emit('roomConnect', this.roomId)
      this.socket.on('newMessage', message => {
        this.messages.push(message)
      })
    },
    methods: {
      sendMessage() {
        this.socket.emit('messageSent', this.currentMessage)
        this.currentMessage = ''
      }
    }
  }
</script>
