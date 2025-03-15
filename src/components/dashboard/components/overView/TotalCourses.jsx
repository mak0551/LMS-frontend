import React, { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

function TotalCourses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://lms-htvh.onrender.com/course/getbyteacher/${id}`
      );
      const data = await res.json();
      setCourses(data);
    };
    fetchData();
  }, [id]);
  return (
    <div className="hidden-scrollbar p-2 relative max-h-[150vh] overflow-hidden overflow-y-auto">
      <MdArrowBackIos
        onClick={() => navigate("/mycourses")}
        className="sticky left-[-5px] bg-white rounded-full top-5 font-black h-5 w-5"
      />
      <div className="mt-10 flex flex-col gap-2 w-[300px]">
        {courses ? (
          courses.map((courseData, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-2 flex flex-col gap-2 w-full"
            >
              <img
                src={courseData.thumbNail}
                alt={courseData.name}
                className="h-[120px] rounded-md object-cover w-full"
              />
              <div className="flex flex-col w-full">
                <h2 className="capitalize">{courseData?.title}</h2>
                <div className="overflow-hidden">
                  <div className="font-semibold text-xs text-gray-500 truncate flex justify-between">
                    rating "{courseData?.averageRating}"
                    <span>&#8377;{courseData.price}</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    level: "{courseData.level}"
                  </p>
                  <p className="text-xs text-gray-500">
                    Date Updated:{" "}
                    {new Date(courseData.updatedAt).toLocaleDateString()}
                  </p>
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

export default TotalCourses;
