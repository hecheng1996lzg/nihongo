<template>
  <div class="word-list">
    <simple-progress-bar :value="rightNum" :max="cards.length" class="simple-progress-bar"></simple-progress-bar>
    <card :cards="cards" @right="right" class="card"></card>
  </div>
</template>

<script>
  import {getCoursesWords} from '../../api/course';
  import Card from '../card/card';
  import SimpleProgressBar from '../progress-bar/simple-progress-bar';

  export default {
    props: {
      selectCourses: {
        type: String
      },
    },
    data() {
      return {
        cards: [],
        rightNum:0
      }
    },
    computed: {
      selectCoursesMap() {
        return new Map(JSON.parse(this.selectCourses));
      }
    },
    mounted() {
      let user = JSON.parse(localStorage.getItem('nihongo'));
      getCoursesWords(this.selectCoursesMap).then((datas) => {
        datas.forEach((course) => {
          course.data.forEach((work) => {
            if (user
              && user.courseData
              && user.courseData[work.course_id]
              && user.courseData[work.course_id].complete
              && user.courseData[work.course_id].complete.indexOf(work.id) !== -1) {
              return;
            }
            this.cards.push({
              id: work.id,
              parentId: work.course_id,
              imgUrl: work.imgUrl,
              answer: work.kanji,
              tips: work.chinese,
              note: work.kana,
              enter: "",
              enterState:0
            });
          });
        });
      });
    },
    methods:{
      right(work){
        this.rightNum++;
        this.addRightWork(work.id,work.parentId);
      },
      addRightWork(id,parentId){
        let user = JSON.parse(localStorage.getItem('nihongo'));
        if(user
          && !user.courseData){
          user.courseData = {};
        }
        if(!user.courseData[parentId]){
          user.courseData[parentId] = {
            state:0,
            date:new Date(),
            complete:[]
          };
        }
        if (user
          && user.courseData
          && user.courseData[parentId]
          && user.courseData[parentId].complete
          && user.courseData[parentId].complete.indexOf(id) === -1) {
          user.courseData[parentId].complete.push(id);
          console.log(1);
        }
        localStorage.setItem('nihongo',JSON.stringify(user));
      }
    },
    components: {
      Card,
      SimpleProgressBar
    }
  }
</script>

<style scoped>
  .word-list {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .simple-progress-bar{
    position: absolute;
    z-index: 1;
    width: 100%;
  }

  .card {
    flex: 1;
  }

</style>