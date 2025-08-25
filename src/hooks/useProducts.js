// hooks/useProducts.js
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const fetchProducts = async ({ queryKey }) => {
  const [_key, filters] = queryKey;
  const { search,category, pageNumber, pageSize
    // , sortBy, minPrice, maxPrice 
} = filters;

  const response = await axios.get(`https://localhost:7228/api/Product/ParamsFilter`, {
    params: {
        search,
      category,
      pageNumber,
      pageSize,
    //   ,
    //   sortBy,
    //   minPrice,
    //   maxPrice,
    },
  });

  return response.data;
};

export function useProducts() {
  const [searchParams] = useSearchParams();

  // Extract filters from URL search params
  const filters = {
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    pageNumber: parseInt(searchParams.get('pageNumber')) || 1,
    pageSize: parseInt(searchParams.get('pageSize')) || 5,
    // sortBy: searchParams.get('sortBy') || 'newest',
    // minPrice: searchParams.get('minPrice') || '',
    // maxPrice: searchParams.get('maxPrice') || '',
  };

  // The query key includes the filters, ensuring a new query is triggered on change
  return useQuery({
    queryKey: ['productsparams', filters],
    queryFn: fetchProducts,
    _keepPreviousData: true, // Optional: keeps previous data while fetching new
  });
}