import Axios from 'axios'
const auth_key="auth_reserve"
let auth=JSON.parse(localStorage.getItem(auth_key))
const user =auth ? auth.user: ""
// const jwt =auth ? auth.jwt:""

const api_endpoint =process.env.VUE_APP_RESERVE_ENDPOINT || "http://localhost:8000"


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
    async login({username,password}){
       //call POST /auth/local
       try{
           let url=api_endpoint+'/api/auth/login'
           let body={
               username:username,
               password:password
           }
           let res=await Axios.post(url,body)
           console.log(res)
           if(res.status===200){
               localStorage.setItem(auth_key, JSON.stringify(res.data))
            //    console.log("success")
            //    console.log(res.data)
                if(res.data.status == "error"){
                    return{
                        success:false,
                        data:res.data,
                        message: 1
                    }
                }
                else{
                    return{
                        success : true,
                        data :res.data,
                        // jwt :res.data.api_token
                    }
                }
               
           }
           else{
            //    console.log(res)
               return{
                   success:false,
                   message:"Unknow status code" +res.status
               }
           }
       }
       catch(e){
           
           if(e.response.status===400){
               // console.error(e.response)
               // console.error(e.response.data.message[0].message[0].message)
               return{
                   success : false,
                   message : e.response.data.message[0].messages[0].message
               }
           }
           else{
            //    console.error(e.response)
               return{
                   success : false,
                   message: "Unknown error: "+e.response
               }
           }                    
       }
    },
    logout(){
        localStorage.removeItem(auth_key)
   
    },
    async register({username,name,password}){
        
        try{
            let url=api_endpoint+"/api/auth/register"
            let body={
                username: username,
                password:password,
                name : name
   
            }
            // console.log(body)
            let res = await Axios.post(url,body)
            console.log(res)
            if(res.status===200){
            //    localStorage.setItem(auth_key, JSON.stringify(res.data))
                 let loginRes=this.login({username,password})
                 
            //    console.log("success")

               if(res.data.status=="error"){
                   return{
                       success:false,
                       data:res.data,
                       message: 2
                   }
               }
               else{
                return loginRes
               }
              
           }
           else{
               console.log("NOT 200",res)
               return{
                   success:false,
                   message:"Unknow status code" +res.status
               }
           }
        }
        catch(e){
           if(e.response.status===400){
               
               return{
                   success : false,
                   message : e.response.data.message[0].messages[0].message
               }
           }
           else{
               console.error(e.response)
               return{
                   success : false,
                   message: "Unknown error: "+e.response.data
               }
           } 
        }
    }
   }