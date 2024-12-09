<template>
    <div class="result-container" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)">
        <h1 class="title">{{ $t("evaluateResult.title") }}</h1>
        <div class="card-container">
            <div class="result-box">
                <div class="chart-container">
                    <div id="chart" v-if="evaluateStatus === 'finish'"></div>
                    <div :class="evaluateStatus === 'finish'? 'info1': 'info2'">
                        <el-descriptions :column="1" border>
                            <el-descriptions-item :label="$t('evaluateResult.task')" :contentStyle="{ fontSize: '16px' }">{{evaluationInfo.task_name}}</el-descriptions-item>
                            <el-descriptions-item :label="$t('evaluateResult.model')" :contentStyle="{ fontSize: '16px' }">{{evaluationInfo.architecture_name}}</el-descriptions-item>
                            <el-descriptions-item :label="$t('evaluateResult.dataset')" :contentStyle="{ fontSize: '16px' }">{{evaluationInfo.dataset_name}}</el-descriptions-item>
                            <el-descriptions-item :label="$t('evaluateResult.param')" :contentStyle="{ fontSize: '16px' }">{{evaluationInfo.parameter_name}}</el-descriptions-item>
                            <el-descriptions-item :label="$t('evaluateResult.state')" :contentStyle="{ fontSize: '16px' }">
                                <el-tag v-if="evaluateStatus === 'inProcess'">{{$t('evaluateResult.inprocess')}}</el-tag>
                                <el-tag type="success" v-else-if="evaluateStatus === 'finish'">{{$t('evaluateResult.finish')}}</el-tag>
                                <el-tag type="danger" v-else-if="evaluateStatus === 'error'">{{$t('evaluateResult.errer')}}</el-tag>
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </div>
                <div class="divider-container"><div class="result-divider"></div></div>
                <div v-if="evaluateStatus === 'inProcess'" class="table-box">
                    <div class="process">
                        <div class="progess-label">{{ $t('evaluating.progress') }}:</div>
                        <el-progress class="progress-bar" :stroke-width="16" :percentage="percent"></el-progress>
                    </div>
                </div>
                <div v-else-if="evaluateStatus === 'error'" class="table-box">
                    <div class="error">
                    {{ evaluateMessage }}
                    </div>
                </div>
                <div v-else-if="evaluateStatus === 'finish'" class="table-box2">
                    <div class="finish">
                        <el-table :data="tableData?tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize):[]"
                            empty-text="empty"
                            style="width: 100%; min-height: 300px;"
                            :header-cell-style="{background:'#fafafa',color:'#000', fontSize: '16px', lineHeight:'30px'}"
                            :header-row-style="{height: '40px'}"
                            :row-style="{height: '40px', background:'#ffffff',lineHeight:'20px'}">>
                            <el-table-column
                                    prop="metric_name"
                                    :label="$t('evaluateResult.metrics')"
                                    width="260" align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="perspective_name"
                                    :label="$t('evaluateResult.perspectives')"
                                    width="280" align="center">
                            </el-table-column>
                            <el-table-column
                                    prop="score"
                                    :label="$t('evaluateResult.result')"
                                    width="260" align="center">
                            </el-table-column>
                        </el-table>
                        <el-pagination
                            hide-on-single-page
                            background
                            layout="prev, pager, next, jumper, ->, total"
                            :total="tableData?tableData.length:0"
                            :current-page="currentPage"
                            :page-size="pageSize"
                            @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                    
                </div>
                <div v-else class="table-box">
                    <el-empty :image-size="200"></el-empty>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import {getEvaluationInfo, getModelStatus} from "@/models/EvaluationModel"

export default {
    name: "EvaluationResult",
    data() {
        return {
            radarOption: null,
            tableData: [],
            
            currentPage: 1,
            pageSize: 6,
            
            evaluateStatus: null,
            evaluateMessage: null,
            result: [],
            evaluationScore: [],
            evaluationInfo: {},

            percent: 0,
            loading: true,
            statusTimer: null,
            instance_id: -1,
        }
    },
    mounted() {
        this.$watch(
            () => this.evaluateStatus,
            (newValue) => {
                if (newValue) this.loading = false
            },
            { immediate: true }
        )
    },
    created() {
        this.instance_id = this.$route.params.id
        // this.evaluationInfo = await getEvaluationInfo(this.instance_id)
        this.fetchEvaluationInfo()
        if (!this.statusTimer) {
            this.statusTimer = window.setInterval(async () => {
                const res = await getModelStatus(this.instance_id)
                if (res.condition == 1) {
                    //in process
                    this.evaluateStatus = 'inProcess'
                    if(res.process) {
                        this.percent = parseInt(res.process * 100);
                    }
                } else if (res.condition == 2) {
                    window.clearInterval(this.statusTimer)
                    this.statusTimer = null;
                    //finish
                    this.evaluateStatus = 'finish'
                    this.result = res.evaluate_score
                    this.initData()                    
                } else if (res.condition == 3) {
                    //wrong
                    window.clearInterval(this.statusTimer)
                    this.statusTimer = null;
                    this.evaluateStatus = 'error'
                    this.evaluateMessage = res.fault_info    
                } else if (res.condition == 0) {
                    //未开始
                    this.evaluateStatus = 'inProcess'
                }
            }, 2000)
        }
    },
    methods: {
        async fetchEvaluationInfo() {
            this.evaluationInfo = await getEvaluationInfo(this.instance_id);
        },
        initData() {
            this.evaluationScore = this.result.reduce((pre, cur) => {
                const sum = cur.metrics.reduce((p, c) => (p + c.metric_score), 0)
                pre.push({name: cur.perspective_name, value: (sum / cur.metrics.length).toFixed(2)})
                return pre
            }, [])
            this.result.map(item => {
                item.metrics.map(m => {
                    this.tableData.push({
                        perspective_name: item.perspective_name,
                        metric_name: m.metric_name,
                        score: m.metric_score.toFixed(2)
                    })
                })
            })

            this.$nextTick(() => {
                this.initChart()
            })
        },
        initChart() {
            let chartDom = document.getElementById('chart');
            let myChart = echarts.init(chartDom);
            let indicator = []
            let value = []
            this.evaluationScore.map(e => {
                indicator.push({text: e.name, max: 100})
                value.push(e.value)
            })
            this.radarOption = {
                radar: {
                    indicator: indicator,
                    radius: 80,
                    center: ['50%', '50%'],
                    // axisName: {
                    //     color: '#606266'
                    // },
                    name: {
                        textStyle: {
                            fontSize: 12, 
                            color: "#606266",
                        },
                        formatter: function(value) {
                            let words = value.split(' ');
                            let result = '';
                            for (let i = 0; i < words.length; i++) {
                                if (i > 0 && i % 1 === 0) {
                                    result += '\n';
                                }
                                result += words[i] + ' ';
                            }
                            return result.trim(); // 去掉最后一个多余的空格
                        },
                    },
                },
                series: [{
                    name: 'evaluation result',
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    data: [
                        {
                            value: value
                        }
                    ],
                    itemStyle: {
                        color: '#488bd9',
                    },
                    areaStyle: {
                        color: '#488bd9',
                        opacity: 0.8
                    },
                    label: {
                        show: true,
                        fontSize: 14,
                        color: '#303133',
                        position: 'top',
                        formatter: function (params) {
                            return params.value;
                        }
                    }
                }]
            }
            myChart.setOption(this.radarOption)
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
        },
    }
}
</script>

<style lang="scss" scoped>
.result-container {
  width: 68%;
  margin: 40px auto;
  box-sizing: border-box;
  
  .title {
    margin-bottom: 5px;
    font-size: 30px;
  }

  .card-container{
    width: 90%;
    padding: 10px 20px;
    margin: 20px auto;
    border-radius: 8px;
    box-shadow: 0 0 15px #ededed;

    .result-box{     
        margin:20px auto;   
        .table-box{
            margin: 10px 20px;
            padding: 20px 10px;
            border-radius: 4px;
            box-shadow: 0 0 4px #ededed;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            display: flex;
            .process {
                justify-content: center;
                .progess-label {
                    font-size: 22px;
                    margin-bottom: 20px;
                    text-align: center;
                }
                .progress-bar {
                    width: 500px;
                    margin: auto;
                }
            }

            .error{
                width: 96%;
                height: 260px;
                overflow-y: scroll;
                text-indent:2em;
                font-size: 18px;
                color: #909399;
            }

        }

        .table-box2{
            padding: 20px;
            // border-radius: 8px;
            // box-shadow: 0 0 15px #ededed;
            justify-content: center;
            min-height: 300px;
            display: flex;

            .finish{
                margin-top: 20px;

                .el-table{
                    font-size: 20px;
                }

                .el-pagination {
                    text-align: center;
                    margin-top: 20px;
                }
                    
                /deep/ .el-pagination .el-pager li {
                    font-size: 16px;
                    margin: 0 4px;
                    cursor: pointer; /* 添加指针样式 */
                    transition: background-color 0.3s ease; /* 添加过渡效果 */
                }
                    
                .el-pagination .el-pager li:hover {
                    background-color: #409EFF;
                    color: #fff;
                }
                    
                    /* 隐藏默认的页码输入框 */
                /deep/ .el-pagination .el-pagination__jump {
                    font-size: 16px;
                }
                    
                    /* 自定义样式，更改分页控件的布局 */
                /deep/ .el-pagination .el-pagination__right {
                    display: flex;
                    align-items: center;
                }
                    
                /deep/ .el-pagination .el-pagination__total {
                    font-size: 16px;
                    margin-left: 10px;
                    color: #666;
                }
            }
        }

        .divider-container{
            display: flex;
            height: 30px;
            align-items: center;
            justify-content: center;     
            .result-divider{    
                display: block;
                height: 1px;
                width: 96%;
                background-color: #dcdfe6;
                position: relative;
            }
        }

        .chart-container {
            // box-shadow: 0 0 15px #ededed;
            display: flex;

            #chart {
                width: 500px;
                height: 380px;
                //background: red;
            }

            .info1 {
                width: 600px;
                margin: 30px auto;

                /deep/ .el-descriptions-item__label{
                    width: 200px;
                    font-size: 20px;
                    font-weight: bold;
                }

                .el-tag {
                    font-size: 16px;
                }
            }

            .info2 {
                width: 1100px;
                margin: 30px auto;

                /deep/ .el-descriptions-item__label{
                    width: 200px;
                    font-size: 20px;
                    font-weight: bold;
                }

                .el-tag {
                    font-size: 16px;
                }
            }
        }
    }
    
  }

}
</style>
<style lang="scss">
.el-progress-bar {
    width: 95%;
}
</style>