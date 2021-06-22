<template>
  <v-card id="npc">
    <v-card-title>
      <v-col class="col-10">
        工作人员
      </v-col>
      <v-col class="col-2">
        <v-btn @click="close">关闭</v-btn>
      </v-col>
    </v-card-title>
    <v-card-text>
      <v-card>
        <v-card-title>
          知识问答
        </v-card-title>
        <v-card-text id="content">
          <v-row>
            欢迎来到核泄漏博物馆，如果已经学习到了核泄漏相关的知识，可以来试试答题哦。
          </v-row>
          <v-row>
            <v-btn text @click="question(1)" color="primary" width="100%">核科学知识展区</v-btn>
          </v-row>
          <v-row>
            <v-btn text @click="question(2)" color="primary" width="100%">切尔诺贝利展区</v-btn>
          </v-row>
          <v-row>
            <v-btn text @click="question(3)" color="primary" width="100%">福岛核泄漏展区</v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "npc",
  props:["showNpc"],
  methods:{
    close(){
      this.$emit("update:showNpc", false);
    },
    question(type){
      window.open("/question/"+type);
    }
  }
}
</script>

<style scoped>
#npc{
  width: 60%;
  height: 60%;
  position: absolute;
  z-index: 100;
  left: 20%;
  top: 20%;
  background: rgba(256, 256, 256, 0.9);
}

#content{
  padding: 5%;
}
</style>
