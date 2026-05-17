// src/pages/HomePage.js
import React from "react";
import Navbar from "../components/Navbar";
import { Container, Typography, Button, Box, Link as MuiLink } from "@mui/material";
import { ReactTyped } from "react-typed";
import { Link as RouterLink } from "react-router-dom";
import heroImage from "../assets/hero.webp"; // make sure this image exists
import Features from '../components/Features';
//import FAQPage from '../components/FAQ';

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to right, #d9a7c7, #fffcdc)",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: { xs: 6, md: 0 },
          pt: { xs: 8, md: 10 },
          pb: { xs: 8, md: 10 },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: { xs: "center", md: "left" },
            gap: 4,
          }}
        >
          {/* Left Text Section */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Welcome to ResuMate
            </Typography>
            <ReactTyped
              strings={[
                "AI-Powered Resume Insights",
                "Job Matching Made Easy",
                "Optimize. Analyze. Succeed.",
              ]}
              typeSpeed={40}
              backSpeed={50}
              loop
              style={{ fontSize: "1.5rem", color: "#444" }}
            />

            <Box mt={4}>
              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                sx={{ mr: 2, backgroundColor: "#4e54c8" }}
              >
                Get Started
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                variant="outlined"
                sx={{ borderColor: "#4e54c8", color: "#4e54c8" }}
              >
                Learn More
              </Button>
            </Box>
          </Box>

          {/* Right Hero Image Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              mt: { xs: 4, md: 0 },
            }}
          >
            <Box
              component="img"
              src={heroImage}
              alt="Hero Illustration"
              sx={{
                width: { xs: "90%", md: "340px" },
                height: "auto",
                borderRadius: "24px",
                boxShadow: 5,
                objectFit: "cover",
              }}
            />
          </Box>
        </Container>
      </Box>
      <Features />
      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#1a1a2e",
          color: "#f5f5f5",
          px: { xs: 3, md: 8 },
          py: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          rowGap: 2,
        }}
      >
        {/* Left Side - Copyright */}
        <Typography
          variant="body2"
          sx={{ flex: 1, textAlign: { xs: "center", sm: "left" }, fontSize: "0.9rem" }}
        >
          © 2025 ResuMate. All rights reserved.
        </Typography>

        {/* Center - Heart Message */}
        <Typography
          variant="body2"
          fontStyle="italic"
          fontSize="0.95rem"
          sx={{ flex: 1, textAlign: "center" }}
        >
          Made with ❤️ by Ankita
        </Typography>

        {/* Right Side - Links */}
        <Box
          sx={{
            flex: 1,
            textAlign: "right",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <MuiLink
            component={RouterLink}
            to="/creator-desk"
            underline="hover"
            color="#f5f5f5"
            sx={{ fontSize: "0.95rem" }}
          >
            creator-desk
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to="/faq"
            underline="hover"
            color="#f5f5f5"
            sx={{ fontSize: "0.95rem" }}
          >
            FAQ
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
}
