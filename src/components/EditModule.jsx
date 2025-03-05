import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { toast } from "react-toastify";

const EditModule = () => {
  const { id, moduleId } = useParams(); // id is courseId, moduleId is the module to edit
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/module/${moduleId}`
        );
        setFormData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching module:", error);
        toast.error("Failed to load module data");
        setIsLoading(false);
      }
    };
    fetchModule();
  }, [moduleId]);

  const handleChange = (e, index = null, field) => {
    if (index === null) {
      setFormData({ ...formData, [field]: e.target.value });
    } else {
      const newContent = [...formData.content];
      newContent[index][field] = e.target.value;
      setFormData({ ...formData, content: newContent });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      await axios.put(`http://localhost:4040/module/${moduleId}`, formData);
      toast.success("Module updated successfully!");
      navigate(`/mycourses`);
    } catch (error) {
      console.error("Error updating module:", error);
      toast.error(error.response?.data?.message || "Failed to update module.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVideoUpload = (url, index) => {
    const newContent = [...formData.content];
    newContent[index].url = url;
    setFormData({ ...formData, content: newContent });
    toast.success("Video uploaded successfully!");
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p>Loading module data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Module</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Module Title:</label>
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
            <div className="flex gap-2">
              <label className="block mb-2">Update Video</label>
              <CloudinaryUploadWidget
                onUploadSuccess={(url) => handleVideoUpload(url, index)}
              />
            </div>
            {item.url && (
              <div className="mt-2">
                <p className="text-green-600 mb-2">Current video: {item.url}</p>
              </div>
            )}

            <label className="block mb-2 mt-4">Duration (seconds):</label>
            <input
              type="number"
              value={item.duration}
              onChange={(e) => handleChange(e, index, "duration")}
              className="w-full p-2 border rounded mb-4"
              required
            />

            {formData.content.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const newContent = formData.content.filter(
                    (_, i) => i !== index
                  );
                  setFormData({ ...formData, content: newContent });
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600 transition-colors"
              >
                Remove Content
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              content: [
                ...formData.content,
                {
                  title: "",
                  description: "",
                  type: "video",
                  url: "",
                  duration: "",
                },
              ],
            })
          }
          className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-green-600 transition-colors"
        >
          Add Content
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`ml-2 bg-blue-500 text-white px-4 py-2 rounded-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          } transition-colors`}
        >
          {isSubmitting ? "Updating Module..." : "Update Module"}
        </button>
      </form>
    </div>
  );
};

export default EditModule;
