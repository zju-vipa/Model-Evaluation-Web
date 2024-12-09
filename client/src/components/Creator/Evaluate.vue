<template>
    <div class="evaluating-container">
        <div class="desc-container">
            <div class="desc-content" v-if="selectInfo">
                <div class="title">{{ $t("creator.evaluate.title") }}</div>
                <el-descriptions :column="1" border>
                    <el-descriptions-item :label="$t('creator.evaluate.env')" :contentStyle="{ fontSize: '16px' }">{{ selectInfo.environment.name }}</el-descriptions-item>
                    <el-descriptions-item :label="$t('creator.evaluate.task')" :contentStyle="{ fontSize: '16px' }">{{ selectInfo.task.name }}</el-descriptions-item>
                    <el-descriptions-item :label="$t('creator.evaluate.model')" :contentStyle="{ fontSize: '16px' }">
                        {{ selectInfo.model.name }}
                        <el-button type="primary" class="detail" @click="modelDialogVisible = true">{{$t('operate.detail')}}</el-button>
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('creator.evaluate.param')" :contentStyle="{ fontSize: '16px' }">
                        {{ selectInfo.parameter.name }}
                        <el-button type="primary" class="detail"  @click="parameterDialogVisible = true">{{$t('operate.detail')}}</el-button>
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('creator.evaluate.dataset')" :contentStyle="{ fontSize: '16px' }">
                        {{ selectInfo.dataset.name }}
                        <el-button type="primary" class="detail"  @click="datasetDialogVisible = true">{{$t('operate.detail')}}</el-button>
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('creator.evaluate.metric')" :contentStyle="{ fontSize: '16px' }">
                        <div class="metrics-container">
                            <div v-for="(item, key) in selectInfo.metrics" :key="key" class="metrics-item">
                                <div class="perspective-name"> {{ key }} </div>
                                <div>
                                    <el-tag v-for="(value) in item" :key="key + '' + value">{{ value }}</el-tag>
                                </div>
                            </div>
                        </div>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <div class='desc-empty' v-else>
                <el-empty></el-empty>
            </div>
        </div>

        <el-dialog
                :title="$t('creator.evaluate.modelDetail')"
                :visible.sync="modelDialogVisible"
                width="50%"
                :before-close="handleClose">
            <div class="dialog-content">
                <el-descriptions :column="1" border>
                    <el-descriptions-item :label="$t('modelTable.modelName')" :contentStyle="{ fontSize: '16px' }">{{ selectInfo.model.name }}</el-descriptions-item>
                    <el-descriptions-item :label="$t('modelTable.description')" :contentStyle="{ fontSize: '16px' }">
                        <div :style="{fontSize:'16px'}">{{ selectInfo.model.description }}</div>
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('modelTable.applicableTasks')" :contentStyle="{ fontSize: '16px' }">{{ selectInfo.model.task }}</el-descriptions-item>
                    <el-descriptions-item :label="$t('modelTable.paperLink')" :contentStyle="{ fontSize: '16px' }">{{ selectInfo.model.paper_link }}</el-descriptions-item>
                    <el-descriptions-item :label="$t('modelTable.codeLink')" :contentStyle="{ fontSize: '16px' }">{{ selectInfo.model.code_link }}</el-descriptions-item>
                </el-descriptions>
            </div>
        </el-dialog>

        <el-dialog
                :title="$t('creator.evaluate.datasetDetail')"
                :visible.sync="datasetDialogVisible"
                width="50%"
                :before-close="handleClose">
            <div class="dialog-content">
                <el-descriptions :column="1" border>
                    <el-descriptions-item :label="$t('datasetTable.datasetName')" :contentStyle="{ fontSize: '16px' }">
                        <div :style="{fontSize:'16px'}">{{ selectInfo.dataset.name }}</div>
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('datasetTable.description')" :contentStyle="{ fontSize: '16px' }">{{ selectInfo.dataset.description }}</el-descriptions-item>
                    <el-descriptions-item :label="$t('datasetTable.paperLink')" :contentStyle="{ fontSize: '16px' }">{{ selectInfo.dataset.paper_link }}</el-descriptions-item>
                </el-descriptions>
            </div>
        </el-dialog>

        <el-dialog
                :title="$t('creator.evaluate.parameterDetail')"
                :visible.sync="parameterDialogVisible"
                width="50%"
                :before-close="handleClose">
            <div class="dialog-content">
                <el-descriptions :column="1" border>
                    <el-descriptions-item :label="$t('paramTable.paramName')" :contentStyle="{ fontSize: '16px' }">
                        <div :style="{fontSize:'16px'}">{{ selectInfo.parameter.name }}</div>
                    </el-descriptions-item>
                    <el-descriptions-item :label="$t('paramTable.description')" :contentStyle="{ fontSize: '16px' }">{{ selectInfo.parameter.description }}</el-descriptions-item>
                    <el-descriptions-item :label="$t('paramTable.architecture')" :contentStyle="{ fontSize: '16px' }">{{ selectInfo.parameter.architecture }}</el-descriptions-item>
                </el-descriptions>
            </div>
        </el-dialog>

        <div style="text-align: center;margin-top: 20px">
            <el-button @click="pre">{{$t('operate.pre')}}</el-button>
            <el-button @click="next" type="primary">{{$t('operate.startTask')}}</el-button>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import {createEvaluation} from "@/models/EvaluationModel";

export default {
    name: "Evaluate",
    data() {
        return {
            selectInfo: {},
            modelDialogVisible: false,
            datasetDialogVisible: false,
            parameterDialogVisible: false
        }
    },
    methods: {
        pre() {
            this.$store.commit('setCreatorIndex', 5)
        },
        async next() {
            const res = await createEvaluation(this.creatorInfo)
            // if (res.instance_id) {
            //     this.$store.commit('setCreatorInfo', {"instance_id": res.instance_id})
            //     this.$store.commit('setCreatorIndex', 7)
            // } else {
            //     // this.$alert('create failed', 'Error', {
            //     //     confirmButtonText: 'can not create job',
            //     // })
            // }
            this.$router.push('/evaluation/result/' + res.instance_id)
        }
    },
    created() {
        const environment = this.envList.find(env => env.id === this.creatorInfo.environment_id)
        const model = this.modelList.find(arc => arc.id === this.creatorInfo.architecture_id)
        const dataset = this.datasetList.find(data => data.id === this.creatorInfo.dataset_id)
        const task = this.taskList.find(t => t.id === this.creatorInfo.task_id)
        const parameter = this.paramList.find(param => param.id === this.creatorInfo.parameter_id)

        this.selectInfo = {
            "environment": environment,
            "model": model,
            "dataset": dataset,
            "task": task,
            "parameter": parameter,
            "metrics": this.perspectiveMetrics
        }
    },
    computed: {
        ...mapState(['creatorInfo', 'envList', 'modelList', 'datasetList', 'taskList', 'paramList' ,'perspectiveMetrics'])
    }
}
</script>

<style lang="scss" scoped>
.evaluating-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .desc-container{
    height: 540px;
    width: 900px;
    box-shadow: 0 0 6px 1px rgba(0,0,0,0.1);
    padding: 20px;

    .detail{
        float: right; 
        font-size: 16px;
        padding: 6px 10px;
        margin-right: 10px;
    }

    .title{
        font-size: 22px;
        font-weight: bolder;
        border-bottom: 1px solid #dcdfe6;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    ::-webkit-scrollbar {
        display: none;
    }

    .metrics-container{
        overflow-y: scroll;
        max-height: 240px;

        .metrics-item{
            margin-bottom: 5px;
            display: flex;
            .perspective-name{
                white-space: nowrap;
            }
            .el-tag{
                margin-left: 10px;
                font-size: 18px;
                margin-bottom: 5px
            }
        }
    }

    .desc-content{
        /deep/ .el-descriptions-item__label{
            width: 200px;
            font-size: 20px;
            font-weight: bold;
        }
    }

    .desc-empty{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

  }

  .dialog-content{
    box-shadow: 0 0 6px 1px rgba(0,0,0,0.1);
    padding: 20px;

    /deep/ .el-descriptions-item__label{
        width: 200px;
        font-size: 18px;
        font-weight: bold;
    }
  }
}
</style>
