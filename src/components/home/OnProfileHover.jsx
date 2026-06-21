import { useEffect, useState } from "react";
import { useAuth } from "../../state_management/AuthContext";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

function OnProfileHover() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  useEffect(() => {
    // if (user === null) {
    //   return;
    // }
    // if (user === false) {
    //   navigate("/signin");
    // }

    const fetchData = async () => {
      try {
        const res = await api.get(`/users/getbyid/${user?.user?._id}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="w-[250px] bg-white py-1 px-4 border-2 rounded">
      <div className="border-b-2">
        {userData && (
          <div className="flex gap-4 items-center">
            <img
              src={userData?.profileImg}
              alt="error loading image"
              className="w-[70px] h-[70px] max-h-20 rounded-full shadow-lg my-4 object-cover transition-transform hover:scale-105"
            />
            <div className="overflow-hidden">
              <h2 className="text-sm font-normal- capitalize">
                {userData?.name}
              </h2>
              <h1 className="text-xs truncate font-thin">{userData?.email}</h1>
            </div>
          </div>
        )}
      </div>
      <div className="py-4">
        <ul className="text-sm font-thin flex flex-col gap-4">
          <li
            onClick={() => navigate("/mylearnings")}
            className="cursor-pointer"
          >
            My learning
          </li>
          <li
            // onClick={() => navigate("/mycart")}
            className="cursor-pointer"
          >
            My cart
          </li>
          <li
            onClick={() => navigate("/mylearnings")}
            className="cursor-pointer"
          >
            Wishlist
          </li>
          <li
            onClick={() => navigate("/startteaching-langingpage")}
            className="cursor-pointer"
          >
            Start teaching
          </li>
          <li
            onClick={() => navigate("/updateprofile")}
            className="cursor-pointer"
          >
            Edit profile
          </li>
          <li className="border-t-2 pt-2">Help and Support</li>
          <li onClick={() => logout()} className="cursor-pointer">
            Log out
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OnProfileHover;
