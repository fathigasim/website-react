// import React from 'react'
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { Container, Table,Row,Button } from 'react-bootstrap';
// import { useMutation,useQueryClient } from '@tanstack/react-query';
// import { useTranslation } from 'react-i18next';
// import ClearBasket from './ClearBasket';
// import { Link } from 'react-router';
// import { useNavigate } from 'react-router';
// import axiosInstance from '../hooks/axiosInstance';

// const BasketList = () => {
//   const navigate=useNavigate();
//   const queryClient=useQueryClient();
//     const { i18n } = useTranslation(); // Get current i18next language
//   const RemoveFromBasket = async(prodId)=>{

//     try {
//         const res = await axiosInstance.delete(`/api/Basket/RemoveFromBasket/${prodId}`,{withCredentials:true});

//         return res.data}
//       catch (err) {
//         console.error(err);
//       }
//   }
//      const fetchBasketList = async () => {
//         try {
//             const res = await axiosInstance.get(`/api/Basket`);
      
//             return res.data
            
//         } catch (err) {
//             console.error(err);
//         }
//     };
//   const placeOrder =async()=>{
//    await axiosInstance.post(`/api/Order/AddOrder`,null,{withCredentials:true}).then((res)=>
//     {
//      if(res.status===200){
//       console.log(res.data);
//      const Id= res.data.id;
//     navigate(`/orderList/${Id}`,{replace:true})
//      } 
//     }).catch(error=>{
//       console.log(error)
//     });
      
//           //  return res.data

//   }

//      const basketQuery= useQuery({
//         queryKey: ['basketList'], // Use a unique query key
//         queryFn:()=> fetchBasketList(),
//       });
      
//        basketQuery.isLoading && <div>Loading...</div>
//        basketQuery.isError &&  <div>Error...</div>
//        console.log(basketQuery.data)
//        const RemoveBasketItemMut=useMutation({
//              mutationFn:({ prodId })=>RemoveFromBasket(prodId), onSuccess:()=>{
//                  queryClient.invalidateQueries(['basketList']);
                  
//        // alert("Product added successfully!");
//              },
//              onError:(error)=>{
//                console.log(error)
//                alert("Some went wrong !!!");
//               // reset();
//              }
//            })
//            const currencyMap = {
//   en: 'USD',
//   de: 'EUR',
//   ar: 'SAR'
// };
// const currency = currencyMap[i18n.language] || 'USD';
//   return (
// <>  

// {basketQuery.data?.length >0&&
// <Container>
//    <Row>
//     {/* <ClearBasket/> */}
//     {/* <Button onClick={()=>{checkOut()}}>CheckOut</Button> */}
//     {/* <Link to="/checkOut">Checkout</Link> */}
//     <Button onClick={()=>{placeOrder()}} variant='primary'>Order</Button>
//    </Row>
//   <Row>

//      <Table striped bordered hover>
//       <thead>
//         <tr>
          
//           <th>Product</th>
//           <th>Quantity</th>
//           <th>Price</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
       
       
//          {console.log(basketQuery.data)}
//         {basketQuery.data && basketQuery.data?.map((item)=>(

//                  <tr key={item.basketitemId}>
          
//           <td>{item.productname}</td>
//           <td>{item.quantity}</td>
//           <td>
//             {/* {item.price} */}
//             {new Intl.NumberFormat(i18n.language, { style: 'currency', currency }).format(item.price)}
//           </td>
//           <td><button size={'sm'} className='btn btn-danger ' onClick={()=>{
//              const prodId=Number(item.id)
//            RemoveBasketItemMut.mutate({prodId:prodId}) 
//           }}>Remove Item</button></td>
//         </tr>
       
//         ))}
      
//       </tbody>
//     </Table>
//     </Row>
//     </Container>
//     }
//     </>
//   )
// }

// export default BasketList

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import axiosInstance from "../hooks/axiosInstance";

const BasketList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { i18n } = useTranslation();

  // Currencies map
  const currencyMap = {
    en: "USD",
    de: "EUR",
    ar: "SAR",
  };
  const currency = currencyMap[i18n.language] || "USD";

  // Fetch basket items
  const fetchBasketList = async () => {
    const res = await axiosInstance.get(`/api/Basket`);
    return res.data;
  };

  // Place order
  const placeOrder = async () => {
    try {
      const res = await axiosInstance.post(`/api/Order/AddOrder`, null, {
        withCredentials: true,
      });
      if (res.status === 200) {
        const Id = res.data.id;
        navigate(`/orderList/${Id}`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Remove from basket
  const removeFromBasket = async (prodId) => {
    const res = await axiosInstance.delete(
      `/api/Basket/RemoveFromBasket/${prodId}`,
      { withCredentials: true }
    );
    return res.data;
  };

  // Queries & mutations
  const basketQuery = useQuery({
    queryKey: ["basketList"],
    queryFn: fetchBasketList,
  });

  const removeBasketItemMut = useMutation({
    mutationFn: ({ prodId }) => removeFromBasket(prodId),
    onSuccess: () => {
      queryClient.invalidateQueries(["basketList"]);
    },
  });

  if (basketQuery.isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (basketQuery.isError) {
    return <div className="text-danger text-center mt-5">Error loading basket.</div>;
  }

  const items = basketQuery.data || [];
  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Container className="my-4">
      <h2 className="fw-bold mb-4">🛒 Your Basket</h2>
      <Row className="g-3">
        {items.length > 0 ? (
          <>
            {items.map((item) => (
              <Col md={6} lg={4} key={item.basketitemId}>
                <Card className="shadow-sm h-100">
                  {item.imageUrl && (
                    <Card.Img
                      variant="top"
                      src={item.imageUrl}
                      alt={item.productname}
                      style={{ height: "180px", objectFit: "contain" }}
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{item.productname}</Card.Title>
                    <Card.Text className="mb-2">
                      Price:{" "}
                      {new Intl.NumberFormat(i18n.language, {
                        style: "currency",
                        currency,
                      }).format(item.price)}
                    </Card.Text>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-auto"
                      onClick={() =>
                        removeBasketItemMut.mutate({ prodId: Number(item.id) })
                      }
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {/* Basket Summary */}
            <Col md={12}>
              <Card className="shadow mt-4">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>Total Items: {items.length}</h5>
                    <h4 className="fw-bold text-primary">
                      Subtotal:{" "}
                      {new Intl.NumberFormat(i18n.language, {
                        style: "currency",
                        currency,
                      }).format(totalAmount)}
                    </h4>
                  </div>
                  <Button size="lg" variant="success" onClick={placeOrder}>
                    Proceed to Checkout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </>
        ) : (
          <div className="text-center py-5">
            <h5>Your basket is empty 🛍️</h5>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default BasketList;
