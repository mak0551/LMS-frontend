import { useEffect, useState } from "react";
import ShowCoursesComponent from "./ShowCoursesComponent";

const WishlistCourses = () => {
  const [wishlist, setWishlist] = useState([]);
  const [courses, setCourses] = useState([]);

  // Fetch wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    // console.log(storedWishlist, 'wishlist');
    setWishlist(storedWishlist);
  }, []);

  // Fetch course details for wishlisted items
  useEffect(() => {
    if (wishlist?.length > 0) {
      fetchCourses();
    } else {
      setCourses([]);
    }
  }, [wishlist]);

  const fetchCourses = async () => {
    try {
      const responses = await Promise.all(
        wishlist?.map((id) =>
          fetch(`https://lms-htvh.onrender.com/course/getbyid/${id}`)
            .then((res) => res.json())
            .catch((err) => console.log(err))
        )
      );
      const extractedCourses = responses
        .map((response) => response.findCourse)
        .filter((course) => course !== null && course !== undefined); // Remove null/undefined courses

      // Update wishlist to remove any course that doesn't exist anymore
      const updatedWishlist = extractedCourses.map((course) => course._id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      setWishlist(updatedWishlist);
      setCourses(extractedCourses);
    } catch (error) {
      console.error("Error fetching wishlisted courses:", error);
    }
  };

  return (
    <div>
      {/* <h2 className="text-2xl font-bold">My Wishlist</h2> */}
      {courses.length > 0 ? (
        <ShowCoursesComponent data={courses} />
      ) : (
        <p className="text-gray-500">No courses in wishlist.</p>
      )}
    </div>
  );
};

export default WishlistCourses;
