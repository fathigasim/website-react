// import React, { useEffect, useState } from 'react';
// import axios from 'axios'
// import PaginationComponent from './Pagination/PaginationComponent';
// import { useSearchParams } from 'react-router-dom';
// import { Table, Container, Form, Row, Col, Button,InputGroup } from 'react-bootstrap';
// import { BsSearch } from 'react-icons/bs';
// import axiosInstance from '../hooks/axiosInstance';
// import Card from 'react-bootstrap/Card';
// import { useCategoryData } from '../hooks/useMyCategory';
// import BasketList from './BasketList';
// import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
// import { useForm } from 'react-hook-form';
// const ProductFilter = () => {
//   const queryClient=useQueryClient();
//     const {data,isError}=useCategoryData();
//     const [searchParams] = useSearchParams();
//   const searchTerms = searchParams.get('q');
//     const [products, setProducts] = useState([]);
//     const [totalItems, setTotalItems] = useState(0);
//     const [pageNumber, setPageNumber] = useState(1);
//     const [pageSize] = useState(5);

    
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
    
//     // const [prodId,setProdId]=useState('');
//     // useEffect(() => {
//     //     fetchCategories();
//     // }, []);

   
//     //  const fetchCategories = async () => {
//     //     try {
//     //         const res = await axios.get(`https://localhost:7228/api/Category/CategoryType`);
//     //         setCategories(res.data);
//     //     } catch (err) {
//     //         console.error(err);
//     //     }
//     // };
//  useEffect(() => {
//         fetchData();
//     }, [pageNumber]);
//     const fetchData = async () => {
          
//         try {
//             const res = await axiosInstance.get(`/api/Product/ProductFilter`,{
//                 params: {
//                     pageNumber,
//                     pageSize,
//                     search: searchTerm || null,
//                     categories: selectedCategories,
//                     // minPrice: minPrice || null,
//                     // maxPrice: maxPrice || null
//                 }
//                 ,
//                 paramsSerializer: params => {
//                     // Ensure multiple categories are passed correctly: categories=Cat1&categories=Cat2
//                     const query = new URLSearchParams();
//                     Object.entries(params).forEach(([key, value]) => {
//                         if (Array.isArray(value)) {
//                             value.forEach(v => query.append(key, v));
//                         } else if (value !== null && value !== '') {
//                             query.append(key, value);
//                         }
//                     });
//                     return query.toString();
//                 }
//             });
//             setProducts(res.data.items);
//             setTotalItems(res.data.totalItems);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleCategoryChange = (e) => {
//         const value = e.target.value;
//         setSelectedCategories(prev =>
//             prev.includes(value)
//                 ? prev.filter(c => c !== value)
//                 : [...prev, value]
//         );
//     };
//     const applyFilters = () => {
//         setPageNumber(1);
//         fetchData();
//     };

//     const resetFilters = () => {
//         setSearchTerm('');
//         setSelectedCategories([]);
//         // setMinPrice('');
//         // setMaxPrice('');
//         setPageNumber(1);
// //        fetchData();
//     };


// const handleAddToCart = async (prodId,inputQnt) => {
//   try {
//     await axiosInstance.post("/api/Basket/AddToBasket", 
//       {prodId:Number(prodId),inputQnt:Number(inputQnt)}
//     ,{
//         headers: {
//           "Content-Type": "application/json", // 👈 very important
          
//         },
//         withCredentials: true,
//       });
//     alert("Product added to cart");
//   } catch (err) {
//     console.error("AddToCart error:", err.response?.data || err.message);
//     alert("Failed to add product");
//   }
// };
//   const formatSAR = (value) =>
//     new Intl.NumberFormat("en-SA", { style: "currency", currency: "SAR" }).format(
//       value || 0
//     );

// const addCartMut=useMutation({
//       mutationFn:({ prodId, inputQnt })=>handleAddToCart(prodId,inputQnt), onSuccess:()=>{
//           queryClient.invalidateQueries(['basketList']);
//           queryClient.invalidateQueries(['basketsummery']);
//            reset();
// // alert("Product added successfully!");
//       },
//       onError:(error)=>{
//         console.log(error)
//         alert("Some went wrong !!!");
//        // reset();
//       }
//     })
//   // react-hook-form
//   const { register, handleSubmit, reset,setError, formState: { errors,isSubmitting,isSubmitSuccessful} } = useForm();
//     if(isError) return <div>Some went wrong</div>
//   return (
//     <>
//      <Container className="mt-4" style={{paddingBottom: "60px",marginBottom:'20px !important',bottom:'20px !important'}}>
//           <Row className='mb-2'><BasketList/></Row>
//             <Row className="mb-3">
//                 <Col md={3}>
//                     <Form.Control
//                         type="text"
//                         placeholder="Search by name..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </Col>
//                 <span></span>
//                 <Col md={3}>
//                {/* { console.log(data)} */}
//                     <Form.Label>Categories</Form.Label>
//                     {data?.map((cat) => (
//                         <Form.Check 
//                             key={cat.categoryId}
//                             type="checkbox"
//                             label={cat.categoryName}
//                             value={cat.categoryName}
//                             checked={selectedCategories.includes(cat.categoryName)}
//                             onChange={handleCategoryChange}
//                         />

//                     ))}
//                 </Col>
                
//                 <Col md={3} className="d-flex align-items-end">
//                     <Button size='sm' variant="primary" onClick={applyFilters} className="me-2"> <BsSearch size="2em" /> Apply</Button>
//                     <Button variant="secondary" onClick={resetFilters}>Reset</Button>
//                 </Col>
//             </Row>
//         <Row className="mb-3">
// {products.map((product) => (
//   <Col key={product.goodsId}
//       sm={12}
//       md={6}
//       lg={4}
//       className="mb-4 d-flex">
//   {/* <Card   className="h-100 w-100 shadow-sm"
//         style={{ border: "1px solid #faf8f8ff" }}>
//     <Card.Img 
//       variant="top"
//           style={{ width: "100%", height: "10rem", objectFit: "cover" }}
//           src={product.imgSrc}
//           alt={product.goodsName}
//     />
//     <Card.Body className="d-flex flex-column">
//       <Card.Title>{product.goodsName}</Card.Title>
//       <Card.Text className="flex-grow-1">{product.goodsDetail}</Card.Text>

//       <Form
//         onSubmit={(e) => {
//           e.preventDefault();
//           const qnt = parseInt(e.target.elements[`qnt-${product.goodsId}`].value, 10);
//           if (!qnt || qnt <= 0) {
//             alert("Please enter a valid quantity");
//             return;
//           }
//           addCartMut.mutate({ prodId: product.goodsId, inputQnt: qnt });
//           e.target.reset(); // reset only this form
//         }}
//       >
//         <Form.Control
//           type="number"
//           name={`qnt-${product.goodsId}`}
//           placeholder="Qty"
//           min="1"
//           required
//           className="mb-2"
//         />
//         <Button type="submit" variant="primary" size="md" style={{width:'100%'}} disabled={addCartMut.isLoading}>
//           {addCartMut.isLoading ? "Adding..." : "Add To Cart"}
//         </Button>
//       </Form>
//     </Card.Body>
//   </Card> */}
//   <Card className="h-100 shadow-sm border-light rounded">
//   <Card.Img
//     variant="top"
//     src={product.imgSrc}
//     alt={product.goodsName}
//     style={{ objectFit: "cover", height: "200px" }}
//     className="card-img-top"
//   />
//   <Card.Body className="d-flex flex-column">
//     <Card.Title className="text-truncate">{product.goodsName}</Card.Title>
//     <Card.Text className="flex-grow-1 text-muted">{product.goodsDetail}</Card.Text>
//     <div className="mb-2 fw-bold">{formatSAR(product.price)}</div>
//     {/* Add to cart form */}
//       <Form
//         onSubmit={(e) => {
//           e.preventDefault();
//           const qnt = parseInt(e.target.elements[`qnt-${product.goodsId}`].value, 10);
//           if (!qnt || qnt <= 0) {
//             alert("Please enter a valid quantity");
//             return;
//           }
//           addCartMut.mutate({ prodId: product.goodsId, inputQnt: qnt });
//           e.target.reset(); // reset only this form
//         }}
//       >
//     <Form.Control
//           type="number"
//           name={`qnt-${product.goodsId}`}
//           placeholder="Qty"
//           min="1"
//           required
//           className="mb-2"
//         />
//         <Button type="submit" variant="primary" size="md" style={{width:'100%'}} disabled={addCartMut.isLoading}>
//           {addCartMut.isLoading ? "Adding..." : "Add To Cart"}
//         </Button>
//       </Form>
//   </Card.Body>
// </Card>

//   </Col>
// ))}

//         </Row>

            

//             <PaginationComponent
//                 totalItems={totalItems}
//                 pageSize={pageSize}
//                 currentPage={pageNumber}
//                 onPageChange={setPageNumber}
//             />
//         </Container>
            
//         </>
//   )
// }

// export default ProductFilter
import React, { useEffect, useState } from "react";
import axiosInstance from "../hooks/axiosInstance";
import PaginationComponent from "./Pagination/PaginationComponent";
import BasketList from "./BasketList";
import { useCategoryData } from "../hooks/useMyCategory";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Accordion,
  Spinner,
  Toast,
  ToastContainer,
  InputGroup,
} from "react-bootstrap";
import { BsSearch, BsHeart, BsCartPlus } from "react-icons/bs";

const ProductFilter = () => {
  const queryClient = useQueryClient();
  const { data: categories, isError } = useCategoryData();

  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showToast, setShowToast] = useState({ show: false, message: "", type: "" });

  // ✅ Debounced search
  const debouncedFetch = debounce(() => fetchData(), 500);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [pageNumber]);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/api/Product/ProductFilter`, {
        params: {
          pageNumber,
          pageSize,
          search: searchTerm || null,
          categories: selectedCategories,
        },
        paramsSerializer: (params) => {
          const query = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((v) => query.append(key, v));
            } else if (value !== null && value !== "") {
              query.append(key, value);
            }
          });
          return query.toString();
        },
      });
      setProducts(res.data.items);
      setTotalItems(res.data.totalItems);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPageNumber(1);
    fetchData();
  };

  // ✅ Add to cart mutation
  const handleAddToCart = async (prodId, inputQnt) => {
    await axiosInstance.post(
      "/api/Basket/AddToBasket",
      { prodId: Number(prodId), inputQnt: Number(inputQnt) },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  };

  const addCartMut = useMutation({
    mutationFn: ({ prodId, inputQnt }) => handleAddToCart(prodId, inputQnt),
    onSuccess: () => {
      queryClient.invalidateQueries(["basketList"]);
      queryClient.invalidateQueries(["basketsummery"]);
      setShowToast({ show: true, message: "Product added to cart!", type: "success" });
    },
    onError: () => {
      setShowToast({ show: true, message: "Failed to add product.", type: "danger" });
    },
  });

  if (isError) return <div>⚠️ Something went wrong loading categories.</div>;

  return (
    <Container className="mt-4 mb-5">
      {/* 🛒 Basket Summary */}
      <Row className="mb-3">
        <BasketList />
      </Row>

      {/* 🔍 Filters */}
      <Row className="mb-4">
        <Col md={3}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                debouncedFetch();
              }}
            />
            <Button variant="primary">
              <BsSearch />
            </Button>
          </InputGroup>

          <Accordion className="mt-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Categories</Accordion.Header>
              <Accordion.Body>
                {categories?.map((cat) => (
                  <Form.Check
                    key={cat.categoryId}
                    type="checkbox"
                    label={cat.categoryName}
                    value={cat.categoryName}
                    checked={selectedCategories.includes(cat.categoryName)}
                    onChange={handleCategoryChange}
                  />
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Button variant="secondary" size="sm" className="mt-3 w-100" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Col>

        {/* 🛍️ Product Grid */}
        <Col md={9}>
          <Row>
            {products.length === 0 && <p>No products found.</p>}
            {products.map((product) => (
              <Col key={product.goodsId} sm={12} md={6} lg={4} xl={3} className="mb-4">
                <Card className="h-100 shadow-sm border-light rounded product-card">
                  <div className="position-relative">
                    <Card.Img
                      src={product.imgSrc}
                      alt={product.goodsName}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <Button
                      variant="light"
                      size="sm"
                      className="position-absolute top-0 end-0 m-2 rounded-circle"
                    >
                      <BsHeart />
                    </Button>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-truncate">{product.goodsName}</Card.Title>
                    <Card.Text className="text-muted small flex-grow-1">
                      {product.goodsDetail}
                    </Card.Text>
                    <div className="fw-bold mb-2 text-primary">
                      {new Intl.NumberFormat("en-SA", {
                        style: "currency",
                        currency: "SAR",
                      }).format(product.price)}
                    </div>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const qnt = parseInt(
                          e.target.elements[`qnt-${product.goodsId}`].value,
                          10
                        );
                        if (!qnt || qnt <= 0) {
                          setShowToast({ show: true, message: "Enter valid quantity", type: "danger" });
                          return;
                        }
                        addCartMut.mutate({ prodId: product.goodsId, inputQnt: qnt });
                        e.target.reset();
                      }}
                    >
                      <InputGroup>
                        <Form.Control
                          type="number"
                          name={`qnt-${product.goodsId}`}
                          placeholder="Qty"
                          min="1"
                          required
                        />
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={addCartMut.isLoading}
                        >
                          {addCartMut.isLoading ? (
                            <Spinner size="sm" animation="border" />
                          ) : (
                            <BsCartPlus />
                          )}
                        </Button>
                      </InputGroup>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* 📄 Pagination */}
          <PaginationComponent
            totalItems={totalItems}
            pageSize={pageSize}
            currentPage={pageNumber}
            onPageChange={setPageNumber}
          />
        </Col>
      </Row>

      {/* ✅ Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={showToast.type}
          onClose={() => setShowToast({ ...showToast, show: false })}
          show={showToast.show}
          delay={2500}
          autohide
        >
          <Toast.Body className="text-white">{showToast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default ProductFilter;
