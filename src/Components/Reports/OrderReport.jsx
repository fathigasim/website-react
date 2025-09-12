import {useEffect,useState} from 'react'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from 'axios';



const OrderReport = () => {
     const [OrderData,setOrderData]=useState([]);
      useEffect(()=>{
       axios.get(`https://localhost:7228/api/Report/OrderReport`).then(res=>{
    
        console.log(res.data);
            setOrderData(res.data)
            console.log(OrderData)
       })
      },[])

    const generatePDF = async () => {
   
    const input = document.getElementById("pdf-content");

    // take screenshot of component
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // create PDF
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // download PDF
    pdf.save("document.pdf");
  };
  return (
         <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    background: "#f0f2f5",
    minHeight: "100vh",
    paddingBottom: "60px"
  }} className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div
        id="pdf-content"
        className="bg-white shadow-lg rounded-xl p-6 w-[800px] border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Order Report
        </h2>

        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border border-gray-300 p-2">Order #</th>
              <th className="border border-gray-300 p-2">Products</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {OrderData.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 align-top font-mono text-xs text-gray-600">
                  {order.orderId}
                </td>
                <td className="border border-gray-300 p-0">
                  <table className="w-full border-collapse text-left text-gray-800">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border border-gray-200">Product</th>
                        <th className="p-2 border border-gray-200 text-center">
                          Qty
                        </th>
                        <th className="p-2 border border-gray-200 text-center">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((prd, index) => (
                        <tr key={index}>
                          <td className="p-2 border border-gray-200">
                            {prd.product}
                          </td>
                          <td className="p-2 border border-gray-200 text-center">
                            {prd.quantity}
                          </td>
                          <td className="p-2 border border-gray-200 text-center">
                            {prd.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td className="border border-gray-300 p-2 font-semibold text-green-600">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={generatePDF}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
       style={{
      padding: "12px 24px",
      background: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "15px",
    }}
      >
        Download PDF
      </button>
    </div>
  )
}

export default OrderReport
