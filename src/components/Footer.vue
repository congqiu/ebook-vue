<template>
  <div class="container" id="footer">
    <div class="position-btns">
      <div class="top" @click.stop="myFun.goTo(0)"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></div>
      <div class="bottom" @click.stop="myFun.goTo(1)"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></div>
    </div>
    <div class="copyright" :class="{'navbar-fixed-bottom': heightAuto}">Copyright © 2017</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        heightAuto: false
      }
    },
    mounted: function () {
      // let that = this
      // setTimeout(function () {
      //   that.setFixBottom()
      // }, 1000)
    },
    watch: {
      // '$route': function () {
      //   let that = this
      //   that.setFixBottom()
      //   setTimeout(function () {
      //     that.setFixBottom()
      //   }, 1000)
      // }
    },
    methods: {
      setFixBottom: function () {
        if (document.body.offsetHeight < document.documentElement.clientHeight) {
          this.heightAuto = true
        } else {
          this.heightAuto = false
        }
      }
    }
  }
</script>

<style>
  #footer .copyright {
    padding: 1em 0;
    text-align: center;
  }
  .position-btns {
    position: fixed;
    right: 1.5em;
    bottom: 5em;
  }
  .position-btns >div {
    line-height: 2em;
  }
  .position-btns .top {
    margin-bottom: 2em;
  }
</style>
