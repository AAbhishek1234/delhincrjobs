
import React, { useEffect, useState } from 'react';
import { collectionGroup, getDocs,collection,onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import JobsListing from '../components/LatestJobs';
import JobCategories from '../components/JobCategories';
import Footer from '../components/Footer';
import WhatsAppCommunity from '../components/WhatsappCommunity';
import SEO from '../components/SEO';

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
    <SEO
        title="Jobs in Delhi NCR | Tech, Marketing, Finance"
        description="Browse thousands of job opportunities in Delhi NCR. Updated daily. Apply now for tech, marketing, and finance jobs."
      />
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
