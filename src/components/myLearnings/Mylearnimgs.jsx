import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnrollmentList from "./EnrollmentList";
import WishlistCourses from "./WishlistCourses";
import { useSearchParams } from "react-router-dom";
import Loader from "../commonComponents/Loader";
import { useAuth } from "../../state_management/AuthContext";
import { api } from "../../utils/api";

export default function Mylearnimgs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "list");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const tab = searchParams.get("tab") || "list";
    setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    const fetchcourses = async () => {
      if (user === null) {
        return;
      }
      // if (user === false) {
      //   toast.error("please login to view your learnings");
      //   navigate("/signin");
      // }
      try {
        setLoading(true);
        const id = user?.user?._id;
        const res = await api.get(`/enrollment/getallforstudent/${id}`);
        setCourses(res.data);
        setLoading(false);
      } catch (err) {
        console.log("error fetching data", err);
        setLoading(false);
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
            onClick={() => setSearchParams({ tab: "list" })}
            className={activeTab === "list" ? "underline" : ""}
          >
            My Lists
          </button>
          <button
            onClick={() => setSearchParams({ tab: "wishlist" })}
            className={activeTab === "wishlist" ? "underline" : ""}
          >
            Wishlist
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto mt-6">
          {activeTab === "list" && user && <EnrollmentList data={courses} />}
          {activeTab === "wishlist" && <WishlistCourses />}
        </div>
      )}
    </div>
  );
}
