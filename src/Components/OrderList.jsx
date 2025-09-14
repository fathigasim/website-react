// import React from 'react'
// import axios from 'axios';
// import { useParams } from 'react-router'
// import { useQuery } from '@tanstack/react-query';
// import { Container,Row,Table } from 'react-bootstrap';
// import CheckoutButton from './CheckoutButton';
// const OrderList = () => {
//   const {Id}=useParams();
//   const orderDetail =async()=>{
//     try{
//  const res=  await axios.get(`https://localhost:7228/api/Order/OrderById/${Id}`,null,{withCredentials:true});
//   console.log(res.data);
//  return res.data;
//  }
//  catch(error){
//  console.log(error)
//  }
//   }
//   const orderIdQuery=useQuery({
//     queryKey:['orderIdQuery',{Id}],
//     queryFn:()=>orderDetail()
//   })
//   console.log(orderIdQuery.data)
//   return (
//     <>
      
//       {orderIdQuery.data&&
      
//       <Container className='mt-5'>
 
//   <Row>

//      <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Customer</th>
//           <th>email</th>
//           <th>Order Sequence</th>
//           <th>Order Status</th>
//           <th>Payment</th>
//         </tr>
//       </thead>
//       <tbody>
       
      

//                  <tr >
//           <td>{orderIdQuery.data.register.name}</td>
//           <td>{orderIdQuery.data.register.email}</td>
//           <td>{orderIdQuery.data.ordSeq}</td>
//           <td>{orderIdQuery.data.orderStatus}</td>
//           <td><CheckoutButton Id={orderIdQuery.data.id} style={{color:'blue'}}/></td> 
//            {/* send orderId to checkout component*/}
//         </tr>
  
      
//       </tbody>
//     </Table>
//     </Row>
//     <Row>

//      <Table striped bordered hover>
//       <thead>
//         <tr>
          
//           <th>Product</th>
//           <th>Quantity</th>
          
//         </tr>
//       </thead>
//       <tbody>
       
      
//    {orderIdQuery.data.orderItems&&
//    orderIdQuery.data?.orderItems?.map((items,index)=>(
    
//     <tr key={items.orderItemId}>
//     <td>{items.goods.goodsName}</td>
//     <td>{items.quantity}</td>
//     </tr>
//    ))}
                
          
        
//            {/* send orderId to checkout component*/}
    
  
      
//       </tbody>
//     </Table>
//     </Row>
//     </Container>
//       }
      
//     </>
//   )
// }

// export default OrderList
import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Container, Row, Table, Card, Spinner } from "react-bootstrap";
import CheckoutButton from "./CheckoutButton";

const OrderList = () => {
  const { Id } = useParams();

  const fetchOrderDetail = async () => {
    const res = await axios.get(
      `https://localhost:7228/api/Order/OrderById/${Id}`,
      { withCredentials: true }
    );
    return res.data;
  };

  const orderIdQuery = useQuery({
    queryKey: ["orderIdQuery", { Id }],
    queryFn: fetchOrderDetail,
  });

  if (orderIdQuery.isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (orderIdQuery.isError) {
    return <p className="text-danger text-center mt-5">Error loading order.</p>;
  }

  const order = orderIdQuery.data;

  const totalAmount = order?.orderItems?.reduce(
    (sum, item) => sum + item.quantity * (item.goods.price || 0),
    0
  );

  return (
    <Container className="mt-5">
      {/* Order Summary */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="fw-bold">Order Summary</Card.Header>
        <Card.Body>
          <Table bordered responsive>
            <thead className="table-light">
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Order #</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.register?.name}</td>
                <td>{order.register?.email}</td>
                <td>{order.ordSeq}</td>
                <td>
                  <span
                    className={`badge ${
                      order.orderStatus === "Completed"
                        ? "bg-success"
                        : order.orderStatus === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td>
                  <CheckoutButton Id={order.id} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Order Items */}
      <Card className="shadow-sm">
        <Card.Header className="fw-bold">Order Items</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th className="text-end">Price</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItems?.map((item) => (
                <tr key={item.orderItemId}>
                  <td>{item.goods.goodsName}</td>
                  <td>{item.quantity}</td>
                  <td className="text-end">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD", // Change dynamically if you want multi-currency
                    }).format(item.goods.price || 0)}
                  </td>
                  <td className="text-end">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.quantity * (item.goods.price || 0))}
                  </td>
                </tr>
              ))}
              <tr className="fw-bold">
                <td colSpan={3} className="text-end">
                  Grand Total
                </td>
                <td className="text-end text-primary">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "SAR",
                  }).format(totalAmount || 0)}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderList;
