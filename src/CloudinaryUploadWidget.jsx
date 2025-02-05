import React, { useState } from "react";
import { CloudinaryContext, Image } from "cloudinary-react";

const CloudinaryUploadWidget = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = (result) => {
    if (result.event === "success") {
      setImageUrl(result.info.secure_url);
    }
  };

  const openWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: "dxs1abm4e",
        upload_preset: "upload_lms",
        sources: ["local", "url", "camera"],
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
      },
      handleUpload
    );
  };

  return (
    <div>
      <button onClick={openWidget}>Upload Image</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default CloudinaryUploadWidget;
