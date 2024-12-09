import axios from "axios";


export const userLogin = async function () {
    const userData = {
        "username": "Expert",
        "password": "123456"
      }
    const response = await axios.post('/users/login/', userData);
    if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
    }
}

export const userRegister = async function (userData) {
    const request = {
        username: userData.username,
        password: userData.password,
        email: userData.email,
        gender: userData.gender,
        age: userData.age,
        institute: userData.institute,
        title: userData.title,
        homepage_link: userData.homepageLink,
    };
    await axios.post('/users/register/', request);
}

export const getUserProfile = async function () {
    const access_token = localStorage.getItem("access_token");
    const response = await axios.get("/users/profile/", {
        headers: {
            Authorization: "Bearer " + access_token,
        },
    })    
    return response.data
}