// src/components/Sidebar.js

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUpload,
  FiBarChart2,
  FiBriefcase,
  FiLogOut,
} from "react-icons/fi";
import { signOut } from "firebase/auth";          
import { auth } from "../firebase";               
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.clear();                     
      navigate("/login",{ state : {sessionExpired :true}});                         
    } catch (error) {
      console.error("Logout failed:", error);     
    }
  };

  const navItems = [
    { name: "Home", path: "/welcome", icon: <FiHome /> },
    { name: "Upload", path: "/upload", icon: <FiUpload /> },
    { name: "Records", path: "/records", icon: <FiBarChart2 /> },
    { name: "JobSearch", path: "/jobsearch", icon: <FiBriefcase /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>AI Resume Analysis</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
        <button className="sidebar-link logout" onClick={handleLogout}>
          <span className="icon"><FiLogOut /></span>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
