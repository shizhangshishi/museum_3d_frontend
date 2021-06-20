<template>
  <v-card id="exhibition" :style="`
      background-image: url(${exhibition.path});
      background-blend-mode: ${(showImage) ? 'normal' : 'lighten'};
    `">
    <v-card-title>
      <v-col class="col-8">
        <span v-if="!showImage">{{ exhibition.name }}</span>
      </v-col>
      <v-col class="col-2">
        <v-btn @click="showImage = true" v-if="!showImage">显示图片</v-btn>
        <v-btn @click="showImage = false" v-else>显示文字</v-btn>
      </v-col>
      <v-col class="col-2">
        <v-btn @click="close">关闭</v-btn>
      </v-col>
      </v-card-title>
    <v-card-text>
      <span v-if="!showImage">{{ exhibition.description }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Exhibition",
  props: ["exhibition", "showExhibition"],
  data(){
    return {
      showImage: false
    }
  },
  methods:{
    close(){
      this.$emit("update:showExhibition", false);
    }
  }
}
</script>
<style scoped>
#exhibition{
  width: 60%;
  height: 60%;
  position: absolute;
  z-index: 100;
  left: 20%;
  top: 20%;
  padding: 1em;
  background: rgba(256, 256, 256, 0.9);
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
  background-blend-mode: lighten;
}
</style>
