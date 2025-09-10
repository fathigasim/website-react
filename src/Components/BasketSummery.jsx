import React from 'react'
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { BsCart } from 'react-icons/bs';
import axiosInstance from '../hooks/axiosInstance';
const BasketSummery = () => {
const   fetchBasketSummery =async()=>{
try{ 
const res= await axios.get(`https://localhost:7228/api/Basket/BasketSummery`,{withCredentials:true})
// .then((res)=>{
//   console.log(res.data)
  return res.data; 
// }).catch((err)=>{
//   console.log(err)
// })
}

catch(error){
  console.log(error)
}}
     const basketSummeryQuery= useQuery({
        queryKey: ['basketsummery'], // Use a unique query key
        queryFn:fetchBasketSummery,
      });
        // if(basketSummeryQuery.isLoading) return <div>Loading...</div>
        console.log(basketSummeryQuery?.data)
  return (
    <>
    {basketSummeryQuery.data?.basketCount !==0&&
    <div className='mr-3'>
        <span style={{color:'red'}}>{basketSummeryQuery.data?.basketCount}<BsCart/>  </span>
    </div>
    
    }
    </>
  )
}

export default BasketSummery
