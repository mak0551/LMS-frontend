import React from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

function TotalCourses() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <BsChevronCompactRight onClick={() => navigate("/mycourses/*")} />
      {id}
    </div>
  );
}

export default TotalCourses;
