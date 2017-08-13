<template>
  <div id="book-catalog" class="container" v-title="book.name">
    <bounce-loader v-if="guodu" :margin="'60px auto'" :loading="show"></bounce-loader>
    <div class="loader" v-if="guodu">
      <div class="message">
        {{ message }}
      </div>
    </div>
    <div v-else>
      <div class="row bookinfo">
        <div class="col-md-8 name df">
          <h1>{{ book.name }}</h1>
          <span>作者：{{ book.author }}</span>
        </div>
        <div class="col-md-4 operation">
          <a @click.stop="addBook(book.id)">加入书架</a>
          <a @click.stop="myFun.goTo(1)">直达底部</a>
        </div>
      </div>
      <div class="row latest" v-if="latest">
        <div class="col-md-8">
          <div>
            最新章节：<router-link :to="'/bookpage/' + book.id + '/' + latest.num">{{ latest.title }}</router-link>
          </div>
        </div>
        <div class="col-md-4">
          <span class="status">状态：{{ book.source_status }}</span>
          <span>更新时间：{{ latest.time }}</span>
        </div>
      </div>
      <div class="row desc">
        <div class="col-md-12">
          内容简介： {{ book.source_desc }}   
        </div>
      </div>
      <div class="row catalogs" v-if="catalogs">
        <div class="col-md-12">
          <div>
            {{ data.message }}
          </div>
          <ul class="df">
              <li v-for="catalog in catalogs">
                <router-link :to="'/bookpage/' + book.id + '/' + catalog.num">{{ catalog.title }}</router-link>
              </li>
          </ul>
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
      data: {},
      book: {},
      catalogs: {},
      latest: {}
    }
  },
  components: {
    BounceLoader
  },
  mounted: function () {
    let url = this.myData.api_url + '/book?id=' + this.$route.params.book
    this.$http.jsonp(url)
    .then(function (response) {
      this.guodu = false
      this.data = response.body.data
      this.book = response.body.data.book
      this.catalogs = response.body.data.catalogs
      this.latest = response.body.data.latest
    })
    .catch(function (response) {
      this.message = '加载失败，请刷新重新加载！'
      this.show = false
      console.log(response)
    })
  },
  methods: {
    addBook: function (bookid) {
      let url = this.myData.api_url + '/add/bookcase?username=' + this.isLogin() + '&bookid=' + bookid + '&token=' + this.getCookie('token')
      if (this.category) {
        url += '?category=' + this.category
      }
      this.$http.jsonp(url)
      .then(function (response) {
        this.myData.popupContent = response.body.message || '貌似有点问题？'
        this.bus.$emit('showPopup', true)
      })
      .catch(function (response) {
        this.myData.popupContent = '貌似有点问题，请稍后再试！'
        this.bus.$emit('showPopup', true)
      })
    }
  }
}
</script>

<style>
#book-catalog .bookinfo {
    margin-top: 10px;
}
#book-catalog .bookinfo h1 {
    margin: 0 20px 0 0;
    line-height: 50px;
    font-size: 26px;
}
#book-catalog .bookinfo .name {
    line-height: 50px;
}
#book-catalog .bookinfo .operation a {
    margin-top: 10px;
    padding: 5px 10px;
    margin-right: 20px;
    border: 1px solid #03ae58;
    border-radius: 3px;
    display: inline-block;
    color: #129151;
    text-align: center;
    cursor: pointer;
}
#book-catalog .latest {
    margin-top: 10px;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 15px;
    margin-bottom: 20px;
    line-height: 22px;
}
#book-catalog .latest .status {
    margin-right: 20px;
}
#book-catalog .desc {
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    padding-bottom: 15px;
    padding-top: 15px;
}
#book-catalog .catalogs ul {
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
}
#book-catalog .catalogs ul li {
    width: 280px;
    line-height: 32px;
    border-bottom: 1px solid #eee;
}
.loader {
  width: 100px;
  margin: 0 auto 0;
  text-align: center;
}
.loader .message {
  padding-top: 10px;
  line-height: 40px;
}
</style>
