<template>
    <div class="login-container">
        login/register
    </div>
</template>

<template>
    <div class="login-container">
        <h2 class="login-title">Log in</h2>
        <el-divider></el-divider>
        <el-form ref="loginForm" :model="userData" :rules="rules" label-width="80px" label-position="top" :hide-required-asterisk="true">
            <el-form-item label="Username" prop="username">
                <el-input size="medium" type="text" v-model="userData.username"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input size="medium" type="password" v-model="userData.password"></el-input>
            </el-form-item>
            <el-form-item class="login-submit">
                <el-button class="login-btn" type="primary" @click="validateForm">Log in</el-button>
                <el-button class="register-btn">
                    <router-link class="register-link" to="/register">Register</router-link>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {userLogin} from '@/models/UserModel'

export default {
    name: "Login",
    data() {
        return {
            userData: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'},
                ],
            }
        };
    },
    methods: {
        validateForm() {
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    const data = await userLogin(this.userData);
                    if (data.access) {
                        this.$store.commit('setUserInfo', {});
                        this.$store.dispatch('getUserProfile')
                        this.$router.push('/user');
                    }
                } else {
                    console.log('表单验证失败');
                }
            });
        },
    },
}
</script>

<style lang="scss" scoped>
.login-container {
    width: 34%; /* 可视窗口的宽度 */
    margin: 100px auto;

    .login-title {
        font-weight: 500;
        font-size: 40px;
        color: rgb(0,0,0);
    }

    ::v-deep .el-form-item__label{
        font-weight: 500;
        font-size: 24px;
        color: rgb(0,0,0);
        padding-bottom: 1px;
    }

    ::v-deep .el-input__inner {
        height: 50px;
        font-size: 22px;
    }

    .login-submit{
        margin-top: 60px;

        .login-btn{
            font-size: 22px;
        }

        .register-btn{
            font-size: 22px;
            margin-left: 30px;
            .register-link{
                text-decoration: none;
                color: rgb(0,0,0);
            }
        }
    }
}
</style>
