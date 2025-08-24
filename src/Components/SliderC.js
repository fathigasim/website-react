import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container,Carousel, Row, Col } from 'react-bootstrap';
import { useGoodData } from '../hooks/useMyGoods';
const SliderC = () => {
   const { data, isLoading, isError, error } = useGoodData();
  const [gd,setDg]=useState([]);
  // useEffect(()=>{
  //   axios.get(`https://localhost:7228/api/Goods`,
  //     {headers:{'Content-Type':'application/json'}}).then((response)=>
        
  //     setDg(response.data)
  //     )
  //      },[]);
  if(isError) return <div>Sorry resource not available</div>
  return (
    <div >
   
       
         
      <Carousel className='carousel' style={{ width:'auto',justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
<h4 className='mb-5 mt-5 text-center intel-one-mono-font'>Available Goods</h4>
      {data && data.map((good)=>(
      
         <Carousel.Item key={good.goodsId} interval={2000}>
          <img style={{'width':'400px','height':'400px'}}
            className="d-block w-100"
  src={good.imgSrc}
            alt="Image One"
          />
          <Carousel.Caption style={{'backgroundColor':'rgba(0,0,0,0.5)'}}>
            <h3>{good.goodsName}</h3>
            <p>{good.goodsDetail}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      </Carousel>
   

    </div>
  )
}

export default SliderC
