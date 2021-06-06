<template>
  <v-container id="chatContainer">
    <v-card id="chat" v-if="show">
      <v-card-title>
        <v-col class="col-10">
          聊天栏
        </v-col>
        <v-col class="col-2">
          <v-btn fab light small @click="show = false">
            <v-icon light>
              mdi-close
            </v-icon>
          </v-btn>
        </v-col>
      </v-card-title>
      <v-card-text id="messages">
        <v-container v-for="(message, idx) in messageBox.messages" v-bind:key="idx">
          {{ message.username }}:{{ message.text }}
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-text-field 
          @focus="globalConfig.blockKey = true" 
          @blur="globalConfig.blockKey = false" 
          v-model="messageBox.newMessage"></v-text-field>
        <v-btn @click="sendMessage">发送</v-btn>
      </v-card-actions>
    </v-card>
    <v-btn v-else id="showChat" @click="show = true">显示聊天</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "chat",
  props: ["globalConfig", "messageBox"],
  data(){
    return {
      show: false
    }
  },
  methods:{
    sendMessage()
    {
      this.globalConfig.ws.sendChatMessageToAll(this.messageBox.newMessage);
      this.messageBox.newMessage = "";
    }
  }
}
</script>

<style scoped>
#chatContainer{
  width: 30%;
  height: 50%;
  /*background: black;*/
  z-index: 100;
  position: absolute;
  left: 2%;
  bottom: 2%;
}
#chat{
  height: 100%;
  background: rgba(256, 256, 256, 0.6);
}

#showChat{
  left: 2%;
  bottom: 2%;
  position: absolute;
}

button{
  background-color: #FFFFFF66;
  /*z-index: 10;*/
}

#messages{
  height: 50%;
  overflow: scroll;
  scrollbar-color: grey;
  scrollbar-width: thin;
}
</style>
