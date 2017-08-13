import defaultData from '../assets/default.js'

export default {
  getAgent: getAgent,
  getBrowserInfo: getBrowserInfo,
  setCookie: setCookie,
  getCookie: getCookieFun,
  delCookie: delCookie,
  goTo: goTo,
  randomString: randomString,
  trimStr: trimStr,
  isLogin: function () {
    let username = getCookieFun('user')
    let token = getCookieFun('token')
    let logined = getCookieFun('login')
    if (username && token && logined == 1) {
      return username;
    } else {
      return null
    }
  },
  checkLogin: function () {
    let username = getCookieFun('user')
    let token = getCookieFun('token')
    let loginStatus = 0
    if (username && token) {
      let url = defaultData.api_url + '/user?action=check&username=' + username + '&token=' + token
      return Promise.all([this.$http.jsonp(url)])
      .then(function (data) {
        return data[0].data
      }, function (response) {
        console.log(response)
      })
    } else {
      return null
    }
  },
  checkLoginCallback: function (cb) {
    let username = getCookieFun('user')
    let token = getCookieFun('token')
    let loginStatus = 0
    if (username && token) {
      let url = defaultData.api_url + '/user?action=check&username=' + username + '&token=' + token
      this.$http.jsonp(url)
      .then(function (response) {
        loginStatus = response.body.data.login
        if (loginStatus == 1) {
          setCookie('login', response.body.data.login)
          cb(username)
        } else {
          cb(null)
        }
      })
      .catch(function (response) {
        cb(null)
      })
    } else {
      cb(null)
    }
  }
}

function getAgent() {
  if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
    return 'mobile'
  } else {
    return 'pc'
  }
}

function getOS() {
  var ua = navigator.userAgent; 
  if (ua.indexOf("Windows NT 5.1") != -1) return "Windows XP";
  if (ua.indexOf("Windows NT 6.0") != -1) return "Windows Vista";
  if (ua.indexOf("Windows NT 6.1") != -1) return "Windows 7";
  if (ua.indexOf("Windows NT 10.0") != -1) return "Windows 10";
  if (ua.indexOf("iPhone") != -1) return "iPhone";
  if (ua.indexOf("iPad") != -1) return "iPad";
  if (ua.indexOf("Linux") != -1) {
    var index = ua.indexOf("Android");
    if (index != -1) { 
      //os以及版本 
      var os = ua.slice(index, index+13); 
      //手机型号 
      var index2 = ua.indexOf("Build"); 
      var type = ua.slice(index + 13, index2); 
      return type + os; 
    } else { 
      return "Linux"; 
    } 
  } 
  return "Unknow"; 
}

function getBrowserInfo(){
    var Sys = {};
    var ua = window.navigator.userAgent.toLowerCase();
    var re =/(msie|firefox|chrome|opera|iphone|ipad|bb10|mobile|version).*?([\d.]+)/;
    var m = ua.match(re);
    if (m) {
      Sys.browser = m[1].replace(/version/, "safari");
      Sys.ver = m[2]; 
    } else {
      Sys.browser = "other";
      Sys.ver = 'unknow';
    }
    Sys.os = getOS();
    return Sys;
}

function setCookie(name, value, expiredays = null) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = name + '=' + escape(value) + ((expiredays === null) ? '' : ';expires=' + exdate.toGMTString())
}

function getCookieFun (name) {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookieFun(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
function goTo(where) {
  var me = this
  me.site = []
  me.sleep = me.sleep ? me.sleep : 16
  me.fx = me.fx ? me.fx : 6
  clearInterval(me.interval)
  var dh = document.documentElement.scrollHeight || document.body.scrollHeight
  var height = where ? dh : 0
  me.interval = setInterval(function () {
    var top = document.documentElement.scrollTop || document.body.scrollTop
    var speed = (height - top) / me.fx
    if (speed === me.site[0]) {
      window.scrollTo(0, height)
      clearInterval(me.interval)
    }
    window.scrollBy(0, speed)
    me.site.unshift(speed)
  }, me.sleep)
}

function randomString(len = 32) {
  let $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
　let maxPos = $chars.length;
　let pwd = '';
　for (let i = 0; i < len; i++) {
　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　}
　return pwd;
}

function trimStr(str){   
  return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');   
}
