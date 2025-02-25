import React, { useEffect, useState } from "react";
import { useAuth } from "../state_management/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EnrollmentList from "./EnrollmentList";

export default function Mylearnimgs() {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchcourses = async () => {
      if (!user) {
        toast.error("please login to view your learnings");
        navigate("/signin");
      }
      try {
        const id = user?.user?._id;
        const res = await axios.get(
          `http://localhost:4040/enrollment/getenrolled-courses/${id}`
        );
        setCourses(res.data);
        console.log(res.data, id);
      } catch (err) {
        console.log("error fetching data", err);
      }
    };
    fetchcourses();
  }, [user]);
  return <div>{user && <EnrollmentList data={courses} />}</div>;
}
