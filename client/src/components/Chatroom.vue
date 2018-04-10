<template>
  <div class="chatroom">
    <div class="header">
      <h2>{{ chatroom.name }}</h2>
    </div>
    <div class="bottom-part">
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
      <div class="message-form">
        <form v-on:submit.prevent="sendMessage">
          <input placeholder="Write a message..." class="f-input" id="message-input" type="text" v-model="currentMessage.content">
          <button class="f-button" type="submit">Send</button>
        </form>
      </div>
    </div>
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

<style lang="scss">
  .chatroom {
    .header {
      box-sizing: border-box;
      padding: 10px 20px;
      height: 50px;
      box-shadow: 0 2px 8px #181818;

      h2 {
        margin: 0;
      }
    }

    .bottom-part {
      height: calc(100vh - 50px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .messages {
        overflow: auto;
      }

      .message-form form {
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        align-items: center;

        .f-button {
          flex-basis: 60px;
        }

        .f-input {
          flex: 1;
        }
      }
    }
  }
</style>
