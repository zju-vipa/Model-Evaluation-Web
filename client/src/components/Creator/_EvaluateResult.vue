<template>
    <div class="result-container">
        <div v-if="status === 'finish'" class="card-container">
            <div class="title">{{ $t("evaluateResult.title") }}</div>
            <div class="result-box">
                <div class="chart-container">
                    <div id="chart"/>
                    <div class="info">Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore.
                        Dolor duis
                        dolor laboris officia ullamco veniam excepteur nulla consectetur ea amet labore voluptate aliqua ea
                        aute.
                        Veniam
                        culpa sint consequat quis nisi irure lorem anim irure ullamco sed ex laboris ut duis ut et ipsum
                        commodo.
                    </div>

                </div>
                <div class="table-box">
                    <el-table :data="tableData?tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize):[]"
                        empty-text="empty"
                        style="width: 100%"
                        :header-cell-style="{background:'#fafafa',color:'#000', fontSize: '16px', lineHeight:'30px'}"
                        :header-row-style="{height: '40px'}"
                        :row-style="{height: '40px', background:'#ffffff',lineHeight:'20px'}">>
                        <el-table-column
                                prop="perspective_name"
                                :label="$t('evaluateResult.perspectives')"
                                width="150" align="center">
                        </el-table-column>
                        <el-table-column
                                prop="metric_name"
                                :label="$t('evaluateResult.metrics')"
                                width="150" align="center">
                        </el-table-column>
                        <el-table-column
                                prop="score"
                                :label="$t('evaluateResult.result')"
                                width="150" align="center">
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
            
        </div>
        <div v-if="status === 'error'" class="result-container">
            <div class="title">{{ $t("evaluateResult.error") }}</div>
            <el-result icon="error" :title="message"/>
        </div>
        <div style="text-align: center;margin-top: 20px">
            <el-button @click="back">back</el-button>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    name: "_EvaluateResult",
    props: {
        status: String,
        message: String,
        result: Array
    },
    data() {
        return {
            radarOption: null,
            evaluationResult: [],
            tableData: [],
            currentPage: 1,
            pageSize: 6,
            
        }
    },
    mounted() {
        // this.evaluationResult = this.result.reduce((pre, cur) => {
        //     const sum = cur.metrics.reduce((p, c) => (p + c.metric_score), 0)
        //     pre.push({name: cur.perspective_name, value: ((sum * 100.) / cur.metrics.length).toFixed(2)})
        //     return pre
        // }, [])
        // this.result.map(item => {
        //     item.metrics.map(m => {
        //         this.tableData.push({
        //             perspective_name: item.perspective_name,
        //             metric_name: m.metric_name,
        //             score: (m.metric_score * 100).toFixed(2)
        //         })
        //     })
        // })
        this.evaluationResult = []
        this.tableData = [
            {
                "perspective_name": "vgg16",
                "metric_name": 'correctness',
                "score": 80,
            },
            {
                "perspective_name": "vgg17",
                "metric_name": 'correctness',
                "score": 80,
            },
            {
                "perspective_name": "vgg18",
                "metric_name": 'correctness',
                "score": 80,
            },
            {
                "perspective_name": "vgg19",
                "metric_name": 'correctness',
                "score": 80,
            },
            {
                "perspective_name": "vgg20",
                "metric_name": 'correctness',
                "score": 80,
            },
            {
                "perspective_name": "vgg21",
                "metric_name": 'correctness',
                "score": 80,
            },
            {
                "perspective_name": "vgg22",
                "metric_name": 'correctness',
                "score": 80,
            },
            {
                "perspective_name": "vgg23",
                "metric_name": 'correctness',
                "score": 80,
            },
            {
                "perspective_name": "vgg24",
                "metric_name": 'correctness',
                "score": 80,
            },
            {
                "perspective_name": "vgg25",
                "metric_name": 'correctness',
                "score": 80,
            },
            {
                "perspective_name": "vgg26",
                "metric_name": 'correctness',
                "score": 80,
            },
        ]
        this.initChart()
    },
    methods: {
        initChart() {
            let chartDom = document.getElementById('chart');
            let myChart = echarts.init(chartDom);
            let indicator = []
            let value = []
            this.evaluationResult.map(e => {
                indicator.push({text: e.name, max: 100})
                value.push(e.value)
            })
            this.radarOption = {
                radar: {
                    indicator: indicator,
                    radius: 60,
                },
                series: [{
                    name: 'evaluation result',
                    type: 'radar',
                    data: [
                        {
                            value: value
                        }
                    ],
                    itemStyle: {
                        color: '#488bd9'
                    },
                    areaStyle: {
                        color: '#488bd9',
                        opacity: 0.8
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: function (params) {
                            return params.value;
                        }
                    }
                }]
            }
            myChart.setOption(this.radarOption)
        },
        back() {
            this.$router.back()
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
        },
    }
}
</script>

<style lang="scss" scoped>
.result-container {
  width: 100%;
  .card-container{
    width: 56%;
    height: 540px;
    margin: 20px auto;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 0 15px #ededed;
    
    .title {
        font-size: 26px;
        font-weight: bolder;
        margin-bottom: 20px;
        border-bottom: 1px solid #dcdfe6;
        padding-bottom: 10px;
    }

    .result-box{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        
        .table-box{
            padding: 20px;
            height: 500px;

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

        .chart-container {
            margin-right: 20px;
            padding: 20px;
            box-shadow: 0 0 15px #ededed;
            
            #chart {
                width: 300px;
                height: 220px;
                //background: red;
            }

            .info {
                width: 90%;
                margin: 0 auto;
            }
        }
    }
    
  }

}
</style>
