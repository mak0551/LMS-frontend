import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Sidebar() {
  const [show, setShow] = useState(false);
  return (
    <div className="h-screen msd:w-1/5 w-fit bg-zinc-50 text-center p-4">
      <div className="space-y-4 mx-2">
        <div className="mb-12">
          <TbLayoutSidebarLeftExpand
            onClick={() => setShow(!show)}
            className={`${show && "hidden"} text-xl text-zinc-500`}
          />
          <TbLayoutSidebarRightExpand
            onClick={() => setShow(!show)}
            className={`${!show && "hidden"} text-xl text-zinc-500`}
          />
        </div>

        <Link
          to={"/mycourses/overview"}
          className="text-lg w-full flex gap-3 items-center"
        >
          <MdOutlineDashboard className="text-xl my-2" />
          <span className={`${show ? "" : "hidden"}`}>overview</span>
        </Link>
        <Link
          to={"/mycourses/managecourses"}
          className="text-lg w-full flex gap-3 items-center"
        >
          <VscSettings className="text-xl my-2" />
          <span className={`${show ? "" : "hidden"}`}>manage courses</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
