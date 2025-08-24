import React, { useEffect, useState } from 'react';
import axios from 'axios'
import PaginationComponent from './Pagination/PaginationComponent';
import { useSearchParams } from 'react-router-dom';
import { Table, Container, Form, Row, Col, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import axiosInstance from '../hooks/axiosInstance';
import Card from 'react-bootstrap/Card';
import { useCategoryData } from '../hooks/useMyCategory';
const ProductFilter = () => {
    const {data,isError}=useCategoryData();
    const [searchParams] = useSearchParams();
  const searchTerms = searchParams.get('q');
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(5);

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
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
            const res = await axios.get(`https://localhost:7228/api/Product/ProductFilter`,{
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
    if(isError) return <div>Some went wrong</div>
  return (
    <>
     <Container className="mt-4 mb-4" style={{marginBottom:'20px !important',bottom:'20px !important'}}>
        
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
                    {data.map((cat) => (
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

<Card key={product.goodsId} style={{ width: '16rem',margin:'1rem',border: '1px solid #faf8f8ff' }}>
      <Card.Img variant="top" style={{width: '100%',height:'10rem'}} src={product.imgSrc} alt="Card image cap" />
      <Card.Body>
        <Card.Title>{product.goodsName}</Card.Title>
        <Card.Text>
         {product.goodsDetail}
        </Card.Text>
      </Card.Body>
    </Card>
))}
        </Row>

            {/* <h2>Products</h2>
            <Table bordered hover>
                <thead>
                    <tr>
                        
                        <th>Name</th>
                        <th>Category</th>
                        <th>Details</th>
                        <th>Image</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.goodsId}>
                            <td>{p.goodsName}</td>
                            <td>{p.category.categoryName}</td>
                            <td>{p.goodsDetail}</td>
                            <td><img src={p.imgSrc} alt='avatar'></img></td>
                        </tr>
                    ))}
                </tbody>
            </Table> */}

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
