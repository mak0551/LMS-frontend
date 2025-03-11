import React, { useEffect, useState } from "react";
import { useAuth } from "../state_management/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EnrollmentList from "./EnrollmentList";
import WishlistCourses from "./WishlistCourses";

export default function Mylearnimgs() {
  const [courses, setCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("list"); // "list" or "wishlist"
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchcourses = async () => {
      if (user === null) {
        return;
      }
      if (user === false) {
        toast.error("please login to view your learnings");
        navigate("/signin");
      }
      try {
        const id = user?.user?._id;
        const res = await axios.get(
          `https://lms-htvh.onrender.com/enrollment/getenrolled-courses/${id}`
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
      <div className="bg-black md:h-44 w-full p-2 relative">
        <h1 className="sm:ml-24 ml-4 sm:mt-16 my-16 text-4xl text-white font-semibold">
          My Learnings
        </h1>
        <div className="text-zinc-100 font-bold flex gap-4 absolute bottom-2 sm:ml-24 ml-4">
          <button
            onClick={() => setActiveTab("list")}
            className={activeTab === "list" ? "underline" : ""}
          >
            My Lists
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={activeTab === "wishlist" ? "underline" : ""}
          >
            Wishlist
          </button>
        </div>
      </div>
      <div className="container mx-auto mt-6">
        {activeTab === "list" && user && <EnrollmentList data={courses} />}
        {activeTab === "wishlist" && <WishlistCourses />}
      </div>
    </div>
  );
}
