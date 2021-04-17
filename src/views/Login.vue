<template>
<v-app class="login">
  <TopBar></TopBar>
  <v-main>
    <v-container>
      <v-form
        ref="loginForm"
        v-model="loginFormValid">
        <v-container>
          <v-row>
            <v-col>
              <h1>登录</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="loginForm.username"
                label="用户名"
                :rules="[v => !!v || '用户名不能为空']"
                required>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="loginForm.password"
                label="密码"
                :rules="[v => !!v || '密码不能为空']"
                required
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                :disabled="!loginFormValid"
                color="success"
                @click="login()">
                登录
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
  </v-main>
  <Footer></Footer>
</v-app>
</template>

<script>
import TopBar from "@/components/common/TopBar";
import Footer from "@/components/common/Footer";

export default {
  name: "Login",
  components: {
    Footer,
    TopBar
  },
  data () {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginFormValid: false,
      showPassword: false
    }
  },
  methods: {
    login () {
      this.$store.commit("login", "12223");
      this.$router.replace({path: "/"});
    }
  }
}
</script>

<style scoped>

</style>
