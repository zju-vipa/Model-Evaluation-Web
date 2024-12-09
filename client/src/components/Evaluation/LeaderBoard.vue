<template>
    <div class="leader-board-container">
        <h1 class="leader-board-title">{{ $t("title.leaderBoard") }}</h1>
        <!-- <div class="block">
            Anim ullamco amet exercitation aliquip velit aliqua nisi fugiat commodo sed labore. Dolor duis
            dolor laboris officia ullamco veniam excepteur nulla consectetur ea amet labore voluptate aliqua ea aute.
        </div> -->
        <div class="leader-board-box"  v-loading="isLoading">
            <!-- <div class="single-selector-group block" v-if="selectMode">
                <div :class="singleProp==='correctness'?'selected':''" @click="selectSingle('correctness')">
                    {{ $t("commonUpper.correctness") }}
                </div>
                <div :class="singleProp==='robustness'?'selected':''" @click="selectSingle('robustness')">
                    {{ $t("commonUpper.robustness") }}
                </div>
                <div :class="singleProp==='fairness'?'selected':''" @click="selectSingle('fairness')">
                    {{ $t("commonUpper.fairness") }}
                </div>
                <div :class="singleProp==='transferability'?'selected':''" @click="selectSingle('transferability')">
                    {{ $t("commonUpper.transferability") }}
                </div>
                <div :class="singleProp==='more'?'selected':''" @click="selectSingle('more')">{{
                    $t("commonUpper.more")
                    }}
                </div>
            </div> -->
            <div class="filter-group block">
                <div class="core-filter">
                    <el-select style="margin-right: 10px" v-model="task" :placeholder="$t('leaderBoard.task')" @change="currStationChange"
                               :no-match-text="$t('leaderBoard.empty')" :no-data-text="$t('leaderBoard.empty')">
                        <el-option
                                v-for="(item,index) in taskAll"
                                class="filter-item"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select style="margin-right: 10px" v-model="dataset" :placeholder="$t('leaderBoard.dataset')" @change="currStationChange"
                                :no-match-text="$t('leaderBoard.empty')" :no-data-text="$t('leaderBoard.empty')">
                        <el-option
                                v-for="(item,index) in datasetAll"
                                class="filter-item"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="aspect" v-if="selectMode" :placeholder="$t('leaderBoard.aspect')" @change="currStationChange"
                                :no-match-text="$t('leaderBoard.empty')" :no-data-text="$t('leaderBoard.empty')">
                        <el-option
                                v-for="(item,index) in aspectAll"
                                class="filter-item"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="table-box">
                <el-table 
                    :data="leaderList?leaderList.slice((currentPage - 1) * pageSize, currentPage * pageSize):[]"
                    :empty-text="$t('leaderBoard.empty')"
                    style="width: 100%"
                    :header-cell-style="{background:'#fafafa',color:'#000', fontSize: '16px', lineHeight:'30px'}"
                    :header-row-style="{height: '60px'}"
                    :row-style="{height: '60px', background:'#ffffff',lineHeight:'30px'}">
                    <el-table-column
                            prop="architecture_name"
                            :label="$t('leaderBoard.modelName')"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="evaluation_result"
                            :label="$t('leaderBoard.evaluationResult')"
                            width="220"
                            align="center">
                        <template slot-scope="scope">
                            <div :style="getDivStyle()" :id="`chart-${scope.$index}`"></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="parameter_name"
                            :label="$t('leaderBoard.parameterName')"
                            align="center">
                    </el-table-column>
                    <!-- <el-table-column
                            prop="user_name"
                            :label="$t('leaderBoard.user')"
                            align="center">
                    </el-table-column> -->
                    <el-table-column
                            :label="$t('leaderBoard.paperLink')"
                            align="center">
                        <template slot-scope="scope">
                            <el-link :underline="false" :href="scope.row.paper_link" style="font-size: 15px;">{{scope.row.paper_link}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="$t('leaderBoard.codeLink')"
                            align="center">
                            <template slot-scope="scope">
                                <el-link :underline="false" :href="scope.row.code_link" style="font-size: 15px;">{{scope.row.code_link}}</el-link>
                            </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            :label="$t('leaderBoard.operate')"
                            width="100"
                            align="center">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" style="font-size: 16px;">{{$t('operate.viewDetail')}}</el-button>
                            </template>
                    </el-table-column>
                </el-table> 
                <el-pagination
                    hide-on-single-page
                    background
                    layout="prev, pager, next, jumper, ->, total"
                    :total="leaderList?leaderList.length:0"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            
        </div>
    </div>
</template>

<script>
import {getLeaderList} from "@/models/EvaluationModel";
import * as echarts from "echarts";
import {mapState} from "vuex";

export default {
    name: "LeaderBoard",
    props: {
        selectMode: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            task: '',
            dataset: '',
            aspect: '',
            currentPage: 1,
            pageSize: 5,
            leaderList: [],
            evaluationScore: [],
            isLoading: true,
            timer: null
        }
    },
    computed: {
        ...mapState(['datasetAll', 'taskAll', 'aspectAll'])
    },
    created() {
        if (!this.timer) {
            this.timer = window.setInterval(() => {
                if(this.datasetAll && this.taskAll && this.aspectAll){
                    window.clearInterval(this.timer)
                    this.timer = null
                    this.task = this.taskAll[0].id
                    if(this.selectMode){
                        this.aspect = this.aspectAll[0].id
                    }else{
                        const p = this.aspectAll.find( t => t.name === this.$route.params.prop)
                        this.aspect = p.id
                    }
                    if(this.aspect === 1){
                        const d = this.datasetAll.find( t => t.name === 'imagenet')
                        this.dataset = d.id
                    }else if(this.aspect === 4){
                        const d = this.datasetAll.find( t => t.name === 'cub200')
                        this.dataset = d.id
                    }else{
                        this.dataset = this.datasetAll[0].id
                    }
                    
                    this.fetchLeaderList()
                    this.isLoading = false
                }
            }, 1000);
        }
    },
    watch: {
      '$route' (to, from) {
        this.task = this.taskAll[0].id
        if(this.selectMode){
            this.aspect = this.aspectAll[0].id
        }else{
            const p = this.aspectAll.find( t => t.name === this.$route.params.prop)
            this.aspect = p.id
        }
        if(this.aspect === 1){
            const d = this.datasetAll.find( t => t.name === 'imagenet')
            this.dataset = d.id
        }else if(this.aspect === 4){
            const d = this.datasetAll.find( t => t.name === 'cub200')
            this.dataset = d.id
        }else{
            this.dataset = this.datasetAll[0].id
        }
        this.fetchLeaderList()
      }
    },
    methods: {
        async fetchLeaderList(){
            this.evaluationScore = []
            const data = await getLeaderList(this.task, this.dataset, this.aspect)
            this.leaderList = data.filter(item => item.condition === 2);

            this.leaderList.map(instance => {
                const score = instance.evaluate_score.reduce((pre, cur) => {
                    const sum = cur.metrics.reduce((p, c) => (p + c.metric_score), 0)
                    pre.push({name: cur.perspective_name, value: (sum / cur.metrics.length).toFixed(2)})
                    return pre
                }, [])
                this.evaluationScore.push(score)
            })

            this.evaluationScore.map((item, index) => {
                this.$nextTick(() => {
                    this.initChart(item, index)
                })
            })
        },
        currStationChange(){
            this.fetchLeaderList()
        },
        handleClick(row) {
            this.$router.push('/evaluation/result/' + row.instance_id)
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
            this.evaluationScore.map((item, index) => {
                this.$nextTick(() => {
                    this.initChart(item, index)
                })
            })
        },
        getDivStyle() {
            return {
                width: '200px',
                height: this.aspect === 4 ? '180px' : '120px',
            };
        },
        initChart(item, index) {
            let chartDom = document.getElementById(`chart-${index}`);
            let myChart = echarts.init(chartDom);
            let indicator = []
            let value = []
            item.map(e => {
                indicator.push({text: e.name, max: 100})
                value.push(e.value)
            })
            this.radarOption = {
                radar: {
                    indicator: indicator,
                    radius: 25,
                    name: {
                        textStyle: {
                            fontSize: 10, 
                        },
                        formatter: function(value) {
                            let list = value.split("");
                            let result = "";
                            for (let i = 0; i < list.length; i++) {
                                if (list[i] === ' ' && i < list.length - 1) {
                                    result += '\n';
                                } else {
                                    result += list[i];
                                }
                            }
                            return result;
                        },     
                    },
                },
                tooltip: {
                    trigger: 'axis'
                },
                width:200,
                height:400,
                series: [{
                    // name: 'evaluation result',
                    type: 'radar',
                    // tooltip: {
                    //     trigger: 'item',
                    //     position: [5, 5],
                    //     extraCssText: 'width:180px;height:120px;',
                    //     textStyle: {
                    //         fontSize: 10 // 字体大小
                    //     },
                    // },
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
                        fontSize: 8,
                        fontWeight: 100,
                        position: 'bottom',
                        formatter: function (params) {
                            return params.value;
                        }
                    }
                }]
            }
            myChart.setOption(this.radarOption)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/variables";

.leader-board-container {
  width: 100%;

  .leader-board-title{
    margin-bottom: 20px;
    font-size: 30px;
  }
  
  .block {
    margin-bottom: 20px;
  }

  .leader-board-box{
    padding: 20px;
    box-shadow: 0 0 15px #ededed;
    border-radius: 8px;

    .single-selector-group {
        display: flex;

        div {
            width: 20%;
            height: 40px;
            background: $blockBlue;
            line-height: 40px;
            text-align: center;
            font-weight: bolder;
            font-size: 22px;
        }

        .selected {
            background: $blockBlueHover;
        }

        div:hover {
            background: $blockBlueHover;
            cursor: pointer;
        }

    }

    .filter-group {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        margin-top: 20px;

        .core-filter {
            display: flex;
            width: 40%;
            margin-left: 30px;
            /deep/ .el-input .el-input__inner {
                font-size: 20px;
            }

        }

        .more-selector {
            width: 40%;
            padding: 5px 20px;
            border-radius: 4px;
            border: 1px solid #dcdfe6;

            /deep/ .el-checkbox {
                line-height: 30px;
                color: #303133;
            }

            /deep/ .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
                background-color: #409eff;
                border-color: #409eff
            }

            /deep/ .el-checkbox__input.is-disabled .el-checkbox__inner:after {
                border-color: #fff
            }

            /deep/ .el-checkbox__input.is-disabled+span.el-checkbox__label {
                color: #409eff;
            }

            /deep/ .el-checkbox__label {
                font-size: 18px;
            }
        }
    }

    .table-box{
        padding: 20px 20px 0 20px;
        .el-table{
            font-size: 20px;
            color: #303133;
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
}
</style>

<style lang="scss">
    .el-table_1_column_1{
        font-weight: bolder !important;
    }

    .filter-item {
        font-size: 20px;
        line-height: 26px;
    }
</style>