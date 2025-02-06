// import React, { useState } from "react";
// import axios from "axios";

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const uploadFile = async () => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "upload_lms"); // Replace with your preset

//     try {
//       const response = await axios.post(
//         "http://localhost:4040/file/upload",
//         formData
//       );
//       console.log(response?.data?.secure_url, "image url");
//       setImageUrl(response?.data?.secure_url);
//     } catch (err) {
//       console.error("Error uploading file:", err);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={uploadFile}>Upload</button>
//       {imageUrl && <img src={imageUrl} alt="Uploaded" />}
//     </div>
//   );
// };

// export default FileUpload;
