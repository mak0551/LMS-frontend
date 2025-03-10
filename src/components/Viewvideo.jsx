import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

function Viewvideo() {
  const [data, setData] = useState([]);
  const [courseData, setCoursedata] = useState([]);
  const [visibleModule, setVisibleModule] = useState(null);
  const { id, index } = useParams();
  const videoIndex = parseInt(index, 10); // index coming from useparas is always a string so it needs to be converted to number

  // scroll becomes zero when page rerenders
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchdata = async () => {
      // Clear previous state to avoid showing stale(same) data
      setData([]);
      setCoursedata([]);
      const response = await axios.get(
        `https://lms-htvh.onrender.com/module/getone/${id}`
      );
      setData(response.data);
      console.log(response.data);

      const response2 = await axios.get(
        `https://lms-htvh.onrender.com/course/getbyid/${response.data.courseId}`
      );
      setCoursedata(response2.data);
      console.log(response2.data);
    };
    fetchdata();
  }, [id, videoIndex]);

  const toggleVisibility = (index) => {
    setVisibleModule(visibleModule === index ? null : index);
  };

  // Handle invalid or missing data
  if (!data || !data.content) {
    return <div>Loading...</div>;
  }

  // Get the specific video based on the index from the URL
  const videoData = data.content[videoIndex];

  if (!videoData) {
    return <p>Video not found</p>;
  }

  return (
    <div className="md:mx-48 sm:mt-20 bg-zinc-50 font-mono sm:p-6 p-2 h-full flex flex-col items-center ">
      <div>
        <div className="sm:mb-4">
          <video
            width="740"
            height="360"
            controls
            className="rounded-md bg-zinc-200 p-4"
          >
            <source src={videoData.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="m-2 capitalize text-lg font-bold">
          {courseData.title}
        </div>
        <div className="m-2 capitalize text-sm font-semibold text-zinc-500">
          {videoData.title}
        </div>
        <div className="m-2 capitalize text-sm font-semibold text-zinc-500">
          {videoData.description}
        </div>
      </div>
      <div className="max-h-[70vh] my-4 overflow-auto scrollbar-hide w-full ">
        {courseData.module?.map((data, index) => (
          <div className="my-4 bg-zinc-100 rounded-md xl:mx-24 " key={index}>
            <div
              className="w-full bg-zinc-100 border-2 border-zinc-300 rounded-md items-center justify-between flex py-4 p-6"
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
              // <Link to={`/viewvideos/${data._id}`} key={data._id}>
              <div className="p-2 flex flex-col gap-2">
                {data.content?.map((contentdata, index) => (
                  // console.log(data, "sdhafkjhfjk")
                  <div
                    className="flex justify-between items-center px-2 hover:bg-zinc-200 active:bg-zinc-200 rounded "
                    key={index}
                  >
                    <Link
                      to={`/viewvideos/${data._id}/${index}`}
                      key={data._id}
                      className="w-[30%]"
                    >
                      <video
                        width="200"
                        height="200"
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => e.target.pause()}
                        muted
                        key={index}
                        className="rounded-md w-full"
                      >
                        <source src={contentdata.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </Link>
                    <div className="flex w-[70%]">
                      <h1 className="capitalize font-bold w-full sm:w-[40%] truncate ">
                        {contentdata.title}
                      </h1>
                      <p className="capitalize text-zinc-600 hidden sm:block w-[60%] truncate">
                        {contentdata.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Viewvideo;
