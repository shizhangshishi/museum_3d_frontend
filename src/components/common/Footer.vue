<template>
  <v-footer
      dark
      padless
      class="footer"
  >
    <v-card
        flat
        tile
        class="#262932 lighten-1 white--text text-center"
    >
      <v-card-text>
        <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0 text-left">
        {{description}}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>核泄漏博物馆</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
    description:'用户通过注册登录后，可以参观博物馆，进入不同展区，学习核泄漏相关知识。在参观过程中，用户可以向博物馆工作人员（npc）进行交互，如进行答题，通过答题获得积分，积分累计一定程度可以兑换奖励，获得成就。同时，用户可以和其他用户进行交流互动，如聊天，竞技答题等。在参观完毕后，用户可以在个人中心查看个人信息，以及获得的成就和奖励等记录。'
  }),
}
</script>

<style scoped>
  .footer {
    margin-top: 100px;
  }
</style>
