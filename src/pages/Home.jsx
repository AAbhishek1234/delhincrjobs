// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import HeroSection from '../components/HeroSection';
// // import JobsListing from '../components/JobsListing';
// import JobsListing from '../components/LatestJobs';
// import HowItWorks from '../components/HowItWorks';
// import Footer from '../components/Footer';
// import AdminPanel from './AdminPannel';
// import JobCategories from '../components/JobCategories';
// function Home() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [locationFilter, setLocationFilter] = useState('');
//   const [jobs, setJobs] = useState([]);
//   const categories = [
//   "Technology",
//   "Marketing",
//   "Design",
//   "Finance",
//   "Sales",
//   "Human Resources",
//   "Operations",
//   "Customer Service",
//   "Healthcare",
//   "Education",
// ];


//   useEffect(() => {
//     const mockJobs = [
//           {
//         id: 1,
//         title: "Frontend Developer",
//         company: "TechSolutions Ltd",
//         location: "Delhi",
//         requirements: "React, JavaScript, HTML, CSS",
//         postedDate: "2025-07-01",
//       },
//       {
//         id: 2,
//         title: "Data Analyst",
//         company: "Analytics Pro",
//         location: "Noida",
//         requirements: "SQL, Python",
//         postedDate: "2025-07-03",
//       },
//       {
//         id: 3,
//         title: "DevOps Engineer",
//         company: "CloudNative Systems",
//         location: "Gurgaon",
//         requirements: "AWS, Docker",
//         postedDate: "2025-07-02",
//       },
//       {
//         id: 4,
//         title: "Frontend Developer",
//         company: "TechSolutions Ltd",
//         location: "Delhi",
//         requirements: "React, JavaScript, HTML, CSS",
//         postedDate: "2025-07-01",
//       },
//       {
//         id: 5,
//         title: "Data Analyst",
//         company: "Analytics Pro",
//         location: "Noida",
//         requirements: "SQL, Python",
//         postedDate: "2025-07-03",
//       },
//       {
//         id: 6,
//         title: "DevOps Engineer",
//         company: "CloudNative Systems",
//         location: "Gurgaon",
//         requirements: "AWS, Docker",
//         postedDate: "2025-07-02",
//       }
//     ];
//     setJobs(mockJobs);
//   }, []);

//   const handleJobClick = (job) => {
//     console.log("Job clicked:", job);
//   };

//   const filteredJobs = jobs.filter((job) => {
//     const matchesSearch =
//       job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.company.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesLocation =
//       locationFilter === "" || job.location === locationFilter;
//     return matchesSearch && matchesLocation;
//   });

//   return (
//     <>
//       <Navbar />
//       <HeroSection
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         locationFilter={locationFilter}
//         setLocationFilter={setLocationFilter}
//       />
//       {/* <HowItWorks>      </HowItWorks> */}
//       {/* <AdminPanel></AdminPanel> */}
//       <JobsListing
//         filteredJobs={filteredJobs}
//         handleJobClick={handleJobClick}
//       />
//       <JobCategories categories={categories} />
//       <Footer></Footer>
//     </>
//   );
// }

// export default Home;


import React, { useEffect, useState } from 'react';
import { collectionGroup, getDocs,collection,onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import JobsListing from '../components/LatestJobs';
import JobCategories from '../components/JobCategories';
import Footer from '../components/Footer';
import WhatsAppCommunity from '../components/WhatsappCommunity';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobs, setJobs] = useState([]);

  const categories = [
    "Technology", "Marketing", "Design", "Finance", "Sales",
    "Human Resources", "Operations", "Customer Service",
    "Healthcare", "Education",
  ];

  useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "jobs"), (snapshot) => {
    const jobsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setJobs(jobsList);
  }, (error) => {
    console.error("Real-time error fetching jobs:", error.message);
  });

  // Cleanup on unmount
  return () => unsubscribe();
}, []);


  const now = new Date();

  const jobsInLast15Days = jobs.filter((job) => {
    const diffInDays = (now - job.postedDate) / (1000 * 60 * 60 * 24);
    return diffInDays <= 15;
  });

  const sortedJobs = [...jobs].sort(
    (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
  );

  const latestJobs = sortedJobs.slice(0, 12);

  const filteredLatestJobs = latestJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "" || job.location === locationFilter;

    return matchesSearch && matchesLocation;
  });

  return (
    <>
      <Navbar />
      <HeroSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
      />
      <JobsListing filteredJobs={filteredLatestJobs} />
      <WhatsAppCommunity />
      <JobCategories categories={categories} jobs={jobsInLast15Days} />
      <Footer />
    </>
  );
}

export default Home;
