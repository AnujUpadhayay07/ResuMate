import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQPage() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #fdfbfb, #ebedee)",
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
          >
            Frequently Asked Questions
          </Typography>

          {[
            {
              question: "What is ResuMate and how does it work?",
              answer:
                "ResuMate is an AI-powered resume optimization platform that analyzes your resume and provides tailored suggestions to improve your chances of getting hired. Just upload your resume and let our AI do the magic!",
            },
            {
              question: "Is my resume data secure?",
              answer:
                "Absolutely. Your data is encrypted and stored securely. We do not share your information with third parties.",
            },
            {
              question: "Can ResuMate help me match jobs as per my resume?",
              answer:
                "Yes! Our system not only optimizes your resume but also allow to apply on the jobs as well.",
            },
            {
              question: "Do I need to create an account to use ResuMate?",
              answer:
                "You can explore features without signing up, but to save changes and access job matching tools, you need to create a free account.",
            },
            {
              question: "Does ResuMate support multiple resume formats?",
              answer:
                "Yes, we support .PDF and .DOCX files. Ensure your resume is clear and readable for best analysis.",
            },
            {
              question: "Is ResuMate free to use?",
              answer:
                "Yes! ResuMate is absolutely free.",
            },
          ].map((faq, index) => (
            <Accordion key={index} sx={{ my: 2, backgroundColor: "#fff" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
    </>
  );
}
