import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Service from '../views/ServicePage.vue'
import Payment from '../views/Payment.vue'
import SelectService from '../views/SelectService.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
      path: "/login",
      name: "Login",
      component: Login
  },
  {
    path: "/service",
    name: "Service",
    component: Service
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment
  },
  {
    path: "/select-service",
    name: "SelectService",
    component: SelectService
  },


  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
