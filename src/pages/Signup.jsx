import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = { name, email, mobileNo, address, password };

    try {
      const response = await axios.post(
        "http://localhost:4040/users/register",
        formData
      );
      console.log("User registered successfully:", response.data);
      toast.success("signup successful");
      navigate("/signin");
    } catch (error) {
      console.log(
        "Error during signup:",
        error.response?.data || error.message
      );
      toast.error(`Signup failed. Please try again. ${error.message}`);
    }
  };
  return (
    <div className="flex justify-center gap-24 items-center h-[90vh] w-full bg-green-50 lg:px-10">
      <img
        src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-1-x1.webp"
        className="xl:h-full hidden lg:block lg:h-[350px]"
      />
      <form
        className="flex flex-col gap-8 w-[60vh] border-pink-800 h-fit p-8 rounded-lg "
        onSubmit={handleSignup}
      >
        <h1 className="font-mono text-center sm:text-3xl capitalize text-pink-900">
          Sign up and start learning
        </h1>
        <div className="border-2 h-12 xl:h-12 lg:h-16 flex flex-col p-2 hover:border-pink-800 rounded-md">
          <label className="font-medium text-xs"> Full Name</label>
          <input
            type="text"
            value={name}
            className="appearance-none border-none outline-none focus:ring-0 bg-transparent"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="border-2 h-12 xl:h-12 lg:h-16 flex flex-col p-2 hover:border-pink-800 rounded-md">
          <label className="font-medium text-xs"> Email</label>
          <input
            type="email"
            value={email}
            className="appearance-none border-none outline-none focus:ring-0 bg-transparent"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="border-2 h-12 xl:h-12 lg:h-16 flex flex-col p-2 hover:border-pink-800 rounded-md">
          <label className="font-medium text-xs"> Mobile Number</label>
          <input
            type="text"
            value={mobileNo}
            className="appearance-none border-none outline-none focus:ring-0 bg-transparent"
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>
        <div className="border-2 h-12 xl:h-12 lg:h-16 flex flex-col p-2 hover:border-pink-800 rounded-md">
          <label className="font-medium text-xs"> Address</label>
          <input
            type="text"
            value={address}
            className="appearance-none border-none outline-none focus:ring-0 bg-transparent"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="border-2 h-12 xl:h-12 lg:h-16 flex flex-col p-2 hover:border-pink-800 rounded-md">
          <label className="font-medium text-xs"> Password</label>
          <input
            type="password"
            value={password}
            className="appearance-none border-none outline-none focus:ring-0 bg-transparent "
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-pink-200 h-12 xl:h-12 lg:h-16 font-mono rounded-md hover:bg-pink-100 lg:text-2xl xl:text-lg"
          >
            Sign up
          </button>
          <h6 className="text-sm lg:text-xl xl:text-sm text-center mt-1 font-semibold">
            already have an account?{" "}
            <Link
              to={"/signin"}
              className="text-pink-800 font-mono underline underline-offset-4"
            >
              Sign in
            </Link>
          </h6>
        </div>
      </form>
    </div>
  );
}

export default Signup;
