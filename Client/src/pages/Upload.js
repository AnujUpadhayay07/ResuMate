// frontend/src/pages/Upload.js

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';

const Upload = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription || !jobTitle || !experienceLevel) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);         
    formData.append('jobTitle', jobTitle);                     
    formData.append('experienceLevel', experienceLevel);       
    formData.append('email', auth.currentUser?.email || 'unknown');

    try {
      const response = await axios.post('http://localhost:5000/upload_resume', formData);
      const { llmAnalysis, resumeText, jobDescription } = response.data; 

      navigate('/result', {
        state: {
          llmAnalysis,
          resumeText,
          jobDescription,
          jobTitle,
          experienceLevel
        },
      });
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Error uploading resume. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 6 }}>
        <Typography variant="h4" gutterBottom>
          Upload Resume for Analysis
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          {/* Job Title */}
          <TextField
            label="Job Title"
            fullWidth
            margin="normal"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />

          {/* Experience Level */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Experience Level</InputLabel>
            <Select
              value={experienceLevel}
              label="Experience Level"
              onChange={(e) => setExperienceLevel(e.target.value)}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Mid-Level">Mid-Level</MenuItem>
              <MenuItem value="Experienced">Experienced</MenuItem>
            </Select>
          </FormControl>

          {/* Job Description */}
          <TextField
            label="Job Description"
            fullWidth
            margin="normal"
            multiline
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />

          {/* Resume Upload */}
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: 2 }}
          >
            Upload Resume (PDF or DOCX)
            <input
              type="file"
              hidden
              accept=".pdf,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
          </Button>
          {resumeFile && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Selected File: {resumeFile.name}
            </Typography>
          )}

          {/* Submit Button */}
          <Box sx={{ marginTop: 4 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              fullWidth
              size="large"
            >
              {loading ? <CircularProgress size={24} /> : 'Submit for Analysis'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Upload;