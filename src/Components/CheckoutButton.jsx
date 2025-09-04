import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
const CheckoutButton = ({Id}) => {
   
    // useEffect(()=>{
    //     AddOrder();
    // },[])

    // const AddOrder=async ()=>{
    //      await axios.post(`https://localhost:7228/api/Order/AddOrder`,null,{withCredentials:true});
    // }
  const handleCheckout = async () => {
    try {
      const res = await axios.post(`https://localhost:7228/api/payment/create-checkout-session/${Id}`,{withCredentials:true}).then(
        // AddOrder()
      );
    window.location.href = res.data.url; // redirect to Stripe checkout
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleCheckout}>
      Pay with Stripe
    </button>
  );
};

export default CheckoutButton;
