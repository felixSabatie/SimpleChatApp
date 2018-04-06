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

    </div>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import ChatroomItem from './ChatroomItem'

  export default {
    name: 'chatrooms',
    components: { ChatroomItem },
    data() {
      return {
        currentChatroom: {},
        newChatroom: {
          name: '',
          messages: []
        }
      }
    },
    computed: {
      ...mapGetters(['socket', 'connected', 'chatrooms'])
    },
    mounted() {
      if(!this.connected) {
        this.$router.push('/login')
      }
      this.getChatroomsFromServerStore()
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
      }
    }
  }
</script>
