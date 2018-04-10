<template>
  <div class="chatrooms">

    <div class="left-panel">
      <div class="chatrooms-list">
        <chatroom-item v-for="chatroom of chatrooms" :key="chatroom.name" :chatroom="chatroom"></chatroom-item>
      </div>
      <div class="form">
        <form v-on:submit.prevent="addChatroom">
          <input class="f-input" placeholder="New chatroom name" type="text" v-model="newChatroom.name">
          <button class="f-button" type="submit">Create</button>
        </form>
      </div>
    </div>

    <div class="right-panel">
      <Chatroom v-if="currentChatroom" :chatroom="currentChatroom"></Chatroom>
      <div v-else class="no-chatroom">Select a chatroom on the left panel</div>
    </div>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import ChatroomItem from './ChatroomItem'
  import Chatroom from './Chatroom'

  export default {
    name: 'chatrooms',

    components: { ChatroomItem, Chatroom },

    data() {
      return {
        currentChatroom: null,
        newChatroom: {
          name: '',
          messages: [],
          id: undefined
        }
      }
    },

    computed: {
      ...mapGetters(['socket', 'connected', 'chatrooms'])
    },

    created() {
      if(!this.connected) {
        this.$router.push('/login')
      }
      this.getChatroomsFromServerStore()

      this.setCurrentChatroom()
    },

    watch: {
      '$route' (to, from) {
        this.setCurrentChatroom()
      }
    },

    methods: {
      ...mapActions({
        getChatroomsFromServerStore: 'getChatroomsFromServer',
        emitChatroomStore: 'emitChatroom',
        addChatroomStore: 'addChatroom'
      }),
      addChatroom() {
        this.emitChatroomStore(this.newChatroom)
        this.newChatroom.name = ''
      },
      setCurrentChatroom() {
        let chatroomId = parseInt(this.$route.params.id)
        if(chatroomId != null) {
          this.currentChatroom = this.chatrooms.find(chatroom => chatroom.id === chatroomId)
        }
      }
    }
  }
</script>

<style lang="scss">
  .main {
    height: 100vh;

    .chatrooms {
      display: flex;
      height: 100%;

      .left-panel {
        flex-basis: 280px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 2px 8px #181818;

        .chatrooms-list {
          overflow: auto;
        }

        .form form {
          padding: 0 10px;
          display: flex;
          align-items: center;

          .f-button {
            flex-basis: 60px;
          }

          .f-input {
            flex: 1;
          }
        }
      }

      .right-panel {
        flex: 1;
        height: 100%;
      }
    }
  }

</style>
