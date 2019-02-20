<template>
  <div id="blur">
    <div class="blur-bg" :style="{backgroundImage: 'url(' + blurImg + ')',borderRadius:bR}">
        <canvas class="res" ref="blurCanvas"></canvas>
    </div>
    <div class="blur-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import * as StackBlur from 'stackblur-canvas';

  /**
   * 如果太多个窗口的话。
   * 为了节省资源，需要一些智障的操作，步骤如下：
   * 1. 给父组件设置blurFlag属性（默认设Null|False）
   * 2. 父组件组册setBlurImg事件
   * 3. 在setBlurImg中接收第一个转换完成的base64，并调用需要窗口的setBase64方法，传入接收到的base64。
   * */
  export default {
    name: "blur",
    props: {
      blurSrc: {
        type: String,
      },
      bR: {
        type: String,
        default: '10px'
      }
    },
    data() {
      return {
        blurImg: '',
      }
    },
    mounted() {
      // 是否只有一个
      if(this.$parent.blurFlag!==undefined){
        // 多个，判断是否是第一个
        if(!this.$parent.blurFlag){
          this.$parent.blurFlag = true;
          this.initBase64(this.$parent.blurFlag);
        }
      }else{
        // 单个
        this.initBase64();
      }
    },
    methods:{
      initBase64(blurFlag){
        let img = new Image();
        img.src = this.blurSrc;
        img.onload = ()=> {
          this.$refs.blurCanvas.width = img.width;
          this.$refs.blurCanvas.height = img.height;
          StackBlur.image(img, this.$refs.blurCanvas, 30);
          this.blurImg = this.$refs.blurCanvas.toDataURL();
          if(blurFlag) {
            this.$emit('setBlurImg',this.blurImg);
          }
        }
      },
      setBase64(base64){
        this.blurImg = base64;
      }
    }
  }
</script>

<style scoped>
  #blur{
    position: relative;
  }
  .blur-bg{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
  .res {
    display: none;
  }
  .blur-content{
    position: relative;
  }
</style>