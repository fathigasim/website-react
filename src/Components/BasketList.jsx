import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Container, Table,Row,Button } from 'react-bootstrap';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import ClearBasket from './ClearBasket';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import axiosInstance from '../hooks/axiosInstance';

const BasketList = () => {
  const navigate=useNavigate();
  const queryClient=useQueryClient();
    const { i18n } = useTranslation(); // Get current i18next language
  const RemoveFromBasket = async(prodId)=>{

    try {
        const res = await axiosInstance.delete(`/api/Basket/RemoveFromBasket/${prodId}`,{withCredentials:true});

        return res.data}
      catch (err) {
        console.error(err);
      }
  }
     const fetchBasketList = async () => {
        try {
            const res = await axiosInstance.get(`/api/Basket`);
      
            return res.data
            
        } catch (err) {
            console.error(err);
        }
    };
  const placeOrder =async()=>{
   await axiosInstance.post(`/api/Order/AddOrder`,null,{withCredentials:true}).then((res)=>
    {
     if(res.status===200){
      console.log(res.data);
     const Id= res.data.id;
    navigate(`/orderList/${Id}`,{replace:true})
     } 
    }).catch(error=>{
      console.log(error)
    });
      
          //  return res.data

  }

     const basketQuery= useQuery({
        queryKey: ['basketList'], // Use a unique query key
        queryFn:()=> fetchBasketList(),
      });
      
       basketQuery.isLoading && <div>Loading...</div>
       basketQuery.isError &&  <div>Error...</div>
       console.log(basketQuery.data)
       const RemoveBasketItemMut=useMutation({
             mutationFn:({ prodId })=>RemoveFromBasket(prodId), onSuccess:()=>{
                 queryClient.invalidateQueries(['basketList']);
                  
       // alert("Product added successfully!");
             },
             onError:(error)=>{
               console.log(error)
               alert("Some went wrong !!!");
              // reset();
             }
           })
           const currencyMap = {
  en: 'USD',
  de: 'EUR',
  ar: 'SAR'
};
const currency = currencyMap[i18n.language] || 'USD';
  return (
<>  

{basketQuery.data?.length >0&&
<Container>
   <Row>
    {/* <ClearBasket/> */}
    {/* <Button onClick={()=>{checkOut()}}>CheckOut</Button> */}
    {/* <Link to="/checkOut">Checkout</Link> */}
    <Button onClick={()=>{placeOrder()}} variant='primary'>Order</Button>
   </Row>
  <Row>

     <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
       
       
         {console.log(basketQuery.data)}
        {basketQuery.data && basketQuery.data?.map((item)=>(

                 <tr key={item.basketitemId}>
          
          <td>{item.productname}</td>
          <td>{item.quantity}</td>
          <td>
            {/* {item.price} */}
            {new Intl.NumberFormat(i18n.language, { style: 'currency', currency }).format(item.price)}
          </td>
          <td><button size={'sm'} className='btn btn-danger ' onClick={()=>{
             const prodId=Number(item.id)
           RemoveBasketItemMut.mutate({prodId:prodId}) 
          }}>Remove Item</button></td>
        </tr>
       
        ))}
      
      </tbody>
    </Table>
    </Row>
    </Container>
    }
    </>
  )
}

export default BasketList
