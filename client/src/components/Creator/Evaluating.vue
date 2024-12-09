<template>
    <div class="evaluating-container">
        <img v-if="percent===0" style="height: 200px" src="@/assets/loading.gif"/>
        <div v-if="percent > 0" class="progress-container">
            <div>{{ $t('evaluating.progress') }}:</div>
            <el-progress class="progress" :percentage="percent"></el-progress>
        </div>
        <div v-else>
            正在加载数据集......
        </div>
        <div style="text-align: center;margin-top: 20px">
            <el-button @click="stop">abort</el-button>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import {getModelStatus} from "@/models/EvaluationModel";

export default {
    name: "Evaluating",
    data() {
        return {
            percent: 0,
            timer: null
        }
    },
    methods: {
        stop() {
            clearInterval(this.timer)
            this.$store.commit('setCreatorIndex', 5)
        }
    },
    mounted() {
        this.timer = setInterval(async () => {
            const res = await getModelStatus(this.creatorInfo.instance_id)
            if (res.condition == 1) {
                //wrong
                this.$store.commit('setEvaluateStatus', 'error')
                this.$store.commit('setEvaluateMessage', res.fault)
                clearInterval(this.timer)
                this.$store.commit('setCreatorIndex', 7)
            } else if (res.condition == 2) {
                this.$store.commit('setEvaluateStatus', 'finish')
                this.$store.commit('setEvaluateResult', res.evaluate_score)
                clearInterval(this.timer)
                this.$store.commit('setCreatorIndex', 7)
            } else if (res.condition == 3) {
                this.percent = res.process
            }
        }, 2000)
    },
    computed: {
        ...mapState(['creatorInfo'])
    }
}
</script>

<style lang="scss" scoped>
.evaluating-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .progress-container {
    display: flex;
    //width: 60%;
    flex-direction: row;
    align-items: center;
    height: 100px;

    .progress {
      width: 1000px;
      margin-left: 20px;
    }
  }
}
</style>
