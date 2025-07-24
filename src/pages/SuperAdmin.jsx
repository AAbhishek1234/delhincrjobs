

import React, { useEffect, useState, useCallback, useRef } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./superadmin.css";

const SUPER_ADMIN_EMAIL = process.env.REACT_APP_SUPER_ADMIN_EMAIL;
const DEBUG_MODE = true;

const TAB_KEYS = {
  COMPANIES: "companies",
  PENDING: "pendingJobs",
  APPROVED: "approvedJobs",
  REJECTED: "rejectedJobs",
};

const SuperAdmin = () => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [role, setRole] = useState(undefined);
  const [roleFetchError, setRoleFetchError] = useState(null);

  const [companies, setCompanies] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [approvedJobs, setApprovedJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);

  const [activeTab, setActiveTab] = useState(TAB_KEYS.COMPANIES);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const lastRefreshRef = useRef(0);
  const initialAuthHandledRef = useRef(false);

  const navigate = useNavigate();

  const log = (...args) => {
    if (DEBUG_MODE) console.log("[SuperAdmin]", ...args);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user && !initialAuthHandledRef.current) {
        log("Auth state changed: (null user during initial strict mode cycle)");
      } else {
        log("Auth state changed:", user?.uid, user?.email);
      }

      if (!user) {
        setFirebaseUser(null);
        setAuthReady(false);
        setRole(undefined);
        setRoleFetchError(null);
        navigate("/superadmin-login");
        return;
      }

      try {
        await user.getIdToken(true);
      } catch (e) {
        console.error("Token refresh failed:", e);
      }

      setFirebaseUser(user);
      setAuthReady(true);
      initialAuthHandledRef.current = true;

      try {
        const userDocRef = doc(db, "users", user.uid);
        const snap = await getDoc(userDocRef);
        if (snap.exists()) {
          const data = snap.data();
          if (DEBUG_MODE) console.log("[RoleFetch] user doc:", data);
          setRole(data.role || null);
        } else {
          setRole(null);
        }
      } catch (e) {
        console.error("Failed to fetch user role:", e);
        setRoleFetchError(e.message || "role fetch error");
        setRole(null);
      }
    });
    return () => unsub();
  }, [navigate]);

  const isSuperAdmin =
    (role && role.toLowerCase() === "superadmin") ||
    firebaseUser?.email === SUPER_ADMIN_EMAIL;

  const fetchCompanies = useCallback(async () => {
    const snap = await getDocs(collection(db, "companies"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }, []);

  const fetchJobsByStatus = useCallback(async (status) => {
    const jobsRef = collection(db, "jobs");
    const qStatus = query(jobsRef, where("status", "==", status));
    const snap = await getDocs(qStatus);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }, []);

  const refreshAll = useCallback(async () => {
    if (!authReady || !isSuperAdmin) return;
    setErrorMsg("");
    setLoading(true);
    const started = Date.now();
    lastRefreshRef.current = started;

    try {
      const [companyList, pending, approved, rejected] = await Promise.all([
        fetchCompanies(),
        fetchJobsByStatus("pending"),
        fetchJobsByStatus("approved"),
        fetchJobsByStatus("rejected"),
      ]);

      if (lastRefreshRef.current === started) {
        setCompanies(companyList);
        setPendingJobs(pending);
        setApprovedJobs(approved);
        setRejectedJobs(rejected);
      }
    } catch (e) {
      console.error("Refresh error:", e);
      setErrorMsg(
        e?.message?.includes("Missing or insufficient permissions")
          ? "Permission denied. Check Firestore rules and job fields."
          : "Failed to load data. See console for details."
      );
    } finally {
      if (lastRefreshRef.current === started) {
        setLoading(false);
      }
    }
  }, [authReady, isSuperAdmin, fetchCompanies, fetchJobsByStatus]);

  useEffect(() => {
    if (authReady && isSuperAdmin) {
      refreshAll();
    }
  }, [authReady, isSuperAdmin, refreshAll]);

  const deleteCompany = async (companyId) => {
    if (!window.confirm("Delete this company (does NOT auto-delete its jobs)?")) return;
    try {
      await deleteDoc(doc(db, "companies", companyId));
      setCompanies((prev) => prev.filter((c) => c.id !== companyId));
    } catch (e) {
      console.error("Delete company error:", e);
      alert("Failed to delete company.");
    }
  };

  const updateJobStatus = async (jobId, newStatus) => {
    if (!isSuperAdmin) return alert("Only super admin can change status.");
    try {
      await updateDoc(doc(db, "jobs", jobId), {
        status: newStatus,
        approved: newStatus === "approved",
        statusChangedAt: serverTimestamp(),
      });

      setPendingJobs((p) => p.filter((j) => j.id !== jobId));
      setApprovedJobs((a) => a.filter((j) => j.id !== jobId));
      setRejectedJobs((r) => r.filter((j) => j.id !== jobId));
      refreshAll();
    } catch (e) {
      console.error("Update job status error:", e);
      alert("Failed to update job status.");
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Permanently delete this job?")) return;
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      setPendingJobs((p) => p.filter((j) => j.id !== jobId));
      setApprovedJobs((a) => a.filter((j) => j.id !== jobId));
      setRejectedJobs((r) => r.filter((j) => j.id !== jobId));
    } catch (e) {
      console.error("Delete job error:", e);
      alert("Failed to delete job.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/superadmin-login");
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const formatDate = (ts) => {
    if (!ts) return "N/A";
    try {
      if (ts.toDate) return ts.toDate().toLocaleString();
      return new Date(ts).toLocaleString();
    } catch {
      return "N/A";
    }
  };

  const TabButton = ({ tab, label, count }) => {
    const active = activeTab === tab;
    return (
      <button
        onClick={() => setActiveTab(tab)}
        className={`sa-tab-btn ${active ? "active" : ""}`}
      >
        {label} {typeof count === "number" ? `(${count})` : ""}
      </button>
    );
  };

  const JobCard = ({ job }) => (
    <div className="sa-card">
      <p><strong>Title:</strong> {job.title || "N/A"}</p>
      <p><strong>Company Name:</strong> {job.company || "N/A"}</p>
      <p><strong>Phone Number:</strong> {job.phoneNumber || "N/A"}</p>
      <p><strong>Company UID:</strong> {job.companyUid || "—"}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={`status-badge status-${job.status}`}>
          {job.status}
        </span>
      </p>
      <p><strong>Created:</strong> {formatDate(job.createdAt)}</p>
      {job.description && (
        <p className="sa-desc">
          <strong>Description: </strong>
          {job.description.length > 160
            ? job.description.slice(0, 160) + "..."
            : job.description}
        </p>
      )}
      <button
  onClick={() => navigate(`/approved-jobs/${job.id}/applicants`)}
  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
>
  View Applicants
</button>

      <div className="sa-inline-actions">
        {job.status !== "approved" && (
          <button
            className="sa-small-btn approve"
            onClick={() => updateJobStatus(job.id, "approved")}
          >
            Approve
          </button>
        )}
        {job.status !== "rejected" && (
          <button
            className="sa-small-btn reject"
            onClick={() => updateJobStatus(job.id, "rejected")}
          >
            Reject
          </button>
        )}
        <button
          className="sa-small-btn delete"
          onClick={() => deleteJob(job.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (
      loading &&
      !pendingJobs.length &&
      !approvedJobs.length &&
      !rejectedJobs.length &&
      !companies.length
    ) {
      return <p className="sa-loading-inline">Loading data…</p>;
    }
    switch (activeTab) {
      case TAB_KEYS.COMPANIES:
        return companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          <div className="sa-grid">
            {companies.map((company) => (
              <div key={company.id} className="sa-card">
                <p><strong>Name:</strong> {company.companyName || "N/A"}</p>
                <p><strong>Email:</strong> {company.email || "N/A"}</p>
                <p><strong>Phone Number:</strong> {company.phoneNumber || "N/A"}</p>
                <p><strong>Created At:</strong> {formatDate(company.createdAt)}</p>
                <button
                  className="sa-delete-btn"
                  onClick={() => deleteCompany(company.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        );
      case TAB_KEYS.PENDING:
        return pendingJobs.length === 0 ? (
          <p>No pending jobs.</p>
        ) : (
          <div className="sa-grid">
            {pendingJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        );
      case TAB_KEYS.APPROVED:
        return approvedJobs.length === 0 ? (
          <p>No approved jobs.</p>
        ) : (
          <div className="sa-grid">
            {approvedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        );
      case TAB_KEYS.REJECTED:
        return rejectedJobs.length === 0 ? (
          <p>No rejected jobs.</p>
        ) : (
          <div className="sa-grid">
            {rejectedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (!authReady) {
    return (
      <div className="sa-container">
        <p style={{ padding: 20 }}>Authenticating super admin…</p>
      </div>
    );
  }

  if (role === undefined && firebaseUser?.email === SUPER_ADMIN_EMAIL) {
    return (
      <div className="sa-container">
        <p style={{ padding: 20 }}>Loading (email verified)…</p>
      </div>
    );
  }
  

  if (!isSuperAdmin) {
    return (
      <div className="sa-container">
        <h2>Access Denied</h2>
        <p>
          Logged in as <strong>{firebaseUser?.email}</strong> but not authorized for the Super Admin panel.
        </p>
        {roleFetchError && (
          <p style={{ fontSize: ".8rem", color: "#900" }}>
            Role fetch failed: {roleFetchError}
          </p>
        )}
        <button className="sa-btn logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="sa-container">
      <div className="sa-topbar">
        <h1 className="sa-title">Super Admin Dashboard</h1>
        <div className="sa-header-right">
          <button className="sa-btn refresh" onClick={refreshAll} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button className="sa-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="sa-tabs-wrapper">
        <div className="sa-tabs">
          <TabButton tab={TAB_KEYS.COMPANIES} label="Companies" count={companies.length} />
          <TabButton tab={TAB_KEYS.PENDING} label="Pending Jobs" count={pendingJobs.length} />
          <TabButton tab={TAB_KEYS.APPROVED} label="Approved Jobs" count={approvedJobs.length} />
          <TabButton tab={TAB_KEYS.REJECTED} label="Rejected Jobs" count={rejectedJobs.length} />
        </div>
      </div>

      {errorMsg && (
        <div
          style={{
            background: "#ffe6e6",
            border: "1px solid #ffb4b4",
            padding: "10px 14px",
            borderRadius: 8,
            marginBottom: 16,
            color: "#900",
            fontSize: ".85rem",
            lineHeight: 1.3,
          }}
        >
          <strong>Error:</strong> {errorMsg}
          <div style={{ marginTop: 6 }}>
            <button
              onClick={refreshAll}
              style={{
                background: "#c0392b",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: ".7rem",
                fontWeight: 600,
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="sa-content">{renderTabContent()}</div>

      {loading && (
        <div className="sa-loading-overlay">
          <div className="spinner" />
          <p>Loading…</p>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
