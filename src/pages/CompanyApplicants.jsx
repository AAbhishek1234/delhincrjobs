import React from "react";

const ApplicantCard = ({ app }) => {
  const forceDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename || "resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Failed to download file.");
      console.error("Download error:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{app.name}</h2>
      <p><strong>Email:</strong> {app.email}</p>
      <p><strong>Phone:</strong> {app.phone}</p>

      <p className="mt-2">
        <strong>Resume:</strong>{" "}
        {app.resume || app.resumeUrl ? (
          <>
            <a
              href={app.resume || app.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mr-4"
            >
              Viewwww Resume
            </a>
            <button
              onClick={() => forceDownload(app.resume || app.resumeUrl, `${app.name}-resume.pdf`)}
              className="text-green-600 underline"
            >
              Download
            </button>
          </>
        ) : (
          "Not uploaded"
        )}
      </p>
    </div>
  );
};

export default ApplicantCard;
