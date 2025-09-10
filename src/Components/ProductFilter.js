import React, { useEffect, useState } from 'react';
import axios from 'axios'
import PaginationComponent from './Pagination/PaginationComponent';
import { useSearchParams } from 'react-router-dom';
import { Table, Container, Form, Row, Col, Button,InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import axiosInstance from '../hooks/axiosInstance';
import Card from 'react-bootstrap/Card';
import { useCategoryData } from '../hooks/useMyCategory';
import BasketList from './BasketList';
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
const ProductFilter = () => {
  const queryClient=useQueryClient();
    const {data,isError}=useCategoryData();
    const [searchParams] = useSearchParams();
  const searchTerms = searchParams.get('q');
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(5);

    
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    
    // const [prodId,setProdId]=useState('');
    // useEffect(() => {
    //     fetchCategories();
    // }, []);

   
    //  const fetchCategories = async () => {
    //     try {
    //         const res = await axios.get(`https://localhost:7228/api/Category/CategoryType`);
    //         setCategories(res.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
 useEffect(() => {
        fetchData();
    }, [pageNumber]);
    const fetchData = async () => {
          
        try {
            const res = await axiosInstance.get(`/api/Product/ProductFilter`,{
                params: {
                    pageNumber,
                    pageSize,
                    search: searchTerm || null,
                    categories: selectedCategories,
                    // minPrice: minPrice || null,
                    // maxPrice: maxPrice || null
                }
                ,
                paramsSerializer: params => {
                    // Ensure multiple categories are passed correctly: categories=Cat1&categories=Cat2
                    const query = new URLSearchParams();
                    Object.entries(params).forEach(([key, value]) => {
                        if (Array.isArray(value)) {
                            value.forEach(v => query.append(key, v));
                        } else if (value !== null && value !== '') {
                            query.append(key, value);
                        }
                    });
                    return query.toString();
                }
            });
            setProducts(res.data.items);
            setTotalItems(res.data.totalItems);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategories(prev =>
            prev.includes(value)
                ? prev.filter(c => c !== value)
                : [...prev, value]
        );
    };
    const applyFilters = () => {
        setPageNumber(1);
        fetchData();
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategories([]);
        // setMinPrice('');
        // setMaxPrice('');
        setPageNumber(1);
//        fetchData();
    };


const handleAddToCart = async (prodId,inputQnt) => {
  try {
    await axiosInstance.post("/api/Basket/AddToBasket", 
      {prodId:Number(prodId),inputQnt:Number(inputQnt)}
    ,{
        headers: {
          "Content-Type": "application/json", // 👈 very important
          
        },
        withCredentials: true,
      });
    alert("Product added to cart");
  } catch (err) {
    console.error("AddToCart error:", err.response?.data || err.message);
    alert("Failed to add product");
  }
};

const addCartMut=useMutation({
      mutationFn:({ prodId, inputQnt })=>handleAddToCart(prodId,inputQnt), onSuccess:()=>{
          queryClient.invalidateQueries(['basketList']);
          queryClient.invalidateQueries(['basketsummery']);
           reset();
// alert("Product added successfully!");
      },
      onError:(error)=>{
        console.log(error)
        alert("Some went wrong !!!");
       // reset();
      }
    })
  // react-hook-form
  const { register, handleSubmit, reset,setError, formState: { errors,isSubmitting,isSubmitSuccessful} } = useForm();
    if(isError) return <div>Some went wrong</div>
  return (
    <>
     <Container className="mt-4" >
          <Row className='mb-2'><BasketList/></Row>
            <Row className="mb-3">
                <Col md={3}>
                    <Form.Control
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <span></span>
                <Col md={3}>
               {/* { console.log(data)} */}
                    <Form.Label>Categories</Form.Label>
                    {data?.map((cat) => (
                        <Form.Check 
                            key={cat.categoryId}
                            type="checkbox"
                            label={cat.categoryName}
                            value={cat.categoryName}
                            checked={selectedCategories.includes(cat.categoryName)}
                            onChange={handleCategoryChange}
                        />

                    ))}
                </Col>
                
                <Col md={3} className="d-flex align-items-end">
                    <Button size='sm' variant="primary" onClick={applyFilters} className="me-2"> <BsSearch size="2em" /> Apply</Button>
                    <Button variant="secondary" onClick={resetFilters}>Reset</Button>
                </Col>
            </Row>
        <Row className="mb-3">
{products.map((product) => (
  <Col key={product.goodsId}
      sm={12}
      md={6}
      lg={4}
      className="mb-4 d-flex">
  <Card   className="h-100 w-100 shadow-sm"
        style={{ border: "1px solid #faf8f8ff" }}>
    <Card.Img 
      variant="top"
          style={{ width: "100%", height: "10rem", objectFit: "cover" }}
          src={product.imgSrc}
          alt={product.goodsName}
    />
    <Card.Body className="d-flex flex-column">
      <Card.Title>{product.goodsName}</Card.Title>
      <Card.Text className="flex-grow-1">{product.goodsDetail}</Card.Text>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const qnt = parseInt(e.target.elements[`qnt-${product.goodsId}`].value, 10);
          if (!qnt || qnt <= 0) {
            alert("Please enter a valid quantity");
            return;
          }
          addCartMut.mutate({ prodId: product.goodsId, inputQnt: qnt });
          e.target.reset(); // reset only this form
        }}
      >
        <Form.Control
          type="number"
          name={`qnt-${product.goodsId}`}
          placeholder="Qty"
          min="1"
          required
          className="mb-2"
        />
        <Button type="submit" variant="primary" size="sm" disabled={addCartMut.isLoading}>
          {addCartMut.isLoading ? "Adding..." : "Add To Cart"}
        </Button>
      </Form>
    </Card.Body>
  </Card>
  </Col>
))}

        </Row>

            

            <PaginationComponent
                totalItems={totalItems}
                pageSize={pageSize}
                currentPage={pageNumber}
                onPageChange={setPageNumber}
            />
        </Container>
            
        </>
  )
}

export default ProductFilter
