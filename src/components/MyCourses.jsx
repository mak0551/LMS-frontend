import React, { useEffect, useState } from "react";
import { useAuth } from "../state_management/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function MyCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledBy, setenrolledby] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user === null) return;
      if (user === false) {
        toast.error("Please login to view your courses");
        navigate("/signin");
        return;
      }
      try {
        const id = user?.user?._id;
        const res = await axios.get(
          `http://localhost:4040/course/getbyteacher/${id}`
        );
        setCourses(res.data);
        const enrollments = res.data.flatMap((data) => data.enrolledBy);
        setenrolledby(enrollments);
        // console.log(courses, "course");
        // console.log(enrollments, "students id");
      } catch (error) {
        console.log("Error fetching data:", error);
        // toast.error("Failed to load courses");
      }
    };
    fetchData();
  }, [user, navigate]);

  const formatDuration = (duration) => {
    return `${duration.hours}h ${duration.minutes}m`;
  };

  const handleEdit = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:4040/course/delete/${courseId}`);
        setCourses(courses.filter((course) => course._id !== courseId));
        toast.success("Course deleted successfully");
      } catch (error) {
        console.log("Error deleting course:", error);
        toast.error("Failed to delete course");
      }
    }
  };

  return (
    <div className="font-mono min-h-screen bg-gray-100 py-6 px-4">
      <div className="bg-white sm:py-6 py-4 px-8 rounded-xl shadow-lg max-w-5xl mx-auto border border-gray-200">
        <h3 className="sm:text-2xl text-lg font-bold text-gray-800 mb-6 text-center tracking-tight">
          Teacher's Dashboard
        </h3>

        <div className="flex gap-2 justify-around items-center text-xs sm:text-lg text-gray-700 mb-8">
          <div className="bg-blue-50 px-4 py-2 rounded-lg shadow-sm border border-blue-100 w-1/2">
            <span className="font-semibold text-blue-600">Total Courses:</span>{" "}
            <span className="text-blue-800">{courses.length}</span>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-lg shadow-sm border border-green-100 w-1/2">
            <span className="font-semibold text-green-600">
              Total Enrolled Students:
            </span>{" "}
            <span className="text-green-800">{enrolledBy?.length}</span>
          </div>
        </div>

        {courses.length === 0 ? (
          <p className="text-center text-gray-500 text-sm sm:text-base py-4">
            No courses found yet. Start by creating one!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
                    Thumbnail
                  </th>
                  <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
                    Title
                  </th>
                  <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
                    Description
                  </th>
                  <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
                    Duration
                  </th>
                  <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
                    Level
                  </th>
                  <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
                    Price (₹)
                  </th>
                  <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
                    Skills Required
                  </th>
                  <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={course._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition-colors`}
                  >
                    <td className="p-3">
                      <img
                        src={course.thumbNail}
                        alt="err"
                        className="w-16 h-10 object-cover rounded-md shadow-sm border border-gray-200"
                      />
                    </td>
                    <td className="p-3 sm:text-sm text-xs text-gray-800 font-medium">
                      {course.title}
                    </td>
                    <td className="p-3 sm:text-sm text-xs text-gray-600 truncate max-w-xs">
                      {course.description}
                    </td>
                    <td className="p-3 sm:text-sm text-xs text-gray-700">
                      {formatDuration(course.duration)}
                    </td>
                    <td className="p-3 sm:text-sm text-xs text-gray-700">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          course.level === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : course.level === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {course.level}
                      </span>
                    </td>
                    <td className="p-3 sm:text-sm text-xs text-gray-800 font-medium">
                      ₹{course.price}
                    </td>
                    <td className="p-3 sm:text-sm text-xs text-gray-600">
                      {course.skillsRequired.length > 0 ? (
                        <span className="flex flex-wrap gap-1">
                          {course.skillsRequired.map((skill, index) => (
                            <span
                              key={index}
                              className="text-gray-700 px-2 py-1 rounded-md text-xs text-center"
                            >
                              {skill}
                            </span>
                          ))}
                        </span>
                      ) : (
                        <span className="text-gray-700 px-2 py-1 rounded-md text-xs text-center">
                          None
                        </span>
                      )}
                    </td>
                    <td className="p-3 sm:text-sm text-xs">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(course._id)}
                          className="text-blue-600 p-2 text-base"
                        >
                          <CiEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="text-red-600 p-2 rounded-md text-base"
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
