import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('../views/Home.vue'),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import('../views/Admin.vue'),
  },
  {
    path: "/payment",
    name: "Payment",
    component: () => import('../views/Payment.vue'),
  },
  {
    path: "/service/:id",
    name: "SelectService",
    component: () => import('../views/SelectService.vue'),
  },
  {
    path: "/customer",
    name: "Customer",
    component: () => import('../views/Customer.vue'),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
