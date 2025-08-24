import React,{useState,useEffect} from 'react'
 import axios from 'axios';
import axiosInstance from '../hooks/axiosInstance';
import { useAuth } from '../Context/AuthContext';
import PaginationComponent from './Pagination/PaginationComponent';
import { Table, Container, Form, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
const Category = () => {
    const catTypeQuery=useQuery({
        queryKey:['category'],
        queryFn:()=>fetchCategories()
    })
    
     const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(3);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    
    // useEffect(() => {
    //     fetchCategories();
    // }, []);
     useEffect(() => {
        fetchData(pageNumber, selectedCategory);

        
    }, [pageNumber, selectedCategory]);

    const fetchCategories = async () => {
        try {
            const res = await axiosInstance.get(`/api/Category/CategoryType`);
            return res.data;
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

     const fetchData = async (page, categoryId) => {
        try {
            const res = await axiosInstance.get(`/api/product/ByCategory?PageNumber=${page}&PageSize=${pageSize}&CategoryId=${categoryId || ''}`, 
              
        );
            setProducts(res.data.items);
            setTotalItems(res.data.totalItems);
        } catch (err) {
            console.error(err);
        }
    };
     const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setPageNumber(1); // reset to first page when category changes
    };
    if(catTypeQuery.isLoading) return <div>...Loading</div>
    if(catTypeQuery.isError) return <div>Some went wrong with api</div>
   return (
     <Container className="mt-4">
            <Row className="mb-3">
                <Col md={4}>
                     <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {catTypeQuery.data.map((cat,idx) => (
                            <option key={idx} value={cat.categoryId}>{cat.categoryName}</option>
                        ))}

                    </Form.Select> 
                  
                </Col>
            </Row>

            <h2>Products</h2>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.goodsId}>
                            <td>{p.goodsName}</td>
                            <td>{p.category.categoryName}</td>
                            <td>{p.goodsDetail}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <PaginationComponent
                totalItems={totalItems}
                pageSize={pageSize}
                currentPage={pageNumber}
                onPageChange={setPageNumber}
            />
        </Container>
  )
}

export default Category
