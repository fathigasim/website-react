import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
 import { useTranslation } from "react-i18next";

const OrderByDateReport = () => {
  const { t } = useTranslation("orderdatereport");
  const [OrderData, setOrderData] = useState([]);
  const [orderDate, setOrderDate] = useState("");

  const DatedOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://localhost:7228/api/Report/OrderByDate`,
        { params: { dt: orderDate } }
      );
      setOrderData(res.data || []);
    } catch (err) {
      console.error(err);
      setOrderData([]);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  };

  const formatSAR = (value) =>
    new Intl.NumberFormat("en-SA", { style: "currency", currency: "SAR" }).format(
      value || 0
    );

  const generatePDF = async () => {
    const element = document.getElementById("pdf-content");

    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Order Report-${formatDate(new Date())}.pdf`);
  };

  return (
    <div style={{ width: "90%", margin: "20px auto", paddingBottom: "60px" }}>
      {/* Search Form */}
      <Form className="mb-4 p-3 border rounded bg-light shadow-sm">
        <Row className="align-items-end">
          <Col xs="auto">
            <Form.Label className="fw-bold">Search By Date</Form.Label>
            <Form.Control
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button variant="primary" className="mt-2" onClick={DatedOrder}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {/* PDF Content */}
      <div
        id="pdf-content"
        style={{ width: "100%", minHeight: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h2 className="text-center mb-4">Order Dates Report</h2>

        {OrderData.length > 0 ? (
          OrderData.map((order) => (
            <div
              key={order.orderId}
              className="mb-4 p-3 border rounded shadow-sm"
              style={{ background: "#fff", width: "100%" }}
            >
              {/* Order Header */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <strong>Order #: </strong>{order.orderId} <br />
                  <strong>Date: </strong>{formatDate(order.orderDate)}
                </div>
                <div style={{ fontWeight: "bold", color: "green" }}>
                  {order.status}
                </div>
              </div>

              {/* Products List */}
              <table className="table table-striped table-sm mb-2">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th className="text-center">Qty</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((prd, idx) => (
                      <tr key={idx}>
                        <td>{prd.product}</td>
                        <td className="text-center">{prd.quantity}</td>
                        <td className="text-center">{formatSAR(prd.price)}</td>
                        <td className="text-center">{formatSAR(prd.price * prd.quantity)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No products</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end fw-bold">Order Total:</td>
                    <td className="text-center fw-bold">
                      {formatSAR(order.items.reduce((sum, i) => sum + i.quantity * i.price, 0))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))
        ) : (
          <p className="text-center">No orders found.</p>
        )}

        {/* Grand Total */}
        {OrderData.length > 0 && (
          <div className="text-end mt-3 fw-bold fs-5">
            Grand Total:{" "}
            {formatSAR(
              OrderData.reduce(
                (acc, order) =>
                  acc + order.items.reduce((sum, i) => sum + i.quantity * i.price, 0),
                0
              )
            )}
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <Button variant="success" onClick={generatePDF}>
          {t("download")}
        </Button>
      </div>
    </div>
  );
};

export default OrderByDateReport;
