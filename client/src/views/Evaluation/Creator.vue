<template>
    <div class="creator-container">
        <div>
          <el-page-header @back="goBack" :content="title" style="line-height: 40px;margin-left: 30px;margin-top: 20px;">
          </el-page-header>
        </div>
        <!-- <div class="title-container" :class="addBGColor(aspect)">
          <div class="aspect-title2">
            {{ title }}
          </div>
        </div> -->
        <!-- <div class="aspect-title" :class="addBGColor(aspect)">
          {{ title }}
        </div> -->
        <div class="divider-container"><div class="aspect-divider"></div></div>
        <el-steps :align-center="true" class="steps" :active="index" finish-status="success">
            <el-step :title="$t('creator.steps.env')" :description="''"></el-step>
            <el-step :title="$t('creator.steps.task')"></el-step>
            <el-step :title="$t('creator.steps.metric')"></el-step>
            <el-step :title="$t('creator.steps.arc')"></el-step>
            <el-step :title="$t('creator.steps.param')"></el-step>
            <el-step :title="$t('creator.steps.dataset')"></el-step>
            <el-step :title="$t('creator.steps.evaluate')"></el-step>
        </el-steps>
        <div class="work-container">
            <EnvironmentSelector v-if="index===0"/>
            <TaskSelector v-if="index===1"/>
            <MetricSelector v-if="index===2"/>
            <ArchSelector v-if="index===3"/>
            <ParamUploader v-if="index===4"/>
            <DatasetSelector v-if="index===5"/>
            <Evaluate v-if="index===6"/>
            <!-- <EvaluateResult :status="evaluateStatus" :message="evaluateMessage" :result="evaluateResult"
                            v-if="index===7"/> -->
        </div>
    </div>
</template>

<script>
import EnvironmentSelector from "../../components/Creator/EnvironmentSelector";
import DatasetSelector from "../../components/Creator/DatasetSelector";
import TaskSelector from "../../components/Creator/TaskSelector";
import MetricSelector from "../../components/Creator/MetricSelector";
import ArchSelector from "../../components/Creator/ArchSelector";
import ParamUploader from "../../components/Creator/ParamUploader";
import Evaluating from "../../components/Creator/Evaluating";
import Evaluate from "../../components/Creator/Evaluate";
import {mapState} from "vuex";

export default {
    name: "Creator",
    data() {
      return{
        aspect: '',
      }
    },
    components: {
        Evaluating, Evaluate,
        ParamUploader, ArchSelector, MetricSelector, TaskSelector, DatasetSelector, EnvironmentSelector
    },
    mounted() {
        this.$store.commit('setCreatorIndex', 0)
        this.aspect = this.$route.params.aspect
        this.$store.commit('setPerspectiveMetrics', null)
        this.$store.commit('resetCreatorInfo')
        const item = this.aspectAll.find(p => p.name === this.aspect)
        this.$store.commit('setCreatorInfo', {"aspect_id": item.id})
    },
    watch: {
      '$route' (to, from) {
        this.$store.commit('setCreatorIndex', 0)
        this.aspect = this.$route.params.aspect
        this.$store.commit('setPerspectiveMetrics', null)
        this.$store.commit('resetCreatorInfo')
        const item = this.aspectAll.find(p => p.name === this.aspect)
        this.$store.commit('setCreatorInfo', {"aspect_id": item.id})
      }
    },
    methods: {
      addBGColor(i){
        if(i === "correctness") return 'bg-correctness';
        else if(i === "robustness") return 'bg-robustness';
        else if(i === "fairness") return 'bg-fairness';
        else if(i === "transferability") return 'bg-transferability';
      },
      goBack(){
        this.$router.push({ path: '/home' });
      }

    },
    computed: {
        ...mapState({index: 'creatorIndex'}),
        ...mapState(['aspectAll']),
        title() {
            if(this.aspect === 'correctness') return this.$t('commonUpper.correctness')
            else if(this.aspect === 'robustness') return this.$t('commonUpper.robustness')
            else if(this.aspect === 'fairness') return this.$t('commonUpper.fairness')
            else if(this.aspect === 'transferability') return this.$t('commonUpper.transferability')
        }
    }
}
</script>

<style lang="scss" scoped>
.bg-correctness{background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);}
.bg-robustness{background-image: linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%);}
.bg-fairness{background-image: linear-gradient(120deg, #cfc7f8 0%, #ebbba7 100%);}
.bg-transferability{background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);}

.creator-container {
  width: 100%;
  margin: 0 auto;

  .title-container{
    width:100%;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .aspect-title2{
      font-size: 50px;
      color: #fff;
      margin-top: 10px;
      font-weight: bold;
    }
  }

  .aspect-title{
    font-size: 34px;
    font-weight: bold;
    margin: 30px 0 0 80px;
  }

  .divider-container{
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: center;     
    .aspect-divider{    
      display: block;
      height: 1px;
      width: 96%;
      background-color: #dcdfe6;
      position: relative;
    }
  }

  .steps {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  ::v-deep .el-step__icon{
    width: 32px;
    height: 32px;
  }

  ::v-deep .el-step__title {
    font-size: 19px;
  }

  ::v-deep .el-step__head.is-process{
    color: #409eff;
    border-color: #409eff;
  }
  
  ::v-deep .el-step__title.is-process{
    color: #409eff;
  }

  .work-container {
    height: 600px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .btn-group {
    width: 200px;
    margin: 20px auto;
    text-align: center;
  }
}
</style>

<style lang="scss">
.el-page-header__left .el-icon-back {
  font-size: 30px;
}

.el-page-header__title {
  font-size: 26px;
}

.el-page-header__content {
  font-size: 26px;
  font-weight: bold;
}

.el-page-header__left:after {
    height: 32px;
}
</style>