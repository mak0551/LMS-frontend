import React, { useEffect, useState } from "react";
import { useAuth } from "../state_management/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiUsers, FiBook } from "react-icons/fi";
import Loader from "./Loader";
import { RiAddLargeLine } from "react-icons/ri";
function ManageCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) {
        toast.error("Please login to view your dashboard");
        navigate("/signin");
        return;
      }
      try {
        setLoading(true);
        const res = await axios.get(
          `https://lms-htvh.onrender.com/course/getbyteacher/${user?.user?._id}`
        );
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user, navigate]);

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(
          `https://lms-htvh.onrender.com/course/delete/${courseId}`
        );
        setCourses(courses.filter((course) => course._id !== courseId));
        toast.success("Course deleted successfully");
      } catch (error) {
        toast.error("Failed to delete course");
      }
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-emerald-500";
      case "Intermediate":
        return "bg-amber-500";
      case "Advanced":
        return "bg-rose-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDuration = (duration) => {
    return `${duration.hours}h ${duration.minutes}m`;
  };

  if (loading) return <Loader />;

  return (
    <div>
      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <img
              src={course.thumbNail}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {course.title}
                </h3>
                <span
                  className={`${getLevelColor(
                    course.level
                  )} text-white text-xs px-2 py-1 rounded-full`}
                >
                  {course.level}
                </span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {course.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-gray-500">Duration</p>
                  <p className="font-medium">
                    {formatDuration(course.duration)}
                  </p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-gray-500">Price</p>
                  <p className="font-medium">₹{course.price}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-gray-500">Students</p>
                  <p className="font-medium">
                    {course.enrolledBy?.length || 0}
                  </p>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <p className="text-gray-500">Reviews</p>
                  <p className="font-medium">{course.reviews?.length || 0}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/edit-course/${course._id}`)}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No courses found</p>
          <button
            onClick={() => navigate("/create-course")}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create Your First Course
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageCourses;
