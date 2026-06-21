import React, { useEffect, useState } from "react";
import ShowCoursesComponent from "./ShowCoursesComponent";
import Loader from "../../commonComponents/Loader";
import { api } from "../../../utils/api";

function ShowCourses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await api.get("/course/getall");
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
