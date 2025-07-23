import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const BeOurPartner = () => {
  return (
    <>
    <Navbar/>
    <section className="bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          🤝 Be Our Partner
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
        1. If you are a University/College you can collaborate with us to organise job fairs at your campus. Also you can collab with us to be your placement partner.
        </p>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
        2. If you are an individual eager to build your successful career, as HR consultant in job industries. you can reach out to us for deatils.
        </p>
       <a
  href="tel:+919871428686"  // Replace with your actual number
  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
>
  Connect with us
</a>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default BeOurPartner;
