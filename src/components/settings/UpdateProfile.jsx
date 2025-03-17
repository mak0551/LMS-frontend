import React, { useEffect, useState } from "react";
import { useAuth } from "../../state_management/AuthContext";
import CloudinaryUploadWidget from "../commonComponents/CloudinaryUploadWidget";
import Loader from "../commonComponents/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BsSkipBackwardBtn } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";

function UpdateProfile() {
  const { user, login, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();
  const id = user?.user?._id;

  useEffect(() => {
    if (user === null) {
      return;
    }
    if (user === false) {
      navigate("/signin");
    }
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://lms-htvh.onrender.com/users/getbyid/${id}`
        );
        const data = await res.json();
        setUserData(data);
        setEditedData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [user]);

  const handleProfilePic = (e) => {
    setEditedData({ ...editedData, profileImg: e });
  };

  const handleChange = (e) => {
    setEditedData({
      ...userData,
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `https://lms-htvh.onrender.com/users/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedData),
        }
      );
      const updatedUser = await res.json();
      setUserData(updatedUser);
      setIsEditing(false);
      login({ user: updatedUser }); // updating the new updated user details in the state
      toast.success(" updated successfully");
    } catch (error) {
      toast("error updating user");
      console.error("Error updating user data:", error);
    }
  };

  if (!userData)
    return (
      <div className="text-center text-gray-500 mt-5">
        <Loader />
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-zinc-50 shadow-xl rounded-xl p-2 w-96 transform transition-all hover:shadow-2xl relative">
        {isEditing ? (
          <div className="px-6 gap-2 flex flex-col justify-center text-sm sm:text-base">
            <button>
              <IoMdArrowBack
                className="absolute left-2 text-xl top-2"
                onClick={() => setIsEditing(false)}
              />
            </button>
            <div className="flex items-center">
              <img
                src={editedData.profileImg}
                alt={userData.name}
                className="w-28 h-28 rounded-full shadow-lg mb-4 border-4 border-gray-200 object-cover transition-transform hover:scale-105"
              />
              <div className="flex flex-col justify-center items-center w-full gap-2">
                Change Profile
                <CloudinaryUploadWidget
                  onUploadSuccess={(url) => {
                    handleProfilePic(url);
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <label>name</label>
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleChange}
                className="border-2 border-gray-200 rounded-lg text-center w-full max-w-[200px]"
              />
            </div>
            <div className="flex gap-2">
              <label>mobile</label>
              <input
                type="text"
                name="mobileNo"
                value={editedData.mobileNo}
                onChange={handleChange}
                className="border-2 border-gray-200 rounded-lg text-center w-full max-w-[200px]"
              />
            </div>
            <div className="flex gap-2">
              <label>email</label>
              <input
                type="text"
                name="email"
                value={editedData.email}
                onChange={handleChange}
                className="border-2 border-gray-200 rounded-lg text-center w-full max-w-[250px] px-2"
              />
            </div>
            <div className="flex gap-2">
              <label>address</label>
              <input
                type="text"
                name="address"
                value={editedData.address}
                onChange={handleChange}
                className="border-2 border-gray-200 rounded-lg text-center w-full max-w-[200px]"
              />
            </div>
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-5 py-2 w-full mt-4 mx-auto rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out"
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center space-y-4 relative px-6">
              <button>
                <IoMdArrowBack
                  className="absolute left-2 text-xl top-2"
                  onClick={() => navigate(-1)}
                />
              </button>

              <img
                src={userData.profileImg}
                alt={userData.name}
                className="w-28 h-28 rounded-full shadow-lg mb-4 border-4 border-gray-200 object-cover transition-transform hover:scale-105"
              />
              <div className="pl-4 space-y-1">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-800 tracking-wide">
                    {userData.name}
                  </p>
                  <span className="text-sm text-zinc-700">
                    {userData.mobileNo}
                  </span>
                  <p className="text-sm text-zinc-700">{userData.email}</p>
                  <span className="text-sm text-zinc-700 capitalize">
                    {userData.address}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-2">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white w-1/3 text-black px-6 py-1 border border-black rounded-lg hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 ease-in-out"
              >
                Edit
              </button>
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-rose-600 w-1/3 text-white px-6 py-1 rounded-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all duration-300 ease-in-out"
                >
                  Logout
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UpdateProfile;
