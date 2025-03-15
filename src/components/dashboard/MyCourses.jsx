import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./components/overView/Overview";
import ManageCourses from "./components/manage/ManageCourses";

export default function MyCourses() {
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
