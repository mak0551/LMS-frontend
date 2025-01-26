import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

function Viewvideo() {
  const [data, setData] = useState([]);
  const [courseData, setCoursedata] = useState([]);
  const [visibleModule, setVisibleModule] = useState(null);
  const { id } = useParams();

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
        `http://localhost:4040/module/getone/${id}`
      );
      setData(response.data);
      console.log(response.data);

      const fetchallmodules = async () => {
        const response2 = await axios.get(
          `http://localhost:4040/course/getbyid/${response.data.courseId}`
        );
        setCoursedata(response2.data);
        console.log(response2.data);
      };
      fetchallmodules();
    };
    fetchdata();
  }, [id]);

  const toggleVisibility = (index) => {
    setVisibleModule(visibleModule === index ? null : index);
  };

  return (
    <div className="mx-48 mt-20 bg-zinc-50 font-mono p-6 h-full flex flex-col items-center">
      {data.content?.length > 0 && (
        <video width="740" height="360" controls className="rounded-md">
          <source src={data.content[0]?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="max-h-[70vh] my-4 overflow-auto scrollbar-hide w-full">
        {courseData.module?.map((data, index) => (
          <div className="my-4 bg-zinc-100 rounded-md mx-24 " key={index}>
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
              <Link to={`/viewvideos/${data._id}`} key={data._id}>
                <div className="p-2 flex flex-col gap-2">
                  {data.content?.map((data, index) => (
                    // console.log(data, "sdhafkjhfjk")
                    <div
                      className="flex justify-between items-center px-2 hover:bg-zinc-200 rounded"
                      key={index}
                    >
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
  );
}

export default Viewvideo;
