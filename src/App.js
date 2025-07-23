import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from 'sonner';
import FindJobs from "./pages/FindJobs";
import AdminLogin from "./pages/AdminLogin";
import AdminPannel from "./pages/AdminPannel";
import Companies from "./pages/Companies";
import Contact from "./pages/Contact";
import JobDetailsPage from "./components/JobDetailsPage";
import Thank from './pages/Thank'
 // <-- make sure to create or import this
import Resume from './pages/Resume'
import SuperAdminLogin from "./pages/SuperAdminLogin";
import SuperAdmin from "./pages/SuperAdmin";
import SuperAdminRoute from "./pages/SuperAdminRoute";
import CompanyApplicants from './pages/CompanyApplicants';
// import BeOurPartner from './components/BeOurPartner';
const App = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const companyId = localStorage.getItem("companyId");

  return (
    <Router>
       <Toaster richColors position="top-center" /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findjobs" element={<FindJobs />} />
        
        {/* Old Admin Auth (can be kept if needed) */}
        <Route path="/AdminLogin" element={<AdminLogin />} />
 <Route path="/companies" element={<Companies />} />
        <Route path="/contact" element={<Contact />} />
        {/* New Company Auth route */}
        <Route path="/compnay-log" element={<AdminLogin />} />
<Route path="/jobdetails/:id" element={<JobDetailsPage/>}/>
        {/* AdminPannel now checks both flags */}
        <Route
          path="/AdminPannel"
          element={
            isAdmin || companyId ? <AdminPannel /> : <Navigate to="/company-log" />
          }
        />
         <Route path="/applications/:jobId" element={<Resume />} />
         <Route path="/thank-you" element={<Thank />} />
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
   {/* <Route path="/beourpartner" element={<BeOurPartner />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
