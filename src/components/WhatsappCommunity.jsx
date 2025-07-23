import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // make sure you install react-icons

const WhatsAppCommunity = () => {
  const whatsappLink = "https://chat.whatsapp.com/your-group-invite-link"; // Replace with your real link

  return (
    <div className="bg-green-100 border border-green-300 rounded-2xl p-6 md:p-8 my-10 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Text and Icon */}
        <div className="flex items-center gap-4">
          <div className="text-green-600 text-4xl">
            <FaWhatsapp />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Join our WhatsApp Community!
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-1">
              Get the latest job updates directly on your phone.
            </p>
          </div>
        </div>

        {/* Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 md:mt-0 inline-block bg-green-600 text-white text-sm md:text-base font-medium py-2 px-6 rounded-full hover:bg-green-700 transition duration-300"
        >
          Join Now
        </a>
      </div>
    </div>
  );
};

export default WhatsAppCommunity;
