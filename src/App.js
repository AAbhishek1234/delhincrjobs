import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'sonner';
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import FindJobs from "./pages/FindJobs";
import AdminLogin from "./pages/AdminLogin";
import AdminPannel from "./pages/AdminPannel";
import Companies from "./pages/Companies";
import Contact from "./pages/Contact";
import JobDetailsPage from "./components/JobDetailsPage";
import Thank from './pages/Thank';
import Resume from './pages/Resume';
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SuperAdmin from "./pages/SuperAdmin";
import SuperAdminRoute from "./pages/SuperAdminRoute";
import CompanyApplicants from './pages/CompanyApplicants';
import ViewJobApplicants from "./pages/ViewJobApplicants";
import BeOurPartner from './components/BeOurPartner';

const App = () => {
  const { currentUser } = useAuth(); // Firebase-authenticated user

  return (
    <Router>
      <Toaster richColors position="top-center" /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findjobs" element={<FindJobs />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobdetails/:id" element={<JobDetailsPage />} />
        <Route path="/applications/:jobId" element={<Resume />} />
        <Route path="/thank-you" element={<Thank />} />

        {/* 🔐 Only show admin panel if logged in */}
        <Route
          path="/AdminPannel"
          element={
            currentUser ? <AdminPannel /> : <Navigate to="/AdminLogin" />
          }
        />

        <Route path="/superadmin-login" element={<SuperAdminLogin />} />
        <Route
          path="/superadmin"
          element={
            <SuperAdminRoute>
              <SuperAdmin />
            </SuperAdminRoute>
          }
        />
        <Route
          path="/super-admin/applicants/:companyEmail"
          element={<CompanyApplicants />}
        />
        <Route
          path="/approved-jobs/:jobId/applicants"
          element={<ViewJobApplicants />}
        />
        <Route path="/beourpartner" element={<BeOurPartner />} />
      </Routes>
    </Router>
  );
};

export default App;
