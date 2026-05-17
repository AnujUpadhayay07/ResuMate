// src/components/Footer.js
import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
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
        textAlign: { xs: "center", sm: "left" },
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.2)",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        mt: 6,
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {/* Copyright */}
      <Typography variant="body2" fontSize="0.95rem">
        © {new Date().getFullYear()} <strong>ResuMate</strong>. All rights reserved.
      </Typography>

      {/* Links Section */}
      <Box>
        <MuiLink
          component={Link}
          to="/creator-desk"
          underline="hover"
          color="inherit"
          sx={{ fontSize: "0.95rem", mr: 2 }}
        >
          From the creator desk
        </MuiLink>
        <MuiLink
          component={Link}
          to="/faq"
          underline="hover"
          color="inherit"
          sx={{ fontSize: "0.95rem" }}
        >
          FAQ
        </MuiLink>
      </Box>

      {/* Signature */}
      <Typography
        variant="body2"
        fontStyle="italic"
        fontSize="0.95rem"
        sx={{ mt: { xs: 1, sm: 0 } }}
      >
        Made with ❤ by Ankita
      </Typography>
    </Box>
  );
}
