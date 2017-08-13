<template>
  <div id="app">
    <v-header></v-header>
    <v-popup :showPopup="myData.showPopup"></v-popup>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VHeader from './components/Header.vue'
import VPopup from './components/Popup.vue'
import VFooter from './components/Footer.vue'
import './assets/js/jquery-3.2.1.min.js'
import './assets/js/bootstrap.min.js'

export default {
  name: 'app',
  components: {
    'VHeader': VHeader,
    'VPopup': VPopup,
    'VFooter': VFooter
  },
  mounted: function () {
    this.fetchLogined()
  },
  watch: {
    '$route': 'fetchLogined'
  },
  methods: {
    fetchLogined: function () {
      this.bus.$emit('showPopup', false)
      if (!this.isLogin()) {
        this.$router.push({path: '/login'})
        return
      }
    }
  }
}
</script>

<style>
@import './assets/css/bootstrap.min.css';

body {
  padding-top: 50px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1045px;
  margin: auto;
  position: relative;
}
a:hover, a:focus, a:visited {
  text-decoration: none;
}
.df {
  display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    position: relative;
    flex-wrap: wrap;
}
body {
  background: #fafafa;
}

button {
    border: none;
    padding: 0.6em 1.2em;
    background: #6bd0af;
    color: #fff;
    font-family: 'Lato', Calibri, Arial, sans-serif;
    font-size: 1em;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    display: inline-block;
    margin: 3px 2px;
    border-radius: 2px;
}
button:hover {
    background: #0cb57e;
}


@media (min-width: 1200px)  {
    .container {
        width: 1045px;
    }
}


</style>
