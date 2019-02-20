<template>
  <div>
    <div class="banner">
      <div class="search">
        <input placeholder="搜索单词或假名"/>
        <button>搜索</button>
      </div>
    </div>
    <article class="classify">
      <h2>开放的功能</h2>
      <ul class="classify-list">
        <li>
          <div class="iconWrapper bg-color-red" @click="()=>{this.$router.push('word')}">
            <span class="iconfont icon-shenjing"></span>
          </div>
          <span>记忆单词</span>
        </li>
        <li>
          <div class="iconWrapper bg-color-blue">
            <span class="iconfont icon-liebiao "></span>
          </div>
          <span>平片假名</span>
        </li>
        <li>
          <div class="iconWrapper bg-color-green">
            <span class="iconfont icon-zuzhixiaxia "></span>
          </div>
          <span>假名连线</span>
        </li>
      </ul>
    </article>
    <article>
      <h2>学习数据</h2>
      <ul>
        <li>
          <progress-bar :value="21" :max="50">假名</progress-bar>
          <progress-bar :value="32" :max="100" :color="'rgb(225,20,127)'">单词</progress-bar>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
  import ProgressBar from '../progress-bar/progress-bar';

  export default {
    name: "index",
    components: {
      ProgressBar,
    }
  }
</script>

<style scoped>
  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 180px;
    background-image: url("./banner.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .search {
    display: flex;
  }

  .search > input {
    border-radius: 5px 0 0 5px;
  }

  .search > button {
    border: none;
    border-radius: 0 5px 5px 0;
    background: rgba(0, 0, 0, .6);
  }

  article {
    margin: 30px 10px;
  }

  article > h2 {
    color: #333;
    border-bottom: 1px solid rgba(222, 222, 222, .2);
  }

  .classify-list {
    display: flex;
  }

  .classify-list > li {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .iconWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    margin: 5px 0px;
    color: #fff;
    border-radius: 50%;
  }

</style>