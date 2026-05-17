import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';

import Upload from './pages/Upload';
import Result from './pages/Result';
import Record from './pages/Records';
import Welcome from './pages/Welcome';
import JobSearch from './pages/JobSearch';

import Layout from './components/Layout';
import FAQ from './components/FAQ'; 
import CreatorDeskPage from './components/CreatorDeskPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/faq" element={<FAQ />} /> 
        <Route path ="/creator-desk" element = {< CreatorDeskPage />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/upload" element={<Upload />} />
          <Route path="/records" element={<Record />} />
          <Route path="/result" element={<Result />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/jobsearch" element={<JobSearch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;