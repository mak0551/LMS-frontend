import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../state_management/AuthContext";
import { Link, Route, Routes } from "react-router-dom";
import { RiAddLargeLine } from "react-icons/ri";
import { FiUsers, FiBook } from "react-icons/fi";
import { toast } from "react-toastify";
import Loader from "../../../commonComponents/Loader";
import TotalCourses from "./components/TotalCourses";
import TotalStudents from "./components/TotalStudents";
import CreateCourseBtn from "../../../commonComponents/CreateCourseBtn";

export default function Overview() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      if (user === null) return;
      try {
        setLoading(true);
        const res = await fetch(
          `https://lms-htvh.onrender.com/course/getbyteacher/${user?.user?._id}`
        );
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user]);

  return (
    <>
      <div className="h-full bg-white p-6 xl:w-3/4 w-full">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="bg-gradient-to-r from-white to-zinc-50 rounded-2xl p-6 mb-8 space-y-4 text-zinc-700 shadow-lg">
              <h1 className="text-3xl font-bold mb-2">Teacher's Dashboard</h1>
              <div className="flex flex-col md:flex-row md:gap-[70px] gap-4">
                <div className="flex items-center gap-3 hover:scale-105 transition-transform">
                  <FiBook className="sm:text-2xl text-xl" />
                  <div>
                    <Link
                      to={`/mycourses/overview/totalcourses/${user?.user?._id}`}
                    >
                      <p className="text-sm opacity-80">Total Courses</p>
                      <p className="text-2xl font-semibold">{courses.length}</p>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-3 hover:scale-105 transition-transform">
                  <FiUsers className="sm:text-2xl text-xl" />
                  <div>
                    <Link
                      to={`/mycourses/overview/totalstudents/${user?.user?._id}`}
                    >
                      <p className="text-sm opacity-80">Total Students</p>
                      <p className="text-2xl font-semibold">
                        {courses.reduce(
                          (sum, course) =>
                            sum + (course?.enrolledBy?.length || 0),
                          0
                        )}
                      </p>
                    </Link>
                  </div>
                </div>
                <CreateCourseBtn />
              </div>
            </div>
            {courses.length > 0 ? (
              <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden overflow-x-auto h-fit max-h-[100vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      <th className="p-2 text-left">Title</th>
                      <th className="p-2">Students</th>
                      <th className="p-2">Price</th>
                      <th className="p-2">Duration</th>
                      <th className="p-2">Level</th>
                      <th className="p-2">Total Reviews</th>
                      <th className="p-2">Average Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr
                        key={course._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-2">{course?.title}</td>
                        <td className="p-2 text-center">
                          {course?.enrolledBy?.length}
                        </td>
                        <td className="p-2 text-center">₹{course?.price}</td>
                        <td className="p-2 text-center">
                          {course?.duration?.hours}h {course?.duration?.minutes}
                          m
                        </td>
                        <td className="p-2 text-center">{course?.level}</td>
                        <td className="p-2 text-center">
                          {course?.reviews?.length}
                        </td>
                        <td className="p-2 text-center">
                          {course?.averageRating}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-600">
                You have no courses yet.
              </p>
            )}
          </>
        )}
      </div>
      <div className="max-w-1/4">
        <Routes>
          <Route path="totalcourses/:id" element={<TotalCourses />} />
          <Route path="totalstudents/:id" element={<TotalStudents />} />
        </Routes>
      </div>
    </>
  );
}
