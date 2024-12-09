<template>
  <div class="evaluation-container">
    <!--    introduction-->
    <h1 class="intro-title">{{ $t("title.introduction") }}</h1>
    <div class="intro block">
      <div class="text">{{ $t("evaluation.introInfo") }}</div>
      <div class="logo">
        <img src="@/assets/logoME.png" alt="logo">
      </div>
    </div>

    <!--    properties-->
    <h1 class="prop-title">{{ $t("title.properties") }}</h1>
    <div class="block prop-text">
      {{ $t("evaluation.propertiesInfo") }}
    </div>
    <el-row :gutter="40" class="props">
      <el-col :span="5" v-for="card in getCards" :key="card.route">
        <el-card shadow="always" @click.native="$router.push(card.route)">
          <div class="prop-icon">
            <svg-icon :icon-class="card.iconClass" class="icon" />
          </div>
          <div class="prop-label">
            {{ card.label }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <LeaderBoard :select-mode="true" class="block"/>
    <h1 class="paper-title">{{ $t("title.paper") }}</h1>
    <el-row>
      <el-col :span="24" v-for="paper in getPapers" :key="paper.name"> 
        <el-card shadow="hover" class="paper-card">
          <div class="paper-container">
            <div class="paper-images">
              <img :src="paper.img" alt="pipline">
            </div>
            <div class="paper-desc">
              <p class="paper-name">{{ paper.name }}</p>
              <div class="paper-git" >
                <svg-icon icon-class="GitHub" class="git-icon"/>
                <el-link :href="paper.gitUrl" target="_blank">{{paper.git}}</el-link>
              </div>
              <div class="paper-intro" >
                {{ paper.intro }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>

</template>

<script>
import LeaderBoard from "../components/Evaluation/LeaderBoard";

export default {
  name: "Evaluation",
  components: {LeaderBoard},

  computed: {
      getCards(){
        return [
            { route: '/home/detail/correctness', iconClass: 'correctness', label: this.$t("commonUpper.correctness") },
            { route: '/home/detail/robustness', iconClass: 'robustness', label: this.$t("commonUpper.robustness") },
            { route: '/home/detail/fairness', iconClass: 'fairness', label: this.$t("commonUpper.fairness") },
            { route: '/home/detail/transferability', iconClass: 'transferability', label: this.$t("commonUpper.transferability") },
            { route: '/home/detail/more', iconClass: 'more', label: this.$t("commonUpper.more") }
          ]
      },

      getPapers(){
        return [
            { name: 'How Correct Is Your Vision Model? A Comprehensive Survey', 
              img: require('@/assets/correctness.jpg'), 
              gitUrl: 'https://github.com/jiaconghu/Correctness-Evaluation', 
              git:'jiaconghu/Correctness-Evaluation',
              intro: this.$t("propertiesDesc.correctnessIntro") },
            { name: 'Robustness Evaluation for Deep Vision Models: A Comprehensive Survey', 
              img: require('@/assets/robustness.png'), 
              gitUrl: 'https://github.com/zju-vipa/Robustness-Evaluation-Review', 
              git:'zju-vipa/Robustness-Evaluation-Review',
              intro: this.$t("propertiesDesc.robustnessIntro")},
            { name: 'A Comprehensive Survey of Fairness Evaluation in Computer Vision Tasks', 
              img: require('@/assets/fairness.png'), 
              gitUrl: 'https://github.com/zju-vipa/Fairness-Evaluation-Review', 
              git:'zju-vipa/Fairness-Evaluation-Review',
              intro: this.$t("propertiesDesc.fairnessIntro")},
            { name: 'A Comprehensive Survey and Benchmarking on Deep Model Transferability Evaluation', 
              img: require('@/assets/transferability.png'), 
              gitUrl: 'https://github.com/secret-hammer/Awesome-Model-Transferability-Evaluation', 
              git:'secret-hammer/Awesome-Model-Transferability-Evaluation',
              intro: this.$t("propertiesDesc.transferabilityIntro")},
          ]
      }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/variables";

.evaluation-container {
  width: 74%;
  margin: 50px auto 0 auto;
  box-sizing: border-box;

  .block {
    margin-bottom: 20px;
    font-size: 22px;
  }

  .intro-title{
    margin-bottom: 20px;
    font-size: 30px;
  }

  .intro {
    display: flex;
    width: 100%;
    @media (max-width: 680px) {
      .text {
        width: 100%;
        font-size: 20px;
        line-height:28px;
      }
      .logo {
        display: none;
      }
    }
    @media (min-width: 680px){
      .text {
        width: 80%;
        font-size: 20px;
        line-height: 28px;
      }
      .logo {
        height: auto;
        max-height: 150px;
        width: 20%;
        img {
          height: 140%;
          margin-left: 50px;
          background-size: cover;
        }
      }
    }
  }  

  @media screen and (min-width: 769px){
    .el-col-5 {
      max-width: 20%;
      width: 20%;
      flex: 0 0 20%;
    }
  }
  @media screen and (min-width: 569px) and (max-width: 768px) {
    .el-col-5 {
      max-width: 50%;
      width: 50%;
      flex: 0 0 50%;
    }
  }
  @media only screen and (max-width: 568px){
    .el-col-5 {
      max-width: 100%;
      width: 100%;
      flex: 0 0 100%;
    }
  }

  .prop-title{
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 30px;
  }

  .paper-title{
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 30px;
  }

  .prop-text {
    font-size: 20px;
    line-height: 24px;
  }

  .props{
    margin-bottom: 40px;
    .el-card:hover {
      cursor: pointer;
      box-shadow: 0 0 18px 2px rgba(0,0,0,0.2);
      transition: all 0.2s ease-in-out;
    }

    .el-card{
      padding: 20px;
      .prop-icon{
        width: 100%;
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        .icon {
          height: 80px;
          width: 80px;
        }
      }

      .prop-label{
        width: 100%;
        margin-top: 30px;
        text-align: center;
        font-weight: bolder;
        font-size: 26px;
      }
    }
  }

  .paper-card{
    margin-bottom: 20px;
    .paper-container{
      padding: 20px;
      display: flex;
      
      .paper-images{
        width: 25%;
        max-height: 160px;
        margin-right: 80px;
        img{
          width: 100%;
          max-height: 160px;
        }
      }

      .paper-desc{
        width: 70%;
        
        .paper-name{
          font-size: 25px;
          font-weight: bold;
          margin-top: 0;
          margin-bottom: 10px;
        }

        .paper-git{
          margin-bottom: 10px;
          .git-icon{
            margin-right: 10px;
          }
        }

        .paper-intro{
          font-size: 18px;
          line-height: 25px;
          color: #606266;
        }
      }

    }
  }



}
</style>
