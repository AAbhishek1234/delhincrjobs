import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const companies = [
  {
    id: 1,
    name: "Tata Consultancy Services (TCS)",
    logo: "images/tcslogo.jpg",
    location: "Mumbai, India",
    website: "https://www.tcs.com",
  },
  {
    id: 2,
    name: "Infosys",
    logo: "images/infosys.jpg",
    location: "Bengaluru, India",
    website: "https://www.infosys.com",
  },
  {
    id: 3,
    name: "HCL Technologies",
    logo: "images/HCLTech-Logo.jpg",
    location: "Noida, India",
    website: "https://www.hcltech.com",
  },
  {
    id: 4,
    name: "Wipro",
    logo: "images/Wipro.webp",
    location: "Bengaluru, India",
    website: "https://www.wipro.com",
  },
  {
    id: 5,
    name: "Tech Mahindra",
    logo: "images/tecgmahindralogo.webp",
    location: "Pune, India",
    website: "https://www.techmahindra.com",
  },
];

const Companies = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          Our Recruitment Companies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-16 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {company.name}
              </h3>
              <p className="text-gray-500 mb-4">{company.location}</p>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Companies;
