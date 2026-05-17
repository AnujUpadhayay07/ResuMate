import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Link as RouterLink } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";

export default function Welcome() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #d9a7c7, #fffcdc)",
        py: { xs: 8, md: 12 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Chip
            label="Welcome to"
            color="primary"
            sx={{
              background: "linear-gradient(to right, #4e54c8, #8f94fb)",
              color: "#fff",
              mb: 2,
              fontWeight: 600,
            }}
          />
          <Typography
            variant="h2"
            fontWeight={800}
            gutterBottom
            sx={{ color: "#222" }}
          >
            ResuMate
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            maxWidth="700px"
            mx="auto"
          >
            A smart and friendly platform for analyzing your resume based on job description and personalized insights.
          </Typography>
        </Box>

        {/* Info Card */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 4, md: 5 },
            borderRadius: 4,
            backgroundColor: "#ffffffdd",
            textAlign: "center",
          }}
        >
          <DescriptionIcon sx={{ fontSize: 50, color: "#4e54c8", mb: 2 }} />

          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#333", mb: 2 }}
          >
            How ResuMate Helps You
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Upload your resume and simply paste or upload the job description (JD) you're targeting.
            Our AI will smartly compare the two, analyze keyword alignment, skill gaps, and
            suggest practical improvements.
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            You can also revisit your <b>past reports</b> to track how your resume has improved over time.
            Our system gives you a complete picture — from keyword match to actionable tips.
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            At the core, we use <b>Gemini LLM</b> (a Google-powered language model)
            to generate smart suggestions, analyze your content deeply,
            and make your resume recruiter-ready.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, fontWeight: 500 }}
          >
            📄 Also download your report analysis for future use to improve your resume,
            apply for jobs, and confidently crack interviews.
          </Typography>

          <Button
            component={RouterLink}
            to="/upload"
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(to right, #4e54c8, #8f94fb)",
              fontWeight: 600,
              px: 5,
            }}
          >
            Start My Resume Analysis
          </Button>
        </Paper>

        {/* CTA Section */}
        <Paper
          elevation={0}
          sx={{
            mt: 10,
            p: { xs: 4, md: 6 },
            textAlign: "center",
            borderRadius: 4,
            backgroundColor: "#fff",
          }}
        >
          <RocketLaunchIcon sx={{ fontSize: 50, color: "#4e54c8" }} />
          <Typography variant="h5" fontWeight={700} mt={2} mb={1}>
            Ready to stand out to recruiters?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Upload your resume, get a deep analysis, and take your career to the next level.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
