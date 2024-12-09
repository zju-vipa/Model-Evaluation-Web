<template>
    <div class="env-container">
        <div class="card-container">
          <el-row :gutter="40" class="env-prop">
            <el-col :span="12" v-for="(item,index) in envList" :key="index" @click.native="select(item)">
              <el-card shadow="always" :class="[creatorInfo.environment_id === item.id ?'selected':'', item.name==='pytorch'?'pytorch':'tensorflow']">
                <div class="prop-icon">
                  <svg-icon icon-class="pytorch" class="icon" v-if="item.name==='pytorch'"/>
                  <svg-icon icon-class="tensorflow" class="icon" v-else/>
                </div>
                <div class="prop-label">
                  {{ item.name  }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div style="text-align: center">
            <!--            <el-button @click="pre">{{$t('operate.pre')}}</el-button>-->
            <el-button :disabled="!creatorInfo.environment_id" @click="next">{{$t('operate.next')}}</el-button>
        </div>
        <el-alert
        
          title="错误提示的文案"
          type="error"
          effect="dark">
        </el-alert>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "EnvironmentSelector",
    methods: {
        select(item) {
            if(item.name==='tensorflow') return;
            this.$store.commit('setCreatorInfo', {environment_id: item.id})
        },
        pre() {

        },
        next() {
            this.$store.commit('setCreatorIndex', 1)
        }
    },
    computed: {
        ...mapState(['envList', 'creatorInfo'])
    },

    mounted() {
      this.$store.dispatch('getEnvList')
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/variables";

.env-container {
  width: 100%;

  .card-container {
    width: 26%;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 580px;
    .env-prop{
      margin-bottom: 40px;
      width: 100%;
      .pytorch:hover {
        cursor: pointer;
        box-shadow: 0 0 18px 2px rgba(0,0,0,0.2);
        transition: all 0.2s ease-in-out;
      }

      .tensorflow:hover {
        cursor: not-allowed;
      }

      .selected {
        box-shadow: 0 0 18px 2px rgba(0,0,0,0.2);
        background-color: #fff !important;
      }

      .el-card{
        padding: 20px 0;
        background-color: #f4f4f5;
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
          font-size: 25px;
        }
      }
    }
  }
}

</style>
