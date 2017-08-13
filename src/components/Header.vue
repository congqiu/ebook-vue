<template>
  <nav class="navbar navbar-fixed-top navbar-inverse">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar" @click="changeShow">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">书友</a>
        <span class="page-title">{{ pageTitle }}</span>
      </div>
      <div class="navbar-collapse" aria-expanded="false" v-show="show" @click="changeShow">
        <ul class="nav navbar-nav">
          <router-link tag='li' :to="'/'" active-class='active' exact><a>首页</a></router-link>
          <router-link tag='li' :to="'/bookcase/' + user" active-class='active' v-if="user"><a>我的书架</a></router-link>
          <router-link tag='li' active-class='active' :to="'/login'" v-else><a>登录</a></router-link>
          <li><a v-if="user" @click="logout">退出</a></li>
        </ul>
        <div class="navbar-form navbar-right" @click="search" v-if="user">
          <input class="v-inp" type="text" v-model.trim="query" placeholder="请输入书名" @keyup.enter="submit()"></input>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        user: this.isLogin(),
        pageTitle: null,
        query: '',
        show: false
      }
    },
    watch: {
      '$route': 'fetchLogin'
    },
    mounted: function () {
      if (this.myFun.getAgent() !== 'mobile') {
        this.show = true
      } else {
        let that = this
        this.bus.$on('showPageTitle', function (title) {
          that.pageTitle = title
        })
      }
    },
    methods: {
      fetchLogin: function () {
        this.user = this.isLogin()
        if (this.isLogin() === undefined) {
          this.user = this.$route.query.user
        }
        let that = this
        if (this.myFun.getAgent() === 'mobile') {
          this.bus.$on('showPageTitle', function (title) {
            that.pageTitle = title
          })
        }
      },
      submit: function () {
        this.$router.push({path: '/searchResult', query: { name: this.query }})
        this.query = ''
      },
      logout: function () {
        let apiUrl = this.myData.api_url
        let url = apiUrl + '/user?action=logout&username=' + this.user + '&token=' + this.getCookie('token')
        this.$http.jsonp(url)
        .then(function (response) {
          if (response.body.status.logout === 1) {
            this.message = '成功'
            this.delCookie('token')
            this.delCookie('login')
            this.user = null
            this.$router.push({path: '/login'})
          } else {
            this.message = '失败'
          }
        })
        .catch(function (response) {
          console.log(response)
        })
      },
      search: function () {
        this.$router.push({path: '/searchPage'})
      },
      changeShow: function () {
        if (this.myFun.getAgent() !== 'mobile') {
          this.show = true
        } else {
          this.show = !this.show
        }
      }
    }
  }
</script>

<style>
#navbar {
  display: block;
}
.navbar-header .page-title {
  float: left;
  display: block;
  white-space: nowrap;
  height: 50px;
  padding: 15px 15px;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  width: 15em;
  top: 0;
  left: 6.5em;
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
</style>
