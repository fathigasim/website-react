import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const fetchGoodData = async (page, categoryId) => {
        try {
            const res = await axios.get(`https://localhost:7228/api/goods`);
              return res.data
        }
           
         catch (err) {
            console.error(err);
        }
    };

    export const useGoodData = () => {
  return useQuery({
    queryKey: ['goodsData'], // Use a unique query key
    queryFn: fetchGoodData,
  });
};