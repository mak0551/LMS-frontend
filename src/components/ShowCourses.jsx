import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowCoursesComponent from "./ShowCoursesComponent";

function ShowCourses() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4040/course/getall");
      setData(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <ShowCoursesComponent data={data} />
    </div>
  );
}

export default ShowCourses;
