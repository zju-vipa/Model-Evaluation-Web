<template>
    <div class="register-container">
        login/register
    </div>
</template>

<template>
    <div class="register-container">
      <h2 class="register-title">Create a new account</h2>
      <el-divider></el-divider>
      <el-form ref="registerForm" :model="userData" :rules="rules" label-width="85px">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="userData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userData.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="userData.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input type="email" v-model="userData.email"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="userData.gender" clearable placeholder="请选择性别">
            <el-option label="男性" value="male"></el-option>
            <el-option label="女性" value="female"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="userData.age"></el-input>
        </el-form-item>
        <el-form-item label="机构" prop="institute">
          <el-input type="text" v-model="userData.institute"></el-input>
        </el-form-item>
        <el-form-item label="头衔" prop="title">
          <el-input type="text" v-model="userData.title"></el-input>
        </el-form-item>
        <el-form-item label="个人主页" prop="homepageLink">
          <el-input type="text" v-model="userData.homepageLink"
            placeholder="请输入网页链接" clearable>
          </el-input>
        </el-form-item>
        <el-form-item class="register-submit">
          <el-button class="register-btn" type="primary" @click="validateForm">立即注册</el-button>
          <el-button class="reset-btn" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import { userRegister } from '@/models/UserModel'

export default {
  name: "Register",
  data() {
    return {
      userData: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        gender: '',
        age: null,
        institute: '',
        title: '',
        homepageLink: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.userData.password) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          },
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ],
        age: [
          { type: 'number', message: '年龄必须为数字值' },
        ],
      }
    };
  },
  methods: {
    validateForm() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          this.register();
        } else {
          console.log('表单验证失败');
        }
      });
    },
    async register() {
      try {
        const response = await userRegister(this.userData);
        this.$router.push('/login');
        console.log('注册请求已发送', response);
      } catch (error) {
        console.error('注册失败：', error);
      }
    },
    resetForm() {
      this.$refs.registerForm.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
  
  .register-container {
    width: 34%;
    margin: 30px auto;

    .register-title{
      font-weight: 500;
      font-size: 40px;
      color: rgb(0,0,0);
    }

    ::v-deep .el-form-item__label{
        font-weight: 500;
        font-size: 20px;
        color: rgb(0,0,0);
    }

    ::v-deep .el-input__inner {
        height: 40px;
        font-size: 18px;
    }

    .register-submit{
        margin-top: 40px;

        .register-btn{
            font-size: 20px;
        }

        .reset-btn{
            font-size: 18px;
            margin-left: 30px;
        }
    }
  }
</style>
