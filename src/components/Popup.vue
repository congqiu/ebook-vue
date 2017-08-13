<template>
  <div id="custom-popup-board" v-show="show">
    <div class="popup-board">
      <i class="popup-close-btn" @click="close">x</i>
      <div class="title">消息提示</div>
      <div class="popup-content" v-html="content"></div>
      <button class="popup-close-btn" @click="close">关闭</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        content: '没有新消息',
        show: false
      }
    },
    mounted: function () {
      let that = this
      this.bus.$on('showPopup', function (msg) {
        that.content = that.myData.popupContent
        that.show = msg
      })
    },
    methods: {
      close: function () {
        this.show = false
      }
    }
  }
</script>

<style type="text/css">
/* --- 自定义弹窗 start --- */

#custom-popup-board {
    position: absolute;
    top: 200px;
    width: 280px;
    max-width: 72%;
    left: 50%;
    margin-left: -140px;
    border: 2px solid #fff;
    background: #e7f4fe;
    z-index: 1020;
}
#custom-popup-board .popup-board {
    position: relative;
    width: 100%;
    height: 260px;
    text-align: center;
}
#custom-popup-board .popup-board .title {
   line-height: 40px;
   margin: 20px 0;
}
#custom-popup-board .popup-board .popup-content {
   padding: 30px 25px;
}
#custom-popup-board .popup-board i {
    position: absolute;
    top: -20px;
    right: 8px;
    font-style: normal;
    cursor: pointer;
}
#custom-popup-board button {
    position: absolute;
    bottom: 20px;
    left: 100px;
}

/* --- 自定义弹窗 end --- */
</style>
