import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
 const fetchCategories = async () => {
        try {
            const res = await axios.get(`https://localhost:7228/api/Category/CategoryType`);
            console.log(res.data)
            return res.data
            
        } catch (err) {
            console.error(err);
        }
    };

    export const useCategoryData = () => {
  return useQuery({
    queryKey: ['categoryType'], // Use a unique query key
    queryFn:()=> fetchCategories(),
  });
};