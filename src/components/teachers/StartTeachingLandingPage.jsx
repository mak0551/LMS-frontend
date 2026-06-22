import React, { useState } from "react";

function StartTeachingLandingPage() {
  const tabs = [
    {
      title: "Plan your curriculum",
      image: "https://s.udemycdn.com/teaching/plan-your-curriculum-2x-v3.jpg",
      content:
        "You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.",
      helpTitle: "How we help you",
      helpContent:
        "We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.",
    },
    {
      title: "Record your video",
      image: "https://s.udemycdn.com/teaching/record-your-video-2x-v3.jpg",
      content:
        "Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready to start. If you don’t like being on camera, just capture your screen. Either way, we recommend two hours or more of video for a paid course.",
      helpTitle: "How we help you",
      helpContent:
        "Our support team is available to help you throughout the process and provide feedback on test videos.",
    },
    {
      title: "Launch your course",
      image: "https://s.udemycdn.com/teaching/launch-your-course-2x-v3.jpg",
      content:
        "Gather your first ratings and reviews by promoting your course through social media and your professional networks. Your course will be discoverable in our marketplace where you earn revenue from each paid enrollment.",
      helpTitle: "How we help you",
      helpContent:
        "Our custom coupon tool lets you offer enrollment incentives while our global promotions drive traffic to courses. There’s even more opportunity for courses chosen for Udemy Business.",
    },
  ];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <section className="relative">
        <img
          src="https://s.udemycdn.com/teaching/billboard-desktop-2x-v4.jpg"
          alt=""
          className="object-cover w-full h-[35em]"
        />
        <div className="absolute top-[10em] left-[10em] space-y-3">
          <div className="text-6xl font-semibold">
            Come teach <br />
            with us
          </div>
          <div className="font-thin">
            Become an instructor and change lives <br /> — including your own
          </div>
          <button className="mt-4 bg-blue-600 px-2 py-1 rounded-full text-white w-full font-semibold text-lg">
            Get started
          </button>
        </div>
      </section>
      <img src={"/teacherslandingpage.png"} alt="" className="object-cover" />
      <section className="flex flex-col items-center justify-center sm:mx-[20%]">
        <h1 className="text-5xl font-semibold m-12">How to begin</h1>
        <div>
          <ul className="flex justify-center gap-16 border-b border-gray-300">
            {tabs.map((tab, index) => (
              <li
                key={tab.title}
                onClick={() => setActiveTab(index)}
                className={`pb-4 text-2xl font-semibold cursor-pointer transition-all ${
                  activeTab === index
                    ? "border-b-2 border-blue-900 text-blue-900"
                    : "text-gray-600"
                }`}
              >
                {tab.title}
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-10 gap-10">
            <div className="flex flex-col justify-center w-1/2 space-y-4 text-xl font-thin">
              <p>{tabs[activeTab].content}</p>

              <h2 className="font-normal text-2xl">
                {tabs[activeTab].helpTitle}
              </h2>

              <p>{tabs[activeTab].helpContent}</p>
            </div>

            <div className="w-1/2">
              <img
                src={tabs[activeTab].image}
                alt={tabs[activeTab].title}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f7f9fa] py-24 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#2d2f48] text-center">
            Become an instructor today
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-center text-[#2d2f48] max-w-3xl">
            Join one of the world’s largest online learning
            <br className="hidden md:block" />
            marketplaces.
          </p>

          <button className="mt-10 bg-purple-700 hover:bg-purple-800 text-white font-semibold px-12 md:px-24 py-4 rounded-lg">
            Get started
          </button>
        </div>
      </section>
    </div>
  );
}

export default StartTeachingLandingPage;
