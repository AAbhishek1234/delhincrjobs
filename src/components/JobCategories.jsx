

import { useNavigate } from "react-router-dom";
import {
  Code2, Palette, TrendingUp, Calculator, Heart,
  GraduationCap, Building2, Users, Wrench, Truck,
  Utensils, Camera, Shield, Briefcase, Globe, ChevronRight
} from "lucide-react";

const getCategoryIcon = (category) => {
  const lower = category.toLowerCase();
  if (lower.includes('tech') || lower.includes('software') || lower.includes('development')) return Code2;
  if (lower.includes('design') || lower.includes('creative')) return Palette;
  if (lower.includes('marketing') || lower.includes('sales')) return TrendingUp;
  if (lower.includes('finance') || lower.includes('accounting')) return Calculator;
  if (lower.includes('healthcare') || lower.includes('medical')) return Heart;
  if (lower.includes('education') || lower.includes('teaching')) return GraduationCap;
  if (lower.includes('construction') || lower.includes('engineering')) return Building2;
  if (lower.includes('hr') || lower.includes('human')) return Users;
  if (lower.includes('maintenance') || lower.includes('repair')) return Wrench;
  if (lower.includes('transport') || lower.includes('logistics')) return Truck;
  if (lower.includes('hospitality') || lower.includes('restaurant')) return Utensils;
  if (lower.includes('media') || lower.includes('photo')) return Camera;
  if (lower.includes('security') || lower.includes('safety')) return Shield;
  if (lower.includes('consulting') || lower.includes('business')) return Globe;
  return Briefcase;
};

const JobCategories = ({ categories }) => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/findjobs?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Find Jobs By Category 
        </h2>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Find roles across industries and start applying today. Tap any category to get started.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = getCategoryIcon(category);

          return (
            <div
              key={category}
              onClick={() => handleClick(category)}
              className="group cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition hover:-translate-y-1 p-6 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-3xl group-hover:bg-blue-100 transition duration-300">
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                {category}
              </h3>
              <ChevronRight className="mt-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <p className="text-gray-500 mb-4">
          Can't find your field? There are plenty of jobs waiting.
        </p>
        <button
          onClick={() => navigate("/findjobs")}
          className="inline-flex items-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
        >
          View All Jobs
          <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default JobCategories;
