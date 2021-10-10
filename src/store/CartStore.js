import Vue from 'vue'
import Vuex from 'vuex'
// import CartService from '@/services/CartService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      products: [],
      product: null,
      data:[],
      
  },
  getters:{
      // จำนวนประเภทคูปองที่แสดง
    cartItemCount(state){
        return state.data.length;
    },
    // ราคาทั้งหมด
    cartTotalPrice(state){
        let total = 0;

        // state.data.forEach(item => {
        //     total += item.payload.product.price * item.payload.quantity;
        // });
        // return total;

        state.data.forEach(function(payload){
            total += payload.product.price * payload.quantity;
        });
        return total;
    }
  }, 
  mutations: {
      addToCart(state, payload){
        let check = 0;
        state.data.forEach(function(data){
            if (payload.product.id == data.product.id){
                data.quantity+=1;
                check = 1;
            }
        });
        if (check==0){
            state.data.push(payload);
        }
      },

      deleteCouponToCart(state, product){
        // state.data = state.data.filter(item => {
        //     return item.product.id !== product.id;
        // });
        state.data.forEach(function(item){
            if (product.id == item.product.id){
                item.quantity-=1;
            }
            if (item.quantity == 0){
            let index = state.data.indexOf(item);
            state.data.splice(index, 1);
        }
        });
        
        
      },

  },
  actions:{
    async addProductToCart({ commit }, payload){
        commit('addToCart', payload);
        // CartService.cart();
    },

    deleteCoupon({ commit }, product){
        commit('deleteCouponToCart', product);
    }
  },
  modules: {
  }
})
