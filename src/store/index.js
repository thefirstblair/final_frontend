import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carts: JSON.parse(localStorage.getItem('carts')) || [],
    records: JSON.parse(localStorage.getItem('records')) || []
  },
  getters:{
    getCount(state){
      return state.carts.length;
    },
    getCarts(state){
      return state.carts
    },
    getTotalPrice(state){
      var totalprice = 0
      state.carts.forEach(item => {
        totalprice += item.item.price
      });
      return totalprice
    },
    getPaymentRecord(state) {
      return state.records
    }
  },
  mutations: {
    addItem(state,payload){
      state.carts.push(payload);
      localStorage.setItem('carts',JSON.stringify(state.carts));
    },
    addRecord(state,payload){
      state.records.push(payload);
      localStorage.setItem('records',JSON.stringify(state.carts));
    },
    deleteItem(state,index){
      state.carts.splice(index, 1);
      localStorage.setItem('carts',JSON.stringify(state.carts));
    },
    clearItem(state){
      state.carts = [];
      localStorage.setItem('carts',JSON.stringify([]));
    },
    clearRecord(state) {
      state.records = [];
      localStorage.setItem('records',JSON.stringify([]));
    }
  },
  actions: {
  },
  modules: {
  }
})
