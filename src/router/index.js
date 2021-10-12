import Vue from "vue";
import VueRouter from "vue-router";
import AuthUser from "@/store/AuthUser";
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
  {
    path: "/employee",
    name: "Employee",
    component: () => import('../views/Employee.vue'),
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from,next)=>{
  
  // console.log(to.name)
  // console.log(from)
  // console.log(next)
  console.log(AuthUser.getters.isAuthen);
  console.log(AuthUser.getters.user);
  if(AuthUser.getters.isAuthen){
    console.log(AuthUser.getters.user)
    if(AuthUser.getters.user !== undefined){
      if(AuthUser.getters.user.role ==="EMPLOYEE"){
        if(to.fullPath === "/admin" || to.fullPath==="/customer"){
          next('/');
        }
        else{
          next();
        }
      }
      else if(AuthUser.getters.user.role ==="USER"){
        if(to.fullPath==="/employee" || to.fullPath==="/admin"){
          next('/')

        }
        else{
          next()
        }
      }
      else{
        next()
      }
    }
    else{
      if(to.fullPath ==="/admin" || to.fullPath ==="/customer" || to.fullPath ==="/employee"){
        console.log("Out")
        next('/')
      }
      else{
        next()
      }
    }
  }
  else{
    // console.log("Out1")
    if(to.fullPath ==="/admin" || to.fullPath ==="/customer" || to.fullPath ==="/employee"){
      // console.log("Out")
      next('/')
    }
    else{
      next()
    }
    
  }


})

export default router;
