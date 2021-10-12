// import Vue from 'vue'
// import Vuex from 'vuex'
// import DiscountCouponService from '@/services/DiscountCouponService'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//       data: [],
//       thisCoupon: {},
//   },
//   mutations: {
//       fetch(state, payload){
//         state.data = payload;
//       },
//       check(state, code_user){
//         let found = 0;
//         state.data.forEach(code => {
//             if (code_user == code.specific_code){
//                 state.thisCoupon = code
//                 found = 1;
//             }
//         });
//         if (found == 0){
//             return 'not found'
//         }
//       }
//   },
//   actions: {
//       async checkCoupon({ commit }, code_user){
//         let payload = await DiscountCouponService.fetchData()
//         commit('fetch', payload);
//         commit('check', code_user);
//       },
//   },
//   modules: {
//   }
// })
