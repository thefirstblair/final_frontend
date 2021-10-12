import Axios from 'axios'
const auth_key="auth_reserve"

const api_endpoint =process.env.VUE_APP_RESERVE_ENDPOINT || "http://localhost:8000"


export default {
    
    async login({username,password}){
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

                    }
                }
               
           }
           else{
               return{
                   success:false,
                   message:"Unknow status code" +res.status
               }
           }
       }
       catch(e){
           
        return{
            success : false,
            message : e
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
            let res = await Axios.post(url,body)
            // console.log(res)
            if(res.status===200){
                 let loginRes=this.login({username,password})

               if(res.data.status==="error"){
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
            return{
                success : false,
                message : e
            } 
        }
    }
   }