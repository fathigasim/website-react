// components/ProductFilters.js
import { useSearchParams } from 'react-router-dom';
import { useCategoryData } from '../hooks/useMyCategory';
import { Row } from 'react-bootstrap';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
export function ParamFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data : ct, isError:isErrorC } = useCategoryData();
  const {data :Pd,isError:isErrorP} = useProducts();
  const handleFilterChange = (filterName, value) => {
    // Create a new URLSearchParams object to modify
    const newSearchParams = new URLSearchParams(searchParams);

    if (value) {
      newSearchParams.set(filterName, value);
    } else {
      newSearchParams.delete(filterName);
    }

    setSearchParams(newSearchParams, { replace: true });
  };
  const debouncedSearch = useDebounce(searchParams.get('search') || '', 600);
  if(isErrorC || isErrorP) return <div>Error loading data</div>;
  return (
    <div>
        <Row className='mt-5'>
          <input
          type="text"
          name="search"
          value={searchParams.get('search') || ''}
          onChange={(e)=>handleFilterChange('search',e.target.value)}
          placeholder="Search..."
          className="border p-2 rounded"
        />

        
      <select
        value={searchParams.get('category') || ''}
        onChange={(e) => handleFilterChange('category', e.target.value)}
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