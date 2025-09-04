 import React, { useState, useContext, useEffect } from "react";
  import { Link,useNavigate } from "react-router-dom";
 import { useAuth } from "../Context/AuthContext";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Button from "react-bootstrap/Button";
 import LanguageSelector from "../language-selector";
 import { useTranslation } from "react-i18next";
// import { BsPerson,BsBoxArrowRight  } from "react-icons/bs";
// import 'bootstrap/dist/css/bootstrap.min.css';

import {
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import BasketSummery from "./BasketSummery";

const NavigationBar = () => {
 const [visible, setVisible] = useState(false)
  const navigate = useNavigate();
        const { t } = useTranslation("navbar");

   const { isAuthenticated,logout } = useAuth();
   
    
  return (
      // className="bg-body-tertiary"
 <CNavbar expand="lg"  variant="dark" style={{backgroundColor: '#acbacf'}}>
  
        <CContainer fluid>
          <LanguageSelector />
     
          <CNavbarBrand href="#">Navbar</CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem>
                <CNavLink href="#" active>
                 {t("Home")} 
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Features</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Pricing</CNavLink>
              </CNavItem>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle>Dropdown link</CDropdownToggle>
                <CDropdownMenu id="dropdownId"  >
                  <CDropdownItem href="#">Action</CDropdownItem>
                  <CDropdownItem href="#">Another action</CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem href="#">Something else here</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
                   <CNavLink href="#" className="d-flex me-2" >
              
                </CNavLink>
                  <CNavLink href="#" className="d-flex me-2" >
                 
                </CNavLink>
                 <CNavLink href="#" className="d-flex me-2" >
                 
                </CNavLink>
                 <CNavLink href="#" className="d-flex me-2" >
                   <BasketSummery/>
                </CNavLink>
                 <CNavLink href="#" className="d-flex me-2" >
                  {/* {console.log(user)} */}
                </CNavLink>
                       {isAuthenticated&&localStorage.getItem('token')&&  (
          <>
            <CNavLink className="d-flex me-2"></CNavLink>
            <CNavLink className="d-flex me-2" onClick={logout}>
              Logout
            </CNavLink>
          </>
        )}

            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>



  );
};

export default NavigationBar;
