// components/ProductFilters.js
import { useSearchParams } from 'react-router-dom';
import { useCategoryData } from '../hooks/useMyCategory';
import { Container, Row } from 'react-bootstrap';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
export function ParamFilters2() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data : ct,  } = useCategoryData();
  const {data :Pd,isError,isLoading} = useProducts();
  // read filters from URL params
  // local input state (not directly triggering query)
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  // debounce input
  const debouncedSearch = useDebounce(searchInput, 600);

  // keep filters synced with URL
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      newParams.set("search", debouncedSearch);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams, { replace: true });
  }, [debouncedSearch]);
  const filters = {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    // sort: searchParams.get("sort") || "asc",
  };
// update filter in URL
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Some went wrong</p>
  return (
    <div>
      <Container>
        <Row className='mt-5'>
       <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border px-2 py-1 rounded"
        />


        
      <select
        value={filters.category}
        onChange={(e) => updateFilter('category', e.target.value)}
      >
        <option value="">All Categories</option>
        {ct?.map((cat) => (
          <option key={cat.categoryId} value={cat.categoryId}> {cat.categoryName}</option>  ))}
      </select>
      
      {/* <select
        value={searchParams.get('sortBy') || 'newest'}
        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
      </select> */}
      </Row>
       <Row>
         {/* Render products based on updated searchParams */}
         {/* <ProductList searchParams={searchParams} /> */}
          <ul>
        {Pd?.items?.map(product => (
          <li key={product.goodsid}>{product.goodsName}</li>
        ))}
      </ul>
    </Row>
    </Container>
    </div>
    
   
  );
}
export default ParamFilters2