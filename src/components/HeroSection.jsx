import React from "react";

const HeroSection = ({
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
}) => {
  return (
    <div className="relative mb-12 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent">
        <img
          src="https://readdy.ai/api/search-image?query=Professional%20modern%20office%20workspace%20with%20Delhi%20skyline%20visible%20through%20large%20windows%2C%20soft%20natural%20lighting%2C%20minimalist%20desk%20setup%20with%20computer%2C%20plants%2C%20and%20office%20supplies%2C%20creating%20a%20productive%20and%20inspiring%20atmosphere&width=1400&height=500&seq=1&orientation=landscape"
          alt="Delhi NCR Jobs"
          className="w-full h-full object-cover object-top opacity-50"
        />
      </div>

      <div className="relative z-10 py-16 px-8 md:w-1/2">
        <h2 className="text-4xl font-bold text-white mb-4">
          Find Your Dream Job in Delhi NCR
        </h2>
   <p className="text-white text-xl font-medium mb-8">
  Browse through hundreds of jobs across Delhi, Noida,
  Gurgaon and more. No registration required - apply directly to your
  dream position today.
</p>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="flex-grow relative">
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search jobs by title or company"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Location filter */}
            <div className="md:w-1/3">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Delhi">Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Gurgaon">Gurgaon</option>
              </select>
            </div>

            {/* Find Jobs button */}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 !rounded-button whitespace-nowrap">
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
