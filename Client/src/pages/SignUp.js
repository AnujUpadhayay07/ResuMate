import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
} from "@mui/material";

const Signup = () => {
  const [name, setName] = useState("");       // Name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", email), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      alert("Signup successful! Now please login.");
      navigate("/Welcome");
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ mt: 10, p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Create Account
        </Typography>

        <Typography variant="body2" textAlign="center" mb={3} color="text.secondary">
          Join ResuMate and boost your job hunt with AI!
        </Typography>

        <form onSubmit={handleSignup}>
          <TextField
            label="Full Name"
            type="text"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
            Sign Up
          </Button>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                underline="hover"
                sx={{ color: '#4e54c8', fontWeight: 500 }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
