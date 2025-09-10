// components/ProductFilters.js
import { useSearchParams } from 'react-router-dom';
import { useCategoryData } from '../hooks/useMyCategory';
import { Container, Row,Form,Card,Button } from 'react-bootstrap';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import PaginationComponent from './Pagination/PaginationComponent';
import SmartPagination from './SmartPagination';
import { useQuery,useQueryClient,useMutation } from '@tanstack/react-query';
import axios from 'axios';
import SmartPagination2 from './SmartPagination2';
import '../product.css'

import axiosInstance from '../hooks/axiosInstance';

const fetchProducts = async ({ queryKey }) => {
  const [_key, params] = queryKey;

  const res = await axiosInstance.get("/api/product/ParamsFilter", {
    params,
  });
  console.log(res.data)
  return res.data;
};

export function ParamFilters() {
  const queryClient=useQueryClient();
     const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 Local state for search input (not directly URL bound)
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(searchInput, 600);

  // 🔹 Extract filters from URL (with defaults)
  const pageNumber = parseInt(searchParams.get("pageNumber") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "8", 10);
  // const sort = searchParams.get("sort") || "name";
  const category = searchParams.get("category") || "";

  // 🔹 React Query fetch
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "products",
      { pageNumber, pageSize, search: debouncedSearch
        // , sort
        , category }
    ],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });
// 🔹 Update URL params when debounced search changes
  useEffect(() => {
    updateParams({ search: debouncedSearch, pageNumber: 1 });
  }, [debouncedSearch]);

  // 🔹 Helper to update URL params
  const updateParams = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (!value) {
        updated.delete(key);
      } else {
        updated.set(key, value);
      }
    });
    setSearchParams(updated);
  };
   const totalPages = Math.ceil(data?.totalItems/data?.pageSize);
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
              // reset();
   // alert("Product added successfully!");
         },
         onError:(error)=>{
           console.log(error)
           alert("Some went wrong !!!");
          // reset();
         }
       })
  // 🔹 Loading / error UI
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;
  return (
  <div className="p-6 max-w-2xl mx-auto">
      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {/* Search */}
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          className="border p-2 rounded w-full"
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => updateParams({ category: e.target.value, pageNumber: 1 })}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
        </select>

        {/* Sort */}
        {/* <select
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select> */}
      </div>

      {/* Product List */}
      {data.items ? (
        <Container>
    <div className="card-grid">
      {data?.items?.map((product) => (
        <Card
          key={product.goodsId}
          className="h-100 shadow-sm"
          style={{ border: "1px solid #faf8f8ff" }}
        >
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
                const qnt = parseInt(
                  e.target.elements[`qnt-${product.goodsId}`].value,
                  10
                );
                if (!qnt || qnt <= 0) {
                  alert("Please enter a valid quantity");
                  return;
                }
                addCartMut.mutate({ prodId: product.goodsId, inputQnt: qnt });
                e.target.reset();
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
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={addCartMut.isLoading}
                className="w-100"
              >
                {addCartMut.isLoading ? "Adding..." : "Add To Cart"}
              </Button>
            </Form>

          </Card.Body>
        </Card>
      ))}
    </div>
    </Container>
    ):('no data found sorry')}
      

     {/* Pagination */}
<div className="flex justify-between items-center mt-4">
  {/* <button
    disabled={pageNumber === 1}
    onClick={() => updateParams({ pageNumber: pageNumber - 1 })}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span>
    Page {pageNumber} of {totalPages}
  </span>

  <button
    disabled={pageNumber === totalPages}
    onClick={() => updateParams({ pageNumber: pageNumber + 1 })}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Next
    
  </button> */}

{/* <SmartPagination
  pageNumber={pageNumber}
  totalPages={Math.ceil(data?.totalItems/data?.pageSize)}
  onPageChange={(page) => updateParams({ pageNumber: page })}
/> */}

<SmartPagination2   pageNumber={pageNumber}
  totalPages={Math.ceil(data?.totalItems/data?.pageSize)}
  onPageChange={(page) => updateParams({ pageNumber: page })}/>
</div>

      </div>
    
      )}
  
    
   

export default ParamFilters