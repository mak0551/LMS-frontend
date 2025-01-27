import axios from "axios";
import React, { useEffect, useState } from "react";
import Courses from "./Courses";
import { Link } from "react-router-dom";

function ViewTeachers() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:4040/users/getallteachers"
      );
      setData(response.data);
      console.log(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="mx-40 mt-20 p-2">
      <div className="flex items-center flex-wrap justify-center">
        {data.map((data, index) => (
          <div
            key={data._id}
            className="flex flex-col shrink-0 items-center justify-center gap-8 mx-2 my-6 p-4 rounded-lg bg-zinc-50 border border-zinc-500"
          >
            <img
              src={data.profileImg}
              alt=""
              className="h-60 w-60 rounded-full"
            />{" "}
            <div>
              <h1 className="capitalize text-center font-bold text-xl">
                {data.name}
              </h1>
              <h6 className="capitalize text-center">{data.address}</h6>
              <Link to={`/getcoursebyteacher/${data._id}`}>
                <h6 className="text-center text-sm py-2 underline underline-offset-2 text-pink-900">
                  View Courses
                </h6>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h1 className="capitalize font-semibold text-2xl p-2 pt-1 mt-4 border-t-2 border-zinc-700">
        recommended courses
      </h1>
      <Courses />
    </div>
  );
}

export default ViewTeachers;
