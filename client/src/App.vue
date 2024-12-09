<template>
    <div id="app">
        <Header/>
        <!-- 占位 -->
        <div style="height: 50px;"></div>
        <router-view/>
        <Footer/>
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
}

* {
    padding: 0;
    margin: 0;
}
</style>
<script>
import Header from "./components/common/Header";
import Footer from "./components/common/Footer"
import Loading from "./components/common/Loading"
import {userLogin} from '@/models/UserModel'
import {mapState} from "vuex";
import { RouterView } from "vue-router";

export default {
    computed: {
        ...mapState(['datasetAll', 'taskAll', 'aspectAll'])
    },
    async mounted() {
        //const token = localStorage.getItem('access_token')
        // if (!token) {
        //     await userLogin();
        // }
        await userLogin();
        this.$store.commit('setUserInfo', {});
        this.$store.dispatch('getUserProfile')
        this.$store.dispatch('getTaskAll')
        this.$store.dispatch('getModelAll')
        this.$store.dispatch('getDatasetAll')
        // this.timer = setTimeout(() => {
        //     if(this.datasetAll && this.taskAll){
        //         this.isReady = true
        //         clearInterval(this.timer)
        //     }
        // }, 1000);

    },
    components: { Header, Footer, Loading, RouterView }
}
</script>
