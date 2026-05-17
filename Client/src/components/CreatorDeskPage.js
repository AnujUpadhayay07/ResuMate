import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import creatorImage from "../assets/pic.jpg"; // Ensure this image exists

export default function CreatorDeskPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // <-- This ensures the page starts from the top
  }, []);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #fdfbfb, #ebedee)",
          py: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          px: 2,
          ml: { xs: 0, md: "220px" }, // Respect sidebar space on desktop
        }}
      >
        <Container maxWidth="md">
          {/* Top Section with Image and Name */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mb: 4,
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            <Avatar
              src={creatorImage}
              alt="Ankita Kumari"
              sx={{ width: 100, height: 100, boxShadow: 3 }}
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              color="text.primary"
            >
              Ankita Kumari
            </Typography>
          </Box>

          {/* Introduction and Motivation */}
          <Box sx={{ pl: { xs: 0, md: 1 } }}>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", mb: 2, color: "#333" }}
            >
              I am Ankita Kumari, a passionate learner and creative mind dedicated to
              building meaningful digital solutions. With a love for solving real-world
              problems using technology, I strive to make user-centric applications that
              add real value.
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", mb: 2, color: "#333" }}
            >
              I love to use AI to simplify tasks and enhance user experiences.
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", color: "#333" }}
            >
              ResuMate was born out of a simple yet powerful idea — to help people
              present themselves better in front of recruiters. I wanted to empower
              job seekers with AI-driven tools to polish their resumes and land
              their dream jobs with confidence.
            </Typography>
          </Box>

          {/* Bottom LinkedIn Button */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="contained"
              startIcon={<LinkedInIcon />}
              href="https://www.linkedin.com/in/ankita-kumari-59960a285/"
              target="_blank"
              sx={{
                backgroundColor: "#0a66c2",
                color: "#fff",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                borderRadius: "30px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#004182",
                },
              }}
            >
              Connect with me
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
