<template>
  <div id="book-page" v-title="bookpage.title">
    <bounce-loader v-if="guodu" :margin="'60px auto'" :loading="show"></bounce-loader>
    <div class="loader" v-if="guodu">
      <div class="message">
        {{ message }}
      </div>
    </div>
    <div class="book-content col-md-12" v-else>
      <div class="row">
        <div class="col-md-12">
          <h2>{{ bookpage.title }}</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="operation">
            <router-link :to="'/bookpage/' + bookpage.book + '/' + bookpage.pre" v-if="bookpage.pre != -1">上一章</router-link>
            <router-link :to="'/bookcase/' + user" v-else>回书架</router-link>
            <router-link :to="'/book/' + bookpage.book">回目录</router-link>
            <router-link :to="'/bookpage/' + bookpage.book + '/' + bookpage.nex" v-if="bookpage.nex != -2">下一章</router-link>
            <router-link :to="'/bookcase/' + user" v-else>回书架</router-link>
            <a @click="addBookmark(false)">加书签</a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" id="page-content">
          <p v-html="bookpage.content" @click="pageClick"></p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="operation">
            <router-link :to="'/bookpage/' + bookpage.book + '/' + bookpage.pre" v-if="bookpage.pre != -1">上一章</router-link>
            <router-link :to="'/bookcase/' + user" v-else>回书架</router-link>
            <router-link :to="'/book/' + bookpage.book">回目录</router-link>
            <router-link :to="'/bookpage/' + bookpage.book + '/' + bookpage.nex" v-if="bookpage.nex != -2">下一章</router-link>
            <router-link :to="'/bookcase/' + user" v-else>回书架</router-link>
            <a @click="addBookmark(false)">加书签</a>
          </div>
        </div>
      </div>
      <div class="fixed-bottom" v-show='showFixed'>
        <div class="col-md-12">
          <input type="range" name="" value="10" v-model="speed" min="1" max="50">
        </div>
        <div class="col-md-12">
          <div class="operation">
            <a @click="scrollPage" v-if="scroll">停止</a>
            <a @click="scrollPage" v-else>自动</a>
            <router-link :to="'/book/' + bookpage.book">回目录</router-link>
            <router-link :to="'/bookpage/' + bookpage.book + '/' + bookpage.nex" v-if="bookpage.nex != -2">下一章</router-link>
            <router-link :to="'/bookcase/' + user" v-else>回书架</router-link>
            <a @click="addBookmark(false)">加书签</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BounceLoader from './loading/BounceLoader.vue'
export default {
  data () {
    return {
      guodu: true,
      show: true,
      message: '加载中。。。',
      user: this.isLogin(),
      bookpage: {},
      nextBookpage: {},
      booknum: null,
      showFixed: false,
      speed: 10,
      scroll: false,
      interval: 0
    }
  },
  components: {
    BounceLoader
  },
  watch: {
    '$route': 'fetchBookpage',
    'speed': 'autoScroll'
  },
  mounted: function () {
    this.fetchBookpage()
    let that = this
    this.$nextTick(function () {
      window.addEventListener('scroll', that.scrollEvent)
    })
  },
  methods: {
    fetchBookpage: function () {
      this.isAuto = false
      this.user = this.isLogin()
      let apiUrl = this.myData.api_url
      let url = apiUrl + '/bookpage?book=' + this.$route.params.book + '&id=' + this.$route.params.bookpage + '&username=' + this.user + '&token=' + this.getCookie('token')
      this.$http.jsonp(url)
      .then(function (response) {
        this.bookpage = response.body.data.bookpage
        this.guodu = false
        document.body.scrollTop = 0
        if (this.user && response.body.is_cookie) {
          let that = this
          setTimeout(function () {
            that.addBookmark(true)
          }, 1000)
        }
      })
      .catch(function (response) {
        this.message = '加载失败，请刷新重新加载！'
        this.show = false
        console.log(response)
      })
    },
    addBookmark: function (auto = false) {
      let that = this
      let check = this.checkLogin()
      if (check) {
        check.then(function (result) {
          if (result.data.login === 1) {
            let url = that.myData.api_url + '/add/bookmark?username=' + that.isLogin() + '&bookpage=' + that.bookpage.id + '&token=' + that.getCookie('token')
            that.$http.jsonp(url)
            .then(function (response) {
              if (!auto) {
                that.myData.popupContent = response.body.message || '书签添加成功'
                that.bus.$emit('showPopup', true)
              }
            })
            .catch(function (response) {
              if (!auto) {
                that.myData.popupContent = '书签添加出了点问题'
                that.bus.$emit('showPopup', true)
              }
              console.log(response)
            })
          } else {
            if (!auto) {
              that.myData.popupContent = '请先登录再操作，<a href="#/login">立即登录</a>'
              that.bus.$emit('showPopup', true)
            }
            return
          }
        })
      } else {
        if (!auto) {
          that.myData.popupContent = '请先登录再操作，<a href="#/login">立即登录</a>'
          that.bus.$emit('showPopup', true)
        }
        return
      }
    },
    pageClick: function () {
      this.showFixed = !this.showFixed
    },
    scrollPage: function () {
      this.scroll = !this.scroll
      this.autoScroll()
    },
    autoScroll: function () {
      let that = this
      if (that.scroll) {
        clearInterval(that.interval)
        that.interval = setInterval(function () {
          document.body.scrollTop += 1
        }, that.speed)
      } else {
        clearInterval(that.interval)
      }
    },
    scrollEvent: function () {
      if (document.body.scrollTop > 100) {
        this.bus.$emit('showPageTitle', this.bookpage.title)
      } else {
        this.bus.$emit('showPageTitle', null)
      }
    }
  },
  beforeDestroy: function () {
    this.bus.$emit('showPageTitle', null)
    window.removeEventListener('scroll', this.scrollEvent)
    clearInterval(this.interval)
  }
}
</script>

<style>
#book-page h2 {
    text-align: center;
}
#book-page .book-set {
    border-bottom: 1px solid #ddd;
    padding: 5px 0;
    background: #fff;
}
#book-page .page-set {
    padding: 3px;
    line-height: 20px;
    width: 720px;
    margin: auto;
    width: 100%;
    justify-content: space-around;
    white-space: nowrap;
    overflow: hidden;
}
#book-page .page-set span {
    margin-left: 20px;
}
#book-page .page-set .color a {
    border: 1px solid #cccccc;
    display: block;
    width: 16px;
    height: 16px;
    margin-left: 6px;
    overflow: hidden;
}
#book-page .page-set .family a {
    padding: 0 2px;
}
#book-page .page-set .size a {
    padding: 0 2px;
}
#book-page .book-content {
    background-color: #e7f4fe;
    font-size: 16px;
    padding-top: 20px;
    padding-bottom: 40px;
}
#book-page .book-content .operation {
    text-align: center;
}
#book-page .book-content .operation a {
    display: inline-block;
    border: 1px solid #03ae58;
    padding: 5px .3em;
    margin: .5em;
    border-radius: 3px;
    font-size: 15px;
    color: #129151;
}
#book-page .fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #333;
  z-index: 999;
  padding: 5px 0;
}
#book-page .book-content .fixed-bottom .operation a {
    border: transparent;
    color: #fff;
}
@media (max-width: 720px) {
    #book-page .book-content h2 {
        font-size: 18px;
    }
}
</style>
