<template>
<v-app class="register">
  <TopBar></TopBar>
  <v-main>
    <v-container>
      <v-form
        ref="registerForm"
        v-model="registerFormValid">
        <v-container>
          <v-row>
            <v-col>
              <h1>注册</h1>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="registerForm.phone"
                label="手机号码"
                :rules="[v => (!!v && v.length === 11) || '手机号长度不正确，应为11位']"
                required>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="registerForm.username"
                label="用户名"
                :rules="[v => (!!v&& v.length >= 6 && v.length <= 20) || '用户名长度不正确，应在6-20个字符之间']"
                required>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="registerForm.password"
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
              <v-text-field
                label="重复密码"
                :rules="[v => (v === registerForm.password) || '与密码不一致']"
                required
                :append-icon="showRepPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showRepPassword ? 'text' : 'password'"
                @click:append="showRepPassword = !showRepPassword">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                :disabled="!registerFormValid"
                color="success"
                @click="register()">
                注册
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
  name: "Register",
  components: {
    Footer,
    TopBar
  },
  data () {
    return {
      app:this.$root.$children[0],
      registerForm: {
        username: "",
        password: "",
        phone: ""
      },
      registerFormValid: false,
      showPassword: false,
      showRepPassword: false
    }
  },
  methods: {
    register () {
      this.$axios.post("/user/register", this.registerForm)
        .catch(() => {})
        .then(res => {
          if (res)
          {
            if (res.data.responseCode === 2000)
            {
              this.app.notify(res.data.responseMessage, "success");

              setTimeout(() => {
                this.$router.replace("/login");
              }, 1500);
            }
            else
            {
              this.app.notify(res.data.responseMessage, "error");
            }

            return;
          }

          this.app.notify("服务器错误，请重试", "error");
        });
    }
  }
}
</script>

<style scoped>

</style>
