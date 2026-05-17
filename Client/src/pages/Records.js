import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Button,
  Box,
  Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';

const Record = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserDataAndReports = async () => {
      if (!user) return;

      try {
        // Fetch full name
        const userDocRef = doc(db, 'users', user.email);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setFullName(data.name || user.email); // fallback to email
        }

        // Fetch reports
        const q = query(
          collection(db, 'users', user.email, 'analysisReports'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndReports();
  }, [user]);

  if (!user) {
    return (
      <Container>
        <Typography variant="h6">You must be logged in to view the dashboard.</Typography>
        <Button variant="contained" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <div>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Resume Dashboard
          </Typography>
          <Typography variant="body1">{fullName}</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {fullName}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/upload')}
          sx={{ marginBottom: 4 }}
        >
          Analyze New Resume
        </Button>

        {loading ? (
          <CircularProgress />
        ) : reports.length === 0 ? (
          <Typography>No analysis reports found.</Typography>
        ) : (
          <Box>
            {reports.map((report) => (
              <Accordion key={report.id} sx={{ marginBottom: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Submitted on: {report.createdAt?.toDate().toLocaleString() || 'Unknown'}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Job Title:</strong> {report.jobTitle || 'Not specified'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Experience:</strong> {report.experienceLevel || 'Not specified'}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <div id={`pdf-content-${report.id}`}>
                    <Typography variant="h6">Job Description</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', marginBottom: 2 }}>
                      {report.jobDescription}
                    </Typography>

                    <Typography variant="h6">Resume Summary</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', marginBottom: 2 }}>
                      {report.resumeText?.substring(0, 500)}...
                    </Typography>
                  </div>

                  <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate('/result', {
                          state: {
                            llmAnalysis: report.llmAnalysis,
                            resumeText: report.resumeText,
                            jobDescription: report.jobDescription,
                            jobTitle: report.jobTitle,
                            experienceLevel: report.experienceLevel,
                            isNewAnalysis: false,
                          },
                        })
                      }
                    >
                      View Full Analysis
                    </Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Container>
    </div>
  );
};

export default Record;
