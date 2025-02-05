import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddModule = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: [
      {
        title: "",
        description: "",
        type: "video",
        url: "",
        duration: "",
        file: null, // New field to store file reference
      },
    ],
    courseId: id,
  });

  const handleChange = (e, index = null, field) => {
    if (index === null) {
      setFormData({ ...formData, [field]: e.target.value });
    } else {
      const newContent = [...formData.content];
      if (field === "file") {
        newContent[index].file = e.target.files[0]; // Store the file
      } else {
        newContent[index][field] = e.target.value;
      }
      setFormData({ ...formData, content: newContent });
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/video/upload", // Replace with your Cloudinary cloud name
        formData
      );
      return response.data.secure_url; // Return the uploaded file URL
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedContent = [...formData.content];

    // Upload all files to Cloudinary before submitting
    for (let i = 0; i < updatedContent.length; i++) {
      if (updatedContent[i].file) {
        const uploadedUrl = await uploadToCloudinary(updatedContent[i].file);
        if (uploadedUrl) {
          updatedContent[i].url = uploadedUrl; // Replace URL with uploaded file URL
        }
        delete updatedContent[i].file; // Remove file from the state before sending to backend
      }
    }

    try {
      const response = await axios.post("http://localhost:4040/module/add", {
        ...formData,
        content: updatedContent,
      });
      console.log("Response:", response.data);
      alert("Chapter created successfully!");
    } catch (error) {
      console.error("Error posting chapter:", error);
      alert("Failed to create chapter.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Module to Your Course</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Chapter Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange(e, null, "title")}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Course ID:</label>
        <input
          type="text"
          value={formData.courseId}
          className="w-full p-2 border rounded mb-4"
          readOnly
          required
        />

        {formData.content.map((item, index) => (
          <div key={index} className="mb-6 border p-4 rounded bg-gray-100">
            <label className="block mb-2">Content Title:</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => handleChange(e, index, "title")}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Description:</label>
            <textarea
              value={item.description}
              onChange={(e) => handleChange(e, index, "description")}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Upload Video:</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleChange(e, index, "file")}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Duration (seconds):</label>
            <input
              type="number"
              value={item.duration}
              onChange={(e) => handleChange(e, index, "duration")}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <button
              type="button"
              onClick={() => {
                const newContent = formData.content.filter((_, i) => i !== index);
                setFormData({ ...formData, content: newContent });
              }}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Remove Content
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              content: [
                ...formData.content,
                { title: "", description: "", type: "video", url: "", duration: "", file: null },
              ],
            })
          }
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Content
        </button>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddModule;
