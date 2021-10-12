import Vue from 'vue'
import Vuex from 'vuex'
import DiscountCouponService from '@/services/DiscountCouponService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      data: [],
      thisCoupon: {},
      success:false
  },
  mutations: {
      fetch(state, payload){
        //   console.log(payload)
        state.data = payload;
        // console.log(state.data)
        // console.log("AAA")
      },
      check(state, code_user){
          console.log(code_user)
          for(let code in state.data.data){
            //   console.log(state.data.data[code].specific_code)
              if(state.data.data[code].specific_code===code_user){
                  state.thisCoupon=state.data.data[code]
                  state.success=true
                //   console.log(state.thisCoupon)
                  break;
              }
          }
      },
      use(state,id){
        // for(let code in state.data.data){
            //   console.log(state.data.data[code].specific_code)
            //   if(state.data.data[code].id===id){
                  state.thisCoupon.quantity-=1
                  let payload={
                    quantity:state.thisCoupon.quantity,  
                    id:id,
                  }
                  DiscountCouponService.useDiscountCoupon(payload)
                  state.thisCoupon={}
                  state.success=false
                  console.log(state.thisCoupon.quantity)
                //   break;
            //   }
        //   }
      },
    //   create(){
        
    //   }
      
  },
  actions: {
      async fetchCoupon({commit}){
        let payload = await DiscountCouponService.fetchData()
        commit('fetch', payload);
      },
      checkCoupon({ commit }, code_user){
        
        commit('check', code_user);
        // console.log(code_user)
      },
      useDiscountCoupon({commit},id){
          
        commit('use', id)
      },
    //   async createDiscountCoupon({commit},{specific_code,discount_percent,minimum_cost,quantity}){
    //     let payload={
    //         specific_code:specific_code,
    //         discount_percent:discount_percent,
    //         minimum_cost:minimum_cost,
    //         quantity:quantity
    //     }  
    //     let res=await DiscountCouponService.createDiscountCoupon(payload)
    //     if(res.success===true){

    //     }
    //   },
      //import DiscountCouponService from '@/services/DiscountCouponService'
    //   DiscountCouponService.deleteDiscountCoupon(id)
    //
      
  },
  getters:{
    thisCoupon: (state)=>state.thisCoupon,
    success: (state)=>state.success
},
  modules: {
  }
})
