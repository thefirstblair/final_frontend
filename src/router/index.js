import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Service from '../views/ServicePage.vue'
import Payment from '../views/Payment.vue'
import SelectService from '../views/SelectService.vue'
import BookingCustomer from '../views/Booking_Customer.vue'
import Profile from '../views/Profile.vue'
import Management from '../views/Management.vue'
import ReservedList from '../views/ReservedList.vue'


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
  {
    path: "/booking-customer",
    name: "BookingCustomer",
    component: BookingCustomer
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/management",
    name: "Management",
    component: Management
  },
  {
    path: "/reservedlist",
    name: "ReservedList",
    component: ReservedList
  },




  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
