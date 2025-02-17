import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Mylearnimgs() {
  const [courses, setCourses] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchcourses = async () => {
      const res = await axios.get(
        `http://localhost:4040/enrollment/getenrolled-courses/${id}`
      );
      console.log(res.data);
      setCourses(res.data);
    };
    fetchcourses;
  }, [id]);
  return <div>hello</div>;
}

export default Mylearnimgs;
