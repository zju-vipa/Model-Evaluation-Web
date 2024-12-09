<template>
    <div class="model-container">
        <div class="file-container">
            <div class="model-select">
                <div class="title">{{ $t("creator.dataset.selectTitle") }}</div>
                <div class="model">
                    <el-card shadow="hover" v-for="(item,index) in datasetList" :key="index" v-if="item.selectable"
                                :class="['selectable', creatorInfo.dataset_id === item.id ?'selected':'']"
                                @click.native="menuSelect(item.id)">
                        <div class="model-name">{{ item.name }}</div>
                    </el-card> 
                    <el-tooltip content="选择权重的训练数据集和评估数据集不一致" placement="right" effect="light"
                                v-for="(item,index) in datasetList" :key="index" v-if="!item.selectable">
                        <el-card shadow="never"
                                    class="not-selectable">
                            <div class="model-name">{{ item.name }}</div>
                        </el-card> 
                    </el-tooltip>
                </div>
                <!-- <div class="upload" @click="drawer=true">
                    <el-button type="primary" plain disabled class="upload-button">
                        <i class="el-icon-upload el-icon--right" style="font-size: 20px;"></i>
                        {{ $t("creator.arch.upload") }}
                    </el-button>
                </div> -->
            </div>
            <div class="desc-container">
                <div class="desc-content" v-if="selectedDataset">
                    <div class="title">{{ $t("creator.dataset.datasetDescription") }}</div>
                    <el-descriptions :column="1" border>
                        <el-descriptions-item :label="$t('datasetTable.datasetName')" :contentStyle="{ fontSize: '16px' }">{{ selectedDataset.name }}</el-descriptions-item>
                        <el-descriptions-item :label="$t('datasetTable.description')" :contentStyle="{ fontSize: '16px' }">
                            <div class="desc">
                                {{ selectedDataset.description }}
                            </div>
                        </el-descriptions-item>
                        <el-descriptions-item :label="$t('datasetTable.paperLink')" :contentStyle="{ fontSize: '16px' }">
                            <el-link :href="selectedDataset.paper_link" target="_blank" :underline="false" style="font-size: 16px;">{{ selectedDataset.paper_link }}</el-link>
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class='desc-empty' v-else>
                    <el-empty description="Empty"></el-empty>
                </div>
            </div>
        </div>
        <div class="btn-group" style="text-align: center;margin-top: 20px">
            <el-button @click="pre">{{$t('operate.pre')}}</el-button>
            <el-button :disabled="!creatorInfo.dataset_id" @click="next">{{$t('operate.next')}}</el-button>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import {Message} from "element-ui";

export default {
    name: "DatasetSelector",
    data() {
        return {
            selected: "-1",

        }
    },
    mounted() {
        this.$store.dispatch('getDatasetList')
        this.selected = this.creatorInfo.dataset_id
    },
    watch: {
        datasetList(newValue) {
            const param = this.paramList.find(item => item.id === this.creatorInfo.parameter_id)
            const aspect = this.$route.params.aspect
            if (newValue.length > 0 && aspect === 'correctness') {
                this.datasetList.map(item=>{
                    if(param.train_dataset_name !== item.name)
                        item.selectable = false
                })
            }
        }
    },
    methods: {
        menuSelect(id) {
            this.selected = id
            this.$store.commit('setCreatorInfo', {"dataset_id": this.selected})
        },
        pre() {
            this.$store.commit('setCreatorIndex', 4)
        },
        next() {
            this.$store.commit('setCreatorIndex', 6)
        }
    },
    computed: {
        selectedDataset() {
            return this.datasetList ? this.datasetList.find(item => (item.id == this.selected)) : null
        },
        ...mapState(['creatorInfo', 'datasetList', 'paramList'])
    }
}
</script>

<style lang="scss" scoped>
@import "common";
</style>
