import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../state_management/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const CreateCourse = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) return;
    if (user === false) {
      toast.error("please login to create your course");
      navigate("/signin");
    }
  }, [user, navigate]);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    teacher: user?.user?._id || "",
    skillsRequired: [],
    level: "Beginner",
    thumbNail: "",
    duration: { hours: "", minutes: "" },
    price: "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [imgName, setImgName] = useState("");
  // Update teacher ID when user becomes available
  useEffect(() => {
    if (user?.user?._id) {
      setCourseData((prev) => ({ ...prev, teacher: user.user._id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("duration.")) {
      const key = name.split(".")[1];
      setCourseData((prev) => ({
        ...prev,
        duration: { ...prev.duration, [key]: parseInt(value, 10) || 0 },
      }));
    } else {
      setCourseData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleThumbnail = (url) => {
    const thumbnail = url;
    setCourseData({ ...courseData, thumbNail: thumbnail });
    toast.success("uploaded successfully");
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setCourseData((prev) => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setCourseData((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://lms-htvh.onrender.com/course/create",
        courseData
      );
      toast.success(
        "Course added successfully!! now add modules to your course"
      );
      console.log(response.data);

      // Check if the response contains a valid _id before redirecting
      if (response?.data?._id) {
        navigate(`/addmodule/${response.data._id}`);
      } else {
        console.error("Course creation failed: No course ID returned.");
        alert("Failed to create course.");
      }
    } catch (error) {
      console.error("Error adding course:", error.message);
      alert("Failed to add course.");
    }
  };

  return (
    <>
      {user && (
        <div className="flex justify-center items-center font-mono m-2">
          <div className="bg-white sm:py-4 py-2 px-8 mt-2 rounded-lg shadow-md ">
            <h2 className="sm:text-2xl text-base font-semibold mb-4 text-center">
              Add New Course
            </h2>
            <form onSubmit={handleSubmit} className="sm:space-y-4 space-y-2">
              <input
                type="text"
                name="title"
                placeholder="Course Title"
                value={courseData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
              />

              <textarea
                name="description"
                placeholder="Course Description"
                value={courseData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
              />

              {/* <input
          type="text"
          name="teacher"
          placeholder="Teacher ID"
          value={courseData.teacher}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          required
        /> */}

              <div>
                <h4 className="sm:text-lg font-semibold mb-2">
                  Skills Required
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add Skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add
                  </button>
                </div>

                <ul className="mt-2 space-y-1">
                  {courseData.skillsRequired.map((skill, index) => (
                    <li
                      key={index}
                      className="flex justify-between bg-gray-100 p-2 rounded-lg"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✖
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <hr />
              <div className="flex gap-2">
                <label className="block mb-2 sm:text-lg font-semibold">
                  Add a thumbnail
                </label>
                <CloudinaryUploadWidget
                  onUploadSuccess={(url, fileName) => {
                    handleThumbnail(url);
                    setImgName(fileName);
                  }}
                />
              </div>
              {imgName && (
                <div className="w-[70%] flex">
                  <span className="text-gray-700 mt-2 truncate whitespace-nowrap overflow-hidden">
                    Uploaded successfully: {imgName}
                  </span>
                </div>
              )}
              <hr />
              <div>
                <h4 className="sm:text-lg font-semibold mb-2">Level</h4>
                <select
                  name="level"
                  value={courseData.level}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <h4 className="sm:text-lg font-semibold mb-2">Duration</h4>
                <div className="flex sm:gap-4 gap-2">
                  <input
                    type="number"
                    name="duration.hours"
                    placeholder="Hours"
                    value={courseData.duration.hours}
                    onChange={handleChange}
                    className="w-1/2 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                  <input
                    type="number"
                    name="duration.minutes"
                    placeholder="Minutes"
                    value={courseData.duration.minutes}
                    onChange={handleChange}
                    className="w-1/2 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
              <div>
                <label className="sm:text-lg font-semibold mb-2">
                  Enrollment Fee {"\u20B9"}
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder={"\u20B9"}
                  value={courseData.price}
                  onChange={handleChange}
                  className="w-full p-1 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 text-white px-6 sm:py-3 py-1 rounded-lg hover:bg-pink-500 transition text-base"
              >
                Add Course
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCourse;
