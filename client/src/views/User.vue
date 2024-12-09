<template>
  <div class="user-container">
    <el-menu class="menu" default-active="/user/model" :router="true">
      <div class="username">
        <i class="el-icon-user-solid" style="font-size: 35px; color: rgb(22, 119, 255); margin-left: 3px;"></i>
        <span>{{username}}</span>
      </div>
      <el-menu-item index="/user/model">
        <i class="el-icon-cpu" style="font-size: 30px; color: rgb(22, 119, 255); padding-top: 5px;"></i>
        <span class="user-select">{{ $t('user.model') }}</span>
      </el-menu-item>
      <el-menu-item index="/user/dataset">
        <i class="el-icon-document-copy" style="font-size: 30px; color: rgb(22, 119, 255); padding-top: 5px;"></i>
        <span class="user-select">{{ $t('user.dataset') }}</span>
      </el-menu-item>
      <!-- <el-menu-item index="/user/opt">
        <i class="el-icon-s-operation" style="font-size: 30px; color: rgb(22, 119, 255); padding-top: 5px;"></i>
        <span class="user-select">{{ $t('user.optimization') }}</span>
      </el-menu-item> -->
      <el-menu-item index="/user/account">
        <i class="el-icon-user" style="font-size: 30px; color: rgb(22, 119, 255); padding-top: 5px;"></i>
        <span class="user-select">{{ $t('user.account') }}</span>
      </el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "User",
  data() {
      return {
          username:'user'
      };
  },
  computed: {
    ...mapState(['userProfile'])
  },
  mounted() {
    this.username = this.userProfile.username
  },

}
</script>

<style lang="scss" scoped>
.user-container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  height: 93vh;

  .menu {
    width: 13%;
    margin-right: 20px;
    text-align: center;

    .username{
      margin: 50px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      line-height: 30px;
    }

    .el-menu-item {
      font-size: 22px;
      height: 120px;
      margin: 10px 0;
      padding: 0 !important;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .el-menu-item.is-active{
    //设置背景颜色
      background-color: #f2f2f2 !important;
      color: rgb(22, 119, 255) !important;
    }

  }
}
</style>
