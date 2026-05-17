import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Button, Box, Typography, Paper } from '@mui/material';
import { db, auth } from '../firebase';
import {
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import html2pdf from 'html2pdf.js';

const Result = () => {
  const location = useLocation();
  const hasSaved = useRef(false);
  const navigate = useNavigate();

  const analysis = location.state?.llmAnalysis;
  const resumeText = location.state?.resumeText;
  const jobDescription = location.state?.jobDescription;
  const jobTitle = location.state?.jobTitle;
  const experienceLevel = location.state?.experienceLevel;
  const isNewAnalysis = location.state?.isNewAnalysis ?? true;

  // Save the result in Firestore only once
  useEffect(() => {
    const saveToFirestore = async () => {
      try {
        if (hasSaved.current) return;
        const user = auth.currentUser;

        if (user && isNewAnalysis && analysis && resumeText && jobDescription) {
          const userDocRef = doc(db, 'users', user.email);

          await setDoc(
            userDocRef,
            {
              email: user.email,
              lastLogin: serverTimestamp(),
            },
            { merge: true }
          );

          const reportsCollectionRef = collection(userDocRef, 'analysisReports');

          await addDoc(reportsCollectionRef, {
            resumeText,
            jobDescription,
            jobTitle,
            experienceLevel,
            llmAnalysis: analysis,
            createdAt: serverTimestamp(),
          });

          hasSaved.current = true;
          console.log('Analysis saved under user subcollection.');
        }
      } catch (error) {
        console.error('Error saving to Firestore:', error);
      }
    };

    saveToFirestore();
  }, [analysis, resumeText, jobDescription, jobTitle, experienceLevel, isNewAnalysis]);

  // Handle PDF download using html2pdf
  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-content');
    const opt = {
      margin: 0.5,
      filename: 'AI_Resume_Analysis.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  if (!analysis) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>No Analysis Found</Typography>
        <Typography variant="body1" gutterBottom>
          It looks like you accessed this page directly without uploading a resume.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/upload')}>
          Go Back to Upload
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: '900px', margin: 'auto' }}>
      <Typography variant="h4" sx={{ color: '#333', mb: 3 }}>
        AI Resume Analysis Report
      </Typography>

      <Paper
        elevation={3}
        id="pdf-content"
        sx={{
          backgroundColor: '#f7f7f7',
          p: 3,
          borderRadius: 2,
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <ReactMarkdown>{analysis}</ReactMarkdown>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/upload')}>
          Analyze Another Resume
        </Button>

        <Button variant="outlined" color="secondary" onClick={() => navigate('/welcome')}>
          Back to Dashboard
        </Button>

        <Button variant="contained" color="success" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </Box>
    </Box>
  );
};

export default Result;