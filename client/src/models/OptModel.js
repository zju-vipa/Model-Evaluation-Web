import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/optapi",
    // withCredentials: true,
    crossDomain: true // 启用跨域请求
  });

export const startModelDoctor = async function (form) {

    const response = await axiosInstance.post('/demo/test', form);

    return response
}

