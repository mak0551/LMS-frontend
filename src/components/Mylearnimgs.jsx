import React, { useEffect, useState } from "react";
import { useAuth } from "../state_management/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EnrollmentList from "./EnrollmentList";

export default function Mylearnimgs() {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchcourses = async () => {
      if (!user) {
        // toast.error("please login to view your learnings");
        // navigate("/signin");
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
  return (
    <div>
      <div className="bg-zinc-700 md:h-44 w-full p-2 relative">
        <h1 className="sm:ml-24 ml-4 sm:mt-16 my-16 text-4xl text-white font-semibold">
          My Learnings
        </h1>
        <div className="text-zinc-100 font-bold flex gap-4 absolute bottom-2 sm:ml-24 ml-4">
          <Link>My Lists</Link>
          <Link> Wishlist</Link>
        </div>
      </div>
      <div>{user && <EnrollmentList data={courses} />}</div>
    </div>
  );
}
