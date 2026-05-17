import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Make sure this path is correct

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #4e54c8, #8f94fb)",
        boxShadow: 3,
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.4rem",
            }}
          >
            {/* You can put app name here if needed */}
          </Typography>
        </Box>

        {/* Login and Signup Buttons */}
        <Box display="flex" gap={2}>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#4e54c8",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
