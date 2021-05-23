<template>
  <v-card id="exhibition">
    <v-card-title>
      <v-col class="col-10">
        {{exhibition.name}}
      </v-col>
      <v-col class="col-2">
        <v-btn @click="close">关闭</v-btn>
      </v-col>
      </v-card-title>
    <v-card-text> {{exhibition.description}}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Exhibition",
  props: ["exhibition", "showExhibition"],
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
  background: rgba(256, 256, 256, 0.9);
}
</style>
