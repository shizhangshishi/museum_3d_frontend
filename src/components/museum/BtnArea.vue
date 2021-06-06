<template>
<v-container id="btnArea">
  <v-row>
    <v-col class="col-4">
      <v-btn text @click="home" class="btn">
        <v-icon color="white">mdi-home</v-icon>
        <div class="d-none d-md-flex">主页</div>
      </v-btn>
    </v-col>
    <v-col class="col-4">
      <v-btn text @click="setting" class="btn">
        <v-icon color="white">mdi-brightness-7</v-icon>
        <div class="d-none d-md-flex">设置</div>
      </v-btn>
    </v-col>
    <v-col class="col-4">
      <v-btn text @click="map" class="btn">
        <v-icon color="white">mdi-map</v-icon>
        <div class="d-none d-md-flex">地图</div>
      </v-btn>
    </v-col>
    <v-col>

    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: "BtnArea",
  props: ["showSetting","showMap"],
  methods:{
    home(){
      this.$router.replace("/");
    },
    setting(){
      this.$emit("update:showSetting", true);
    },
    map(){
      this.$emit("update:showMap", true);
    }
  }
}
</script>

<style scoped>
#btnArea{
  width: 200px;
  position: absolute;
  z-index: 10;
}
.btn{
  color: white;
}
</style>
