<template>
<v-app class="achievement">
  <v-container>
    <h1>成就一览</h1>
    <v-container v-for="(item,i) in achievements" :key="item.name">
      <h2>{{achievements[i].name}}</h2>
      <h3>——{{achievements[i].note}}</h3>
      <img :class='[achievements[i].requireNum <= rightNum?"":"locked"]' :src=achievements[i].imgUrl>
    </v-container>
  </v-container>
</v-app>
</template>

<script>
export default {
  name: "Achievement",
  props: ['parent'],
  data () {
    return {
      app:this.$root.$children[0],
      achievements:[
        {
          name:"初出茅庐",
          note:"正确答题数达到10",
          requireNum:10,
          imgUrl:require("../../assets/achievement/1.png"),
        },
        {
          name:"牛刀小试",
          note:"正确答题数达到20",
          requireNum:20,
          imgUrl:require("../../assets/achievement/2.png"),
        },
        {
          name:"声名远扬",
          note:"正确答题数达到20",
          requireNum:30,
          imgUrl:require("../../assets/achievement/3.png"),
        }
      ],
      rightNum:0
    }
  },
  methods: {
    getInfo(){
      this.$axios.get("/getProblemHistory")
              .catch(() => {})
              .then(res => {
                if (res)
                {
                  if (res.data.responseCode === 200)
                  {
                    if(res.data.responseBody){
                      let problemHistory = res.data.responseBody;
                      for(let i = 0; i < problemHistory.length; i++){
                        if(problemHistory[i]["accurate"] == true)this.rightNum++;
                      }
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
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
  img {
    width: 50%;
    height: 50%;
  }
  .locked{
    -webkit-filter: grayscale(1); /* Webkit */
    filter: gray(); /* IE6-9 */
    filter: grayscale(1); /* W3C */
  }
</style>
