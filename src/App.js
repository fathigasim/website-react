import logo from './logo.svg';
import { Routes, Route,useNavigate } from "react-router-dom";
import { setNavigate } from './Hepler/navigationHelper';
import Login from './Components/Login';
import MainPage from './Components/MainPage';
import SliderC from './Components/SliderC';
import NavigationBar from './Components/NavigationBar';
import {useEffect} from 'react';
import { AuthProvider } from './Context/AuthContext';
import '@coreui/coreui/dist/css/coreui.min.css'
import './App.css';
import MainFooter from './Components/Footer/MainFooter';
import ProductFilter from './Components/ProductFilter';
import ProtectedRoute from './Routes/ProtectedRoute';
import Forbiden from './Components/Forbiden';
import Layout from './Layout';
import Category from './Components/Category';
import AddProduct from './Components/AddProduct';
import CustomFilter from './Components/CustomFilter';
import ParamsFilter from './Components/ParamsFilter';
import ParamFilters2 from './Components/ParamsFilter2';


function App() {
   const navigate = useNavigate();
   useEffect(() => {
        setNavigate(navigate);
      }, [navigate]);

  return (
 <>
 <AuthProvider>
        <NavigationBar />
     <Routes>
     <Route path='/login' element={<Login />} />
     <Route path='/' element={<MainPage />} />
     
     <Route path='/FilterProduct' element={<ProductFilter/>} />
      <Route path='/Category' element={<ProtectedRoute><Category/></ProtectedRoute> } />
      <Route path='/Add' element={<AddProduct/>} />
      <Route path='/filter' element={<CustomFilter/>} />
      <Route path='/filterp' element={<ParamsFilter/>} />
      <Route path='/filter2' element={<ParamFilters2/>} />
     <Route path='/forbiden' element={<Forbiden />} />
     
     </Routes>
     
     
     

     <MainFooter/>
     </AuthProvider>
     </>

  );
}

export default App;
