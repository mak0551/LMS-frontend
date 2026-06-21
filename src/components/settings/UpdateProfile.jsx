import React, { useEffect, useState } from "react";
import { useAuth } from "../../state_management/AuthContext";
import CloudinaryUploadWidget from "../commonComponents/CloudinaryUploadWidget";
import Loader from "../commonComponents/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";
import { api } from "../../utils/api";

function UpdateProfile() {
  const { user, login, logout } = useAuth();

  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const id = user?.user?._id;

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await api.get(`/users/getbyid/${id}`);
        setUserData(res.data);
        setEditedData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [user, id]);

  const handleProfilePic = (url) => {
    setEditedData((prev) => ({
      ...prev,
      profileImg: url,
    }));
  };

  const handleChange = (e) => {
    setEditedData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/users/update/${id}`, editedData);

      setUserData(res.data);
      setEditedData(res.data);
      setIsEditing(false);

      login({ user: res.data });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
        {isEditing ? (
          <div className="p-6">
            <IoMdArrowBack
              className="text-2xl cursor-pointer text-gray-600 hover:text-black mb-4"
              onClick={() => setIsEditing(false)}
            />

            <div className="flex flex-col items-center mb-6">
              <img
                src={editedData.profileImg}
                alt={editedData.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
              />

              <div className="mt-4 text-center">
                <p className="font-medium text-gray-700 mb-2">
                  Change Profile Picture
                </p>

                <CloudinaryUploadWidget
                  onUploadSuccess={(url) => handleProfilePic(url)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={editedData.name || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="mobileNo"
                  value={editedData.mobileNo || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={editedData.email || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={editedData.address || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleUpdate}
                className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="relative px-8 pt-8 pb-6">
              <IoMdArrowBack
                className="absolute left-4 top-4 text-2xl cursor-pointer text-gray-600 hover:text-black"
                onClick={() => navigate(-1)}
              />

              <div className="flex flex-col items-center">
                <img
                  src={userData.profileImg}
                  alt={userData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                />

                <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                  {userData.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {userData.email}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 px-8 py-5">
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Mobile Number
                  </p>

                  <p className="text-gray-800">
                    {userData.mobileNo || "Not Provided"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                    Address
                  </p>

                  <p className="text-gray-800">
                    {userData.address || "Not Provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 border border-gray-300 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={logout}
                className="flex-1 bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UpdateProfile;