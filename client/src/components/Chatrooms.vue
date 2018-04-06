<template>
  <div class="chatrooms">

    <div class="left-panel">
      <div class="chatrooms-list">
        <chatroom-item v-for="chatroom of chatrooms" :key="chatroom.name" :chatroom="chatroom"></chatroom-item>
      </div>
      <div class="form">
        <form v-on:submit.prevent="addChatroom">
          <input placeholder="New chatroom name" type="text" v-model="newChatroom.name">
          <button type="submit">Create</button>
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
