<template>
    <div class="model-container">
        <div class="file-container">
            <div class="model-select">
                <div class="title">{{ $t("creator.arch.selectTitle") }}</div>
                <div class="model">
                   <el-card v-for="(item,index) in modelList" :key="index" shadow="hover"
                            :class="['selectable', creatorInfo.architecture_id === item.id ?'selected':'']"
                            @click.native="menuSelect(item.id)">
                    <div class="model-name">{{ item.name }}</div>
                   </el-card> 
                </div>
                <!-- <div class="upload" @click="drawer=true">
                    <el-button type="primary" plain class="upload-button">
                        <i class="el-icon-upload el-icon--right" style="font-size: 20px;"></i>
                        {{ $t("creator.arch.upload") }}
                    </el-button>
                </div> -->
            </div>
            <div class="desc-container">
                <div class="desc-content" v-if="selectedModel">
                    <div class="title">{{ $t("creator.arch.modelDescription") }}</div>
                    <el-descriptions :column="1" border>
                        <el-descriptions-item :label="$t('modelTable.modelName')" :contentStyle="{ fontSize: '16px' }">{{ selectedModel.name }}</el-descriptions-item>
                        <el-descriptions-item :label="$t('modelTable.description')" :contentStyle="{ fontSize: '16px'}">
                            <div class="desc">
                                {{ selectedModel.description }}
                            </div>
                        </el-descriptions-item>
                        <el-descriptions-item :label="$t('modelTable.applicableTasks')" :contentStyle="{ fontSize: '16px' }">{{ selectedModel.task }}</el-descriptions-item>
                        <el-descriptions-item :label="$t('modelTable.paperLink')" :contentStyle="{ fontSize: '15px' }">
                            <el-link :href="selectedModel.paper_link" target="_blank" :underline="false" style="font-size: 16px;">{{ selectedModel.paper_link }}</el-link>
                        </el-descriptions-item>
                        <el-descriptions-item :label="$t('modelTable.codeLink')" :contentStyle="{ fontSize: '15px' }">
                            <el-link :href="selectedModel.code_link" target="_blank" :underline="false" style="font-size: 16px;">{{ selectedModel.code_link }}</el-link>
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class='desc-empty' v-else>
                    <el-empty></el-empty>
                </div>
            </div>
        </div>
        <div class="btn-group" style="text-align: center;margin-top: 20px">
            <el-button @click="pre">{{$t('operate.pre')}}</el-button>
            <el-button :disabled="!creatorInfo.architecture_id" @click="next">{{$t('operate.next')}}</el-button>
            <!-- <el-button @click="next">next</el-button> -->
        </div>
        <el-drawer title="Upload Model Arch"
                   :visible.sync="drawer"
                   direction="rtl">
            <div class="drawer-container">
                <h1 class="title">Arch Tips</h1>
                <!--你可以任意组织你的模型架构文件，你只需要在文件的跟路径下创建一个python文件，在其中定义函数get_model在其中返回继承了nn.Module的模型模块即可。注意系统仅接受.zip格式的文件-->
                <div>You can organize your model schema file as much as you want, you just need to create a python file
                    under the path to the file, define the function <b>get_model</b> which return the model class.
                    <br/>Note: Only files in <b>.zip</b> format are accepted.
                </div>
                <img src="@/assets/arch_tips.png" width="100%" style="margin: 10px auto">
                <div class="upload">
                    <el-upload
                            drag
                            :on-success="onSuccess"
                            :on-error="onError"
                            :before-upload="beforeUpload"
                            ref="archUpload"
                            :auto-upload="false" accept=".zip" :action="archUploadAction"
                            :headers="{'Authorization' : 'Bearer '+ token}" :limit="1"
                            :data="{'task_id':creatorInfo.task_id,...form,is_public: form.is_public?1:0}">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">Drag here,or <em>Click</em></div>
                        <div class="el-upload__tip" slot="tip">Note: Only files in <b>.zip</b> format are accepted</div>
                    </el-upload>
                </div>
                <el-form :model="form" ref="archForm" label-width="100px">
                    <el-form-item
                            label="model name"
                            prop="name"
                            :rules="[ { required: true, message: 'model name can not be empty'}]">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="description" prop="description">
                        <el-input v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="paper_link" prop="paper_link">
                        <el-input v-model="form.paper_link"></el-input>
                    </el-form-item>
                    <el-form-item label="code_link" prop="code_link">
                        <el-input v-model="form.code_link"></el-input>
                    </el-form-item>
                    <el-form-item label="is_public" prop="is_public">
                        <el-checkbox v-model="form.is_public"></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <div class="upload-button">
                            <el-button :loading="uploading" type="primary" @click="submitForm('archForm')">提交</el-button>
                            <el-button :loading="uploading" @click="resetForm('archForm')">重置</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import {mapState} from "vuex";
import {archUploadAction} from "@/models/EvaluationModel";

export default {
    name: "ArchSelector",
    data() {
        return {
            selected: "-1",
            // selectedModel: {},
            drawer: false,
            uploading: false,
            archUploadAction,
            token: localStorage.getItem('access_token'),
            form: {
                name: '',
                description: '',
                paper_link: '',
                code_link: '',
                is_public: true,
            }
        }
    },
    mounted() {
        this.$store.dispatch('getModelList')
        this.selected = this.creatorInfo.architecture_id
    },
    methods: {
        menuSelect(id) {
            // this.selectedModel = this.modelList.find(item => (item.id === index))
            this.selected = id
            this.$store.commit('setCreatorInfo', {"architecture_id": this.selected})
        },
        getTaskNameById(id){
            const item = this.modelList.find(item => item.id === id);
            return item ? item.name : null; // 如果找到对应的项则返回 name 值，否则返回 null
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$refs.archUpload.submit();
                } else {
                    return false;
                }
            });
        },
        beforeUpload() {
            this.uploading = true
        },
        onSuccess() {
            this.uploading = false
            this.$refs['archForm'].resetFields();
            this.drawer = false
            this.$store.dispatch('getModelList')
            this.selectedModel = this.modelList.find(item => (item.id == this.creatorInfo.architecture_id))
        },
        onError() {
            this.uploading = false
            this.$refs['archForm'].resetFields();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        pre() {
            this.$store.commit('setCreatorIndex', 2)
        },
        next() {
            this.$store.commit('setCreatorIndex', 4)
        }
    },
    computed: {
        selectedModel() {
            return this.modelList ? this.modelList.find(item => (item.id == this.selected)) : null
        },
        ...mapState(['modelList', 'creatorInfo'])
    }
}
</script>

<style lang="scss" scoped>
@import "common";
</style>
