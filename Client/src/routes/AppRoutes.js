import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import LoginSignup from "../pages/LoginSignup";
import Record from "../pages/Records";
import Upload from "../pages/Upload";
import Result from "../pages/Result";
import JobSearch from "../pages/JobSearch"; // once created

const AppRoutes = () => {
  return (
    <Routes>
      {/* Full-page routes (no sidebar) */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginSignup />} />

      {/* All other pages inside Layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Welcome />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/result" element={<Result />} />
        <Route path="/jobsearch" element={<JobSearch />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;