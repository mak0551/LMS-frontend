import React, { useEffect, useState } from "react";
import Courses from "../home/courses/Courses";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../commonComponents/Loader";
import { IoMdArrowBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { api } from "../../utils/api";

function ViewTeachers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);

        const response = await api.get("/users/getallteachers");

        setData(response.data);
      } catch (err) {
        setError("Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition mb-8"
        >
          <IoMdArrowBack className="text-xl" />
          Back
        </button>

        {/* Hero Section */}
        <div className="text-center mb-14">
          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            {data.length} Expert Teachers
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-gray-900">
            Learn From The Best
          </h1>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto text-lg">
            Connect with experienced instructors and explore high-quality
            courses designed to help you build real-world skills and grow your
            career.
          </p>
        </div>

        {/* Teachers Grid */}
        {data.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No teachers found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((teacher) => (
              <div
                key={teacher._id}
                className="
                  group
                  bg-white/80
                  backdrop-blur-lg
                  border
                  border-gray-100
                  rounded-3xl
                  overflow-hidden
                  shadow-lg
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >
                <div className="p-6">
                  {/* Avatar */}
                  <div className="flex justify-center mb-5">
                    <div className="relative">
                      <img
                        src={teacher.profileImg}
                        alt={teacher.name}
                        className="
                          w-28
                          h-28
                          rounded-full
                          object-cover
                          border-4
                          border-white
                          shadow-lg
                          group-hover:scale-105
                          transition-all
                          duration-300
                        "
                        onError={(e) => {
                          e.target.src =
                            "https://ui-avatars.com/api/?name=Teacher";
                        }}
                      />
                    </div>
                  </div>

                  {/* Teacher Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold capitalize text-gray-800">
                      {teacher.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 capitalize">
                      {teacher.address || "Instructor"}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-5">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="font-bold text-blue-600">
                          {teacher.courses?.length || 0}
                        </p>
                        <p className="text-xs text-gray-500">Courses</p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-3">
                        <p
                          className={`font-bold ${
                            teacher.isVerified
                              ? "text-green-600"
                              : "text-orange-500"
                          }`}
                        >
                          {teacher.isVerified ? "Yes" : "No"}
                        </p>
                        <p className="text-xs text-gray-500">Verified</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/getcoursebyteacher/${teacher._id}`}
                      className="
                        mt-6
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        w-full
                        py-3
                        rounded-xl
                        bg-blue-600
                        text-white
                        font-medium
                        hover:bg-blue-700
                        transition-all
                      "
                    >
                      View Courses
                      <FaArrowRight className="text-sm" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="relative my-20">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>

          <div className="relative flex justify-center">
            <span className="bg-white px-6 text-gray-500 font-medium">
              Continue Learning
            </span>
          </div>
        </div>

        {/* Courses Section */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Recommended Courses
            </h2>

            <p className="text-gray-600 mt-3">
              Explore popular courses chosen for you.
            </p>
          </div>

          <Courses />
        </section>
      </div>
    </div>
  );
}

export default ViewTeachers;
