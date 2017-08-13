<template>
  <div class="container" v-title="'用户登录'">
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">登录 </h2>
      <span>{{ message }}</span>
      <input type="text" name="username" class="form-control" placeholder="用户名" required autofocus="" v-model="username" @focus='clear'>
      <input type="password" name="password" class="form-control" placeholder="密码" required="" v-model="password" @focus='clear'>
      <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: this.myFun.getCookie('user'),
      password: null,
      message: null
    }
  },
  mounted: function () {
    let that = this
    this.checkLoginCallback(function (username) {
      if (!username) {
        that.$router.push('/')
      }
    })
  },
  methods: {
    login: function () {
      this.username = this.myFun.trimStr(this.username)
      if (!this.username || !this.password) {
        this.message = '填写用户名和密码'
        return false
      }
      if (this.password.length < 6) {
        this.message = '密码长度大于等于6'
        return false
      }
      let url = this.myData.api_url + '/user?action=login&username=' + this.username + '&password=' + this.password
      this.$http.jsonp(url)
      .then(function (response) {
        if (response.body.status.login === 1) {
          this.message = '成功'
          let expiredays = null
          let isCookie = response.body.data.is_cookie
          if (isCookie === 1) {
            expiredays = 365
          }
          this.myFun.setCookie('user', this.username, expiredays)
          this.myFun.setCookie('login', 1)
          this.myFun.setCookie('token', response.body.data.token, expiredays)
          this.$router.push({path: '/bookcase/' + this.username, query: { user: this.username }})
        } else {
          this.message = response.body.message || '登录失败'
          this.password = null
        }
      })
      .catch(function (response) {
        console.log(response)
      })
    },
    clear: function () {
      this.message = null
    }
  }
}
</script>

<style>
.form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-signin input {
    margin: 10px 0;
}
.form-signin span {
    color: red;
}
</style>
