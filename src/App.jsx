import React, { useEffect } from "react";
import Navbar from "./components/home/Navbar";
import Landingpage from "./components/home/Landingpage";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowCourses from "./components/home/courses/ShowCourses";
import ViewCourse from "./components/home/courses/ViewCourse";
import Viewvideo from "./components/home/courses/Viewvideo";
import ViewTeachers from "./components/teachers/ViewTeachers";
import Getcoursebyteacher from "./components/teachers/Getcoursebyteacher";
import CreateCourse from "./components/createCourse/CreateCourse";
import { AuthProvider } from "./state_management/AuthContext";
import AddModule from "./components/createCourse/AddModule";
import CloudinaryUploadWidget from "./components/commonComponents/CloudinaryUploadWidget";
import MyCourses from "./components/dashboard/MyCourses";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import Footer from "./components/home/Footer";
import Mylearnimgs from "./components/myLearnings/Mylearnimgs";
import EditCourse from "./components/dashboard/components/manage/components/EditCourse";
import EditModules from "./components/dashboard/components/manage/components/EditModule";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Runs whenever the route changes

  return null;
}

function App() {
  return (
    <div className="bg-white min-h-[100vh]">
      <AuthProvider>
        <Router basename="/">
          <ScrollToTop />
          <Navbar />
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Landingpage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/allcourses" element={<ShowCourses />} />
              <Route path="/viewcoursedetails/:id" element={<ViewCourse />} />
              <Route path="/viewvideos/:id/:index" element={<Viewvideo />} />
              <Route path="/viewTeachers" element={<ViewTeachers />} />
              <Route path="/createcourse" element={<CreateCourse />} />
              <Route path="/addmodule/:id" element={<AddModule />} />
              <Route path="/cloud" element={<CloudinaryUploadWidget />} />
              <Route path="/mycourses/*" element={<MyCourses />} />
              <Route path="/mylearnings" element={<Mylearnimgs />} />
              <Route path="/edit-course/:id" element={<EditCourse />} />
              <Route path="/editmodule/:id" element={<EditModules />} />
              <Route
                path="/getcoursebyteacher/:id"
                element={<Getcoursebyteacher />}
              />
            </Routes>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
}

export default App;
