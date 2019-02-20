<template>
  <div class="simple-progress-bar">
    <div :style="{background:color,width:percentage+'%'}"></div>
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
    computed: {
      percentage() {
        return this.value / this.max * 100;
      }
    }
  }
</script>

<style scoped>
  .simple-progress-bar {
    height: 3px;
    background: rgba(0, 0, 0, .3);
  }

  .simple-progress-bar > div {
    height: 3px;
  }
</style>