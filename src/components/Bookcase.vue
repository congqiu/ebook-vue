<template>
  <div id="bookcase" class="container" v-title="'我的书架'">
    <bounce-loader v-if="guodu" :margin="'60px auto'" :loading="show"></bounce-loader>
    <div class="loader" v-if="guodu">
      <div class="message" v-html="message">
      </div>
    </div>
    <div class="row bookcase-lists">
      <div class="col-md-12">
        <div class="items">
          <div class="row item" v-for="book in orderedBooks">
            <div class="col-md-2 name">
              <span>书名：</span>
              <router-link :to="'/book/' + book.id">{{ book.name }}</router-link>
            </div>
            <div class="col-md-4 latest">
              <span>最新：</span>
              <router-link :to="'/bookpage/' + book.id + '/' + book.latest.num">{{ book.latest.title }}</router-link>
            </div>
            <div class="col-md-4 bookmark">
              <span>书签：</span>
              <router-link :to="'/bookpage/' + book.id + '/' + book.bookmark.num">{{ book.bookmark.title }}</router-link>
            </div>
            <div class="col-md-2 operation df">
              <a class="remove" @click.stop="removeBookmark(book.id)">移除</a>
              <span class="new" v-if="book.latest.num > book.bookmark.num">New</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import BounceLoader from './loading/BounceLoader.vue'

export default {
  data () {
    return {
      guodu: true,
      show: true,
      message: '加载中。。。',
      user: this.isLogin(),
      books: {},
      showPopup: false
    }
  },
  components: {
    BounceLoader
  },
  mounted: function () {
    this.getBookcase()
  },
  methods: {
    removeBookmark: function (bookid) {
      if (this.user === null) {
        this.$router.push({path: '/login'})
        return
      }
      let url = this.myData.api_url + '/remove/bookcase?bookid=' + bookid + '&username=' + this.user + '&token=' + this.getCookie('token')
      this.$http.jsonp(url)
      .then(function (response) {
        this.myData.popupContent = response.body.message || '貌似有点问题？'
        this.bus.$emit('showPopup', true)
        this.getBookcase()
      })
      .catch(function (response) {
        this.myData.popupContent = '貌似有点问题'
        this.bus.$emit('showPopup', true)
        console.log(response)
      })
    },
    getBookcase: function () {
      if (this.user === null) {
        this.$router.push({path: '/login'})
        return
      }
      let url = this.myData.api_url + '/bookcase?token=' + this.getCookie('token')
      this.$http.jsonp(url)
      .then(function (response) {
        this.books = response.body.data.books
        if (response.body.code !== 200) {
          this.message = response.body.message
          this.show = false
        } else {
          this.guodu = false
        }
      })
      .catch(function (response) {
        this.message = '加载失败，请<a href="javascript:location.reload()">刷新重新加载</a>！'
        this.show = false
        console.log(response)
      })
    }
  },
  computed: {
    orderedBooks: function () {
      return _.orderBy(this.books, 'order')
    }
  }
}
</script>

<style>
#bookcase .bookcase-lists .item {
    padding: 5px 0;
}
#bookcase .bookcase-lists .item > div{
    line-height: 36px;
}
#bookcase .bookcase-lists .item .operation .new {
  color: red;
  padding-left: 10px;
}
#bookcase .bookcase-lists .item .operation .remove {
  cursor: pointer;
}
#bookcase .bookcase-lists .item .latest {
}
#bookcase .bookcase-lists .item .bookmark {
}
</style>
