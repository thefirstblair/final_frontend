// import Axios from 'axios'
const auth_key="auth_reserve"
let auth=JSON.parse(localStorage.getItem(auth_key))
const user =auth ? auth.user: ""
// const jwt =auth ? auth.jwt:""

// const api_endpoint =process.env.VUE_APP_RESERVE_ENDPOINT || "http://localhost:8000"


export default {
    
    // getApiHeader(){
    //     if(jwt!==""){
    //         return {
    //             headers:{
    //                 Authorization: `Bearer ${jwt}`
    //             }
    //         }
    //     }
    //     return {}
    // },
    getUser(){
        return user
    },
    isRoleAuthenticated(){
      return this.isAuthen() && user.role.name==="Authenticated"  
    },
    getRole(){
        return user.role.name
    },
    // getJwt(){
    //     return jwt
    // },

    getCart(){
        let data = JSON.parse(localStorage.getItem('auth_reserve'));
        return data[1];
    },
    storeCart(payload){
        //console.log(localStorage);
        let data = JSON.parse(localStorage.getItem('auth_reserve'));
        // console.log(data);
        let temp = {
            status: "success",
            user: data.user,
        };
        let arr_cart = [{index: 'index'}];
        arr_cart.push(payload);
        let newData = Object.assign(temp, arr_cart);
        //console.log(newData);
        localStorage.setItem(auth_key, JSON.stringify(newData));
        let res = JSON.parse(localStorage.getItem('auth_reserve'));
        //console.log(res);
        return res;
        
    },
}