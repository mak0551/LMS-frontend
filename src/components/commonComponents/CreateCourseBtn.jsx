import React from "react";
import { RiAddLargeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function CreateCourseBtn() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 lg:ml-14">
      <button
        onClick={() => navigate("/createcourse")}
        className="w-full flex items-center md:justify-center gap-2 py-2 md:px-4 rounded-lg hover:scale-105 transition-transform font-medium"
      >
        <RiAddLargeLine />
        Create New Course
      </button>
    </div>
  );
}

export default CreateCourseBtn;
