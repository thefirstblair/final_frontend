import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/services/AuthService'

//comment
// import CartService from '@/services/CartService'

Vue.use(Vuex)

const auth_key="auth_reserve"
let auth=JSON.parse(localStorage.getItem(auth_key))

const initialState={
    user: auth ? auth.user:"",
    // jwt:auth ? auth.jwt:"",
    isAuthen: auth ? true : false
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
      loginSuccess(state,user){
          // console.log(state.user)
          state.user=user.user
          // console.log(user)
        //   console.log(jwt)
        //   state.jwt=jwt
          state.isAuthen=true
      },
      logoutSuccess(state){
        state.user=""
        // state.jwt=""
        state.isAuthen=false
    }
  },
  actions: {
      async login({commit},{username,password}){
          let res=await AuthService.login({username,password})
        //   console.log(res.data.user.api_token)
          if(res.success){
            //   console.log(res.data.user.api_token)
                commit('loginSuccess',res.data.user)  
                // console.log(initialState)
          }
          return res
      },
      async logout({commit}){
          AuthService.logout()
          commit('logoutSuccess')
          
      },
      async register({commit},{username,name,password}){
          

          let res=await AuthService.register({username,name,password})
          console.log(res.data.user)
        //   console.log("MMM")
          if(res.success){
              commit("loginSuccess",res.data.user)

          }
          return res
      },

      // comment
    //   async update({commit}, payload){
    //     //console.log(payload)
    //     let res = await CartService.storeCart(payload);
    //     commit("loginSuccess",res);
    // },

  },
  getters:{
      user: (state)=>state.user,
    //   jwt: (state)=> state.jwt,
      isAuthen: (state)=>state.isAuthen
  },
  modules: {
  }
})