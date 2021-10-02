import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Payment from "../views/Payment.vue";
import SelectService from "../views/SelectService.vue";
import Admin from "../views/Admin.vue";
import Customer from "../views/Customer.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/select-service",
    name: "SelectService",
    component: SelectService,
  },
  {
    path: "/customer",
    name: "Customer",
    component: Customer,
  },


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
