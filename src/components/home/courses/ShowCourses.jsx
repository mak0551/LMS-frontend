import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowCoursesComponent from "./ShowCoursesComponent";
import Loader from "../../commonComponents/Loader";

function ShowCourses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4040/course/getall",
        { withCredentials: true },
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        console.log("error fetching data", err);
        setLoading(false);
      }
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
