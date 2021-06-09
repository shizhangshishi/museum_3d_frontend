<template>
  <v-card id="map">
    <v-card-title>
      <v-col class="col-10">
        地图
      </v-col>
      <v-col class="col-2">
        <v-btn @click="close">关闭</v-btn>
      </v-col>
    </v-card-title>
    <v-card-text>
      <h2>操作提示</h2>
      <p>按WASD或上下左右键进行移动</p>
      <p>滚动鼠标滚轮进行视角缩放</p>
      <p>按住鼠标中键并移动鼠标进行视角旋转</p>
      <hr/>
      <h2>展区位置一览</h2>
      <v-row>
        <v-col class="col-4">核废水展区</v-col>
        <v-col class="col-4">切尔诺贝利事件展区</v-col>
        <v-col class="col-4">福岛事件展区</v-col>
      </v-row>
      <v-row>
        <v-col class="col-4"></v-col>
        <v-col class="col-4">大厅</v-col>
        <v-col class="col-4"></v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Map",
  props:["showMap"],
  methods:{
    close(){
      this.$emit("update:showMap", false);
    }
  }
}
</script>

<style scoped>
#map{
  width: 60%;
  height: 60%;
  position: absolute;
  z-index: 100;
  left: 20%;
  top: 20%;
  background: rgba(256, 256, 256, 0.9);
}

h2{
  margin-bottom: 1em;
}
</style>
