import React, { useEffect, useState } from "react";
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
      },
    ],
    courseId: id,
  });

  const handleChange = (e, index = null, field) => {
    if (index === null) {
      // Handling changes for module-level fields (title, courseId)
      setFormData({ ...formData, [field]: e.target.value });
    } else {
      // Handling changes for content inside the module
      const newContent = [...formData.content];
      newContent[index][field] = e.target.value;
      setFormData({ ...formData, content: newContent });
    }
  };

  const addContent = () => {
    setFormData({
      ...formData,
      content: [
        ...formData.content,
        { title: "", description: "", type: "video", url: "", duration: "" },
      ],
    });
  };

  const removeContent = (index) => {
    const newContent = formData.content.filter((_, i) => i !== index);
    setFormData({ ...formData, content: newContent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4040/module/add",
        formData
      );
      console.log("Response:", response.data);
      alert("Chapter created successfully!");
    } catch (error) {
      console.error("Error posting chapter:", error);
      alert("Failed to create chapter.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add module to your Course</h2>
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

            <label className="block mb-2">Video URL:</label>
            <input
              type="text"
              value={item.url}
              onChange={(e) => handleChange(e, index, "url")}
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
              onClick={() => removeContent(index)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Remove Content
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addContent}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Content
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddModule;
