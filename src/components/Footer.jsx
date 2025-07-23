import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Delhi<span className="text-blue-400">NCR</span>Jobs
            </h3>
            <p className="text-gray-400 mb-4">
              Connecting talent with opportunities across Delhi, Noida,
              Gurgaon and the entire NCR region.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/findjobs" className="text-gray-400 hover:text-white">Browse Jobs</a></li>
              <li><a href="/companies" className="text-gray-400 hover:text-white">Companies</a></li>
               {/* <li><a href="/beourpartner" className="text-gray-400 hover:text-white">Be Our Partner</a></li> */}
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Job Categories</h4>
            <ul className="space-y-2">
              <li><a href="/findjobs?category=Technology" className="text-gray-400 hover:text-white">Technology</a></li>
              <li><a href="/findjobs?category=Marketing" className="text-gray-400 hover:text-white">Marketing</a></li>
              <li><a href="/findjobs?category=Design" className="text-gray-400 hover:text-white">Design</a></li>
              <li><a href="/findjobs?category=Finance" className="text-gray-400 hover:text-white">Finance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3"></i>
                 101, Block C, Sector 61, Noida, Uttar Pradesh 201301, India
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3"></i>
                info.jobsindelhincr@gmail.com
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3"></i>
                +91 9871428686
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Delhi NCR Jobs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
