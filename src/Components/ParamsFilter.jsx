// components/ProductFilters.js
import { useSearchParams } from 'react-router-dom';
import { useCategoryData } from '../hooks/useMyCategory';
import { Row } from 'react-bootstrap';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect,useState } from 'react';
export function ParamFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data : ct, isError:isErrorC } = useCategoryData();
  const {data :Pd,isError:isErrorP} = useProducts();
  
    // Create a new URLSearchParams object to modify
    const newSearchParams = new URLSearchParams(searchParams);

    // Local state for instant UI feedback
  const [searchValue, setSearchValue] = useState(
    searchParams.get('q') || ''
  );
  
  // Debounced value from the local state
  const debouncedSearchValue = useDebounce(searchValue, 500); // 500ms delay

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (debouncedSearchValue) {
      newSearchParams.set('search', debouncedSearchValue);
    } else {
      newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams, { replace: true });
    // The effect runs when the debounced value changes, updating the URL
  }, [debouncedSearchValue, searchParams, setSearchParams]);
const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  if(isErrorC || isErrorP) return <div>Error loading data</div>;
  return (
    <div>
        <Row className='mt-5'>
          <input
          type="text"
          name="search"
          value={searchValue}
          onChange={handleChange}
          placeholder="Search..."
          className="border p-2 rounded"
        />

        
      <select
        value={searchParams.get('category') || ''}
        onChange={(e) => handleChange('category', e.target.value)}
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
    </div>
    
   
  );
}

export default ParamFilters