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
import ResetPassword from './Components/PasswordManager/ResetPassword';
import ForgotPassword from './Components/PasswordManager/ForgotPassword';
import NotFound from './Components/NotFound';
import ChecKOut from './Components/ChecKOut';
import OrderReport from './Components/Reports/OrderReport';
import Success from './Components/Success';
import Cancel from './Components/Cancel';
import OrderList from './Components/OrderList'; 
import CheckoutButton from './Components/CheckoutButton';
import CardStyle from './Components/CardStyle';
import OrderByDateReport from './Components/Reports/OrderByDateReport';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  //  const navigate = useNavigate();
  //  useEffect(() => {
  //       setNavigate(navigate);
  //     }, [navigate]);
  const { i18n } = useTranslation();
  if (i18n.language === "ar") {
    require("bootstrap/dist/css/bootstrap.rtl.min.css");
  } else {
    require("bootstrap/dist/css/bootstrap.min.css");
  }

  return (
 <>
 <AuthProvider>
        <div dir={i18n.language === "ar" ? "rtl" : "ltr"}><NavigationBar /></div>  
     <Routes>
     <Route path='/login' element={<Login />} />
     <Route path='/' element={<MainPage />} />
     
    
      <Route path='/Category' element={<Category/> } />
      <Route path='/Add' element={<AddProduct/>} />
      <Route path='/filter' element={<CustomFilter/>} />
      <Route path='/filterp' element={<ParamsFilter/>} />
      {/* Protected section */}
        <Route element={<ProtectedRoute />}>
      <Route path='/filter2' element={<ParamFilters2/>} />
       <Route path='/FilterProduct' element={<ProductFilter/>} />
       </Route>
         <Route path='/checkOut' element={<ChecKOut/>} />
         <Route path='/Cart' element={<CardStyle/>} />

         <Route path='/orderList/:Id' element={<OrderList/>} />
         <Route path='/success' element={<Success/>} />
         <Route path='/cancel' element={<Cancel/>} />
         <Route path='/orderReport' element={<OrderReport/>} />
         <Route path='/orderDateReport' element={<OrderByDateReport/>} />
     <Route path='/forbiden' element={<Forbiden />} />
     <Route path='*' element={<NotFound />} />
     <Route path='/forgotPassword' element={<ForgotPassword/>} />
     <Route path='/resetPassowrd' element={<ResetPassword />} />
     
     </Routes>
     
     
     

     <MainFooter/>
     </AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
     </>

  );
}

export default App;
