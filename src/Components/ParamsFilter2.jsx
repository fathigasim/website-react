
import { useSearchParams } from 'react-router-dom';
import { useCategoryData } from '../hooks/useMyCategory';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axiosInstance from '../hooks/axiosInstance';
import SmartPagination2 from './SmartPagination2';
import { useTranslation } from 'react-i18next';
import '../product.css';
import BasketList from './BasketList';
import { toast } from "react-toastify";


const fetchProducts = async ({ queryKey }) => {
  
  

  const [_key, params] = queryKey;
  const res = await axiosInstance.get("/api/product/ParamsFilter", { params });
  return res.data;
};

export function ParamFilters() {
  
  const { t,i18n } = useTranslation("basket");

  const formatCurrency = (value) =>
  new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "SAR"
  }).format(value);

  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 State
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(searchInput, 600);

  const pageNumber = parseInt(searchParams.get("pageNumber") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "8", 10);
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "priceAsc";

  // 🔹 Fetch products
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", { pageNumber, pageSize, search: debouncedSearch, category, minPrice, maxPrice, sort }],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  const { data: categories } = useCategoryData();

  // 🔹 Update URL params
  const updateParams = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (!value) updated.delete(key);
      else updated.set(key, value);
    });
    setSearchParams(updated);
  };

  useEffect(() => {
    updateParams({ search: debouncedSearch, pageNumber: 1 });
  }, [debouncedSearch]);

  // 🔹 Add to cart
  const handleAddToCart = async (prodId, inputQnt) => {
    try {
      await axiosInstance.post("/api/Basket/AddToBasket",
        { prodId: Number(prodId), inputQnt: Number(inputQnt) },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      
      toast.success("Product added to cart");
    } catch (err) {
     // console.error("AddToCart error:", err.response?.data || err.message);
      toast.error("Failed to add product to cart");
      alert("Failed to add product");
    }
  };

  const addCartMut = useMutation({
    mutationFn: ({ prodId, inputQnt }) => handleAddToCart(prodId, inputQnt),
    onSuccess: () => {
      queryClient.invalidateQueries(['basketList']);
      queryClient.invalidateQueries(['basketsummery']);
    },
    onError: () => alert("Something went wrong!"),
  });

  // 🔹 Loading / Error
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <Container className="mt-4 mb-4" style={{ paddingBottom: "60px" }}>
      <Row><Col md={5} sm={9}><BasketList/></Col></Row>
      <Row>
        {/* Sidebar: Categories */}
        {/* <Col md={3} className="mb-3">
          <h5>Categories</h5>
          <Form.Select
            value={category}
            onChange={(e) => updateParams({ category: e.target.value, pageNumber: 1 })}
            className="mb-3"
          >
            <option value="">All</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.categoryId}>{cat.categoryName}</option>
            ))}
          </Form.Select>
        </Col> */}
        <Col md={3} className="mb-3 p-3 bg-light rounded shadow-sm">
  <h5 className="mb-3">Filters</h5>

  <label className="form-label">Category</label>
  <Form.Select
    value={category}
    onChange={(e) => updateParams({ category: e.target.value, pageNumber: 1 })}
    className="mb-3"
  >
    <option value="">All</option>
    {categories?.map((cat) => (
      <option key={cat.id} value={cat.categoryId}>{cat.categoryName}</option>
    ))}
  </Form.Select>

  <label className="form-label">Price Range</label>
  <div className="d-flex gap-2 mb-3">
    <Form.Control
      type="number"
      placeholder="Min"
      value={minPrice}
      onChange={(e) => updateParams({ minPrice: e.target.value, pageNumber: 1 })}
    />
    <Form.Control
      type="number"
      placeholder="Max"
      value={maxPrice}
      onChange={(e) => updateParams({ maxPrice: e.target.value, pageNumber: 1 })}
    />
  </div>

  <Button variant="secondary" size="sm" onClick={() => updateParams({ category: '', minPrice: '', maxPrice: '', pageNumber: 1 })}>
    Clear Filters
  </Button>
</Col>


        {/* Main: Search + Sort + Products */}
        <Col md={9}>
          {/* Filters: Search + Sort */}
          <Row className="mb-3">
            <Col md={6} className="mb-2">
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Col>
            <Col md={6} className="mb-2">
              <Form.Select
                value={sort}
                onChange={(e) => updateParams({ sort: e.target.value, pageNumber: 1 })}
              >
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Product Cards */}
          {data.items && data.items.length > 0 ? (
            <div className="card-grid">
              {data.items.map(product => (
                <Card key={product.goodsId} className="product-card mb-3 shadow-sm">
  <div className="position-relative">
    <Card.Img
      src={product.imgSrc}
      alt={product.goodsName}
      style={{ height: "220px", objectFit: "cover" }}
    />
    <span className="position-absolute top-0 end-0 badge bg-primary m-2"> {formatCurrency(product.price )}</span>
  </div>
  <Card.Body className="d-flex flex-column">
    <Card.Title className="mb-1">{product.goodsName}</Card.Title>
    <Card.Text className="flex-grow-1 text-muted">{product.goodsDetail}</Card.Text>

    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const qnt = parseInt(e.target.elements[`qnt-${product.goodsId}`].value, 10);
        if (!qnt || qnt <= 0) return alert("Please enter a valid quantity");
        addCartMut.mutate({ prodId: product.goodsId, inputQnt: qnt });
        e.target.reset();
      }}
    >
      <div className="d-flex gap-2">
        <Form.Control type="number" name={`qnt-${product.goodsId}`} placeholder="Qty" min="1" />
        <Button type="submit"  style={{ backgroundColor: "#2c3e50 !important" }} className="flex-shrink-0">Add</Button>
      </div>
    </Form>
  </Card.Body>
</Card>

              ))}
            </div>
          ) : (
            <p>No products found</p>
          )}

          <div className="d-flex justify-content-center mt-4 mb-4">
            {data.items.length > 0 && 
  <SmartPagination2
    pageNumber={pageNumber}
    totalPages={Math.ceil(data?.totalItems / data?.pageSize)}
    onPageChange={(page) => updateParams({ pageNumber: page })}
  />
  }
</div>

        </Col>
      </Row>
    </Container>
  );
}

export default ParamFilters;
