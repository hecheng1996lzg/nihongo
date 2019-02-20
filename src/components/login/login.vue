<template>
  <div id="login" class="blur-bg" :style="{backgroundImage: 'url(' + blurSrc + ')'}">
    <div class="container">
      <blur :blurSrc="blurSrc">
        <form @submit.prevent="login">
          <div class="main">
            <h2>登录</h2>
            <input v-model="username" placeholder="请输入用户名" required />
            <span class="sm">用户名只用于区分每个用户的学习数据。</span>
            <div class="btns">
              <button type="submit">登录</button>
              <button type="button">同步</button>
            </div>
          </div>
        </form>
      </blur>
    </div>
  </div>
</template>

<script>
  import blurSrc from '../../assets/images/bg_default.jpg';
  import Blur from '.././blur/blur';
  import {createUser} from '../../assets/js/userDataTemplet';

  export default {
    name: "login",
    data() {
      return {
        blurSrc,
        username: ''
      }
    },
    components: {
      Blur
    },
    methods:{
      login(){
        let user = createUser(this.username);
        localStorage.setItem('nihongo',JSON.stringify(user));
        this.$emit('isLogin');
        this.$router.push('index');
      }
    }
  }
</script>

<style scoped>
  #login {
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
  }

  .container {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }

  .main {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 23px;
  }

  h2{
    text-align: center;
    opacity: .6;
  }

  .btns{
    display: flex;
    margin-top: 10px;
  }

  .btns>button{
    flex: 1;
  }

  .btns>button:first-child{
    margin-right: 10px;
  }

</style>