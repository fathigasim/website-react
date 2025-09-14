// import React from 'react'
// import { CFooter, CLink } from '@coreui/react'
// const MainFooter = () => {
//   return (
//     //  backgroundColor: '#f8f9fa'
//    <CFooter
//   style={{
//     position: "fixed",
//     bottom: 0,
//     left: 0,
//     width: "100%",
//     backgroundColor: "#acbacf",
//     padding: "10px 20px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
//     zIndex: 1000,
//   }}
// >
//   <div>
//     <CLink href="https://coreui.io" style={{ marginRight: "8px" }}>
//       CoreUI
//     </CLink>
//     <span>&copy; 2025 creativeLabs.</span>
//   </div>
//   <div>
//     <span style={{ marginRight: "6px" }}>Powered by</span>
//     <CLink href="https://coreui.io">CoreUI</CLink>
//   </div>
// </CFooter>

//   )
// }

// export default MainFooter

import React, { useEffect, useState } from "react";
import { CFooter, CLink } from "@coreui/react";
import { useTranslation } from "react-i18next";

const MainFooter = () => {
  const { i18n } = useTranslation();
  const [dir, setDir] = useState("ltr");

  useEffect(() => {
    const rtlLangs = ["ar"];
    const currentDir = rtlLangs.includes(i18n.language) ? "rtl" : "ltr";
    setDir(currentDir);
  }, [i18n.language]);

  return (
    <CFooter
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#2c3e50",
        padding: "10px 20px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        zIndex: 1000,
        color: "#fff",
        fontSize: "14px",
        direction: dir, // Set LTR/RTL dynamically
        textAlign: dir === "rtl" ? "right" : "left",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexDirection: dir === "rtl" ? "row-reverse" : "row",
        }}
      >
        <CLink
          href="https://coreui.io"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          CoreUI
        </CLink>
        <span>&copy; 2025 creativeLabs.</span>
      </div>

      {/* Right Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexDirection: dir === "rtl" ? "row-reverse" : "row",
        }}
      >
        <span>Powered by</span>
        <CLink
          href="https://coreui.io"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          CoreUI
        </CLink>
      </div>
    </CFooter>
  );
};

export default MainFooter;
