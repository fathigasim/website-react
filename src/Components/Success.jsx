import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";
const Success = () => {
   const [searchParams] = useSearchParams();
  const Id = searchParams.get("Id");
  useEffect(() => {
    const updateOrder = async () => {
      try {
        if (Id) {
          await axios.get(
            `https://localhost:7228/api/Order/UpdateOrder/${Id}`,
            null,
            { withCredentials: true }
          );
          console.log("Order updated successfully ✅");
        }
      } catch (error) {
        console.error("Failed to update order:", error);
      }
    };

    updateOrder();
  }, [Id]);
  return(<h1 style={{alignContent:'center',justifyContent:'center'}}>✅ Payment Successful!</h1>) ;
};

export default Success;
