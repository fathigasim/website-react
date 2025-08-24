import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import SliderC from './SliderC'
import MainCard from './Cards/MainCard'
import MainSideBar from './SideBar/MainSideBar'
const MainPage = ({children}) => {
  return (
    <Container fluid style={{paddingLeft:'0px !important',paddingRight:'0px !important',marginLeft:'0px !important',marginRight:'0px !important',float:'left'}}>
      <Row className=' justify-content-center flex-row mt-5'>
        
        {/* <MainSideBar /> */}
        
        <Col xl={5} sm={9} md={5}  className='text-center  mr-3 ml-3'>
        {/* <Slider/> */}
        <SliderC />
        </Col>
        <Col xl={3} md={3} >
        <MainCard className='mt-10' style={{position:'steaky',marginTop:'50px'}}/>
        </Col>

        </Row>
    </Container>
  )
}

export default MainPage
