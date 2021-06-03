<template>
<v-container>
  <TopNav></TopNav>
  <v-container>
    <v-container>
      <v-card v-for="(item, index) in questions" :key="index">
        <v-card-title>
          {{index+1}}:{{item.question}}
        </v-card-title>
        <v-card-text>
          <v-form class="ma-5 mb-n5">
            <v-radio-group v-model="answers[index]">
              <v-radio :label="'a.'+item.a" value="a"></v-radio>
              <v-radio :label="'b.'+item.b" value="b"></v-radio>
              <v-radio :label="'c.'+item.c" value="c"></v-radio>
              <v-radio :label="'d.'+item.d" value="d"></v-radio>
            </v-radio-group>
          </v-form>


        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-container>
    <v-container>
      <v-container style="text-align:center">
        <v-btn @click="back" color="primary" style="margin: 0 100px">返回</v-btn>
        <v-btn @click="submit" color="primary">提交</v-btn>
      </v-container>
    </v-container>
    <v-overlay v-if="showResults">
      <v-card width="800" style="text-align: center">
        <v-card-title style="text-align: center">
          <v-row>
            <v-col> 答题结果</v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>题号</v-col>
            <v-col>你的答案</v-col>
            <v-col>是否正确</v-col>
          </v-row>
          <v-row v-for="(result, index) in results" :key = "index">
            <v-col>{{index + 1}}</v-col>
            <v-col>{{answers[index]}}</v-col>
            <v-col>{{result?"正确" : "错误"}}</v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="showResults = false" color="primary">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-container>
  <Footer></Footer>
</v-container>
</template>

<script>
import {getQuestions, getResults} from "@/js/request/question";
import TopNav from "@/components/common/TopBar";
import Footer from "@/components/common/Footer";

export default {
  name: "Question",
  components: {Footer, TopNav},
  data(){
    return{
      type: this.$route.params.type,
      app:this.$root.$children[0],
      questions: [],
      answers: [],
      questionIds: [],
      results: [],
      question: 0,

      showResults: false
    }
  },
  methods:{
    getQuestions(){
      let params = {type: this.type};
      getQuestions(this.$axios, params, (questions) => {
        this.questions = questions;
        this.initAnswerSheet();
      });
    },
    initAnswerSheet(){
      let length = this.questions.length;
      for (let i = 0; i < length; i++){
        this.answers.push("");
      }
      for (let i = 0; i < length; i++){
        this.questionIds.push(this.questions[i].id);
      }
    },
    submit(){
      if (this.isCompleted()){
        let problemIds = JSON.stringify(this.questionIds).replace(/"/g, '\'');
        let answers = JSON.stringify(this.answers).replace(/"/g, '\'');
        let params = {
          problemIds: problemIds,
          answers: answers
        }
        getResults(this.$axios, params, (results) => {
          this.app.notify("提交成功：请查看结果", "success");
          this.results = results;
          this.showResults = true;
        })
      }
      else {
        this.app.notify("提交失败：题目未答完！", "warning");
      }
    },
    isCompleted(){
      for (let answer of this.answers){
        if (answer === "")
          return false;
      }
      return true;
    },
    back(){
      this.$router.replace("/museum");
    }
  },
  mounted() {
    this.getQuestions();
  }
}
</script>

<style scoped>

</style>
