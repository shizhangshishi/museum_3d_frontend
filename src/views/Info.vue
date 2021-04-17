<template>
<v-app class="info0">
  <TopBar></TopBar>
  <v-main>
    <v-tabs vertical>
      <v-tab>
        <v-icon> mdi-account-details </v-icon>
        个人信息
      </v-tab>
      <v-tab>
        <v-icon> mdi-clipboard-list </v-icon>
        学习记录
      </v-tab>
      <v-tab>
        <v-icon> mdi-medal </v-icon>
        成就一览
      </v-tab>

      <v-tab-item>
        <Detail></Detail>
      </v-tab-item>
      <v-tab-item>
        <Record></Record>
      </v-tab-item>
      <v-tab-item>
        <Achievement></Achievement>
      </v-tab-item>
    </v-tabs>
  </v-main>
  <Footer></Footer>
</v-app>
</template>

<script>
import TopBar from "@/components/common/TopBar";
import Footer from "@/components/common/Footer";
import Detail from "@/components/info/Detail";
import Record from "@/components/info/Record";
import Achievement from "@/components/info/Achievement";

export default {
  name: "Info",
  components: {
    Footer,
    TopBar,
    Detail,
    Record,
    Achievement
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>