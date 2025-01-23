import React from "react";
import Navbar from "./components/Navbar";
import Landingpage from "./components/Landingpage";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <div>
      <Signup/>
      <Signin/>
      <Navbar />
      <Landingpage />
    </div>
  );
}

export default App;
