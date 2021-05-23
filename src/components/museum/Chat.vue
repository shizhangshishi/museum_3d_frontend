<template>
  <v-card id="chat">
    <v-card-title>
      <v-col class="col-10">
        chat
      </v-col>
      <v-col class="col-2">
        <v-btn @click="close">关闭</v-btn>
      </v-col>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "chat",
  props:["showChat"],
  methods:{
    close(){
      this.$emit("update:showChat", false);
    }
  }
}
</script>

<style scoped>
#chat{
  width: 60%;
  height: 60%;
  position: absolute;
  z-index: 100;
  left: 20%;
  top: 20%;
  background: rgba(256, 256, 256, 0.9);
}
</style>
