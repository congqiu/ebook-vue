<template>
  <div class="loader-inner ball-clip-rotate-pulse" v-show="loading" :style="spinnerBasicStyle">
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'InnerLoader',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#5dc596'
    },
    size: {
      type: String,
      default: '60px'
    },
    margin: {
      type: String,
      default: 'auto'
    },
    radius: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        height: this.size,
        width: this.size,
        borderRadius: this.radius,
        opacity: 0.6,
        position: 'absolute',
        top: 0,
        left: 0
      }
    }
  },
  computed: {
    spinnerBasicStyle () {
      return {
        height: this.size,
        width: this.size,
        margin: this.margin,
        position: 'relative'
      }
    }
  }
}
</script>

<style>
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
  }

  50% {
    -webkit-transform: rotate(180deg) scale(0.6);
    transform: rotate(180deg) scale(0.6);
  }

  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}

@keyframes scale {
  30% {
    -webkit-transform: scale(0.3);
    transform: scale(0.3);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.ball-clip-rotate-pulse {
  position: relative;
  -webkit-transform: translateY(-15px);
  -ms-transform: translateY(-15px);
  transform: translateY(-15px);
}
.ball-clip-rotate-pulse > div {
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 100%;
}
.ball-clip-rotate-pulse > div:first-child {
  background: red;
  height: 16px;
  width: 16px;
  top: 9px;
  left: 9px;
  -webkit-animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
  animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
}
.ball-clip-rotate-pulse > div:last-child {
  position: absolute;
  border: 2px solid red;
  width: 30px;
  height: 30px;
  background: transparent;
  border: 2px solid;
  border-color: red transparent red transparent;
  -webkit-animation: rotate 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
  animation: rotate 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
}
</style>
