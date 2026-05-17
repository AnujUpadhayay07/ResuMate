import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Paper,
  Link,
} from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Welcome');
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const goToResetPage = () => {
    navigate('/forgot-password');
  };

  const goToSignUpPage = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ mt: 10, p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Welcome Back!
        </Typography>

        <Typography variant="body2" textAlign="center" mb={3} color="text.secondary">
          Please enter your credentials to log in to your account.
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMsg && (
            <Typography color="error" mt={1} textAlign="center">
              {errorMsg}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
              fontWeight: 'bold',
            }}
          >
            Login
          </Button>

          <Box mt={2} textAlign="center">
            <Link
              component="button"
              variant="body2"
              underline="hover"
              onClick={goToResetPage}
              sx={{ color: '#4e54c8', fontWeight: 500, mr: 2 }}
            >
              Forgot Password?
            </Link>

            <Link
              component="button"
              variant="body2"
              underline="hover"
              onClick={goToSignUpPage}
              sx={{ color: '#4e54c8', fontWeight: 500 }}
            >
              Sign Up
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
