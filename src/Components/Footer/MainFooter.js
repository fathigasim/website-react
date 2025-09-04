import React from 'react'
import { CFooter, CLink } from '@coreui/react'
const MainFooter = () => {
  return (
    //  backgroundColor: '#f8f9fa'
    <CFooter style={{position: 'fixed', bottom: 0, width: '100%',marginTop: '20px !important', backgroundColor: '#acbacf'}}>
  <div>
    <CLink href="https://coreui.io">CoreUI</CLink>
    <span>&copy; 2025 creativeLabs.</span>
  </div>
  <div>
    <span>Powered by</span>
    <CLink href="https://coreui.io">CoreUI</CLink>
  </div>
</CFooter>
  )
}

export default MainFooter
