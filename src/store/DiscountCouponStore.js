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
        state.data = payload;
      },
      check(state, code_user){
          console.log(code_user)
          for(let code in state.data.data){
              if(state.data.data[code].specific_code===code_user){
                  state.thisCoupon=state.data.data[code]
                  state.success=true
                  break;
              }
          }
      },
      use(state,id){
        state.thisCoupon.quantity-=1
        let payload={
          quantity:state.thisCoupon.quantity,  
          id:id,
        }
        DiscountCouponService.useDiscountCoupon(payload)
        state.thisCoupon={}
        state.success=false
        console.log(state.thisCoupon.quantity)
      },
  },
  actions: {
      async fetchCoupon({commit}){
        let payload = await DiscountCouponService.fetchData()
        commit('fetch', payload);
      },
      checkCoupon({ commit }, code_user){
        commit('check', code_user);
      },
      useDiscountCoupon({commit},id){
        commit('use', id)
      },

  },
  getters:{
    thisCoupon: (state)=>state.thisCoupon,
    success: (state)=>state.success
},
  modules: {
  }
})
