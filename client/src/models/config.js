import axios from "axios";

axios.defaults.baseURL = '/api'
axios.interceptors.request.use((config) => {
    let token = localStorage.getItem('access_token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    // config.headers['Authorization'] = `Bearer ${token}`
    return config
}, (err) => {
    return Promise.reject(err)
})
axios.interceptors.response.use((response) => {
    // console.log(response)
    return response
}, (err) => {
    // console.log(err)
    return Promise.reject(err)
})
// export default {
//     ...userApis
// }
