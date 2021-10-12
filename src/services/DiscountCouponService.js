import Axios from 'axios'

import AuthUser from '@/store/AuthUser'

const api_endpoint =process.env.VUE_APP_RESERVE_ENDPOINT || "http://localhost:8000"
const token=AuthUser.getters.user.api_token

export default{
    async fetchData(){
        try {
            // console.log(token)
            let url=api_endpoint+"/api/discount_coupon"
            let user={
                headers: { Authorization: `${token}` },
              }
            let res = await Axios.get(url,user)
            //   console.log(res)
            return res
        } catch (e) {
            return {
                success : false,
                message : e
            }
        }
    },

    async createDiscountCoupon({specific_code,discount_percent,minimum_cost,quantity}){
        try{
            let url=api_endpoint+"/api/discount_coupon"
            let body={
                specific_code: specific_code,
                discount_percent:discount_percent,
                minimum_cost : minimum_cost,
                quantity:quantity
   
            }
            let user={
                headers: { Authorization: `${token}` }
            }
            let res = await Axios.post(url,body,user)
            console.log(res)
            if(res.status===200){
               if(res.data.status==="error"){
                   return{
                       success:false,
                       data:res.data,
                       message: 2
                   }
               }
               else{
                return {
                    success:true,
                    data:res.data,
                };
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

    async updateDiscountCoupon({specific_code,discount_percent,minimum_cost,quantity,id}){
        try{
            let url=api_endpoint+"/api/discount_coupon/"+id
            let body={
                specific_code: specific_code,
                discount_percent:discount_percent,
                minimum_cost : minimum_cost,
                quantity:quantity
   
            }
            let user={
                headers: { Authorization: `${token}` }
            }
            let res = await Axios.put(url,body,user)
            console.log(res)
            if(res.status===200){
               if(res.data.status==="error"){
                   return{
                       success:false,
                       data:res.data,
                       message: 2
                   }
               }
               else{
                return {
                    success:true,
                    data:res.data,
                };
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

    async deleteDiscountCoupon(id){
        let url=api_endpoint+"/api/discount_coupon/"+id
        let user={
            headers: { Authorization: `${token}` }
        }
        let res = await Axios.delete(url,user)
        return res
    },
    async useDiscountCoupon({quantity,id}){
        try{
            let url=api_endpoint+"/api/discount_coupon/use/"+id
            let body={
                quantity:quantity
   
            }
            let user={
                headers: { Authorization: `${token}` }
            }
            let res = await Axios.put(url,body,user)
            console.log(res)
            if(res.status===200){
               if(res.data.status==="error"){
                   return{
                       success:false,
                       data:res.data,
                       message: 2
                   }
               }
               else{
                return {
                    success:true,
                    data:res.data,
                };
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
}
    


