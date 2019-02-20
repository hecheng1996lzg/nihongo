<template>
  <div class="header">
    <div class="top-nav pWidth">
      <img class="logo" src="./logo.jpg" alt="">
      <img v-if="username" @click="sideShow = !sideShow" class="head" src="./hd_default.png" alt="">
    </div>
    <transition name="fade">
      <div v-if="sideShow && username" class="side-bar">
        <div @click="sideShow = false" class="close iconfont icon-guanbi"></div>
        <div v-if="username" class="info">
          <span class="iconfont icon-my"></span>
          <span>{{ username }}</span>
        </div>
        <ul class="menu">
          <li @click="()=>{this.$router.push('/index')}">
            <span class="iconfont icon-home"></span>
            <span>回到首页</span>
          </li>
          <li>
            <span class="iconfont icon-global"></span>
            <span>存档同步</span>
          </li>
          <li @click="logout">
            <span class="iconfont icon-exit"></span>
            <span>退出登录</span>
          </li>
          <li>
            <span class="iconfont icon-repair"></span>
            <span>开发中呢</span>
          </li>
        </ul>
        <div class="version">
          <span class="sm">Version 1.0</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sideShow: false,
        username: '',
      }
    },
    mounted(){
      this.isLogin();
    },
    methods:{
      isLogin(){
        let user = JSON.parse(localStorage.getItem('nihongo'));
        if(user){
          this.username = user.username;
        }else{
          this.$router.push('login');
        }
      },
      logout(){
        this.username = false;
        localStorage.removeItem('nihongo');
        this.isLogin();
      }
    }
  }
</script>

<style scoped>
  .header{
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 50px;
  }

  .top-nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    padding: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  .logo {
    height: 100%;
  }

  .head {
    position: relative;
    z-index: 1;
    height: 100%;
    border-radius: 50%;
  }

  .side-bar {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 150px;
    color: #fff;
    background: rgb(38, 46, 51);
  }

  .iconfont {
    opacity: 0.6;
  }

  .close {
    font-size: 20px;
    padding: 13px;
  }

  .info {
    padding: 0 10px;
    margin: 20px 0;
  }

  .menu {
    margin: 20px 0;
    font-size: 18px;
  }

  .menu > li {
    padding: 5px 10px;
  }

  .menu > li > .iconfont {
    margin-right: 3px;
  }

  .version {
    padding: 0 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: transform .3s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
    transform: translateX(100%);
  }
</style>