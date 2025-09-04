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
    <div>
      
      {orderIdQuery.data&&
      
      <Container>
 
  <Row>

     <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Order Sequence</th>
          <th>Order Status</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
       
      

                 <tr >
          
          <td>{orderIdQuery.data.ordSeq}</td>
          <td>{orderIdQuery.data.orderStatus}</td>
          <td><CheckoutButton Id={orderIdQuery.data.id}/></td> 
           {/* send orderId to checkout component*/}
        </tr>
  
      
      </tbody>
    </Table>
    </Row>
    </Container>
      }
      
    </div>
  )
}

export default OrderList
