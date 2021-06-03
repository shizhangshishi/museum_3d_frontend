<template>
  <v-card id="npc">
    <v-card-title>
      <v-col class="col-10">
        NPC
      </v-col>
      <v-col class="col-2">
        <v-btn @click="close">关闭</v-btn>
      </v-col>
    </v-card-title>
    <v-card-text>
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
</style>
