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
          {{ message.username }}:
          <span v-for="(block, idx) in processText(message.text)" v-bind:key="idx">
            <v-img v-if="block.type == 'img'"
                  max-height="1em"
                  max-width="1em"
                  style="display: inline-block"
                  :src="emoji2src(block.content)">
            </v-img>
            <span v-else-if="block.type == 'text'"> {{ block.content }}</span>
          </span>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-text-field 
          @focus="globalConfig.blockKey = true" 
          @blur="globalConfig.blockKey = false" 
          v-model="messageBox.newMessage"></v-text-field>
        <v-btn @click="showEmoji = true">插入表情</v-btn>
        <v-btn @click="sendMessage">发送</v-btn>
      </v-card-actions>
    </v-card>
    <v-btn v-else id="showChat" @click="show = true">显示聊天</v-btn>

    <v-card id="emoji" v-if="show && showEmoji">
      <v-card-title>
        <v-col class="col-10">
          表情一览
        </v-col>
        <v-col class="col-2">
          <v-btn fab light small @click="showEmoji = false">
            <v-icon light>
              mdi-close
            </v-icon>
          </v-btn>
        </v-col>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(name, idx) in emojis"
            v-bind:key="idx"
            class="d-flex child-flex"
            cols="2"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  class="emojiBtn"
                  max-height="2em"
                  max-width="2em"
                  :src="emoji2src(name)"
                  v-bind="attrs"
                  v-on="on"
                  @click="addEmoji(name)"
                ></v-img>
              </template>
              <span>{{ name }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "chat",
  props: ["globalConfig", "messageBox"],
  data(){
    return {
      show: false,
      showEmoji: false,
      emojis: [
        "anger", "burn", "confused", "cool", "cry", "fire", "grimace", "love", "miao", "prettiness", 
        "question", "shout", "slobber", "smile", "spook", "startle", "surprise", "sweat", "thirst", "vomit"
      ]
    }
  },
  methods:{
    sendMessage()
    {
      this.globalConfig.ws.sendChatMessageToAll(this.messageBox.newMessage);
      this.messageBox.newMessage = "";
    },
    emoji2src(name)
    {
      return `/emoji/5146/${name}.PNG`;
    },
    emoji2str(name)
    {
      return `[emoji:${name}]`;
    },
    addEmoji(name)
    {
      this.messageBox.newMessage += this.emoji2str(name);
    },
    processText(text)
    {
      let results = text.split(/(\[emoji:[a-z]*\])/);
      let blocks = [];
      for (let idx in results)
      {
        let result = results[idx];
        if (/\[emoji:[a-z]*\]/.test(result))
        {
          let content = result.replace("[emoji:", "").replace("]", "");
          blocks.push({
            type: "img",
            content: content
          });
        }
        else
        {
          blocks.push({
            type: "text",
            content: result
          });
        }
      }

      return blocks;
    }
  }
}
</script>

<style scoped>
#chatContainer{
  width: 40%;
  height: 70%;
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

#emoji{
  position: fixed;
  top: 20%;
  left: 25%;
  width: 50%;
  height: 40%;
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
  height: 60%;
  overflow: scroll;
  scrollbar-color: grey;
  scrollbar-width: thin;
}

.emojiBtn:hover
{
  background-color: #FFFFFF66;
  cursor: pointer;
}
</style>
