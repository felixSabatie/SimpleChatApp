<template>
  <div class="chatroom-item" v-on:click="navigate">
    <div class="chatroom-name">{{ chatroom.name }}</div>
    <div v-if="lastMessage" class="last-message">{{ lastMessage.sender.name }} : {{ cutMessage }}</div>
  </div>
</template>

<script>
  export default {
    name: 'chatroom-item',
    props: ['chatroom'],
    computed: {
      lastMessage() {
        return this.getLastMessage()
      },
      cutMessage() {
        let messageContent = this.getLastMessage().content
        return this.cutString(messageContent, 20)
      }
    },
    methods: {
      navigate() {
        this.$router.push('/chatrooms/' + this.chatroom.id)
      },
      getLastMessage() {
        return this.chatroom.messages.slice(-1)[0]
      },
      cutString(message, size) {
        return message.length > size ? message.substring(0, size) + '...' : message
      }
  }
  }
</script>

<style lang="scss">
  .chatroom-item {
    padding: 15px 10px;
    border-bottom: 1px solid #364248;
    cursor: pointer;

    .chatroom-name {

    }

    .last-message {
      padding-left: 10px;
      color: #aaa;
      font-size: 13px;
    }
  }
</style>
