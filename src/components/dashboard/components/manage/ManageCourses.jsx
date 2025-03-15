import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../state_management/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiUsers, FiStar } from "react-icons/fi";
import axios from "axios";
import Loader from "../../../commonComponents/Loader";
import CreateCourseBtn from "../../../commonComponents/CreateCourseBtn";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import StarRating from "../../../commonComponents/StarRating";
import { MdDeleteOutline } from "react-icons/md";
function ManageCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [review, setReviews] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://lms-htvh.onrender.com/course/getbyteacher/${user?.user?._id}`
      );
      console.log(res.data);
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(
          `https://lms-htvh.onrender.com/course/delete/${courseId}`
        );
        setCourses((courses) =>
          courses.filter((course) => course._id !== courseId)
        );
        toast.success("Course deleted successfully");
      } catch (error) {
        toast.error("Failed to delete course");
      }
    }
  };

  const handleDeleteReview = async (id, userId) => {
    console.log(review, "reviewer");
    try {
      await axios.delete(
        `https://lms-htvh.onrender.com/review/delete/${id}/${userId}`
      );
      setReviews((review) => ({
        ...review,
        reviews: review.reviews.filter((e) => e._id !== id),
      }));
      toast.success("review deleted successfully");
    } catch (error) {
      toast.error("Failed to delete course");
      console.log(error);
    }
  };

  const formatDuration = (duration) => {
    return `${duration.hours}h ${duration.minutes}m`;
  };

  const CourseTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Course
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Level
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Duration
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Students
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Reviews
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={course.thumbNail}
                    alt={course.title}
                    className="h-10 w-10 rounded-md object-cover mr-3"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {course.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {course.description.substring(0, 50)}...
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {course.level}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                {formatDuration(course.duration)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                ₹{course.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="text-gray-800 hover:text-zinc-700 hover:scale-125 transition-transform"
                >
                  <FiUsers className="inline mr-1" />
                  {course.enrolledBy?.length || 0}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => setReviews(course)}
                  className="text-gray-800 hover:text-zinc-700 hover:scale-125 transition-transform"
                >
                  {course.reviews?.length || 0}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span>{course.averageRating || "N/A"}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                <button
                  onClick={() => navigate(`/viewcoursedetails/${course._id}`)}
                  className="text-black mr-2 hover:text-zinc-700"
                >
                  <FaRegEye />
                </button>
                <button
                  onClick={() => navigate(`/edit-course/${course._id}`)}
                  className="text-indigo-600 mr-2 hover:text-indigo-900"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const StudentModal = ({ courseData }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-50 rounded-lg md:p-6 w-full max-w-2xl relative max-h-[75vh]] overflow-hidden overflow-y-auto">
        <div className="bg-zinc-50 rounded-lg p-4">
          <h2 className="text-lg capitalize font-medium gap-1 items-center flex text-gray-800 mb-2">
            {courseData?.title}
            <span className="text-sm">
              {" "}
              - Total Students {courseData?.enrolledBy?.length}
            </span>
          </h2>
          {courseData?.enrolledBy?.length > 0 ? (
            <>
              <div className="flex flex-col gap-2 ">
                {courseData?.enrolledBy?.map((student) => (
                  <div
                    key={student._id}
                    className="bg-white shadow-md rounded-lg p-2 flex gap-2 md:gap-4 items-start md:p-4"
                  >
                    <img
                      src={student.profileImg}
                      alt={student.name}
                      className="w-16 h-16 rounded-full object-cover md:w-20 md:h-20 md:mt-2"
                    />
                    <div className="overflow-hidden">
                      <h4 className="font-semibold text-gray-800 truncate md:text-xl">
                        {student.name}
                      </h4>
                      <p className="text-xs text-gray-600 truncate md:text-base">
                        {student.email}
                      </p>
                      <p className="text-xs text-gray-600 md:text-base">
                        {student.mobileNo}
                      </p>
                      <p className="text-xs capitalize text-gray-500 md:text-base">
                        {student.address}
                      </p>
                      <p className="text-xs text-gray-500 md:text-sm">
                        Joined:{" "}
                        {new Date(student.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="capitalize py-8 text-center">
              no students enrolled yet
            </div>
          )}
        </div>
        <button
          onClick={() => setSelectedCourse(null)}
          className="mt-4 font-bold text-2xl px-4 py-2 absolute top-[-10px] right-0"
        >
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );

  const ReviewModal = ({ courseData }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="rounded-lg md:p-6 w-full max-w-2xl relative max-h-[75vh] overflow-hidden overflow-y-auto bg-zinc-50">
        <div className="rounded-lg p-4 bg-zinc-50">
          <h2 className="text-lg capitalize font-medium gap-1 items-center flex text-gray-800 mb-2">
            {courseData?.title}
            <span className="text-sm">
              {" "}
              - Total Reviews {courseData?.reviews?.length}
            </span>
          </h2>
          {courseData?.reviews?.length > 0 ? (
            <>
              <div className="flex flex-col gap-2 ">
                {courseData?.reviews?.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white shadow-md rounded-lg p-2 flex gap-2 md:gap-4 items-center md:p-4 "
                  >
                    <div className="overflow-hidden space-y-2 w-full">
                      <p className="text-sm text-black truncate md:text-base">
                        {review?.userId?.name}
                      </p>
                      <div className="flex items-center font-light sm:gap-4 gap-2 text-xs">
                        <StarRating rating={review?.rating} />
                        {new Date(review?.createdAt).toLocaleDateString()}
                      </div>
                      <p>{review?.comment}</p>
                    </div>
                    <div
                      className="w-[10%] flex items-center justify-center"
                      onClick={() =>
                        handleDeleteReview(review?._id, review?.userId?._id)
                      }
                    >
                      <MdDeleteOutline />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="capitalize py-8 text-center">reviews not found</div>
          )}
        </div>
        <button
          onClick={() => setReviews(null)}
          className="mt-4 font-bold text-2xl px-4 py-2 absolute top-[-10px] right-0"
        >
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="w-full">
        <Loader />;
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex sm:flex-row flex-col gap-4 sm:justify-between sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 hidden sm:inline-block">
          Manage Courses
        </h1>
        <CreateCourseBtn />
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg mb-4">
            You haven't created any courses yet
          </p>
          <button
            onClick={() => navigate("/create-course")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create Your First Course
          </button>
        </div>
      ) : (
        <CourseTable />
      )}

      {selectedCourse && <StudentModal courseData={selectedCourse} />}
      {review && <ReviewModal courseData={review} />}
    </div>
  );
}

export default ManageCourses;
