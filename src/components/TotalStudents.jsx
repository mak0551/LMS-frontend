import React, { useEffect, useState } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

function TotalStudents() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://lms-htvh.onrender.com/course/getbyteacher/${id}`
      );
      const data = await res.json();
      setStudent(data);
    };
    fetchData();
  }, [id]);
  return (
    <div className="p-2 relative">
      <BsChevronCompactRight
        onClick={() => navigate("/mycourses")}
        className="absolute left-[-5px] bg-zinc-100 rounded-full top-5"
      />
      <div className="mt-10 flex flex-col gap-2">
        {student ? (
          student.map((courseData, index) => (
            <div key={index} className="space-y-6">
              <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg capitalize font-medium gap-1 items-center flex text-gray-800">
                  {courseData?.title}
                  <span className="text-sm">
                    ( {courseData?.enrolledBy?.length} )
                  </span>
                </h2>

                <h3 className="mb-4"></h3>
                <div className="flex flex-col gap-2">
                  {courseData?.enrolledBy?.map((student) => (
                    <div
                      key={student._id}
                      className="bg-white shadow-md rounded-lg p-2 flex gap-2 items-start"
                    >
                      <img
                        src={student.profileImg}
                        alt={student.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-semibold text-gray-800 truncate">
                          {student.name}
                        </h4>
                        <p className="text-xs text-gray-600 truncate">
                          {student.email}
                        </p>
                        <p className="text-xs text-gray-600">
                          {student.mobileNo}
                        </p>
                        <p className="text-xs text-gray-500">
                          Joined:{" "}
                          {new Date(student.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs capitalize text-gray-500">
                          {student.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default TotalStudents;
