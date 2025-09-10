
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'

import { Row,Col,Form, Container, Button } from 'react-bootstrap'
import axios from 'axios'
import axiosInstance from '../hooks/axiosInstance';

import { useForm } from 'react-hook-form';
import BasketList from './BasketList';
const AddProduct = () => {
   // const { data, isLoading, isError, error } = useGoodData();
    const queryClient=useQueryClient();
   const fetchCategories = async () => {
        try {
            const res = await axios.get(`https://localhost:7228/api/Category/CategoryType`);
            return res.data;
            
        } catch (err) {
            console.error(err);
        }
    };
    const catTypeQuery=useQuery({
          queryKey:['categories'],
          queryFn:()=>fetchCategories()
      })
   //adding goods
   const addProduct= async(data)=>{
    const formdata=new FormData();
    formdata.append('goodsName',data.GoodsName)
    formdata.append('categoryId',data.CategoryId)
    formdata.append('GoodsDetail',data.GoodsDetail)
    formdata.append('GoodImg',data.GoodImg[0]);
    axiosInstance.post(`https://localhost:7228/api/goods`,formdata,{headers:{'Content-Type':'multipart/form-data'}})
    .then((res)=>{
      console.log(res.status)
    }

    ).catch((err)=>{
      console.log(err)
    })
   }
   const fetchGoodData = async () => {
        try {
            const res = await axios.get(`https://localhost:7228/api/goods`);
              return res.data
        }
           
         catch (err) {
            console.error(err);
        }
    };
   
    
const addGoodMut=useMutation({
      mutationFn:addProduct,
      onSuccess:()=>{
          queryClient.invalidateQueries(['goodsDatas']);
           reset();
// alert("Product added successfully!");
      },
      onError:(error)=>{
        console.log(error)
        alert("Some went wrong !!!");
        reset();
      }
    })

     const GoodData 
      = useQuery({
        queryKey: ['goodsDatas'], // Use a unique query key
        queryFn:()=> fetchGoodData()
      });

    // react-hook-form
  const { register, handleSubmit, reset,setError, formState: { errors,isSubmitting,isSubmitSuccessful} } = useForm();

  const onSubmit = (data) => {
    addGoodMut.mutate(data);
  };
    if (catTypeQuery.isError) return <div>Error something went wrong</div>
    
  return (
       <>
       <Container className='mt-4'>
     <Row className='mt-4 mb-4 justify-content-start mr-3'>
          <Col md={6}>
             <Form onSubmit={handleSubmit(onSubmit)} >
      <Form.Group  className="mb-3" controlId="name.ControlInput1">
        <Form.Label >Goods Name</Form.Label>
        <Form.Control size='sm' type="text" placeholder="name" {...register('GoodsName',{required:{value:true,message:'Goods Name is required'}})} />
      </Form.Group>
      {errors.GoodsName && <span className="text-danger">{errors.GoodsName.message}</span>}
      <Form.Group size='sm' className="mb-3" controlId="detail.ControlInput1">
        <Form.Label>Details</Form.Label>
             <Form.Control size='sm' as="textarea" rows={3} {...register('GoodsDetail',{required:{value:true,message:'Some wrong with text area'}})}/>
      </Form.Group>
      {errors.GoodsDetail && <span className="text-danger">{errors.GoodsDetail.message}</span>}
      <Form.Group  className="mb-3" controlId="category.ControlTextarea1">
        <Form.Label> Category Type</Form.Label>
         <Form.Select size='sm' {...register('CategoryId', { required: true })}>
                        <option value="">All Categories</option>
                        {catTypeQuery.data?.map((cat) => (
                            <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                        ))}

                    </Form.Select> 
      </Form.Group>
       <Form.Group size='sm' controlId="formFileSm" className="mb-3">
        <Form.Label>Small file input example</Form.Label>
        <Form.Control type="file" size="sm" {...register('GoodImg',{required:{value:true,message:'file is required'}})} />
      </Form.Group>
      {errors.GoodImg && <span className="text-danger">{errors.GoodImg.message}</span>}
         <Form.Group controlId="button" className="mb-3">
        
        {/* <Form.Botton variant="primary" type="submit">
          Submit
        </Form.Botton> */}
        <Button size='sm' type="submit" className="btn btn-primary" disabled={addGoodMut.isLoading}>{addGoodMut.isLoading ? "Saving..." : "Add Product"}</Button>
      </Form.Group>
      {isSubmitSuccessful&& <span className="text-info">Submitted Successfully</span>}
    </Form>
          </Col>
          <Col md={6}>
           <ul>
      
      
     {GoodData.data&&
      
         
         GoodData.data.map((good)=>(
            
            <li>{good.goodsName}</li>
          ))
         
      }
       
        </ul>
          </Col>
     </Row>
     <Row >
    
      </Row>
          </Container>
    </>
  )
}

export default AddProduct
