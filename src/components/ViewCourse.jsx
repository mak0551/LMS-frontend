import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Courses from "./Courses";
import { IoIosArrowDown } from "react-icons/io";

function ViewCourse() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [mount, setMount] = useState(false);
  const [visibleModule, setVisibleModule] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(
        `http://localhost:4040/course/getbyid/${id}`
      );
      setData(response.data);
      console.log(response.data);
      // console.log(response.data.module[0].content[0].url, "fsdfdsfjasdj");
    };
    fetchdata();
  }, [id]);
  setTimeout(() => {
    setMount(true);
  }, 2000);

  const toggleVisibility = (index) => {
    setVisibleModule(visibleModule === index ? null : index);
  };

  return (
    <div className="mx-48 mt-20 font-mono p-2 h-full ">
      <div className="flex gap-4 items-center">
        <img
          src={`${
            data.thumbNail
              ? data.thumbNail
              : "https://plus.unsplash.com/premium_photo-1685086785636-2a1a0e5b591f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }`}
          alt=""
          className="h-[200px] w-[300px] rounded-md hover:brightness-125"
        />
        <div className="m-4 flex flex-col gap-2">
          <h1 className="font-mono text-4xl capitalize">{data.title}</h1>
          <p className="text-zinc-500 text-base">{data.description}</p>
          <span className="capitalize">instructor - {data.teacher?.name}</span>
          <span className="text-sm">
            <b>Date Created:</b> {data.createdAt?.slice(0, 10)}
          </span>
          <span className="text-sm">
            <b>Last Updated:</b> {data.updatedAt?.slice(0, 10)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="mt-4">
          <b>Course Duration:</b>{" "}
          {`${
            data.duration?.hours > 1
              ? `${data.duration?.hours} hours`
              : `${data.duration?.hours} hour`
          } ${data.duration?.minutes} minutes`}
        </span>
        <div className="flex flex-col gap-4 ">
          <span>
            <b>Difficulty Level:</b>{" "}
            <span
              className={`${
                data.level === "Advance" ? "bg-red-300" : "bg-green-300"
              } ${
                data.level === "Intermediate" && "bg-yellow-200"
              } w-fit p-1 rounded-md text-zinc-800 `}
            >
              {data.level}
            </span>
          </span>
          <div>
            <b>Required Skills:{" ["}</b>
            {data.skillsRequired?.map((data, index) => (
              <span key={index} className="capitalize">
                {" "}
                {data}{" "}
              </span>
            ))}
            {"]"}
          </div>
          <div>
            <b>Enrollment Fee:</b> &#8377;{data.price}
          </div>
        </div>
        <div className="p-6 mr-40 w-[80%] bg-zinc-50 rounded-md">
          <h1 className="font-mono font-semibold text-lg">Course content</h1>
          <div className="max-h-[70vh] overflow-auto scrollbar-hide">
            {data.module?.map((data, index) => (
              <div className="my-4 bg-zinc-100 rounded-md" key={index}>
                <div
                  className="w-full bg-zinc-200 rounded-md items-center justify-between flex py-4 p-6"
                  onClick={() => toggleVisibility(index)}
                >
                  <span className="font-bold text-lg">{data?.title}</span>{" "}
                  <IoIosArrowDown
                    className={`transition-transform ${
                      visibleModule === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {visibleModule === index && (
                  <Link to={`/viewvideos/${data._id}`} key={data._id}>
                    <div className="p-2 flex flex-col gap-2">
                      {data.content?.map((data, index) => (
                        // console.log(data, "sdhafkjhfjk")
                        <div className="flex justify-between items-center px-2">
                          <video
                            width="200"
                            height="200"
                            onMouseEnter={(e) => e.target.play()}
                            onMouseLeave={(e) => e.target.pause()}
                            muted
                            key={index}
                            className="rounded-md"
                          >
                            <source src={data.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          <h1 className="capitalize font-bold">{data.title}</h1>
                          <p className="capitalize text-zinc-600">
                            {data.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        <button className="px-3 py-1 bg-white text-pink-500 border-pink-600 border-2 rounded-md hover:bg-zinc-100">
          Enroll Now
        </button>
        <button className="px-3 py-1 text-white bg-pink-600 border-pink-600 border-2 rounded-md hover:bg-pink-500">
          Add To WishList
        </button>
      </div>
      {mount && (
        <>
          <h1 className="capitalize mt-8 underline underline-offset-2 text-2xl">
            other courses you might be interested in
          </h1>
          <Courses />
        </>
      )}
    </div>
  );
}

export default ViewCourse;
