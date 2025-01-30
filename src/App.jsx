import React from "react";
import Navbar from "./components/Navbar";
import Landingpage from "./components/Landingpage";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowCourses from "./components/ShowCourses";
import ViewCourse from "./components/ViewCourse";
import Viewvideo from "./components/Viewvideo";
import ViewTeachers from "./components/ViewTeachers";
import Getcoursebyteacher from "./components/Getcoursebyteacher";
import CreateCourse from "./components/CreateCourse";
import { AuthProvider } from "./state_management/AuthContext";

function App() {
  return (
    <div className="bg-green-50 min-h-[100vh]">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/allcourses" element={<ShowCourses />} />
            <Route path="/viewcoursedetails/:id" element={<ViewCourse />} />
            <Route path="/viewvideos/:id/:index" element={<Viewvideo />} />
            <Route path="/viewTeachers" element={<ViewTeachers />} />
            <Route
              path="/getcoursebyteacher/:id"
              element={<Getcoursebyteacher />}
            />
            <Route path="/createcourse" element={<CreateCourse />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
