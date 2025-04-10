import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../../../../commonComponents/CloudinaryUploadWidget";
import { toast } from "react-toastify";

const EditModules = () => {
  const { id } = useParams(); // id is courseId
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(
          `https://lms-htvh.onrender.com/module/getbycourse/${id}`
        );
        setFormData(
          response.data.length > 0
            ? response.data
            : [
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
              ]
        );
        // console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching modules:", error);
        toast.info("Modules not found, try adding one.");
        setFormData([
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
        setIsLoading(false);
      }
    };
    fetchModules();
  }, [id]);

  const handleChange = (e, moduleIndex, contentIndex = null, field) => {
    const newFormData = [...formData];
    if (contentIndex === null) {
      newFormData[moduleIndex][field] = e.target.value;
    } else {
      newFormData[moduleIndex].content[contentIndex][field] = e.target.value;
    }
    setFormData(newFormData);
  };

  const handleVideoUpload = (url, moduleIndex, contentIndex) => {
    const newFormData = [...formData];
    newFormData[moduleIndex].content[contentIndex].url = url;
    setFormData(newFormData);
    toast.success("Video uploaded successfully!");
  };

  const addModule = () => {
    setFormData([
      ...formData,
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
    const newFormData = [...formData];
    newFormData[moduleIndex].content.push({
      title: "",
      description: "",
      type: "video",
      url: "",
      duration: "",
    });
    setFormData(newFormData);
  };

  const removeContent = (moduleIndex, contentIndex) => {
    const newFormData = [...formData];
    newFormData[moduleIndex].content = newFormData[moduleIndex].content.filter(
      (_, i) => i !== contentIndex
    );
    setFormData(newFormData);
  };

  const removeModule = (moduleIndex) => {
    setFormData(formData.filter((_, i) => i !== moduleIndex));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const existingModules = formData.filter((module) => module._id);
      const newModules = formData.filter((module) => !module._id);

      const updatePromises = existingModules.map((module) =>
        axios.put(
          `https://lms-htvh.onrender.com/module/update/${module._id}`,
          module
        )
      );
      await Promise.all(updatePromises);

      if (newModules.length > 0) {
        await axios.post(
          "https://lms-htvh.onrender.com/module/add",
          newModules
        );
      }

      toast.success("modules updated successfully!");
      navigate(`/mycourses`);
    } catch (error) {
      console.error("Error updating modules:", error);
      toast.error("Failed to process modules");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600 animate-pulse">
          Loading modules...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Edit Modules
        </h2>
        <form onSubmit={handleSubmit}>
          {formData.map((module, moduleIndex) => (
            <div
              key={module._id || `new-${moduleIndex}`} // Use _id if exists, otherwise a temp key
              className="mb-8 bg-white shadow-md rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">
                Module {moduleIndex + 1}
              </h3>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Module Title:
                </label>
                <input
                  type="text"
                  value={module.title}
                  onChange={(e) => handleChange(e, moduleIndex, null, "title")}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Course ID:
                </label>
                <input
                  type="text"
                  value={module.courseId}
                  className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
                  readOnly
                />
              </div>

              {module.content.map((item, contentIndex) => (
                <div
                  key={contentIndex}
                  className="mb-6 border border-gray-200 p-4 rounded-lg bg-gray-50"
                >
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Content Title:
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleChange(e, moduleIndex, contentIndex, "title")
                      }
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Description:
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) =>
                        handleChange(
                          e,
                          moduleIndex,
                          contentIndex,
                          "description"
                        )
                      }
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <label className="text-gray-700 font-medium">
                      Update Video:
                    </label>
                    <CloudinaryUploadWidget
                      onUploadSuccess={(url) =>
                        handleVideoUpload(url, moduleIndex, contentIndex)
                      }
                    />
                  </div>
                  {item.url && (
                    <div className="flex flex-col">
                      <div className="text-sm w-full">Current video:</div>
                      <video
                        src={item.url}
                        controls
                        className="w-[200px] h-[150px] rounded-lg"
                      ></video>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Duration (seconds):
                    </label>
                    <input
                      type="number"
                      value={item.duration}
                      onChange={(e) =>
                        handleChange(e, moduleIndex, contentIndex, "duration")
                      }
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {module.content.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContent(moduleIndex, contentIndex)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                      Remove Content
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addContent(moduleIndex)}
                className="bg-white border-2 border-black text-black px-4 py-1 rounded-lg hover:bg-zinc-50 transition-colors duration-200 mr-2"
              >
                Add Content
              </button>

              {formData.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeModule(moduleIndex)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Remove Module
                </button>
              )}
            </div>
          ))}

          <div className="flex flex-col sm:flex-row sm:gap-4 gap-1 text-sm">
            <button
              type="button"
              onClick={addModule}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Add Module
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-black text-white px-6 py-2 rounded-lg ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-zinc-700"
              } transition-colors duration-200`}
            >
              {isSubmitting ? "Processing Modules..." : "Save All Modules"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModules;
