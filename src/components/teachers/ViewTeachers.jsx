import axios from "axios";
import React, { useEffect, useState } from "react";
import Courses from "../home/courses/Courses";
import { Link } from "react-router-dom";
import Loader from "../commonComponents/Loader";

function ViewTeachers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://lms-htvh.onrender.com/users/getallteachers"
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to load teachers");
        console.error("Error fetching teachers:", err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">
            Our Expert Teachers
          </h2>

          {data.length === 0 ? (
            <div className="text-center text-gray-600">No teachers found</div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.map((teacher) => (
                <div
                  key={teacher._id}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-3 sm:p-4">
                    <div className="relative mb-3 sm:mb-4">
                      <div className="aspect-square overflow-hidden rounded-lg">
                        <img
                          src={teacher.profileImg}
                          alt={teacher.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = "/api/placeholder/300/300"; // Fallback image
                            e.target.onerror = null;
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-base sm:text-lg font-semibold mb-1 text-gray-800 capitalize line-clamp-1">
                        {teacher.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 capitalize line-clamp-1">
                        {teacher.address}
                      </p>

                      <Link
                        to={`/getcoursebyteacher/${teacher._id}`}
                        className="inline-flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium group"
                      >
                        <span>View Courses</span>
                        <span className="ml-1 group-hover:ml-2 transition-all duration-200">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-t-2 border-gray-100 pt-8">
            Recommended Courses
          </h2>
          <Courses />
        </div>
      </div>
    </div>
  );
}

export default ViewTeachers;
