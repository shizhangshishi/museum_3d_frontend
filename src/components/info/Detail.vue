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
            {{ userDetail.date }}
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
        <v-row class="grey lighten-4">
          <v-col>
            邮箱
          </v-col>
          <v-col>
            <v-text-field v-model="detailForm.email"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="grey lighten-4">
          <v-col>
            个性签名
          </v-col>
          <v-col>
            <v-text-field v-model="detailForm.signature"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              color="info"
              @click="update()">
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
          {{ userDetail.date }}
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
          邮箱
        </v-col>
        <v-col>
          {{ userDetail.email }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          个性签名
        </v-col>
        <v-col>
          {{ userDetail.signature }}
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</v-app>
</template>

<script>
export default {
  name: "Detail",
  props: ['parent'],
  data () {
    return {
      userDetail: {
        username: "newton0431",
        nickname: "牛顿",
        date: "2021-04-11",
        phone: "13138929019",
        email: "newton0431@outlook.com",
        signature: "愿明天更美好"
      },
      detailForm: {
        username: "newton0431",
        nickname: "牛顿",
        date: "2021-04-11",
        phone: "13138929019",
        email: "newton0431@outlook.com",
        signature: "愿明天更美好"
      },
      isEditting: false
    }
  },
  methods: {
    update () {

    }
  }
}
</script>

<style scoped>

</style>