import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query';
import { Container,Row,Table } from 'react-bootstrap';
import CheckoutButton from './CheckoutButton';
const OrderList = () => {
  const {Id}=useParams();
  const orderDetail =async()=>{
    try{
 const res=  await axios.get(`https://localhost:7228/api/Order/OrderById/${Id}`,null,{withCredentials:true});
  console.log(res.data);
 return res.data;
 }
 catch(error){
 console.log(error)
 }
  }
  const orderIdQuery=useQuery({
    queryKey:['orderIdQuery',{Id}],
    queryFn:()=>orderDetail()
  })
  console.log(orderIdQuery.data)
  return (
    <>
      
      {orderIdQuery.data&&
      
      <Container className='mt-5'>
 
  <Row>

     <Table striped bordered hover>
      <thead>
        <tr>
          <th>Customer</th>
          <th>email</th>
          <th>Order Sequence</th>
          <th>Order Status</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
       
      

                 <tr >
          <td>{orderIdQuery.data.register.name}</td>
          <td>{orderIdQuery.data.register.email}</td>
          <td>{orderIdQuery.data.ordSeq}</td>
          <td>{orderIdQuery.data.orderStatus}</td>
          <td><CheckoutButton Id={orderIdQuery.data.id} style={{color:'blue'}}/></td> 
           {/* send orderId to checkout component*/}
        </tr>
  
      
      </tbody>
    </Table>
    </Row>
    <Row>

     <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Product</th>
          <th>Quantity</th>
          
        </tr>
      </thead>
      <tbody>
       
      
   {orderIdQuery.data.orderItems&&
   orderIdQuery.data?.orderItems?.map((items,index)=>(
    
    <tr key={items.orderItemId}>
    <td>{items.goods.goodsName}</td>
    <td>{items.quantity}</td>
    </tr>
   ))}
                
          
        
           {/* send orderId to checkout component*/}
    
  
      
      </tbody>
    </Table>
    </Row>
    </Container>
      }
      
    </>
  )
}

export default OrderList
