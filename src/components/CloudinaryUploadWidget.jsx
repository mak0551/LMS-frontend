import React from "react";

const CloudinaryUploadWidget = ({ onUploadSuccess }) => {
  const openWidget = () => {
    if (!window.cloudinary) {
      alert("Cloudinary not loaded yet, please try again in a moment...");
      return;
    }

    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "dxs1abm4e",
          uploadPreset: "ml_default",
          sources: ["local", "url", "camera"],
          showAdvancedOptions: true,
          cropping: true,
          multiple: false,
          resourceType: "auto",
        },
        (error, result) => {
          if (result?.event === "success") {
            const fileName = result.info.public_id.split("/").pop();
            onUploadSuccess(result.info.secure_url, fileName);
          }
        }
      )
      .open();
  };

  return (
    <div>
      <button
        type="button"
        onClick={openWidget}
        className="border border-zinc-600 rounded-md px-2"
      >
        choose file
      </button>
    </div>
  );
};

export default CloudinaryUploadWidget;
