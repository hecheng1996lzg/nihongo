<template>
  <div class="blur-bg" :style="{backgroundImage: 'url(' + bgImg + ')'}">
    <article>
      <ul class="word-list">
        <li v-for="(course,index) in courses" :class="{ active: course.isActive }" @click="selectCourse(course)"
            :key="index">
          <blur class="word-list-item" :blur-src="bgImg" @setBlurImg="setBlurImg" ref="blur">
            <div class="word-list-item-content">
              <div class="check">
                <div></div>
              </div>
              <progress-bar class="progress-bar" :value="21" :max="70" :color="'#02a6e4'">{{course.name}}</progress-bar>
            </div>
          </blur>
        </li>
      </ul>
    </article>
    <transition name="slide">
      <div class="word-confirm" v-if="selectCourses.size">
        <span class="mi">已选择{{selectText}}</span>
        <button type="button" class="sm bg-color-blue" @click="start">开始</button>
      </div>
    </transition>
  </div>
</template>

<script>
  import ProgressBar from '../progress-bar/progress-bar';
  import blur from '../blur/blur';
  import {getCourseList} from '../../api/course';

  export default {
    name: "word",
    data() {
      return {
        imgBase64: '',
        blurFlag: false,
        courses: [],
        selectCourses: new Map(),   //当前选中的课程列表
        selectCourseMax: 3,        //最多选择3门课
        selectText: ''
      }
    },
    mounted() {
      getCourseList().then((res) => {
        this.courses = res.data.data;
      });
    },
    computed: {
      bgImg() {
        let user = JSON.parse(localStorage.getItem('nihongo'));
        return user.bgImg;
      }
    },
    methods: {
      setBlurImg(base64) {
        this.$refs.blur.forEach((item) => {
          item.setBase64(base64);
        })
      },
      selectCourse(course) {
        let state = !course.isActive;
        if (this.selectCourses.size >= 3 && state) return false;
        if (state) {
          this.selectCourses.set(course.id, course.name);
        } else {
          this.selectCourses.delete(course.id);
        }
        this.$set(course, 'isActive', state);
        this.updateSelectText();
      },
      updateSelectText() {
        let list = '';
        this.selectCourses.forEach((v) => {
          list += (v + '，');
        });
        list = list.replace(/，$/, '。');
        if (this.selectCourses.size >= 3) list += '（已满）';
        this.selectText = list;
      },
      start() {
        if(this.selectCourses.length)return false;
        this.$router.push({ name: 'word-list', params: { selectCourses:JSON.stringify(this.selectCourses)}});
      }
    },
    components: {
      ProgressBar,
      blur
    }
  }
</script>

<style scoped>
  article {
    margin: 30px 10px 90px;
  }

  .word-list > li {
    margin: 15px 0;
    color: #333
  }

  .word-list-item-content {
    display: flex;
  }

  .progress-bar {
    flex: 1;
    margin: 15px 13px
  }

  .check {
    width: 10px;
    border-radius: 10px 0 0 10px;
    background: rgba(255, 255, 255, 0.2);
  }

  .active .check {
    background: rgba(2, 166, 226, 0.6);
    box-shadow: 3px 0 13px rgba(2, 166, 226, 0.5);
    transition: all 0.5s ease;
  }

  .word-confirm {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateY(0%);
    background: rgba(255, 255, 255, .9);
  }

  .slide-enter-active, .slide-leave-active {
    transition: transform .5s;
  }

  .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    transform: translateY(100%);
  }
</style>