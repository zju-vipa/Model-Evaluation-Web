<template>
    <div v-if="this.aspect === 'more'">
      <div class="more-container">
        {{$t("detail.stayTuned")}}
      </div>
    </div>
    <div v-else>
      <div class="banner-container" :class="addBGColor(aspect)">
        <div class="banner-title">
          {{ title }}
        </div>
        <div class="banner-desc" v-if="aspect==='correctness'">
          {{ $t("propertiesDesc.correctnessDesc") }}
        </div>
        <div class="banner-desc" v-else-if="aspect==='robustness'">
          {{ $t("propertiesDesc.robustnessDesc") }}
        </div>
        <div class="banner-desc" v-else-if="aspect==='fairness'">
          {{ $t("propertiesDesc.fairnessDesc") }}
        </div>
        <div class="banner-desc" v-else-if="aspect==='transferability'">
          {{ $t("propertiesDesc.transferabilityDesc") }}
        </div>
      </div>
      <div class="detail-container">
        <div class="pipline-title">
          <div class="pipline-desc">
            <h1>{{ $t("title.pipeline") }}</h1>
            <div class="block"> 
            </div>
          </div>
          <div @click="$router.push('/evaluation/creator/'+aspect)" class="title-button">{{ $t("operate.goEvaluate") }}</div>
        </div>
        <div class="pipeline-container">
          <img src="@/assets/correctness.jpg" alt="pipeline" v-if="aspect==='correctness'">
          <img src="@/assets/robustness.png" alt="pipeline" v-else-if="aspect==='robustness'">
          <img src="@/assets/fairness.png" alt="pipeline" v-else-if="aspect==='fairness'">
          <img src="@/assets/transferability.png" alt="pipeline" v-else-if="aspect==='transferability'">
        </div>
        <LeaderBoard :select-mode="false"/>
      </div>
    </div>
</template>

<script>
import LeaderBoard from "../../components/Evaluation/LeaderBoard";

export default {
    name: "EvaluationDetail",
    components: {LeaderBoard},
    data() {
        return {
            // aspects: ['correctness', 'robustness', 'fairness', 'transferability'],
            aspect: "correctness"
        }
    },
    methods: {
      addBGColor(i){
        if(i === "correctness") return 'bg-correctness';
        else if(i === "robustness") return 'bg-robustness';
        else if(i === "fairness") return 'bg-fairness';
        else if(i === "transferability") return 'bg-transferability';
        else return 'bg-more';
      }
    },
    computed: {
        title() {
            let head = this.aspect.slice(0, 1)
            const tail = this.aspect.slice(1)
            return head.toUpperCase() + tail
        }
    },
    watch: {
      '$route' (to, from) {
        this.aspect = this.$route.params.prop
      }
    },
    mounted() {
        this.aspect = this.$route.params.prop
        // this.$store.commit('setCreatorInfo', {"aspect_id": 1})
        // if (!this.properties.includes(this.aspect)) {
        //     this.$router.replace('/')
        // }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/variables";

.bg-correctness{background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);}
.bg-robustness{background-image: linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%);}
.bg-fairness{background-image: linear-gradient(120deg, #cfc7f8 0%, #ebbba7 100%);}
.bg-transferability{background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);}

.bg-more{background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);}

.more-container{
  height: 730px;
  color: #3f4144;
  font-size: 60px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-container{
  width:100%;
  // height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);

  .banner-title{
    color: #fff;
    font-size: 60px;
    font-weight: bold;
    margin-top: 100px;
    font-family: "Exo";
  }

  .banner-desc{
    margin: 25px 200px;
    font-size: 22px;
    color: #fff;
    text-indent:2em;
  }
}


.detail-container {
  width: 74%;
  margin: 40px auto;
  // padding-right: 10%;
  box-sizing: border-box;

  .pipline-title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .title-button {
      //width: 10%;
      //height: 80%;
      background: #409eff;
      color: white;
      border-radius: 24px;
      padding: 10px 20px;
      font-size: 26px;
      font-weight: bolder;
      margin-bottom: 10px;
    }

    .title-button:hover {
      background: #66b1ff;
      cursor: pointer;
    }
  }

  .block {
    margin-top: 5px;
    margin-bottom: 20px;
    font-size: 20px;
  }

  .pipeline-container {
    width: 97%;
    // height: 200px;
    box-shadow: 0 0 6px 1px rgba(0,0,0,0.1);
    padding: 20px;
    margin-bottom: 40px;

    img{
      width: 90%;
    }
  }
}
</style>
