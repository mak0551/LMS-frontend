import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../commonComponents/CloudinaryUploadWidget";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";

const AddModule = () => {
  const { id } = useParams(); // courseId from URL params
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modules, setModules] = useState([
    {
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
    },
  ]);

  const handleChange = (e, moduleIndex, contentIndex = null, field) => {
    const newModules = [...modules];
    if (contentIndex === null) {
      newModules[moduleIndex][field] = e.target.value;
    } else {
      newModules[moduleIndex].content[contentIndex][field] = e.target.value;
    }
    setModules(newModules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await axios.post("https://lms-htvh.onrender.com/module/add", modules);
      toast.success("Modules created successfully!");
      navigate(`/mycourses`);
    } catch (error) {
      console.error("Error posting modules:", error);
      toast.error(error.response?.data?.message || "Failed to create modules.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVideoUpload = (url, moduleIndex, contentIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].content[contentIndex].url = url;
    setModules(newModules);
  };

  const addModule = () => {
    setModules([
      ...modules,
      {
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
      },
    ]);
  };

  const addContent = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].content.push({
      title: "",
      description: "",
      type: "video",
      url: "",
      duration: "",
    });
    setModules(newModules);
  };

  const removeContent = (moduleIndex, contentIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].content = newModules[moduleIndex].content.filter(
      (_, i) => i !== contentIndex
    );
    setModules(newModules);
  };

  const removeModule = (moduleIndex) => {
    setModules(modules.filter((_, i) => i !== moduleIndex));
  };

  return (
    <div className="relative max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <IoMdArrowBack
        className="absolute md:left-[-30px] left-0 text-2xl top-2 md:top-7 bg-white rounded-full"
        onClick={() => navigate(-1)}
      />
      <h2 className="text-2xl font-bold mb-4">Add Modules to Your Course</h2>
      <form onSubmit={handleSubmit}>
        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="mb-8 border p-4 rounded bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">
              Module {moduleIndex + 1}
            </h3>

            <label className="block mb-2">Module Title:</label>
            <input
              type="text"
              value={module.title}
              onChange={(e) => handleChange(e, moduleIndex, null, "title")}
              className="w-full p-2 border rounded mb-4"
              required
            />

            <label className="block mb-2">Course ID:</label>
            <input
              type="text"
              value={module.courseId}
              className="w-full p-2 border rounded mb-4"
              readOnly
            />

            {module.content.map((item, contentIndex) => (
              <div
                key={contentIndex}
                className="mb-6 border p-4 rounded bg-gray-100"
              >
                <label className="block mb-2">Content Title:</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    handleChange(e, moduleIndex, contentIndex, "title")
                  }
                  className="w-full p-2 border rounded mb-4"
                  required
                />

                <label className="block mb-2">Description:</label>
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    handleChange(e, moduleIndex, contentIndex, "description")
                  }
                  className="w-full p-2 border rounded mb-4"
                  required
                />

                <div className="flex gap-2">
                  <label className="block mb-2">Add Video</label>
                  <CloudinaryUploadWidget
                    onUploadSuccess={(url) =>
                      handleVideoUpload(url, moduleIndex, contentIndex)
                    }
                  />
                </div>
                {item.url && (
                  <p className="text-green-600 mb-2">
                    Video uploaded successfully
                  </p>
                )}

                <label className="block mb-2 mt-4">Duration (seconds):</label>
                <input
                  type="number"
                  value={item.duration}
                  onChange={(e) =>
                    handleChange(e, moduleIndex, contentIndex, "duration")
                  }
                  className="w-full p-2 border rounded mb-4"
                  required
                />

                {module.content.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeContent(moduleIndex, contentIndex)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600 transition-colors"
                  >
                    Remove Content
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => addContent(moduleIndex)}
              className="bg-black text-white px-4 py-1 border-2 border-black rounded-md mb-4 hover:bg-zinc-700 transition-colors"
            >
              Add Content
            </button>

            {modules.length > 1 && (
              <button
                type="button"
                onClick={() => removeModule(moduleIndex)}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600 transition-colors ml-2"
              >
                Remove Module
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addModule}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 transition-colors"
        >
          Add Module
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`ml-2 bg-white border-2 border-black text-black px-4 py-1 rounded-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-50"
          } transition-colors`}
        >
          {isSubmitting ? "Creating Modules..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddModule;