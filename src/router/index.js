import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Book from '@/components/Book'
import Bookcase from '@/components/Bookcase'
import Bookpage from '@/components/Bookpage'
import Login from '@/components/Login'
import searchPage from '@/components/searchPage'
import searchResult from '@/components/searchResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/bookcase/:user',
      name: 'bookcase',
      component: Bookcase
    },
    {
      path: '/book/:book',
      name: 'book',
      component: Book
    },
    {
      path: '/bookpage/:book/:bookpage',
      name: 'bookpage',
      component: Bookpage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component: searchPage
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: searchResult
    }
  ]
})
