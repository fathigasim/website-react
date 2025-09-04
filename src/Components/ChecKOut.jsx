import React, { useEffect,useState } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Button';
import { Container,Row,InputGroup,Col } from 'react-bootstrap';
import ReactToPrint from "react-to-print";
import CheckoutButton from './CheckoutButton';
import { useQuery } from '@tanstack/react-query';
import BasketSummery from './BasketSummery';
const ChecKOut = () => {
 
  
   
      const checkOut =async()=>{
 try {
            const res= await axios.get(`https://localhost:7228/api/Order/CheckOut`,{withCredentials:true});
                console.log(res.data)
              return res.data

              //setTotal(data?.quantity*data?.goods.price)
           
                
       //   return    res.data
     
          
            
        } catch (err) {
            console.error(err);
        }
    }
 const checkoutQuery=useQuery({
  queryKey:['checkOutBasket'],
  queryFn:()=>checkOut()
 })
  return (
    <Container className='mt-5 mb-5' >
    
    <Row md={7} >
     
      {/* Checkout Items */}
      <div className="products mb-4">
        <h3 className="title">Checkout</h3>
 {checkoutQuery?.data && checkoutQuery.data?.map((item)=>(
  
        <div key= {item.basketitemId} className="item">
         
          <p className="item-name">{item.goods.goodsName}</p>
          <p className="item-name">{item.quantity}</p>    
      
           <span className="price">${item.goods.price}</span>
         
        </div>

               ))}

        <div className="total fw-bold">
          Total: <BasketSummery/>
        </div>
      </div>


        {/* <Button type="submit" variant="primary" className="w-100">
          Proceed
        </Button> */}
        <CheckoutButton/>
      
   
 </Row>
          </Container>
 
  
  
  )
}

export default ChecKOut
