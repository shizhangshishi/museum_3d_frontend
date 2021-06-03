<template>
  <v-container>
    <v-container v-if="show">
      <v-card id="chat">
        <v-card-title>
          <v-col class="col-10">
            聊天栏
          </v-col>
          <v-col class="col-2">
            <v-btn style="right: 20%" @click="show = false">关闭</v-btn>
          </v-col>
        </v-card-title>
        <v-card-text id="messages">
          <div v-for="(message, idx) in messageBox.messages" v-bind:key="idx">
            {{ message.username }}:{{ message.text }}
          </div>
        </v-card-text>
        <v-card-actions style="bottom: 5%">
          <v-text-field v-model="messageBox.newMessage"></v-text-field>
          <v-btn @click="sendMessage">发送</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container v-else>
      <v-btn id="showChat" @click="show = true">显示聊天</v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "chat",
  props: ["ws", "messageBox"],
  data(){
    return {
      show: true
    }
  },
  methods:{
    sendMessage()
    {
      this.ws.sendChatMessageToAll(this.messageBox.newMessage);
    }
  }
}
</script>

<style scoped>
#chat{
  width: 30%;
  height: 40%;
  position: absolute;
  z-index: 100;
  left: 5%;
  bottom: 5%;
  background: rgba(256, 256, 256, 0.6);
}

#showChat{
  left: 5%;
  bottom: 5%;
  position: absolute;
}

button{
  background-color: #FFFFFF66;
  z-index: 10;
}

#messages{
  width: 100%;
  height: 50%;
  overflow: scroll;
  scrollbar-color: grey;
  scrollbar-width: thin;
}
</style>
