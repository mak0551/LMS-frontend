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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = { name, email, mobileNo, address, password };

    try {
      setLoading(true);
      if (email.length < 1 || password.length < 1) {
        toast.error("email and password required");
        setLoading(false);
        return;
      }
      const response = await axios.post(
        "https://lms-htvh.onrender.com/users/register",
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
    <div className="flex justify-center gap-24 items-center h-[90vh] w-full bg-white lg:px-10">
      <img
        src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-1-x1.webp"
        className="xl:h-full hidden lg:block lg:h-[350px]"
      />
      <form
        className="flex flex-col gap-8 w-[60vh] h-fit p-8 rounded-lg "
        onSubmit={handleSignup}
      >
        <h1 className="font-mono text-center sm:text-3xl capitalize text-black font-semibold">
          Sign up and start learning
        </h1>
        <div className="border-2 h-12 xl:h-12 lg:h-16 flex flex-col p-2 hover:border-black rounded-md">
          <label className="font-medium text-xs"> Full Name</label>
          <input
            type="text"
            value={name}
            className="appearance-none border-none outline-none focus:ring-0 bg-transparent"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="border-2 h-12 xl:h-12 lg:h-16 flex flex-col p-2 hover:border-black rounded-md">
          <label className="font-medium text-xs"> Email</label>
          <input
            type="email"
            value={email}
            className="appearance-none border-none outline-none focus:ring-0 bg-transparent"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="border-2 h-12 xl:h-12 lg:h-16 flex flex-col p-2 hover:border-black rounded-md">
          <label className="font-medium text-xs"> Mobile Number</label>
          <input
            type="text"
            value={mobileNo}
            className="appearance-none border-none outline-none focus:ring-0 bg-transparent"
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>
        <div className="border-2 h-12 xl:h-12 lg:h-16 flex flex-col p-2 hover:border-black rounded-md">
          <label className="font-medium text-xs"> Address</label>
          <input
            type="text"
            value={address}
            className="appearance-none border-none outline-none focus:ring-0 bg-transparent"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="border-2 h-12 xl:h-12 lg:h-16 flex flex-col p-2 hover:border-black rounded-md">
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
            className="w-full bg-black text-white h-12 xl:h-12 lg:h-16 font-mono rounded-md hover:bg-zinc-700 lg:text-2xl xl:text-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center h-fit bg-black">
                <div className="w-6 h-6 border-4 border-white border-t-black rounded-full animate-spin"></div>
              </div>
            ) : (
              "Sign up"
            )}
          </button>
          <h6 className="text-sm lg:text-xl xl:text-sm text-center mt-1 font-semibold">
            already have an account?{" "}
            <Link
              to={"/signin"}
              className="text-red-600 font-mono underline underline-offset-4"
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
