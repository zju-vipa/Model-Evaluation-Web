<template>
    <div class="footer-container">
        <el-divider></el-divider>
        
        <div class="team" v-if="isHomeRoute">
          <div class="maintainers">{{ $t("footer.maintainers") }}</div>
          <div class="line"></div>
          <div class="people">
            <div v-for="p in people" :key="p.name">
              <span class="name">{{p.name}}</span>
              <span class="department">{{p.department}}</span>
              <el-link :href="'mailto:' + p.email" icon="el-icon-message">{{ p.email }}</el-link>
            </div>
          </div>

        </div>
        <!-- <div class="link">
            <el-link :href="url" icon="el-icon-message" class="contact">contact@vipazoo.cn</el-link>
        </div> -->
        <div class="link">
          Copyright© 2024 ZJU VIPA All Rights Reserved
        </div>
    </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      url: "http://www.vipazoo.cn",
      people: [
          { name: 'Jiacong Hu', department: 'College of Computer Science and Technology，Zhejiang University', email: 'jiaconghu@zju.edu.cn' },
          { name: 'Jinxun Wu', department: 'College of Computer Science and Technology，Zhejiang University', email: 'jinxunwu@zju.edu.cn' },
          { name: 'Guoxiang Li', department: 'School of Software Technology，Zhejiang University', email: 'driftee@zju.edu.cn' },
          { name: 'Haoze Jiang', department: 'School of Software Technology，Zhejiang University', email: 'hz_jiang@zju.edu.cn' },
          { name: 'Jiazhen Yang', department: 'School of Software Technology，Zhejiang University', email: 'yangjiazhen0915@outlook.com' }
        ]
    }
  },
  computed: {
    isHomeRoute() {
      return this.$route.path === '/home';
    }
  }
}
</script>

<style lang="scss" scoped>
    .footer-container{
        width: 76%;
        margin: 40px auto;
        box-sizing: border-box;
        .team{
          margin-bottom: 40px; 
          .maintainers{
            text-align: center;
            font-size: 30px;
            font-weight: bold;
          }
          .line{
            width:60%;
            margin: 20px auto;
            height:2px;
            background: -webkit-linear-gradient(left, #fff -4%,#000000 50%,#fff 100%);
         }
          
          .people{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-size: 18px;
            .name{
              color: #1677ff;
              margin-right: 20px;
            }

            .department {
              margin-right: 10px;
            }
          }

        }
        .link{
            margin: 40px, auto;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-size: 20px;

            .contact{
              font-size: 18px;
            }
        }
    }
</style>
