<template>
  <div v-title="'搜索'" class="container">
    <div class="search-wrap fl">
      <input id="inp" v-model="query" @keyup.enter="submit()" autofocus>
      <span @click="notSubmit()">取消</span>
    </div>
    <div class="hot-search">
      <h3>热门搜索</h3>
      <button v-for="item in hotSearch" @click="search(item.id)">{{item.name}}</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        user: this.isLogin(),
        query: '',
        hotSearch: [
          {name: '儒道至圣', id: '70'},
          {name: '圣墟', id: '59'},
          {name: '白袍总管', id: '1030'},
          {name: '五行天', id: '4415'}
        ]
      }
    },
    mounted: function () {
      if (this.user == null) {
        this.$router.push({path: '/login'})
        return
      }
    },
    methods: {
      submit: function () {
        this.$router.push({path: '/searchResult', query: { name: this.query }})
        this.query = ''
      },
      search: function (str) {
        const path = '/book/' + str
        this.$router.push({path: path})
      },
      notSubmit: function () {
        window.history.go(-1)
      }
    }
  }
</script>

<style>
  .search-wrap {
    padding: 10px;
    height: 50px;
    margin-top: 3em;
  }
  .search-wrap input {
    flex: 1;
    text-decoration: none;
    border: 1px solid #E5E9F2;
    border-radius: 15px;
    padding-left: 2em;
    line-height: 30px;
    height: 30px;
  }
  .search-wrap span {
    margin-left: 10px;
    font-size: 15px;
    align-self: center;
    cursor: pointer;
  }
  .hot-search {
    padding: 10px;
  }
  .hot-search h3 {
    font-size: 16px;
  }
  .hot-search button {
    background-color: white;
    border-style: none;
    padding: 5px;
    margin-right: 5px;
    border-radius: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
    color: #e54847;
  }
</style>
