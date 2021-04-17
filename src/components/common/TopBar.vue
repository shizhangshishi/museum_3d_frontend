<template>
  <v-container>
    <v-app-bar app clipped-left flat color="black">
      <v-app-bar-nav-icon class="d-lg-none"/>
      <v-img src="../../assets/logo.svg" alt="Logo" max-height="50px" max-width="50px" @click="openIndex"></v-img>
      <v-btn text @click="openIndex" class="navBtn">
        <div class="d-none d-md-flex">核泄漏博物馆</div>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text v-if="!hasLogin" @click="login" class="navBtn">
        <v-icon color="white">mdi-login</v-icon>
        <div class="d-none d-md-flex">登录</div>
      </v-btn>
      <v-btn text v-if="!hasLogin" @click="register" class="navBtn">
        <v-icon color="white">mdi-account-arrow-right-outline</v-icon>
        <div class="d-none d-md-flex">注册</div>
      </v-btn>
      <v-btn text v-if="hasLogin" @click="logout" class="navBtn">
        <v-icon color="white">mdi-logout</v-icon>
        <div class="d-none d-md-flex">登出</div>
      </v-btn>
      <v-btn text v-if="hasLogin" @click="openInfo" class="navBtn">
        <v-icon color="white">mdi-user</v-icon>
        <div class="d-none d-md-flex">个人中心</div>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: "TopNav",
  data(){
    return{
      app: this.$root.$children[0],
      messages: {
        HAS_LOGIN: 'You have already logged in!',
        LOGOUT_S: 'Log out successfully!',
        NOT_LOGIN: 'You have not logged in!'
      }
    }
  },
  computed:{
    hasLogin(){
      return this.$store.state.token;
    }
  },
  methods:{
    openIndex(){
      this.$router.replace({path:'/'});
    },
    openInfo(){
      this.$router.replace({path:'/info'});
    },
    login(){
      if (this.hasLogin)
        this.app.notify(this.messages.HAS_LOGIN, 'warning');
      else
        this.$router.replace({path:'/login'});
    },
    register(){
      if (this.hasLogin)
        this.app.notify(this.messages.HAS_LOGIN, 'warning');
      else
        this.$router.replace({path:'/register'});
    },
    logout(){
      if (this.hasLogin){
        this.$store.commit('logout');
        this.app.notify(this.messages.LOGOUT_S, 'success');
        this.$router.replace({path:'/login'});
      }
      else{
        this.app.notify(this.messages.NOT_LOGIN, 'warning');
      }
    }
  }
}
</script>

<style scoped>
.navBtn div{
  color:white
}

</style>
