<template>
  <div class="chatroom">
    <h2>{{ chatroom.name }}</h2>
    <div class="messages">
      <div class="message" v-for="message of chatroom.messages">
        <div class="sender">
          {{ message.sender.name }}
        </div>
        <div class="content">
          {{ message.content }}
        </div>
      </div>
    </div>

    <form class="message-form" v-on:submit.prevent="sendMessage">
      <label for="message-input"></label>
      <input id="message-input" type="text" v-model="currentMessage.content">
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'chatroom',
    props: ['chatroom'],
    computed: {
      ...mapGetters(['socket', 'user']),
      currentMessage() {
        return {
          content: '',
          sender: this.user,
          chatroomId: this.chatroom.id
        }
      }
    },
    data() {
      return {
        messages: [],
      }
    },
    methods: {
      sendMessage() {
        this.socket.emit('messageSent', this.currentMessage)
        this.currentMessage.content = ''
      }
    }
  }
</script>
