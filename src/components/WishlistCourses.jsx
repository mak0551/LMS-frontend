import { useEffect, useState } from "react";
import ShowCoursesComponent from "./ShowCoursesComponent";

const WishlistCourses = () => {
  const [wishlist, setWishlist] = useState([]);
  const [courses, setCourses] = useState([]);

  // Fetch wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) ;
    // console.log(storedWishlist, 'wishlist');
    setWishlist(storedWishlist);
  }, []);

  // Fetch course details for wishlisted items
  useEffect(() => {
    if (wishlist.length > 0) {
      fetchCourses();
    }
  }, [wishlist]);

  const fetchCourses = async () => {
    try {
      const responses = await Promise.all(
        wishlist.map((id) =>
          fetch(`http://localhost:4040/course/getbyid/${id}`)
            .then((res) => res.json())
            .catch((err) => console.log(err))
        )
      );
      setCourses(responses);
      // console.log(responses);
    } catch (error) {
      console.error("Error fetching wishlisted courses:", error);
    }
  };

  return (
    <div className="px-4">
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
