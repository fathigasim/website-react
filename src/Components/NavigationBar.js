//  import React, { useState, useContext, useEffect } from "react";
//   import { Link,useNavigate } from "react-router-dom";
//  import { useAuth } from "../Context/AuthContext";
// // import Container from "react-bootstrap/Container";
// // import Nav from "react-bootstrap/Nav";
// // import Navbar from "react-bootstrap/Navbar";
// // import NavDropdown from "react-bootstrap/NavDropdown";
// // import Button from "react-bootstrap/Button";
//  import LanguageSelector from "../language-selector";
//  import { useTranslation } from "react-i18next";
// // import { BsPerson,BsBoxArrowRight  } from "react-icons/bs";
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import BasketSummery from "./BasketSummery";


// import {
//   CCollapse,
//   CContainer,
//   CDropdown,
//   CDropdownDivider,
//   CDropdownItem,
//   CDropdownMenu,
//   CDropdownToggle,
//   CNavbar,
//   CNavbarBrand,
//   CNavbarNav,
//   CNavbarToggler,
//   CNavItem,
//   CNavLink,
// } from '@coreui/react'


// const NavigationBar = () => {
//  const [visible, setVisible] = useState(false)
//   const navigate = useNavigate();
//         const { t } = useTranslation("navbar");

//    const { isAuthenticated,logout,user } = useAuth();
   
//     console.log(user?.name);
//   return (
//       // className="bg-body-tertiary"
//  <CNavbar expand="lg"  variant="dark" style={{backgroundColor: '#acbacf'}}>
  
//         <CContainer fluid>
//           <LanguageSelector />
     
//           {/* <CNavbarBrand href="#">{t("Navbar")}</CNavbarBrand> */}
//           <CNavbarToggler
//             aria-label="Toggle navigation"
//             aria-expanded={visible}
//             onClick={() => setVisible(!visible)}
//           />
//           <CCollapse className="navbar-collapse" visible={visible}>
//             <CNavbarNav>
//               <CNavItem>
//                 <CNavLink  active>
//                  <Link to="/">{t("home")}</Link>  
//                 </CNavLink>
//               </CNavItem>
//               <CNavItem>
//                 <CNavLink href="#">{t("products")}</CNavLink>
//               </CNavItem>
//               <CNavItem>
                
//               </CNavItem>
//               {/* <CDropdown variant="nav-item" popper={false}>
//                 <CDropdownToggle>Dropdown link</CDropdownToggle>
//                 <CDropdownMenu id="dropdownId"  >
//                   <CDropdownItem href="#">Action</CDropdownItem>
//                   <CDropdownItem href="#">Another action</CDropdownItem>
//                   <CDropdownDivider />
//                   <CDropdownItem href="#">Something else here</CDropdownItem>
//                 </CDropdownMenu>
//               </CDropdown> */}
//                    <CNavLink href="#" className="d-flex me-2" >
              
//                 </CNavLink>
//                   <CNavLink href="#" className="d-flex me-2" >
                 
//                 </CNavLink>
//                  <CNavLink href="#" className="d-flex me-2" >
                 
//                 </CNavLink>
//                 {}
                
//                  <CNavLink href="#" className="d-flex me-2" >
//                   {/* {console.log(user)} */}
//                 </CNavLink>
//                        {isAuthenticated&&localStorage.getItem('token')&&  (
//           <>
//              <CNavLink href="#" className="d-flex me-2" >
//                    <BasketSummery/>
//                 </CNavLink>
//             {isAuthenticated&&
//             <>
//             <CNavLink className="d-flex me-2">{user?.name}</CNavLink>
//             <CNavLink className="d-flex me-2" onClick={() => logout("manual")}>
//               Logout
//             </CNavLink>
//             </>
//             }
//           </>
//         )}

//             </CNavbarNav>
//           </CCollapse>
//         </CContainer>
//       </CNavbar>



//   );
// };

// export default NavigationBar;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../language-selector";
import BasketSummery from "./BasketSummery";

import {
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CBadge,
} from "@coreui/react";

import { BsCart3, BsPerson, BsBoxArrowRight, BsBox } from "react-icons/bs";

const NavigationBar = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation("navbar");
  const navigate = useNavigate();

  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div>
    <CNavbar expand="lg" variant="dark" style={{ backgroundColor: "#2c3e50" }}>
      <CContainer fluid>
        {/* Brand/Logo */}
        <NavLink
          to="/"
          className="navbar-brand fw-bold"
          style={{ color: "white", fontSize: "20px" }}
        >
          Shop with Us
        </NavLink>

        {/* Mobile Toggle */}
        <CNavbarToggler
          aria-label="Toggle navigation"
          aria-expanded={visible}
          onClick={() => setVisible(!visible)}
        />

        {/* Collapse Menu */}
        <CCollapse className="navbar-collapse" visible={visible}>
          {/* Left Links */}
          <CNavbarNav className="me-auto">
            <CNavItem>
              <NavLink to="/" className="nav-link text-white">
                {t("home")}
              </NavLink>
            </CNavItem>
            <CNavItem>
              <NavLink to="/products" className="nav-link text-white">
                {t("products")}
              </NavLink>
            </CNavItem>
          </CNavbarNav>

          {/* Right Side */}
          <CNavbarNav className="ms-auto align-items-center">
            {/* Language Selector */}
            <LanguageSelector />

            {isAuthenticated && localStorage.getItem("token") ? (
              <>
                {/* Cart */}
                <CNavItem className="ms-3">
                  <NavLink to="/cart" className="nav-link text-white position-relative">
                    <BsCart3 size={22} />
                    {/* Badge with BasketSummery count */}
                    <CBadge
                      color="danger"
                      position="top-end"
                      shape="rounded-pill"
                      className="translate-middle"
                    >
                      {/* <BasketSummery /> */}
                    </CBadge>
                  </NavLink>
                </CNavItem>

                {/* User Dropdown */}
                <CDropdown variant="nav-item" className="ms-3">
                  <CDropdownToggle color="secondary" caret>
                    <BsPerson className="me-2" />
                    {user?.name || "Account"}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => navigate("/profile")}>
                      <BsPerson className="me-2" /> Profile
                    </CDropdownItem>
                    <CDropdownItem onClick={() => navigate("/orders")}>
                      <BsBox className="me-2" /> My Orders
                    </CDropdownItem>
                    <CDropdownItem onClick={() => logout("manual")}>
                      <BsBoxArrowRight className="me-2" /> Logout
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </>
            ) : (
              <CNavItem>
                <NavLink to="/login" className="btn btn-primary ms-3">
                  {t("login")}
                </NavLink>
              </CNavItem>
            )}
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
    </div>
  );
};

export default NavigationBar;
