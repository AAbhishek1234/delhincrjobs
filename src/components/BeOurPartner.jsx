import React from "react";
import { GraduationCap, UserCheck, Building2 } from "lucide-react";
const BeOurPartner = () => {
  const items = [
    {
      icon: <GraduationCap size={36} className="text-blue-600" />,
      text: `1. If you are a University/College you can collaborate with us to organise job fairs at your campus. Also you can collab with us to be your placement partner.`,
    },
    {
      icon: <UserCheck size={36} className="text-blue-600" />,
      text: `2. If you are an individual eager to build your successful career, as HR consultant in job industries. you can reach out to us for deatils.`,
    },
    {
      icon: <Building2 size={36} className="text-blue-600" />,
      text: `3. Training Centers/Institutes can contact us for collaboration to place their candidate in their relevant job domains.`,
    },
  ];

  return (
    <>
    
    <section className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            🤝 Be Our Partner
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Explore different ways to collaborate with us and make an impact.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 hover:shadow-xl transition rounded-xl p-6 flex flex-col gap-4 border border-blue-100"
            >
              <div>{item.icon}</div>
              <p className="text-gray-700 text-base sm:text-lg">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="tel:+919871428686"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
          >
            Connect with us
          </a>
        </div>
      </div>
    </section>
    </>
  );
};

export default BeOurPartner;
