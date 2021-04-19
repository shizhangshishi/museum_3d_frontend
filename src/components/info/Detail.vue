<template>
<v-app class="detail">
  <v-container>
    <h1>个人信息</h1>
    <v-switch v-model="isEditting" label="编辑"></v-switch>
    <v-form
      v-if="isEditting"
      ref="detailForm">
      <v-container>
        <v-row>
          <v-col>
            用户名
          </v-col>
          <v-col>
            {{ userDetail.username }}
          </v-col>
        </v-row>
        <v-row class="grey lighten-4">
          <v-col>
            昵称
          </v-col>
          <v-col>
            <v-text-field v-model="detailForm.nickname"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            注册日期
          </v-col>
          <v-col>
            {{ userDetail.createDate }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            手机号
          </v-col>
          <v-col>
            {{ userDetail.phone }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              color="info"
              @click="updateDetail()">
              更新信息
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container v-else>
      <v-row>
        <v-col>
          用户名
        </v-col>
        <v-col>
          {{ userDetail.username }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          昵称
        </v-col>
        <v-col>
          {{ userDetail.nickname }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          注册日期
        </v-col>
        <v-col>
          {{ userDetail.createDate }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          手机号
        </v-col>
        <v-col>
          {{ userDetail.phone }}
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</v-app>
</template>

<script>
import Code from '@/constants/code/resCode';

export default {
  name: "Detail",
  props: ['parent'],
  data () {
    return {
      app:this.$root.$children[0],
      userDetail: {
        username: "",
        nickname: "",
        createDate: "",
        phone: ""
      },
      detailForm: {
        nickname: ""
      },
      isEditting: false
    }
  },
  methods: {
    getDetail () {
      console.log(this.$store.state.token)
      this.$axios.get("/user/detail")
        .catch(() => {})
        .then(res => {
          if (res)
          {
            if (res.data.responseCode === Code.SUCCESS)
            {
              this.userDetail = {
                username: res.data.responseBody.user.username,
                nickname: res.data.responseBody.user.nickname,
                createDate: res.data.responseBody.user.createDate,
                phone: res.data.responseBody.user.phone
              };
              this.detailForm = {
                nickname: res.data.responseBody.user.nickname
              }
            }
            else
            {
              this.app.notify(res.data.responseMessage, "error");
            }

            return;
          }

          this.app.notify("服务器错误，请重试", "error");
        });
    },
    updateDetail () {
      this.$axios.put("/user/detail", this.detailForm)
        .catch(() => {})
        .then(res => {
          if (res)
          {
            if (res.data.responseCode === Code.SUCCESS)
            {
              this.app.notify(res.data.responseMessage, "success");
              
              setTimeout(() => {
                this.$router.go();
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
  },
  mounted () {
    this.getDetail();
  }
}
</script>

<style scoped>

</style>