<template>
    <div class="user-detail-container">
        <div class="title">{{$t("accountTable.account")}}</div>
        <div class="user-box">
            <div class="user-title">
                {{$t("accountTable.baseInfo")}}
            </div>
            <el-divider></el-divider>
            <el-form :model="userProfileForm" label-width="100px">
                <el-form-item :label="$t('accountTable.username')">
                    <el-input v-model="userProfileForm.username" :disabled="!isEditing"></el-input>
                </el-form-item>
                <!-- <el-form-item label="邮箱">
                    <el-input v-model="userProfileForm.email" :disabled="!isEditing"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="userProfileForm.gender" :disabled="!isEditing"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="userProfileForm.age" :disabled="!isEditing"></el-input>
                </el-form-item> -->
                <el-form-item :label="$t('accountTable.institution')">
                    <el-input v-model="userProfileForm.institute" :disabled="!isEditing"></el-input>
                </el-form-item>
                <el-form-item :label="$t('accountTable.title')">
                    <el-input v-model="userProfileForm.title" :disabled="!isEditing"></el-input>
                </el-form-item>
                <el-form-item :label="$t('accountTable.homepage')">
                    <el-input v-model="userProfileForm.homepage_link" :disabled="!isEditing"></el-input>
                </el-form-item>
                <!-- <el-form-item class="btn-item">
                    <el-button class="login-btn" type="primary" @click="toggleEditing">{{ isEditing ? $t('operate.save') : $t('operate.edit') }}</el-button>
                    <el-button class="cancle-btn" v-if="isEditing" @click="cancelEditing">{{ $t('operate.cancel') }}</el-button>
                    <el-button class="cancle-btn" v-else type="warning" @click="logOut">登出</el-button>
                </el-form-item> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {mapState} from "vuex";

export default {
    name: "Account",
    data() {
        return {
            isEditing: false,
            userProfileForm: {},
        };
    },
    methods: {
        logOut() {
            localStorage.removeItem('access_token');
            this.$store.commit('setUserInfo', null);
            this.$store.commit('setUserProfile', {});
            this.$router.push('/evaluation');
        },
        // getUserProfile() {
        //     const access_token = localStorage.getItem("access_token");
        //     axios.get("/users/profile/", {
        //         headers: {
        //             Authorization: "Bearer " + access_token,
        //         },
        //     }).then(response => {
        //         this.userProfile = response.data;
        //         this.userProfileForm = {...this.userProfile};
        //     }).catch(error => {
        //         console.error("error", error);
        //     });
        // },
        toggleEditing() {
            if (this.isEditing) {
                this.saveUserProfile();
            }
            this.isEditing = !this.isEditing;
        },
        cancelEditing() {
            this.userProfileForm = {...this.userProfile};
            this.isEditing = false;
        },
        saveUserProfile() {
            axios.post("/users/profile/save/", this.userProfileForm)
                .then(response => {
                    this.$store.commit('setUserProfile', {...this.userProfileForm});
                    this.isEditing = false;
                    console.log("Saved!", response);
                })
                .catch(error => {
                    console.error("error!", error);
                });
        },
    },
    computed: {
        ...mapState(['userProfile'])
    },
    mounted() {
        // this.getUserProfile();
        this.userProfileForm = {...this.userProfile};
    },
};
</script>

<style lang="scss" scoped>
@import "common";

::v-deep .el-input.is-disabled input {
  opacity: 1 !important;
  background-color: inherit !important;
  border-color: inherit !important;
  cursor: inherit !important;
}
</style>
