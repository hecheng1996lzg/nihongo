<template>
  <div class="progress-bar">
    <div class="info">
      <h3>
        <slot></slot>
      </h3>
      <span class="sm">{{ percentage }}%({{ value }}/{{ max }})</span>
    </div>
    <div class="bar" :style="{border:'3px solid '+color}">
      <transition name="fill" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter">
        <div v-if="fillAn" class="bar-fill" :style="{background:color}"></div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 0,
      },
      color: {
        type: String,
        default: 'rgb(51, 210, 145)'
      },
    },
    data() {
      return {
        fillAn: false
      }
    },
    computed: {
      percentage() {
        return this.value / this.max * 100;
      }
    },
    methods: {
      beforeEnter(el) {
        el.style.width = '0';
      },
      afterEnter(el) {
        el.style.width = this.percentage + '%';
      }
    },
    mounted() {
      this.fillAn = true;
    }
  }
</script>

<style scoped>
  .progress-bar {
    margin: 7px 0;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bar {
    padding: 3px;
    border: 3px solid rgb(51, 210, 145);
    border-radius: 8px;
  }

  .bar-fill {
    height: 8px;
    background: rgb(51, 210, 145);
    border-radius: 3px;
    transition: all 0.5s ease;
  }

</style>