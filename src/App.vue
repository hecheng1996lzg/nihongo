<template>
  <div id="app">
    <m-header ref="header"></m-header>
    <router-view class="main-padding" @isLogin="isLogin"></router-view>
  </div>
</template>

<script>
  import MHeader from './components/m-header/m-header';

  export default {
    name: 'app',
    components: {
      MHeader,
    },
    methods: {
      isLogin() {
        this.$refs.header.isLogin();
      }
    }
  }
</script>

<style>
  #app {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  .main-padding {
    padding-top: 50px;
  }
</style>
<style rel="stylesheet" src="./assets/style/custom.css"></style>
<style rel="stylesheet" src="./assets/style/iconfont.css"></style>
