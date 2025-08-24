import React, { useEffect, useState } from 'react';
import axios from 'axios'
import PaginationComponent from './Pagination/PaginationComponent';
import { useSearchParams } from 'react-router-dom';
import { Table, Container, Form, Row, Col, Button,Select } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import axiosInstance from '../hooks/axiosInstance';
import Card from 'react-bootstrap/Card';
import { useCategoryData } from '../hooks/useMyCategory';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from "../hooks/useDebounce"; 
import ProductListFilters from './ProductListFilters';





 const CustomFilter = () => {
    const {data,isError}=useCategoryData();

//  useEffect(() => {
//         fetchData();
//     }, [pageNumber]);
    const fetchData = async (filters) => {
          
        try {
            const params = new URLSearchParams(filters).toString();
            const res = await axios.get(`https://localhost:7228/api/Product/CustomFilter?${params}`)
            return res.data
            // setProducts(res.data.items);
            // setTotalItems(res.data.totalItems);
        } catch (err) {
            console.error(err);
        }
    };


  
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    // minPrice: "",
    // maxPrice: "",
  });
  
  // 👇 Debounce the search text only
  const debouncedSearch = useDebounce(filters.search, 600);
    // 👇 Create new object with debounced search
  const debouncedFilters = { ...filters, search: debouncedSearch };

  // ✅ React Query with dynamic filters
  const dynamicFilter = useQuery({
    queryKey: ["products", debouncedFilters],
    queryFn: () => fetchData(debouncedFilters),
    keepPreviousData: true, // keep old data while fetching new
  });
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };



    if(isError) return <div>Some went wrong</div>
  return (
    <>
     <Container className="mt-4 mb-4" style={{marginBottom:'20px !important',bottom:'20px !important'}}>
        {console.log(dynamicFilter.data)}
          <Row className="mb-3">
                        <Col md={3}>
                        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search..."
          className="border p-2 rounded"
        />
                        </Col>
                        <Col md={3}>
                         <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
            
          <option value="">All Categories</option>
          {data?.map((cat)=>{

       return <option value={cat.categoryId}>{cat.categoryName}</option>
          
          })}
   
        </select>
                        </Col>
                    </Row>
                
         <Row className="mb-3">
            
{dynamicFilter.data&&dynamicFilter.data.items.map((product) => (

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
{dynamicFilter.isFetching&&<div>...Loading</div>}
</Row>
       

          

            {/* <PaginationComponent
                totalItems={productCustomFilter.data.totalItems}
                pageSize={pageSize}
                currentPage={pageNumber}
                onPageChange={setPageNumber}
            /> */}
    
            </Container>
        </>
  )
}
 
export default CustomFilter;



