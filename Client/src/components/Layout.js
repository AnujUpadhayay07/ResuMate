// src/components/Layout.js

import React from "react";
import { useLocation , Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const location = useLocation();

  // Full-page routes (no sidebar)
  const fullPageRoutes = ["/", "/login", "/home","/signup","/forgotpassword"];

  const isFullPage = fullPageRoutes.includes(location.pathname.toLowerCase());

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {!isFullPage && <Sidebar />}

      <main
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
