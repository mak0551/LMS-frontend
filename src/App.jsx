import React from "react";
import Navbar from "./components/Navbar";
import Landingpage from "./components/Landingpage";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowCourses from "./components/ShowCourses";
import ViewCourse from "./components/ViewCourse";

function App() {
  return (
    <div className="bg-green-50 ">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/allcourses" element={<ShowCourses />} />
          <Route path="/viewcoursedetails/:id" element={<ViewCourse />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
