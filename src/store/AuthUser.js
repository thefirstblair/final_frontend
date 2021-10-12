import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/services/AuthService'


Vue.use(Vuex)

const auth_key="auth_reserve"
let auth=JSON.parse(localStorage.getItem(auth_key))

const initialState={
    user: auth ? auth.user:"",
    isAuthen: auth ? true : false
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
      loginSuccess(state,user){
          state.user=user
          state.isAuthen=true
      },
      logoutSuccess(state){
        state.user=""
        state.isAuthen=false
    }
  },
  actions: {
      async login({commit},{username,password}){
          let res=await AuthService.login({username,password})
          if(res.success){
                commit('loginSuccess',res.data.user)  
          }
          return res
      },
      async logout({commit}){
          AuthService.logout()
          commit('logoutSuccess')
          
      },
      async register({commit},{username,name,password}){
          

          let res=await AuthService.register({username,name,password})
          if(res.success){
              commit("loginSuccess",res.data.user)
          }
          return res
      },


  },
  getters:{
      user: (state)=>state.user,
      isAuthen: (state)=>state.isAuthen
  },
  modules: {
  }
})