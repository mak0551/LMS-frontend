import React, { useState, useEffect } from "react";

const CloudinaryUploadWidget = ({ onUploadSuccess }) => {
  const [cloudinaryReady, setCloudinaryReady] = useState(false);

  useEffect(() => {
    if (!document.getElementById("cloudinary-upload-widget")) {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      script.id = "cloudinary-upload-widget";

      script.onload = () => {
        setCloudinaryReady(true);
      };

      document.body.appendChild(script);
    } else if (window.cloudinary) {
      setCloudinaryReady(true);
    }

    return () => {
      const script = document.getElementById("cloudinary-upload-widget");
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleUpload = (error, result) => {
    if (error) {
      console.error("Upload error:", error);
      return;
    }

    if (result && result.event === "success") {
      console.log(result.info.display_name);
      const fileName = result.info.public_id.split("/").pop(); // Extract file name
      onUploadSuccess(result.info.secure_url, fileName);
    }
  };

  const openWidget = () => {
    if (!cloudinaryReady) {
      alert("Cloudinary is still loading. Please wait...");
      return;
    }

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dxs1abm4e",
        uploadPreset: "ml_default",
        sources: ["local", "url", "camera"],
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        resourceType: "auto",
      },
      handleUpload
    );

    myWidget.open();
  };

  return (
    <div>
      <button
        onClick={openWidget}
        disabled={!cloudinaryReady}
        className="border border-zinc-600 rounded-md px-2"
      >
        choose file
      </button>
    </div>
  );
};

export default CloudinaryUploadWidget;
