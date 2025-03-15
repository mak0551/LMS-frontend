import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./components/overView/Overview";
import ManageCourses from "./components/manage/ManageCourses";
import { useAuth } from "../../state_management/AuthContext";
import { toast } from "react-toastify";

export default function MyCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      return;
    }
    if (user === false) {
      toast.error("please login to view your learnings");
      navigate("/signin");
    }
  }, [user]);
  return (
    <div className="flex overflow-hidden overflow-x-auto">
      <Sidebar />
      <Routes>
        <Route path="/*" element={<Overview />} />
        <Route path="overview/*" element={<Overview />} />
        <Route path="managecourses" element={<ManageCourses />} />
      </Routes>
    </div>
  );
}
