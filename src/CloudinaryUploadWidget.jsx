import React, { useState, useEffect } from "react";

const CloudinaryUploadWidget = () => {
  const [videoUrls, setVideoUrls] = useState([]);
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
      console.error('Upload error:', error);
      return;
    }
    
    if (result && result.event === "success") {
      console.log('Upload success:', result.info);
      setVideoUrls(prev => [...prev, result.info.secure_url]);
    }
  };

  const openWidget = () => {
    if (!cloudinaryReady) {
      alert("Cloudinary is still loading. Please wait...");
      return;
    }

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dxs1abm4e", // Note: cloudName instead of cloud_name
        uploadPreset: "ml_default", // Note: uploadPreset instead of upload_preset
        sources: ["local", "url", "camera"],
        showAdvancedOptions: true,
        cropping: true,
        multiple: true,
        resourceType: "video", // Note: resourceType instead of resource_type
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
        className="border border-red-800 p-2"
      >
        Upload Video(s) {!cloudinaryReady && "(Loading...)"}
      </button>
      {videoUrls.map((url, index) => (
        <video key={index} src={url} controls width="300" className="mt-4" />
      ))}
    </div>
  );
};

export default CloudinaryUploadWidget;