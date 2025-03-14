import React, { useEffect, useState } from "react";
import { useAuth } from "../state_management/AuthContext";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Loader from "./Loader";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import ManageCourses from "./ManageCourses";

export default function MyCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledBy, setenrolledby] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
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
        setLoading(true);
        const id = user?.user?._id;
        const res = await axios.get(
          `https://lms-htvh.onrender.com/course/getbyteacher/${id}`
        );
        setCourses(res.data);
        // console.log(res.data)
        const enrollments = res.data.flatMap((data) => data.enrolledBy);
        setenrolledby(enrollments);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching data:", error);
        // toast.error("Failed to load courses");
      }
    };
    fetchData();
  }, [user, navigate]);

  const fetchStudents = async () => {
    try {
      const res = await Promise.all(
        enrolledBy.map((e) =>
          axios.get(`https://lms-htvh.onrender.com/users/getbyid/${e}`)
        )
      );
      setStudentData(res.map((e) => e.data));
      console.log(studentData, " studentdata");
    } catch (err) {
      console.log(err);
    }
  };

  const formatDuration = (duration) => {
    return `${duration.hours}h ${duration.minutes}m`;
  };

  const handleEdit = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(
          `https://lms-htvh.onrender.com/course/delete/${courseId}`
        );
        setCourses(courses.filter((course) => course._id !== courseId));
        toast.success("Course deleted successfully");
      } catch (error) {
        console.log("Error deleting course:", error);
        toast.error("Failed to delete course");
      }
    }
  };
  return (
    <div className="flex overflow-hidden overflow-x-auto">
      <Sidebar />
      <Routes>
        <Route index element={<Overview />} />
        <Route path="overview/*" element={<Overview />} />
        <Route path="managecourses" element={<ManageCourses />} />
      </Routes>
    </div>
  );
  // return (
  //   <div className="font-mono min-h-screen  py-6 px-4">
  //     <div className="bg-white sm:py-6 py-4 px-8 rounded-xl shadow-lg max-w-5xl mx-auto border border-gray-200">
  //       <h3 className="sm:text-2xl text-lg font-bold text-black mb-6 text-center tracking-tight">
  //         Teacher's Dashboard
  //       </h3>
  //       <div className="flex gap-2 justify-around items-center text-xs sm:text-lg mb-8">
  //         <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-black w-1/2">
  //           <span className="font-semibold text-black">Total Courses:</span>{" "}
  //           <span className="text-zinc-800">{courses.length}</span>
  //         </div>
  //         <div
  //           className="bg-white px-4 py-2 rounded-lg shadow-sm border border-black w-1/2"
  //           onClick={fetchStudents}
  //         >
  //           <span className="font-semibold text-black">
  //             Total Enrolled Students:
  //           </span>{" "}
  //           <span className="text-zinc-800">
  //             {enrolledBy ? enrolledBy.length : 0}
  //           </span>
  //         </div>
  //       </div>
  //       {loading ? (
  //         <Loader />
  //       ) : (
  //         <>
  //           {courses.length === 0 && (
  //             <p className="text-center text-gray-500 text-sm sm:text-base py-4">
  //               No courses found yet. Start by creating one!
  //             </p>
  //           )}
  //           <div className="overflow-x-auto">
  //             <table className="w-full text-left border-collapse border rounded-md">
  //               <thead className="text-center">
  //                 <tr className="bg-gray-200 text-gray-700 ">
  //                   <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
  //                     Thumbnail
  //                   </th>
  //                   <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
  //                     Title
  //                   </th>
  //                   <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
  //                     Description
  //                   </th>
  //                   <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
  //                     Duration
  //                   </th>
  //                   <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
  //                     Level
  //                   </th>
  //                   <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
  //                     Price (₹)
  //                   </th>
  //                   <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
  //                     Skills Required
  //                   </th>
  //                   <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
  //                     Enrolled By
  //                   </th>
  //                   <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
  //                     Total Reviews
  //                   </th>
  //                   <th className="p-3 sm:text-sm text-xs font-semibold uppercase tracking-wide">
  //                     Actions
  //                   </th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {courses.map((course, index) => (
  //                   <tr
  //                     key={course._id}
  //                     className="border-b bg-white hover:bg-blue-50 transition-colors"
  //                   >
  //                     <td className="p-3">
  //                       <img
  //                         src={course.thumbNail}
  //                         alt="err"
  //                         className="w-16 h-10 object-cover rounded-md shadow-sm border border-gray-200"
  //                       />
  //                     </td>
  //                     <td className="p-3 sm:text-sm text-xs text-gray-800 font-medium">
  //                       {course.title}
  //                     </td>
  //                     <td className="p-3 sm:text-sm text-xs text-gray-600 truncate max-w-xs">
  //                       {course.description}
  //                     </td>
  //                     <td className="p-3 sm:text-sm text-xs text-gray-700">
  //                       {formatDuration(course.duration)}
  //                     </td>
  //                     <td className="p-3 sm:text-sm text-xs text-gray-700">
  //                       <span
  //                         className={`px-2 py-1 rounded-full text-xs ${
  //                           course.level === "Beginner"
  //                             ? "bg-green-100 text-green-800"
  //                             : course.level === "Intermediate"
  //                             ? "bg-yellow-100 text-yellow-800"
  //                             : "bg-red-100 text-red-800"
  //                         }`}
  //                       >
  //                         {course.level}
  //                       </span>
  //                     </td>
  //                     <td className="p-3 sm:text-sm text-xs text-gray-800 font-medium">
  //                       ₹{course.price}
  //                     </td>
  //                     <td className="p-3 sm:text-sm text-xs text-gray-600">
  //                       {course.skillsRequired.length > 0 ? (
  //                         <span className="flex flex-wrap gap-1">
  //                           {course.skillsRequired.map((skill, index) => (
  //                             <span
  //                               key={index}
  //                               className="text-gray-700 px-2 py-1 rounded-md text-xs text-center"
  //                             >
  //                               {skill}
  //                             </span>
  //                           ))}
  //                         </span>
  //                       ) : (
  //                         <span className="text-gray-700 px-2 py-1 rounded-md text-xs text-center">
  //                           None
  //                         </span>
  //                       )}
  //                     </td>
  //                     <td className="p-3 sm:text-sm text-xs text-gray-800 font-medium">
  //                       {course.enrolledBy?.length}
  //                     </td>
  //                     <td className="p-3 sm:text-sm text-xs text-gray-800 font-medium">
  //                       {course.reviews?.length}
  //                     </td>
  //                     <td className="p-3 sm:text-sm text-xs">
  //                       <div className="flex gap-2">
  //                         <button
  //                           onClick={() => handleEdit(course._id)}
  //                           className="text-blue-600 p-2 text-base"
  //                         >
  //                           <CiEdit />
  //                         </button>
  //                         <button
  //                           onClick={() => handleDelete(course._id)}
  //                           className="text-red-600 p-2 rounded-md text-base"
  //                         >
  //                           <MdDeleteOutline />
  //                         </button>
  //                       </div>
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );
}
