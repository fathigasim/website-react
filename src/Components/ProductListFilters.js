import React, { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const ProductListFilters = ({ onChange }) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    onChange({ search: debouncedSearch });
  }, [debouncedSearch, onChange]);

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="...search"
    />
  );
};

export default ProductListFilters;
