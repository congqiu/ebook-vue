<template>
  <div class="container" v-title="'首页'">
    <div class="hello" v-if="!user">
      <h1>{{ message }}</h1>
    </div>
    <div class="index-page" v-else>
      <div class="category row" v-for="(type, index) in types">
        <div class="type">
          <h2>{{ type.name }}</h2>
        </div>
        <div class="books">
          <div class="book col-xs-6 col-lg-4" v-for="book in categoriesBooks[type.id]">
            <h3><router-link :to="'/book/' + book.id">{{ book.name}}</router-link></h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: '您好像走错地方了，本站不对外提供服务！',
        guodu: true,
        show: true,
        user: this.isLogin(),
        types: {},
        books: {},
        categoriesBooks: {}
      }
    },
    mounted: function () {
      this.getBookTypes()
    },
    watch: {
      types: 'fetchBooks'
    },
    methods: {
      fetchBooks: function () {
        if (this.user == null) {
          this.$router.push({path: '/login'})
          return
        }
        let bookTypes = []
        for (let i = 0; i < this.types.length; i++) {
          bookTypes.push(this.types[i].id)
        }
        this.getBooksByTypes(bookTypes)
      },
      getBookTypes: function () {
        let apiUrl = this.myData.api_url
        let url = apiUrl + '/booktype'
        this.$http.jsonp(url)
        .then(function (response) {
          this.types = response.body.data.types
        })
        .catch(function (response) {
          console.log(response)
        })
      },
      getBooksByTypes: function (types) {
        let apiUrl = this.myData.api_url
        let url = apiUrl + '/search'
        this.$http.jsonp(url, {params: {'types': types, 'username': this.user, 'token': this.getCookie('token')}})
        .then(function (response) {
          this.categoriesBooks = response.body.data.books
          if (response.body.code !== 200) {
            this.message = response.body.message
            this.show = false
          } else {
            this.guodu = false
          }
        })
        .catch(function (response) {
          this.message = '加载失败，请刷新重新加载！'
          this.show = false
          console.log(response)
        })
      }
    }
  }
</script>
