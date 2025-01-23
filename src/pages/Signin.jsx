import React, { useState } from "react";

function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSignin = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form
        className="flex flex-col gap-8 w-[60vh]  border-pink-800 h-fit p-8 rounded-lg "
        onSubmit={handleSignin}
      >
        <h1 className="font-mono text-center text-2xl capitalize text-pink-900">
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
        <button
          type="submit"
          className="w-full bg-pink-200 h-12 font-mono rounded-md hover:bg-pink-100"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signin;
