<template>
  <div id="search-result" class="container" v-title="'搜索结果'">
    <bounce-loader v-if="guodu" :margin="'60px auto'" :loading="show"></bounce-loader>
    <h1 v-if='!guodu' class="title">'{{search}}'的搜索结果, 共{{books.length}}条信息</h1>
    <h1 class="text-center" v-else>{{ message }}</h1>
    <div class="items row" v-if='!guodu'>
      <div class="item col-md-4" v-for="(item, index) in books">
        <router-link :to="'/book/' + item.id">{{ item.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BounceLoader from './loading/BounceLoader.vue'
export default {
  data () {
    return {
      message: '加载中。。。',
      guodu: true,
      show: true,
      search: '',
      books: {}
    }
  },
  mounted: function () {
    this.showMoreMsg()
  },
  watch: {
    '$route': 'showMoreMsg'
  },
  components: {
    BounceLoader
  },
  methods: {
    showMoreMsg: function () {
      this.search = this.$route.query.name
      let url = this.myData.api_url + '/search?search=' + this.search + '&username=' + this.getCookie('user') + '&token=' + this.getCookie('token')
      this.$http.jsonp(url)
      .then(function (response) {
        if (response.body.code === 200) {
          this.guodu = false
          this.books = response.body.data.books
          this.message = ''
        } else {
          this.message = response.body.message
          this.show = false
        }
      })
      .catch(function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<style>
#search-result .title {
  font-size: 32px;
  line-height: 50px;
}
#search-result .items .item {
  line-height: 36px;
}
</style>
