import React, { useEffect, useState } from "react";
import { useAuth } from "../../state_management/AuthContext";
import CloudinaryUploadWidget from "../commonComponents/CloudinaryUploadWidget";
import Loader from "../commonComponents/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        User Profile
      </h2>
      <div className="flex flex-col items-center">
        {isEditing ? (
          <>
            <img
              src={userData.profileImg}
              alt={userData.name}
              className="w-24 h-24 rounded-full shadow-md mb-4 border-2 border-gray-300"
            />
            <CloudinaryUploadWidget
              onUploadSuccess={(url, fileName) => {
                handleProfilePic(url);
              }}
            />
          </>
        ) : (
          <img
            src={userData.profileImg}
            alt={userData.name}
            className="w-24 h-24 rounded-full shadow-md mb-4 border-2 border-gray-300"
          />
        )}
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded p-1 text-center"
          />
        ) : (
          <p className="text-lg font-medium text-gray-700">{userData.name}</p>
        )}
        <p className="text-sm text-gray-500">{userData.email}</p>
      </div>
      <div className="mt-5">
        <p className="text-gray-600">
          <strong>Mobile No:</strong> {userData.mobileNo}
        </p>
        <p className="text-gray-600">
          <strong>Address:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={editedData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded p-1"
            />
          ) : (
            userData.address
          )}
        </p>

        <p className="text-gray-600">
          <strong>Joined</strong>{" "}
          {new Date(userData.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-4 text-center">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Edit
          </button>
        )}
        {user && (
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="px-4 py-1 text-white bg-red-500 border-2 border-red-600 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default UpdateProfile;
