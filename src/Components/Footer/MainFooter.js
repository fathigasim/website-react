import React from 'react'
import { CFooter, CLink } from '@coreui/react'
const MainFooter = () => {
  return (
    //  backgroundColor: '#f8f9fa'
   <CFooter
  style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#acbacf",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
    zIndex: 1000,
  }}
>
  <div>
    <CLink href="https://coreui.io" style={{ marginRight: "8px" }}>
      CoreUI
    </CLink>
    <span>&copy; 2025 creativeLabs.</span>
  </div>
  <div>
    <span style={{ marginRight: "6px" }}>Powered by</span>
    <CLink href="https://coreui.io">CoreUI</CLink>
  </div>
</CFooter>

  )
}

export default MainFooter
