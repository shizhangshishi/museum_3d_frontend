<template>
  <v-card id="setting">
    <v-card-title>
      <v-col class="col-10">
       设置
      </v-col>
      <v-col class="col-2">
        <v-btn @click="close">关闭</v-btn>
      </v-col>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "Setting",
  props:["showSetting"],
  methods:{
    close(){
      this.$emit("update:showSetting", false);
    }
  }
}
</script>

<style scoped>
#setting{
  width: 60%;
  height: 60%;
  position: absolute;
  z-index: 100;
  left: 20%;
  top: 20%;
  background: rgba(256, 256, 256, 0.9);
}
</style>
