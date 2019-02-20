<template>
  <div class="cards">
    <div class="bg-blur">
      <canvas v-for="(item,index) in cardList" :key="index" v-show="index===activeIndex" ref="blurCanvas"></canvas>
    </div>
    <ul class="card-list">
      <li v-for="(item,index) in cardList" :key="index" @click="cardToggle($event,index)" ref="cards"
          class="card-item"
          :class="{
          past: pastCard(index),
          prev: prevCard(index),
          active: activeCard(index),
          next: nextCard(index),
          future: futureCard(index) }">
        <div class="enter">
          <form @submit.prevent="cardSubmit(item,index)">
            <input v-model="item.enter" :disabled="item.isDisable" type="text" class="bl input" required
                   placeholder="Enter here"/>
          </form>
        </div>
        <div class="content">
          <div class="answer" v-if="item.enterState">
            <span class="iconfont"
                  :class="{
                  'icon-tianjiashibai': item.enterState===2,
                  'icon-tianjiachenggong': item.enterState===1}"></span>
            <div class=" info">
              <span>{{item.note}}</span>
              <h2>{{item.answer}}</h2>
            </div>
          </div>
          <img src="" alt="" ref="cardImg">
        </div>
        <div class="tips" :class="{tipsShow:tipsShow}">
          <div>{{item.tips}}</div>
          <span class="iconfont" :class="{
          'icon-eye1':tipsShow,
          'icon-eye':!tipsShow}" @click="showTips()"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as StackBlur from 'stackblur-canvas';

  const PRELOADING_NUM = 3;   //预加载数量
  export default {
    name: "card",
    props: {
      /**
       * @object Example
       *  id: 1,
       *  parentId: 31,
       *  imgUrl: 1.jpeg,
       *  enter: "",
       *  answer: 可愛い,
       *  tips: かわいい,
       *  note: 可爱的,
       *  [enter]: ""
       *  [enterState]: 0(没出现结果) | 1(正确) | 2（错误）
       * */
      cards: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        cardList: this.cards,
        activeIndex: 0,
        tipsShow: false,
      }
    },
    watch: {
      cards() {
        for (let i = 0; i < PRELOADING_NUM; i++) {
          this.cardImgLoad(i,
            this.cards[i].parentId,
            this.cards[i].imgUrl)
        }
      },
      activeIndex() {
        let index = PRELOADING_NUM + this.activeIndex - 1;
        if (index >= this.cards.length) return;
        this.cardImgLoad(index,
          this.cards[index].parentId,
          this.cards[index].imgUrl)
      }
    },
    computed: {
      pastCard() {
        return (index) => {
          return index <= this.activeIndex - 2;
        }
      },
      prevCard() {
        return (index) => {
          return index === this.activeIndex - 1;
        }
      },
      activeCard() {
        return (index) => {
          return index === this.activeIndex;
        }
      },
      nextCard() {
        return (index) => {
          return index === this.activeIndex + 1;
        }
      },
      futureCard() {
        return (index) => {
          return index >= this.activeIndex + 2;
        }
      }
    },
    methods: {
      cardToggle(e, index) {
        if (index > this.activeIndex) {
          this.activeIndex++;
        }
        else if (index < this.activeIndex) {
          this.activeIndex--;
        }
      },
      showTips() {
        this.tipsShow = !this.tipsShow;
      },
      cardImgLoad(index, id, name) {
        this.$nextTick(() => {
          let img = this.$refs.cardImg[index];
          let canvas = this.$refs.blurCanvas[index];
          if (canvas.style.width && canvas.style.height) return;  //很蠢的一种防止canvas重绘，唉不知道咋整，以后想办法吧。
          img.crossOrigin = '';
          img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            StackBlur.image(img, canvas, 50);
            canvas.style.width = '100%';
            canvas.style.height = '100%';
          };
          img.src = `${process.env.VUE_APP_IMG_API}/courses/${id}/${name}`;
        })
      },
      cardSubmit(card, index) {
        if (card.isDisable) return;
        let answer = card.answer ? card.answer : card.note;   // 是否使用备选答案
        answer = answer.split('|');
        if (answer.indexOf(card.enter) !== -1) {
          // 输入正确
          card.enterState = 1;
          this.$emit('right', card);
        } else {
          // 输入错误
          let cardClone = Object.assign({}, card);
          cardClone.enter = "";
          card.enterState = 2;
          this.cards.splice(PRELOADING_NUM + index, 0, cardClone);
        }
        card.isDisable = true;

        let prevIndex = this.activeIndex;
        window.setTimeout(() => {
          if (prevIndex === this.activeIndex) {
            this.activeIndex++;
            window.setTimeout(()=>{
              this.$refs.cards[this.activeIndex].getElementsByClassName('input')[0].focus()
            },200);
          }
        }, 1000);
      }
    }
  }
</script>

<style scoped>
  .cards {
    position: relative;
    overflow: hidden;
  }

  .bg-blur {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .bg-blur > canvas {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }

  .card-list {
    position: relative;
    width: 100%;
    height: 300px;
  }

  .card-item.past {
    transform: translateX(-200%) scale(.9);
  }

  .card-item.prev {
    transform: translateX(-100%) scale(.9);
  }

  .card-item.active {
    transform: translateX(0%) scale(1);
  }

  .card-item.next {
    transform: translateX(100%) scale(.9);
  }

  .card-item.future {
    transform: translateX(200%) scale(.9);
  }

  .card-item {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    height: 200px;
    border-radius: 6px;
    transition: transform 0.3s ease;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, .6);
  }

  .card-item > .enter {
    border-radius: 6px 6px 0 0;
    height: 30px;
    background: #fff;
  }

  .card-item > .enter input {
    width: calc(100% - 20px);
    margin: 0 auto;
    padding: 4px 10px;
    font-size: 16px;
    background: none;
  }

  .card-item > .content {
    flex: 1;
    position: relative;
    height: 170px;
  }

  .card-item > .content > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 0 0 6px 6px;
  }

  .answer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: calc(100% - 50px);
    height: calc(100% - 50px);
    padding: 25px;
    color: #fff;
    background: rgba(0, 0, 0, .6);
    border-radius: 0 0 6px 6px;
  }

  .answer > .iconfont {
    font-size: 30px;
    margin-right: 20px;
  }

  .card-item > .tips {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: calc(100% - 20px);
    height: 16px;
    padding: 3px 10px;
    color: rgba(255, 255, 255, .5);
    font-size: 10px;
    background: none;
    border-radius: 0 0 6px 6px;
  }

  .card-item > .tips > div {
    opacity: 0;
  }

  .card-item > .tips.tipsShow {
    background: rgba(0, 0, 0, .3);
  }

  .card-item > .tips.tipsShow > div {
    opacity: 1;
  }
</style>