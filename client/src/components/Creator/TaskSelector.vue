<template>
    <div class="env-container">
        <div class="card-container">
          <el-row :gutter="40" class="task-prop">
            <el-col :span="8" v-for="(item,index) in tasks" :key="index" @click.native="select(item)">
              <el-card shadow="always" :class="[creatorInfo.task_id === item.id ?'selected':'']">
                <div class="prop-icon">
                  <svg-icon icon-class="task" class="icon" />
                </div>
                <div class="prop-label">
                  {{ item.name  }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div style="text-align: center">
            <el-button @click="pre">{{$t('operate.pre')}}</el-button>
            <el-button :disabled="!creatorInfo.task_id" @click="next">{{$t('operate.next')}}</el-button>
        </div>
    </div>
</template>

<script>

import {mapState} from "vuex";

export default {
    name: "TaskSelector",
    methods: {
        select(item) {
            this.$store.commit('setCreatorInfo', {task_id: item.id})
        },
        pre() {
            this.$store.commit('setCreatorIndex', 0)
        },
        next() {
            this.$store.commit('setCreatorIndex', 2)
        }
    },
    created() {
        this.$store.dispatch('getTaskList')
    },
    computed: {
        ...mapState(['taskList', 'creatorInfo']),
        tasks() {
          const mapping = {
            classification: "Image Classification",
            segmentation: "Image Segmentation",
            detection: "Object Detection"
          };
          if (!this.taskList) {
            return []
          }
          return this.taskList.map(item => ({
            id: item.id,
            name: mapping[item.name]
          }));
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/variables";

.env-container {
  width: 100%;
  .card-container {
    width: 40%;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 580px;

    .task-prop{
      margin-bottom: 40px;
      .el-card:hover {
        cursor: pointer;
        box-shadow: 0 0 18px 2px rgba(0,0,0,0.2);
        transition: all 0.2s ease-in-out;
      }

      .selected {
        box-shadow: 0 0 18px 2px rgba(0,0,0,0.2);
        background-color: #fff !important;
      }

      .el-card{
        padding: 30px 0;
        background-color: #f4f4f5;
        .prop-icon{
          width: 100%;
          display: flex;
          justify-content: center; /* 水平居中 */
          align-items: center; /* 垂直居中 */
          .icon {
            height: 60px;
            width: 60px;
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

