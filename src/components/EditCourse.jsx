import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../state_management/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const EditCourse = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    teacher: "",
    skillsRequired: [],
    level: "Beginner",
    thumbNail: "",
    duration: { hours: "", minutes: "" },
    price: "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [imgName, setImgName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (user === null) {
        return;
      }
      if (user === false) {
        toast.error("Please login to edit your course");
        navigate("/signin");
        return;
      }
      try {
        const response = await axios.get(
          `https://lms-htvh.onrender.com/course/getbyid/${id}`
        );
        const course = response?.data?.findCourse;
        setCourseData({
          title: course.title,
          description: course.description,
          teacher: course.teacher || user?.user?._id,
          skillsRequired: course.skillsRequired || [],
          level: course.level || "Beginner",
          thumbNail: course.thumbNail,
          duration: {
            hours: course.duration?.hours || "",
            minutes: course.duration?.minutes || "",
          },
          price: course.price || "",
        });
        if (course.thumbNail) {
          setImgName("Current Thumbnail");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Failed to load course data");
        navigate("/mycourses");
      }
    };
    fetchCourse();
  }, [id, user, navigate]);

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
    setCourseData((prev) => ({ ...prev, thumbNail: url }));
    setImgName("New Thumbnail Uploaded");
    // toast.success("Thumbnail uploaded successfully");
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
      await axios.put(`https://lms-htvh.onrender.com/course/update/${id}`, courseData);
      toast.success("Course updated successfully!");
      navigate("/mycourses");
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading course data...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center font-mono m-2 ">
      <div className="bg-white sm:py-4 py-2 px-8 mt-2 rounded-lg shadow-md xl:w-1/3">
        <h2 className="sm:text-2xl text-base font-semibold mb-4 text-center">
          Edit Course
        </h2>
        <form onSubmit={handleSubmit} className="sm:space-y-4 space-y-2">
          <div>
            <label className="font-semibold">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={courseData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              placeholder="Course Description"
              value={courseData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <h4 className="sm:text-lg font-semibold mb-2">Skills Required</h4>
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
              Update Thumbnail
            </label>
            <CloudinaryUploadWidget
              onUploadSuccess={(url) => handleThumbnail(url)}
            />
          </div>
          {imgName && (
            <div className="w-[70%] flex flex-col">
              <span className="text-gray-700 mt-2 truncate whitespace-nowrap overflow-hidden">
                {imgName}
              </span>
              <div className="max-h-[150px] overflow-hidden max-w-[250px]">
                <img
                  src={courseData.thumbNail}
                  alt="cannot load image"
                  className="w-full h-full"
                />
              </div>
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

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-pink-600 text-white px-6 sm:py-2 py-1 rounded-lg hover:bg-pink-500 transition text-base"
            >
              Update 
            </button>
            <Link to={`/editmodule/${id}`}>
              <button
                type="button"
                className="w-full border border-pink-600 text-pink-600 px-6 sm:py-2 py-1 rounded-lg hover:bg-zinc-50 transition text-base"
              >
                Edit Modules
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
