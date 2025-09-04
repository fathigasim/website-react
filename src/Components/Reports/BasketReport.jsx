import React from 'react'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const BasketReport = () => {
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
        <div>
      <div
        id="pdf-content"
        style={{
          padding: "20px",
          width: "600px",
          background: "#fff",
          border: "1px solid #ccc",
        }}
      >
        <h1>Invoice #1234</h1>
        <p>Customer: John Doe</p>
        <p>Date: 01/09/2025</p>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Product A</td>
              <td>2</td>
              <td>$50</td>
            </tr>
            
          </tbody>
        </table>
      </div>

      <button onClick={generatePDF} style={{ marginTop: "20px" }}>
        Download PDF
      </button>
    </div>
  )
}

export default BasketReport
