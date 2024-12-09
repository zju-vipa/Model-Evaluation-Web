<template>
  <div class="header-box">
    <div class="header-container">
      <div class="left">
        <img src="@/assets/logoME.png" alt="logo" @click="goToHome">
        <!-- <el-input :placeholder="$t('header.search')" class="input" v-model="search"></el-input> -->
        <div class="name">{{ $t('header.name') }}</div>
        <div class="nav-group">
          <el-dropdown @command="goToDetail">
            <router-link :class="['head-link',activateIndex === 'home'?'linked':'']" to="/home">
              {{ $t('header.home') }}
            </router-link>
            <el-dropdown-menu slot="dropdown" class="prop-submenu">
              <el-dropdown-item class="prop" command="correctness">Correctness</el-dropdown-item>
              <el-dropdown-item class="prop" command="robustness">Robustness</el-dropdown-item>
              <el-dropdown-item class="prop" command="fairness">Fairness</el-dropdown-item>
              <el-dropdown-item class="prop" command="transferability">Transferability</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="goToEvaluation">
            <a :class="['head-link',activateIndex === 'evaluation'?'linked':'']">
              {{ evaluationTitle }}
            </a>
            <el-dropdown-menu slot="dropdown" class="prop-submenu2">
              <el-dropdown-item class="prop" command="correctness">Correctness</el-dropdown-item>
              <el-dropdown-item class="prop" command="robustness">Robustness</el-dropdown-item>
              <el-dropdown-item class="prop" command="fairness">Fairness</el-dropdown-item>
              <el-dropdown-item class="prop" command="transferability">Transferability</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <router-link :class="['head-link',activateIndex === 'optimization'?'linked':'']" to="/optimization">
            {{ $t('header.optimization') }}
          </router-link>
          <router-link :class="['head-link',activateIndex === 'market'?'linked':'']" to="/market">
            {{ $t('header.market') }}
          </router-link> -->
        </div>
      </div>
      <div class="right">
        <div class="lang-select">
          <el-dropdown @command="changeLanguage">
          <el-button size="small" class="el-dropdown-link">
            {{ $t('header.langSelect') }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="lang-item" command='zh'>简体中文</el-dropdown-item>
              <el-dropdown-item class="lang-item" command='en' divided>English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- <div class="prop-icon"  @click="$router.push('/user')" v-if="userInfo">
          <svg-icon icon-class="boy" class="icon"/>
        </div> -->
        <!-- <span @click="$router.push('/login')" class="log-reg">{{ $t('header.logAndReg') }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      search: "",
      activateIndex: 'home',
      aspect: '',
    }
  },
  methods: {
    changeLanguage(e) {
      this.$i18n.locale = e
    },
    goToHome() {
      // 编程式导航到主页
      this.$router.push({ path: '/home' });
    },
    goToDetail(command){
      this.$router.push('/home/detail/' + command)
    },
    goToEvaluation(command){
      this.$router.push('/evaluation/creator/' + command)
    },
  },
  created() {
    this.$watch(
        () => this.$route.path,
        () => {
          this.activateIndex = this.$route.path.split('/')[1]
          this.aspect = this.$route.params.aspect
        },
        {immediate: true}
    )
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    evaluationTitle() {
      if(this.aspect === 'correctness') return this.$t("commonUpper.correctness")
      else if(this.aspect === 'robustness') return this.$t("commonUpper.robustness")
      else if(this.aspect === 'fairness') return this.$t("commonUpper.fairness")
      else if(this.aspect === 'transferability') return this.$t("commonUpper.transferability")
      else return this.$t('header.evaluation')
    }
  },
  watch: {
    $route(to) {
      this.activateIndex = to.path.split('/')[1]
      this.aspect = this.$route.params.aspect
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/variables";
.header-box{
  width: 100%;
  background-color: $headerBackground;
  box-shadow: 0 2px 4px 0;
  position: fixed;
  z-index:9999;

  .header-container {
    display: flex;
    flex-direction: row;
    width: 90%;
    //justify-content: space-between;
    height: 50px;
    margin: 7px auto; 

    .left {
      display: flex;
      flex-direction: row;
      align-items: center; 
      flex-grow: 1;

      img {
        height: 90%;
        margin-left: 10px;
        margin-right: 20px;
      }

      .menu {
        height: 100%;
      }

      .input {
        width: 30%;
      }

      .name {
        width: 20%;
        font-size: 36px;
        font-weight: bolder;
        color: #0051ff;
        margin-right: 40px;
      }

      .nav-group {
        // display: flex;
        font-size: 24px;

        .head-link {
          cursor: pointer;
          position: relative;
          color: rgb(107, 107, 107);
          padding-right: 10px;
          height: 20px;
          text-decoration: none;
          font-size: 28px;
          margin: 0 20px;
          white-space: nowrap;
        }

        .head-link::before {
          content: "";
          position: absolute;
          bottom: -18px;
          left: -7px;
          width: 0;
          height: 5px;
          background-color: rgb(68, 114, 196);
          opacity: 0;
          transition: all 0.2s ease-in-out;
        }

        /* 悬停样式 */
        .head-link:hover::before {
          width: 104%;
        }

        .head-link:hover {
          color: rgb(0, 0, 0);
        }

        .linked {
          color:rgb(0, 0, 0);
          font-weight: bolder;
        }

        .linked::before {
          width: 104%;
          opacity: 1;
        }

      }
    }

    .right {
      display: flex;
      align-items: center;
      // padding-right: 60px;
      flex-grow: 0;
      width: 160px;

      .lang-select {
        width: 100px;
        margin-right: 20px;
        font-weight: bold;
        .el-dropdown-link {
          cursor: pointer;
          color: rgb(0, 0, 0);
          font-size: 20px;
        }

        .el-icon-arrow-down {
          font-size: 12px;
        }
      }

      .avatar {
        width: 50px;
        margin-left: 30px;
        cursor: pointer;
      }

      .prop-icon{
        width: 40px;
        margin-left: 30px;
        cursor: pointer;
        .icon {
          height: 40px;
          width: 40px;
        }
      }

      .log-reg {
        width: 100px;
        margin-left: 30px;
        color: #000000;
        font-size: 22px;
        cursor: pointer;
        font-weight: bolder;
        // text-decoration: underline;
      }
    }
  }
}
</style>

<style lang="scss">
.prop-submenu{
  left: 534px !important;
}
.prop-submenu2{
  left: 664px !important;
}
.lang-item {
  font-size: 18px;
  line-height: 34px;
}
.prop {
  color: #0E1A15 !important;
  font-size: 20px;
  line-height: 40px;
}
// 解决hover样式默认
.prop:hover {
  color: #0E1A15 !important;
  font-size: 20px;
  background: #EBEEF5 !important;
}
// 解决focus样式默认
.prop:not(.is-disabled):focus {
  color: #0E1A15 !important;
  font-size: 20px;
  background: #EBEEF5 !important;
}

.el-popper[x-placement^=bottom] .popper__arrow{
  border: none;
}
.el-popper[x-placement^=bottom] .popper__arrow::after{
  border: none;
}
.el-message {
  z-index: 99999999 !important;
}
</style>