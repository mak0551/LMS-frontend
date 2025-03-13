import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Sidebar() {
  const [show, setShow] = useState(false);
  return (
    <div className="h-screen w-fit bg-white p-4">
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
          className="text-lg w-full flex gap-2 items-center justify-center"
        >
          <LuLayoutDashboard className="text-xl my-2" />
          <span
            className={`${
              show ? "" : "hidden"
            } text-sm sm:text-base w-[100px] h-[30px] flex items-center justify-start lg:mx-4`}
          >
            Overview
          </span>
        </Link>

        <Link
          to={"/mycourses/managecourses"}
          className="text-lg w-full flex gap-2 items-center justify-center"
        >
          <VscSettings className="text-xl my-2" />
          <span
            className={`${
              show ? "" : "hidden"
            } text-sm sm:text-base w-[100px] h-[30px] flex items-center justify-start lg:mx-4`}
          >
            Manage
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
