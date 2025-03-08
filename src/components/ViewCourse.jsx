import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Courses from "./Courses";
import { useAuth } from "../state_management/AuthContext";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

function ViewCourse() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [visibleModule, setVisibleModule] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const user = useAuth();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/course/getbyid/${id}`
        );
        const res = response?.data?.findCourse;
        setData(res);
        console.log(response);
      } catch (err) {
        console.error("Error fetching course data:", err);
      }
    };
    fetchdata();
  }, [id]);

  useEffect(() => {
    if (!user?.user?.user?._id) return;

    const checkEnrollment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4040/enrollment/check?courseId=${id}&studentId=${user?.user?.user?._id}`
        );
        setEnrolled(response.data.isEnrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    };
    checkEnrollment();
  }, [id, user]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const toggleVisibility = (index) => {
    setVisibleModule(visibleModule === index ? null : index);
  };

  const handleEnrollment = async () => {
    try {
      const payload = { courseId: id, studentId: user?.user?.user?._id };
      await axios.post("http://localhost:4040/enrollment/add", payload);
      setEnrolled(true);
      toast.success("Enrolled successfully");
    } catch (err) {
      console.error("Error enrolling:", err);
      toast.error("Failed to enroll. Please try again.");
    }
  };

  const removeEnrollment = async () => {
    try {
      const payload = { courseId: id, studentId: user?.user?.user?._id };
      await axios.delete("http://localhost:4040/enrollment/delete", {
        data: payload, //Correct way to send body in DELETE
      });
      setEnrolled(false);
      toast.success("Enrolled successfully");
    } catch (error) {
      console.error("Error removing enrollment:", error);
      toast.error("Failed to remove enrollment. Please try again.");
    }
  };

  // Add to Wishlist
  const addToWishlist = () => {
    let updatedWishlist = [...wishlist];
    if (!updatedWishlist.includes(id)) {
      updatedWishlist.push(id);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.success("Added to Wishlist");
    }
  };

  // Remove from Wishlist
  const removeFromWishlist = () => {
    let updatedWishlist = wishlist.filter((courseId) => courseId !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Removed from Wishlist");
  };

  return (
    <div className="xl:mx-48 mx-8 mt-20 font-mono p-2 h-full ">
      <div className="flex flex-col sm:flex-row gap-4 items-start md:items-center ">
        <img
          src={`${
            data.thumbNail
              ? data.thumbNail
              : "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }`}
          alt=""
          className="h-[200px] w-[300px] md:h-[200px] md:w-[300px] rounded-md object-cover hover:scale-105 transition-transform duration-300 sm:w-1/2"
        />
        <div className="md:m-4 flex flex-col gap-2">
          <h1 className="font-mono xl:text-4xl md:text-5xl capitalize">
            {data.title}
          </h1>
          <p className="text-zinc-500 my-2 xl:text-base md:text-3xl">
            {data.description}
          </p>
          <span className="capitalize md:text-2xl xl:text-lg">
            instructor - {data.teacher?.name}
          </span>
          <span className="xl:text-sm md:text-xl">
            <b>Date Created:</b> {data.createdAt?.slice(0, 10)}
          </span>
          <span className="xl:text-sm md:text-xl">
            <b>Last Updated:</b> {data.updatedAt?.slice(0, 10)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:mx-4 ">
        <span className="mt-4 md:text-2xl xl:text-lg">
          <b>Course Duration:</b>{" "}
          {`${
            data.duration?.hours > 1
              ? `${data.duration?.hours} hours`
              : `${data.duration?.hours} hour`
          } ${data.duration?.minutes} minutes`}
        </span>
        <div className="flex flex-col gap-4 md:text-2xl xl:text-base">
          <span>
            <b>Difficulty Level:</b>{" "}
            <span
              className={`${
                data.level === "Advance" ? "bg-red-300" : "bg-green-300"
              } ${
                data.level === "Intermediate" && "bg-yellow-200"
              } w-fit p-2 rounded-md text-zinc-800 `}
            >
              {data.level}
            </span>
          </span>
          <div>
            <b>Required Skills:{" ["}</b>
            {data.skillsRequired?.map((data, index) => (
              <span key={index} className="capitalize">
                {" "}
                {data}{" "}
              </span>
            ))}
            {"]"}
          </div>
          <div>
            <b>Enrollment Fee:</b> &#8377;{data.price}
          </div>
        </div>
        <div className="p-6 xl:mr-40 md:mx-auto xl:w-[80%] md:w-full bg-zinc-50 rounded-md">
          <h1 className="font-mono font-semibold xl:text-lg md:text-2xl">
            Course content
          </h1>
          <div className="max-h-[70vh] overflow-auto scrollbar-hide">
            {data.module?.map((data, index) => (
              <div className="my-4 bg-zinc-100 rounded-md" key={index}>
                <div
                  className="w-full bg-zinc-100 border-2 border-zinc-300 rounded-md items-center justify-between flex py-4 p-6"
                  onClick={() => toggleVisibility(index)}
                >
                  <span className="font-bold xl:text-lg md:text-2xl">
                    {data?.title}
                  </span>{" "}
                  <IoIosArrowDown
                    className={`transition-transform ${
                      visibleModule === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {visibleModule === index && (
                  <div className="p-2 flex flex-col gap-2">
                    {data?.content?.map((contentdata, index) => (
                      // console.log(data, "sdhafkjhfjk")
                      <div
                        className="flex gap-8 items-center px-2 hover:bg-zinc-200 rounded-md "
                        key={index}
                      >
                        <Link
                          to={`/viewvideos/${data._id}/${index}`}
                          key={data._id}
                        >
                          <video
                            width="200"
                            height="200"
                            onMouseEnter={(e) => e.target.play()}
                            onMouseLeave={(e) => e.target.pause()}
                            muted
                            key={index}
                            className="rounded-md "
                          >
                            <source src={contentdata.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </Link>
                        <div className="h-full w-full flex justify-between">
                          <h1 className="capitalize font-bold md:text-lg xl:text-base truncate sm:w-auto w-full sm:ml-8">
                            {contentdata.title}
                          </h1>
                          <p className="capitalize md:block hidden text-zinc-600 truncate ">
                            {contentdata.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {enrolled ? (
          <button
            onClick={removeEnrollment}
            className="px-3 py-1 xl:mr-40 md:mx-auto xl:w-[80%] w-full bg-white text-pink-500 border-pink-600 border-2 rounded-md hover:bg-zinc-100 md:text-2xl xl:text-lg"
          >
            Remove Enrollment
          </button>
        ) : (
          <button
            onClick={handleEnrollment}
            className="px-3 py-1 xl:mr-40 md:mx-auto xl:w-[80%] w-full bg-white text-pink-500 border-pink-600 border-2 rounded-md hover:bg-zinc-100 md:text-2xl xl:text-lg"
          >
            Enroll Now
          </button>
        )}
        {wishlist.includes(id) ? (
          <button
            onClick={removeFromWishlist}
            className="px-3 py-1 xl:mr-40 md:mx-auto xl:w-[80%] w-full text-white bg-pink-600 border-red-600 border-2 rounded-md hover:bg-pink-500 xl:text-lg md:text-2xl"
          >
            Remove from Wishlist
          </button>
        ) : (
          <button
            onClick={addToWishlist}
            className="px-3 py-1 xl:mr-40 md:mx-auto xl:w-[80%] w-full text-white bg-pink-600 border-pink-600 border-2 rounded-md hover:bg-pink-500 xl:text-lg md:text-2xl"
          >
            Add to Wishlist
          </button>
        )}
      </div>
      {/* {mount && ( */}
      <>
        <h1 className="capitalize mt-8 underline underline-offset-2 md:text-2xl text-sm">
          other courses you might be interested in
        </h1>
        <Courses />
      </>
      {/* )} */}
    </div>
  );
}

export default ViewCourse;
