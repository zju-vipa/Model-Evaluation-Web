import Vue from "vue";
import Vuex, {Store} from 'vuex'
import {getDatasetList, getEnvList, getModelList, getTaskList, getParamList} from "@/models/EvaluationModel";
import { getUserProfile } from "@/models/UserModel";

Vue.use(Vuex)
const store = new Store({
    state: {
        envList: null,
        modelList: null,
        datasetList: null,
        taskList: null,
        paramList: null,
        creatorIndex: 0,
        creatorInfo: {},
        perspectiveMetrics: null,       //用于展示已选择的评价指标


        taskAll: null,
        datasetAll: null,
        modelAll: null,
        aspectAll: [    
            {
                "id": 1,
                "name": "correctness"
            },
            {
                "id": 2,
                "name": "robustness"
            },
            {
                "id": 3,
                "name": "fairness"
            },
            {
                "id": 4,
                "name": "transferability"
            }
        ],

        userInfo: null,
        userProfile: {},
        // evaluateStatus: 'error',
        // evaluateResult: null,
        // evaluateMessage: null,
    },
    mutations: {
        setUserInfo(state, username) {
            state.userInfo = username;
        },
        setUserProfile(state, userProfile){
            state.userProfile = userProfile
        },
        setEnvList(state, envList) {
            state.envList = envList
        },
        setParamList(state, paramList) {
            state.paramList = paramList
        },
        setModelList(state, modelList) {
            state.modelList = modelList
        },
        setDatasetList(state, datasetList) {
            state.datasetList = datasetList
        },
        setTaskList(state, taskList) {
            state.taskList = taskList
        },
        setModelAll(state, modelAll) {
            state.modelAll = modelAll
        },
        setDatasetAll(state, datasetAll) {
            state.datasetAll = datasetAll
        },
        setTaskAll(state, taskAll) {
            state.taskAll = taskAll
        },
        setPerspectiveMetrics(state, info){
            state.perspectiveMetrics = info
        },
        setCreatorInfo(state, info) {
            state.creatorInfo = {...state.creatorInfo, ...info}
        },
        resetCreatorInfo(state) {
            state.creatorInfo = {}
        },
        setCreatorIndex(state, index) {
            state.creatorIndex = index
        },
        setEvaluateStatus(state, status) {
            state.evaluateStatus = status
        },
        setEvaluateResult(state, result) {
            state.evaluateResult = result
        },
        setEvaluateMessage(state, message) {
            state.evaluateMessage = message
        }
    },
    actions: {
        async getUserProfile ({commit}){
            const data = await getUserProfile()
            commit('setUserProfile', data)
        },
        async getEnvList({commit}) {
            const data = await getEnvList()
            data.push({"id": 2, "name": "tensorflow"})
            commit('setEnvList', data)
        },
        async getModelList({commit, state}) {
            const data = await getModelList(state.creatorInfo.task_id || '')
            data.map(item=>{
                const task = state.taskAll.find(t => t.id === item.task)
                item.task = task.name
                item.update_time = item.update_time.substring(0, 10)
                item.upload_time = item.upload_time.substring(0, 10)
            })
            commit('setModelList', data)
        },
        async getDatasetList({commit, state}) {
            const data = await getDatasetList(state.creatorInfo.task_id || '')
            data.map(item=>{
                item.update_time = item.update_time.substring(0, 10)
                item.upload_time = item.upload_time.substring(0, 10)
                item.selectable = true
            })
            commit('setDatasetList', data)
        },
        async getParamList({commit, state}) {
            const data = await getParamList(state.creatorInfo.architecture_id || '')
            commit('setParamList', data)
        },
        async getTaskList({commit}) {
            const data = await getTaskList()
            commit('setTaskList', data)
        },
        async getModelAll({commit, state}) {
            const data = await getModelList()
            data.map(item=>{
                const task = state.taskAll.find(t => t.id === item.task)
                item.task = task.name
                item.update_time = item.update_time.substring(0, 10)
                item.upload_time = item.upload_time.substring(0, 10)
            })
            commit('setModelAll', data)
        },
        async getDatasetAll({commit}) {
            const data = await getDatasetList()
            data.map(item=>{
                item.update_time = item.update_time.substring(0, 10)
                item.upload_time = item.upload_time.substring(0, 10)
            })
            commit('setDatasetAll', data)
        },
        async getTaskAll({commit}) {
            const data = await getTaskList()
            commit('setTaskAll', data)
        }
    }
})

export default store
