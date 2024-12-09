import axios from "axios";
import { Message } from 'element-ui';

export const getEnvList = async function () {
    try{
        const res = await axios.get('/models/environments/');
        return res.data
    } catch (error) {
        console.error('Error fetching environment list:', error);
        Message.error('获取环境列表失败，请稍后重试'); // 使用 Message 组件显示错误信息
    }
    
}
export const getTaskList = async function () {
    const res = await axios.get('/models/task_view/');
    return res.data
}
export const getModelList = async function (task) {
    const res = await axios.get('/models/list/architecture/', {data: {task_id: task}});
    return res.data
}
export const getDatasetList = async function (task) {
    const res = await axios.get('/datasets/list/', {data: {task_id: task}});
    return res.data
}
export const getLeaderList = async function (task_id, dataset_id, aspect_id) {
    const res = await axios.post('/tasks/result_view/', {task_id, dataset_id, aspect_id});
    return res.data
}

export const getMetricList = async function (task, aspect, perspective) {
    const res = await axios.get('/models/list/metrics/', {params: {task_id: task, aspect_id: aspect, perspective_id: perspective}});
    return res.data
}
export const getParamList = async function (architecture) {
    const res = await axios.get('/models/list/parameters/', {params: {architecture_id: architecture}});
    return res.data
}

export const archUploadAction = "/api/models/upload/architecture/"
export const parameterUploadAction = "/api/tasks/parameter/"

export const createEvaluation = async function (createInfo) {
    const res = await axios.post('/tasks/creator/', createInfo);
    return res.data
}

export const getModelStatus = async function (instance_id) {
    const res = await axios.post('/tasks/result_view/', {instance_id});
    return res.data[0]
}

export const getEvaluationInfo = async function (instance_id) {
    const res = await axios.post('/tasks/result_view/', {instance_id});
    return res.data[0]
}