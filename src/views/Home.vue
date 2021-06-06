<template>
  <v-app class="home">
    <TopBar></TopBar>
    <v-container>
      <v-container class="section main">
        <v-img src="../assets/index/2.jpg" width="100%" class="main-img"
               gradient="to top right, rgba(100,100,100,.5), rgba(25,25,25,.7)"></v-img>
        <v-container class="main-text">
          <div class="main-text-title">{{main_text.title}}</div>
          <div class="main-text-description">{{main_text.description}}</div>
          <div class="main-text-visit" @click="visit">
            <v-btn outlined large color="white">
              <v-icon>mdi-cryengine</v-icon>进入博物馆
            </v-btn>
          </div>
          <div class="main-text-next" @click="next">
            <v-btn class="ma-2" outlined fab color="white">
              <v-icon>mdi-debug-step-into</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-container>
      <v-container class="section">
        <v-row>
          <v-col class="title">
            展区
          </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="6"
              sm="4"
          >
            <v-img
                src="/museum/room/0/image/8.png"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            ></v-img>
            <div>核科学知识展区</div>
          </v-col>
          <v-col
              cols="6"
              sm="4"
          >
            <v-img
                src="/museum/room/1/image/1.png"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            ></v-img>
            <div>切尔贝诺利展区</div>
          </v-col>
          <v-col
              cols="6"
              sm="4"
          >
            <v-img
                src="/museum/room/2/image/2.png"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            ></v-img>
            <div>福岛核泄漏展区</div>
          </v-col>
        </v-row>
      </v-container>
<!--      <v-container class="section">-->
<!--        <v-row>-->
<!--          <v-col class="title">-->
<!--            展品-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--        <v-row>-->
<!--          <v-col-->
<!--              cols="6"-->
<!--              sm="4"-->
<!--          >-->
<!--            <v-img-->
<!--                src="../assets/index/2.jpg"-->
<!--                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"-->
<!--            ></v-img>-->
<!--            <div>切尔贝诺利展区</div>-->
<!--          </v-col>-->
<!--          <v-col-->
<!--              cols="6"-->
<!--              sm="4"-->
<!--          >-->
<!--            <v-img-->
<!--                src="../assets/index/2.jpg"-->
<!--                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"-->
<!--            ></v-img>-->
<!--            <div>切尔贝诺利展区</div>-->
<!--          </v-col>-->
<!--          <v-col-->
<!--              cols="6"-->
<!--              sm="4"-->
<!--          >-->
<!--            <v-img-->
<!--                src="../assets/index/2.jpg"-->
<!--                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"-->
<!--            ></v-img>-->
<!--            <div>切尔贝诺利展区</div>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-container>-->
    </v-container>
    <Footer></Footer>
  </v-app>
</template>

<script>


import TopBar from "@/components/common/TopBar";
import Footer from "@/components/common/Footer";
export default {
  name: 'Home',
  components: {
    Footer,
    TopBar
  },
  data(){
    return{
      main_text:{
        title: '核泄漏博物馆',
        description: '核泄漏博物馆坐落于我国美丽的旅游城市--四川乐山。与举世瞩目的乐山大佛隔江相望。中国核泄漏博物馆落户于成都理工大学工程技术学院内，原核工业585所基地。这是我国第一个核泄漏博物馆，也是我国第一个也是唯一一个对公众开放的核泄漏博物馆。'
      }
    }
  },
  methods:{
    visit(){
      this.$router.replace({path:'/museum'});
    },
    next(){
      window.scrollTo(0, 800);
    }
  }
}
</script>
<style>
.home {
  background: #262932 !important;
}
.section {
  width: 1200px;
  color: white;
  margin-bottom: 20px;
}
.main {
  text-align: center;
  position: relative;
}
.main-img {

}
.main-text {
  position: absolute;
  top: 200px;
  left: 200px;
  height: 400px;
  width: 800px;
}
.main-text-title {
  font-size: 55px;
}
.main-text-description {
  text-align: left;
  font-size: 18px;
  margin: 30px 0;
}
.main-text-visit {
  margin: 20px 0;
}
.main-text-next{
  margin: 30px 0;
}
.section {

}
</style>
