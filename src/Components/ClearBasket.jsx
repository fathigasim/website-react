import axios from 'axios';
import React from 'react'
import { Container, Table,Row,Button } from 'react-bootstrap';
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
const ClearBasket = () => {

    const RemoveAllItems =async ()=>{
        try{
    const res= await axios.delete(`https://localhost:7228/api/Basket/ClearBasket`,{withCredentials:true});
    return res.data
     }
     catch(error){
        console.log(error)
     }
    }

    // const clearBasketQuery= useQuery({
    //     queryKey: ['clearBasket'], // Use a unique query key
    //     queryFn:RemoveAllItems,
    //   });

  return (
    <Button variant='danger' onClick={()=>RemoveAllItems()}>Delete All Items</Button>
  )
}

export default ClearBasket
