<template>
    <div>
        <div class="metric-container">
            <div class="card">
                <div class="title">
                    {{ $t('creator.metric.selectTitle') }}
                </div>
                <div class="content">
                    <div class="item-container" v-for="(item,index1) in perspectiveList" :key="index1">
                        <div class="user-select">
                            <div class="parent">
                                <el-checkbox :indeterminate="isIndeterminate[index1]" 
                                             v-model="checkAll[index1]"
                                             @change="handleCheckAllChange(index1,$event)"
                                             :label="item">
                                </el-checkbox>
                            </div>
                            <div class="child">
                                <el-checkbox-group @change="handleCheckedChange(index1,$event)"    
                                                   v-model="metricNames[index1]">
                                    <el-tooltip placement="bottom" v-for="(child1,index2) in defaultMetrics[index1]" :key="index1+'default'+index2">
                                        <div slot="content">{{ desc(child1) }}</div>
                                        <el-checkbox  :label="child1" disabled style="display: inline-block" border>
                                        </el-checkbox>
                                    </el-tooltip>
                                    <el-tooltip placement="bottom" v-for="(child2,index3) in userMetrics[index1]" :key="index1+'user'+index3">
                                        <div slot="content">{{ desc(child2) }}</div>
                                        <el-checkbox  :label="child2" style="display: inline-block" border>
                                        </el-checkbox>
                                    </el-tooltip>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div style="text-align: center;margin-top: 20px">
            <el-button @click="pre">{{$t('operate.pre')}}</el-button>
            <el-button @click="next">{{$t('operate.next')}}</el-button>
        </div>
    </div>

</template>

<script>
import {mapState} from "vuex";
import {getMetricList} from "@/models/EvaluationModel";

export default {
    name: "MetricSelector",
    data() {
        return {
            metricList: [],
            perspectiveList: [],
            defaultMetrics: [],
            userMetrics: [],
            metricNames: [],

            isIndeterminate: [],
            checkAll: [],
        }
    },
    methods: {
        pre() {
            // this.$store.commit('setCreatorInfo', {metric_ids: null})
            this.$store.commit('setCreatorIndex', 1)
        },
        next() {
            let res = []
            let _perspectiveMetrics = {}
            this.metricNames.map((item, index)=>{
                _perspectiveMetrics[this.perspectiveList[index]] = []
                    
                item.map(metric=>{
                    const m = this.metricList.find(p => p.name === metric)
                    res.push(m.id)
                    _perspectiveMetrics[this.perspectiveList[index]].push(metric)
                })
            })

            this.$store.commit('setPerspectiveMetrics', _perspectiveMetrics)
            this.$store.commit('setCreatorInfo', {metric_ids: res})
            this.$store.commit('setCreatorIndex', 3)
        },
        refreshSelectd(){
            this.perspectiveList.map((item, index)=>{
                this.metricNames[index] = this.perspectiveMetrics[item]
            })
        },
        handleCheckAllChange(index, val) {
            this.metricNames[index] = val ? [...this.defaultMetrics[index], ...this.userMetrics[index]] : [...this.defaultMetrics[index]];
            this.isIndeterminate[index] = false;
            this.$forceUpdate()
        },
        handleCheckedChange(index, value) {
            let checkedCount = value.length;
            this.checkAll[index] = checkedCount === this.userMetrics[index].length + this.defaultMetrics[index].length;
            this.isIndeterminate[index] = checkedCount > 0 && checkedCount < this.userMetrics[index].length + this.defaultMetrics[index].length;
            this.$forceUpdate()
        }
    },
    async mounted() {
        const data = await getMetricList(this.creatorInfo.task_id || '', this.creatorInfo.aspect_id || '', undefined)
        this.metricList = data

        this.metricList.map(item => {
            if (!this.perspectiveList.includes(item.perspective)) {
                this.perspectiveList.push(item.perspective)
            }
        })

        this.perspectiveList.map(item => {
            this.defaultMetrics.push([])
            this.userMetrics.push([])
            this.metricNames.push([])
            this.checkAll.push(false)
            this.isIndeterminate.push(false)
        })

        this.metricList.map(item => {
            const index = this.perspectiveList.findIndex(value => value === item.perspective)
            if(item.is_default){
                this.defaultMetrics[index].push(item.name)
                this.metricNames[index].push(item.name)
            } 
            else this.userMetrics[index].push(item.name)
        })

        if(this.creatorInfo.metric_ids){
            this.refreshSelectd()
        }

        this.metricNames.map((item,index)=>{
            this.handleCheckedChange(index, item)
        })  
    },
    computed: {
        ...mapState(['creatorInfo', 'perspectiveMetrics']),
        desc(){
            return (name) => {
                const m = this.metricList.find(p => p.name === name)
                return m.description;
            };
        }
    }
}
</script>

<style lang="scss" scoped>
.metric-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;

  .card {
    width: 800px;
    height: 540px;
    margin-right: 20px;
    box-shadow: 0 0 6px 1px rgba(0,0,0,0.1);
    padding: 20px;

    /deep/ .el-divider{    
        margin: 5px, 0 !important;
    }
    .title {
      font-size: 24px;
      font-weight: bolder;
      border-bottom: 1px solid #dcdfe6;
      padding-bottom: 10px;
      margin-bottom: 5px;
    }

    ::-webkit-scrollbar {
      display: none;
    }

    .content {
      overflow-y: scroll;
      height: 90%;
      width: 100%;

      .item-container {

        .metric-box {
            margin: 5px 10px;

            .metric-title{
                font-size: 22px;
                font-weight: bold;
                margin-bottom: 10px;
            }

            .metric-item{
                margin-left: 20px;
                display: flex;
                flex-wrap: wrap;
                .el-tag{
                    margin-right: 10px;
                    margin-bottom: 10px;
                    font-size: 18px;
                }
            }
        }

        .user-select{
            margin: 5px 10px;
            .child {
                padding-left: 36px;

                label.el-checkbox.is-bordered {
                    width: 200px;
                    height: 50px;
                    margin-left: 0;
                    margin-bottom: 10px;
                    font-size: 18px;
                    padding: 12px 20px 10px 10px
                }
            }

            .parent {
                margin: 10px 0;
            }

            /deep/ .el-checkbox {
                display: block;
                line-height: 28px;
                color: #303133;
            }

            /deep/ .parent .el-checkbox__label {
                font-size: 22px;
                font-weight: bold;
            }

            /deep/ .child .el-checkbox__label {
                font-size: 20px;
            }
        }
      }
    }
  }

}
</style>
