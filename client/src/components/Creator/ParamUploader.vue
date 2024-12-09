<template>
    <div class="model-container">
        <div class="file-container">
            <div class="model-select">
                <div class="title">{{ $t("creator.param.selectTitle") }}</div>
                <div class="model">
                   <el-card v-for="(item,index) in paramList" :key="index" shadow="hover"
                            :class="['selectable', creatorInfo.parameter_id === item.id ?'selected':'']"
                            @click.native="menuSelect(item.id)">
                    <div class="model-name">{{ item.name }}</div>
                   </el-card> 
                </div>
                <!-- <div class="upload" @click="drawer=true">
                    <el-button type="primary" plain disabled class="upload-button">
                        <i class="el-icon-upload el-icon--right" style="font-size: 20px;"></i>
                        {{ $t("creator.arch.upload") }}
                    </el-button>
                </div> -->
            </div>
            <div class="desc-container">
                <div class="desc-content" v-if="selectedParam">
                    <div class="title">{{ $t("creator.param.paramDescription") }}</div>
                    <el-descriptions :column="1" border>
                        <el-descriptions-item :label="$t('paramTable.paramName')" :contentStyle="{ fontSize: '16px' }">{{ selectedParam.name }}</el-descriptions-item>
                        <el-descriptions-item :label="$t('paramTable.description')" :contentStyle="{ fontSize: '16px' }">
                            <div class="desc">
                                {{ selectedParam.description }}
                            </div>
                        </el-descriptions-item>
                        <el-descriptions-item :label="$t('paramTable.architecture')" :contentStyle="{ fontSize: '16px' }">{{ selectedParam.architecture }}</el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class='desc-empty' v-else>
                    <el-empty description="Empty"></el-empty>
                </div>
            </div>
        </div>
        <!-- <div class="param-uploader-container">
            <el-upload
                    drag
                    :on-success="onSuccess"
                    :on-error="onError"
                    :before-upload="beforeUpload"
                    ref="archUpload"
                    class="upload"  :action="parameterUploadAction"
                    :file-list="fileList"
                    :headers="{'Authorization' : 'Bearer '+ token}" :limit="1">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">{{ $t("creator.param.drag") }} <em>{{ $t("creator.param.click") }}</em></div>
                <div class="el-upload__tip" slot="tip">{{ $t("creator.param.tip1") }}<b>{{ $t("creator.param.tip2") }}</b>{{ $t("creator.param.tip3") }}<b>{{ $t("creator.param.tip4") }}</b>{{ $t("creator.param.tip5") }}</div>
            </el-upload>
        </div> -->
        <div style="text-align: center;margin-top: 20px">
            <el-button :loading="uploading" @click="pre">{{$t('operate.pre')}}</el-button>
            <el-button :loading="uploading" @click="next">{{$t('operate.next')}}</el-button>
            <!-- <el-button :disabled="!creatorInfo.parameter_id" :loading="uploading" @click="next">next</el-button> -->
        </div>
    </div>
</template>

<script>
import {parameterUploadAction} from "@/models/EvaluationModel";
import {mapState} from "vuex";

export default {
    name: "ParamUploader",
    data() {
        return {
            selected: "-1",
            uploading: false,
            parameterUploadAction,
            token: localStorage.getItem('access_token'),
        }
    },
    methods: {
        menuSelect(id) {
            this.selected = id
            this.$store.commit('setCreatorInfo', {"parameter_id": this.selected})
        },
        beforeUpload() {
            this.uploading = true
        },
        onSuccess(response, file) {
            this.$store.commit('setCreatorInfo', {parameter_id: response.parameter_id})
            this.$store.commit('setCreatorInfo', {parameter_file: file.name})
            this.uploading = false
        },
        onError() {
            this.uploading = false
        },
        pre() {
            this.$store.commit('setCreatorIndex', 3)
        },
        next() {
            this.$store.commit('setCreatorIndex', 5)
        }
    },
    mounted() {
        this.$store.dispatch('getParamList')
        this.selected = this.creatorInfo.parameter_id
        if(this.$route.params.aspect === 'correctness') this.$store.commit('setCreatorInfo', {"dataset_id": "-1"})
    },
    computed: {
        selectedParam() {
            return this.paramList ? this.paramList.find(item => (item.id == this.selected)) : null
        },
        ...mapState(['creatorInfo', 'paramList']),
    }
}
</script>

<style lang="scss" scoped>
@import "common";
</style>
