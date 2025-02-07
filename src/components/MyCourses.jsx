import React, { useEffect, useState } from "react";
import { useAuth } from "../state_management/AuthContext";
import axios from "axios";
import ShowCoursesComponent from "./ShowCoursesComponent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyCourses() {
  const { user } = useAuth();
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      if (!user) {
        toast.error("please login to view your courses");
        navigate("/signin");
        // ❌
      }
      try {
        const id = user?.user?._id;
        const res = await axios.get(
          `http://localhost:4040/course/getbyteacher/${id}`
        );
        setCourse(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchdata();
  }, [user]);
  return <div>{user && <ShowCoursesComponent data={course} />}</div>;
}
