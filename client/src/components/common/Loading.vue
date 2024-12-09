<template>
    <div class="loading-container" v-loading="loading">
    </div>
  </template>
  
  <script>
    export default {
        name: "Loading",
        data() {
            return{
                loading: true
            }
        },

    }
  </script>
  
  <style lang="scss" scoped>
   .loading-container{
     height: 800px;
   }
  </style>
  