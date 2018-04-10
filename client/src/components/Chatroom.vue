<template>
  <div class="chatroom">
    <div class="header">
      <h2>{{ chatroom.name }}</h2>
    </div>
    <div class="bottom-part">
      <div class="messages">
        <div class="message" v-for="(message, index) in chatroom.messages"
             v-bind:class="[ isCreator(message) ? 'is-creator' : 'is-not-creator' ]">
          <div v-if="displaySender(index)" class="sender">
            {{ message.sender.name }}
          </div>
          <div class="content-wrapper">
            <div class="content">
              {{ message.content }}
            </div>
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
      },
      isCreator(message) {
        return this.user.name === message.sender.name
      },
      displaySender(index) {
        return index === 0 ||
          this.chatroom.messages[index - 1].sender.name !== this.chatroom.messages[index].sender.name
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
        padding: 0 20px;

        .message {
          margin-top: 15px;

          &.is-creator {
            text-align: right;

            .content {
              background-color: #3498DB;
            }
          }

          &.is-not-creator {
            .content {
              background-color: #336E7B;
            }
          }

          .sender {
            color: #aaa;
            font-size: 13px;
          }
          .content-wrapper {
            margin-top: 5px;

            .content {
              display: inline-block;
              max-width: 70%;
              padding: 5px 10px;
              border-radius: 17px;
              text-align: left;
            }
          }
        }
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
