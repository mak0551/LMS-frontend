import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../state_management/AuthContext";
import { toast } from "react-toastify";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Get login function
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    const formdata = { email, password };

    try {
      const loginResponse = await axios.post(
        "http://localhost:4040/users/login",
        formdata
      );
      if (loginResponse) {
        login(loginResponse.data); // Save user to Context and localStorage
        navigate("/");
      } else {
        // alert(loginResponse.message);
        toast.error(loginResponse.message);
      }
      toast.success("login successful");
      console.log("login successful", loginResponse.data);
      // localStorage.setItem("user", JSON.stringify(loginResponse.data)); // storing the user data in the localstorage
      // alert("signin success");
    } catch (err) {
      if (err.code === "ERR_BAD_REQUEST") {
        toast.error("email or password is incorrect");
      }
      console.log("unable to login user", err);
    }
  };
  return (
    <div className="flex justify-center gap-24 items-center h-[90vh] w-full bg-green-50 lg:px-10">
      <img
        src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-2-x1.webp"
        className="xl:h-full hidden lg:block lg:h-[350px]"
      />
      <form
        className="flex flex-col gap-8 sm:max-w-[60vh] border-pink-800 h-fit p-8 rounded-lg "
        onSubmit={handleSignin}
      >
        <h1 className="font-mono text-center text-xl sm:text-2xl lg:4xl capitalize text-pink-900">
          Sign in and start learning
        </h1>

        <div className="border-2 h-12 flex flex-col p-2 hover:border-pink-800 rounded-md">
          <label className="font-medium text-xs"> Email</label>
          <input
            type="email"
            value={email}
            className="appearance-none border-none outline-none focus:ring-0 bg-transparent"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="border-2 h-12 flex flex-col p-2 hover:border-pink-800 rounded-md">
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
            className="w-full bg-pink-200 h-12 lg:text-base text-lg font-mono rounded-md hover:bg-pink-100"
          >
            Sign in
          </button>
          <h6 className="lg:text-sm text-center mt-1 font-semibold">
            don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-pink-800 font-mono underline underline-offset-4"
            >
              Sign up
            </Link>
          </h6>
        </div>
      </form>
    </div>
  );
}

export default Signin;
