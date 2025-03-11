import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowCoursesComponent from "./ShowCoursesComponent";
import Loader from "./Loader";

function ShowCourses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.get(
        "https://lms-htvh.onrender.com/course/getall"
      );
      setData(response.data);
      setLoading(false);
      // console.log(response.data);
    };
    fetchData();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <ShowCoursesComponent data={data} />
    </div>
  );
}

export default ShowCourses;
