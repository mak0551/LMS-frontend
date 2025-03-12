import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Courses from "./Courses";
import { useAuth } from "../state_management/AuthContext";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";
import StarRating from "./StarRating";
import { MdSort } from "react-icons/md";

function ViewCourse() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [visibleModule, setVisibleModule] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [sort, setsort] = useState(false);
  const [sortBy, setSortBy] = useState("date"); // Default sort by date
  const user = useAuth();

  // Fetch course data
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://lms-htvh.onrender.com/course/getbyid/${id}`
        );
        const res = response?.data?.findCourse;
        res.rating = response?.data?.rating;
        setData(res);
      } catch (err) {
        console.error("Error fetching course data:", err);
      }
    };
    fetchdata();
  }, [id, newReview]);

  // Check enrollment status
  useEffect(() => {
    if (!user?.user?.user?._id) return;
    const checkEnrollment = async () => {
      try {
        const response = await axios.get(
          `https://lms-htvh.onrender.com/enrollment/check?courseId=${id}&studentId=${user?.user?.user?._id}`
        );
        setEnrolled(response.data.isEnrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    };
    checkEnrollment();
  }, [id, user]);

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://lms-htvh.onrender.com/review/getbycourse/${id}`
        );
        setReviews(response.data || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [id]);

  const toggleVisibility = (index) => {
    setVisibleModule(visibleModule === index ? null : index);
  };

  const handleEnrollment = async () => {
    try {
      const payload = { courseId: id, studentId: user?.user?.user?._id };
      await axios.post("https://lms-htvh.onrender.com/enrollment/add", payload);
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
      await axios.delete("https://lms-htvh.onrender.com/enrollment/delete", {
        data: payload,
      });
      setEnrolled(false);
      toast.success("Enrollment removed successfully");
    } catch (error) {
      console.error("Error removing enrollment:", error);
      toast.error("Failed to remove enrollment. Please try again.");
    }
  };

  const addToWishlist = () => {
    let updatedWishlist = [...wishlist];
    if (!updatedWishlist.includes(id)) {
      updatedWishlist.push(id);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.success("Added to Wishlist");
    }
  };

  const removeFromWishlist = () => {
    let updatedWishlist = wishlist.filter((courseId) => courseId !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Removed from Wishlist");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user?.user?.user?._id) {
      toast.error("Please log in to submit a review.");
      return;
    }
    if (!newReview || rating === 0) {
      toast.error("Please provide a review and rating.");
      return;
    }

    try {
      const payload = {
        courseId: id,
        userId: user?.user?.user?._id,
        rating,
        comment: newReview,
      };
      const response = await axios.post(
        "https://lms-htvh.onrender.com/review/create",
        payload
      );
      setReviews([...reviews, response.data.review]);
      setNewReview("");
      setRating(0);
      toast.success("Review submitted successfully");
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  // Sort reviews based on sortBy state
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating; // Highest rating first
    } else if (sortBy === "date") {
      return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
    }
    return 0;
  });

  return (
    <div className="xl:mx-48 mx-8 mt-20 font-mono p-2 h-full text-black">
      {/* Existing course details */}
      <div className="flex flex-col sm:flex-row gap-4 items-start md:items-center ">
        <img
          src={
            data.thumbNail
              ? data.thumbNail
              : "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt=""
          className="h-[200px] w-[300px] md:h-[200px] lg:w-[350px] rounded-md object-cover hover:scale-105 transition-transform duration-300 sm:w-1/2"
        />
        <div className="md:m-4 flex flex-col gap-2">
          <h1 className="font-mono xl:text-4xl md:text-2xl font-bold capitalize">
            {data.title}
          </h1>
          <p className="text-zinc-500 xl:text-base ">
            {data.description}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-pink-900">{data?.rating}</span>
            <div className="pb-[2px]">
              <StarRating rating={data?.rating} />
            </div>
          </div>
          <span className="capitalize font-semibold xl:text-lg">
            instructor - {data.teacher?.name}
          </span>
          <span className="xl:text-sm ">
            <b>Date Created:</b> {data.createdAt?.slice(0, 10)}
          </span>
          <span className="xl:text-sm ">
            <b>Last Updated:</b> {data.updatedAt?.slice(0, 10)}
          </span>
        </div>
      </div>

      {/* Course metadata */}
      <div className="flex flex-col gap-4 md:mx-4">
        <span className="mt-4 md:text-base xl:text-lg">
          <b>Course Duration:</b>{" "}
          {`${
            data.duration?.hours > 1
              ? `${data.duration?.hours} hours`
              : `${data.duration?.hours} hour`
          } ${data.duration?.minutes} minutes`}
        </span>
        <div className="flex flex-col gap-4 md:text-base xl:text-base">
          <span>
            <b>Difficulty Level:</b>{" "}
            <span
              className={`${
                data.level === "Advance" ? "bg-red-300" : "bg-green-300"
              } ${
                data.level === "Intermediate" && "bg-yellow-200"
              } w-fit p-2 rounded-md text-zinc-800`}
            >
              {data.level}
            </span>
          </span>
          <div>
            <b>Required Skills: [</b>
            {data.skillsRequired?.map((skill, index) => (
              <span key={index} className="capitalize">
                {" "}
                {skill}{" "}
              </span>
            ))}
            ]
          </div>
          <div>
            <b>Enrollment Fee:</b> ₹{data.price}
          </div>
        </div>

        {/* Course content */}
        <div className="p-6 xl:mr-40 md:mx-auto xl:w-[80%] md:w-full bg-zinc-50 rounded-md">
          <h1 className="font-mono font-semibold xl:text-lg md:text-xl">
            Course content
          </h1>
          <div className="max-h-[70vh] overflow-auto scrollbar-hide">
            {data.module?.map((data, index) => (
              <div className="my-4 bg-zinc-100 rounded-md" key={index}>
                <div
                  className="w-full bg-zinc-100 border-2 border-zinc-300 rounded-md items-center justify-between flex py-4 p-6"
                  onClick={() => toggleVisibility(index)}
                >
                  <span className="font-bold xl:text-lg md:text-base">
                    {data?.title}
                  </span>
                  <IoIosArrowDown
                    className={`transition-transform ${
                      visibleModule === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {visibleModule === index && (
                  <div className="p-2 flex flex-col gap-2 ">
                    {data?.content?.map((contentdata, index) => (
                      <div
                        className="flex gap-8 items-center px-2 hover:bg-zinc-200 rounded-md "
                        key={index}
                      >
                        <Link
                          to={`/viewvideos/${data._id}/${index}`}
                          key={data._id}
                          className=""
                        >
                          <video
                            width="200"
                            height="200"
                            onMouseEnter={(e) => e.target.play()}
                            onMouseLeave={(e) => e.target.pause()}
                            muted
                            className="rounded-md"
                          >
                            <source src={contentdata.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </Link>
                        <div className="h-full max-w-[100px] sm:max-w-full text-xs sm:text-base overflow-hidden w-full flex justify-between ">
                          <h1 className="capitalize font-bold md:text-lg xl:text-base truncate sm:w-auto w-full sm:ml-8">
                            {contentdata.title}
                          </h1>
                          <p className="capitalize md:block hidden text-zinc-600 truncate">
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

        {/* Enrollment and Wishlist Buttons */}
        {enrolled ? (
          <button
            onClick={removeEnrollment}
            className="px-3 py-1 xl:mr-40 md:mx-auto xl:w-[80%] w-full bg-white text-black border-black border-2 rounded-md hover:bg-zinc-50 md:text-base xl:text-lg"
          >
            Remove Enrollment
          </button>
        ) : (
          <button
            onClick={handleEnrollment}
            className="px-3 py-1 xl:mr-40 md:mx-auto xl:w-[80%] w-full bg-white text-black border-black border-2 rounded-md hover:bg-zinc-50 md:text-base xl:text-lg"
          >
            Enroll Now
          </button>
        )}
        {wishlist.includes(id) ? (
          <button
            onClick={removeFromWishlist}
            className="px-3 py-1 xl:mr-40 md:mx-auto xl:w-[80%] w-full text-white bg-black border-black border-2 rounded-md hover:bg-zinc-700 xl:text-lg md:text-base"
          >
            Remove from Wishlist
          </button>
        ) : (
          <button
            onClick={addToWishlist}
            className="px-3 py-1 xl:mr-40 md:mx-auto xl:w-[80%] w-full text-white bg-black border-black border-2 rounded-md hover:bg-zinc-700 xl:text-lg md:text-base"
          >
            Add to Wishlist
          </button>
        )}

        {/* Review Section */}
        <div className="mt-8 xl:mr-40 md:mx-auto xl:w-[80%] w-full">
          <h1 className="font-mono font-semibold xl:text-lg md:text-2xl mb-4">
            Reviews
          </h1>
          {/* Review Form */}
          {/* {enrolled ? ( */}
          <form
            onSubmit={handleReviewSubmit}
            className="mb-6 bg-zinc-50 p-4 rounded-md"
          >
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-2 border border-zinc-300 rounded-md mb-2"
              rows="4"
            />
            <div className="flex items-center mb-2">
              <label className="mr-2">Rating:</label>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              type="submit"
              className="px-3 py-1 bg-white text-black rounded-md hover:bg-zinc-50 border-2 border-black"
            >
              Submit Review
            </button>
          </form>
          {/* ) : <div>please enroll to add review</div>} */}
          <div className="font-bold text-xl p-2 flex gap-8 items-center">
            <h1>{reviews.length} Reviews</h1>
            <div
              className="flex items-center gap-1"
              onMouseEnter={() => setsort(true)}
              onMouseLeave={() => setsort(false)}
            >
              <MdSort className="text-2xl" />
              <span className="font-medium text-base">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`border border-zinc-50 rounded-md px-1 ${
                  sort ? "" : "hidden"
                }`}
              >
                <option value="date">Newest First</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>
          {/* Display Sorted Reviews */}
          <div className="space-y-4 max-h-[600px] overflow-auto">
            {sortedReviews.length > 0 ? (
              sortedReviews.map((review, index) => (
                <div key={index} className="bg-zinc-100 p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">
                      {review.userId?.name || user.user?.user?.name}
                    </span>
                    <span className="text-yellow-400">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p className="text-zinc-600 mt-2">{review.comment}</p>
                  <span className="text-sm text-zinc-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-zinc-500">
                No reviews yet. Be the first to leave one!
              </p>
            )}
          </div>
        </div>

        {/* Other Courses */}
        <h1 className="capitalize mt-8 underline underline-offset-2 md:text-2xl text-sm">
          other courses you might be interested in
        </h1>
        <Courses />
      </div>
    </div>
  );
}

export default ViewCourse;
