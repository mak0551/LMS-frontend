import React, { useState } from "react";
import {
  FaBook,
  FaUser,
  FaCreditCard,
  FaChalkboardTeacher,
  FaEnvelope,
  FaComments,
  FaPhoneAlt,
  FaChevronDown,
} from "react-icons/fa";

function HelpAndSupport() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "Open the course page and click the Enroll Now button to get started.",
    },
    {
      question: "I purchased a course but can't access it.",
      answer:
        "Please refresh your dashboard or contact support if the issue persists.",
    },
    {
      question: "How do I request a refund?",
      answer:
        "Navigate to Purchase History and submit a refund request within the eligible period.",
    },
    {
      question: "How can I become an instructor?",
      answer:
        "Click on Become an Instructor from your profile menu and submit your application.",
    },
    {
      question: "Where can I download my certificate?",
      answer: "Certificates are available under the Completed Courses section.",
    },
  ];

  const categories = [
    {
      title: "Courses",
      icon: <FaBook />,
      desc: "Course access, lessons, certificates",
    },
    {
      title: "Account",
      icon: <FaUser />,
      desc: "Profile and account settings",
    },
    {
      title: "Payments",
      icon: <FaCreditCard />,
      desc: "Billing, refunds and subscriptions",
    },
    {
      title: "Teaching",
      icon: <FaChalkboardTeacher />,
      desc: "Instructor resources and guides",
    },
  ];

  const articles = [
    "Getting Started with Learning",
    "How to Reset Your Password",
    "Refund Policy Guide",
    "Downloading Certificates",
    "Instructor Course Upload Guide",
    "Managing Your Profile",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Help & Support
          </h1>

          <p className="text-center mt-4">
            Find answers, explore guides, or contact our support team.
          </p>

          <div className="max-w-2xl mx-auto mt-8">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full border border-zinc-800 rounded-xl px-5 py-4 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-semibold mb-8">Quick Help</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((item) => (
            <div
              key={item.title}
              className="border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 transition cursor-pointer"
            >
              <div className="text-3xl text-blue-500 mb-4">{item.icon}</div>

              <h3 className="font-semibold text-lg">{item.title}</h3>

              <p className="text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-zinc-800 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="font-medium">{faq.question}</span>

                <FaChevronDown
                  className={`transition ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFAQ === index && (
                <div className="px-5 pb-5">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-8">Popular Articles</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {articles.map((article, index) => (
            <div
              key={index}
              className=" border border-zinc-800 rounded-xl p-5 hover:border-blue-500 transition cursor-pointer"
            >
              <h3>{article}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Contact + Support */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Contact Support</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full  border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full  border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
              />

              <textarea
                rows="5"
                placeholder="Describe your issue..."
                className="w-full  border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
              />

              <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium text-white">
                Send Request
              </button>
            </div>
          </div>

          {/* Support Channels */}
          <div className="space-y-5">
            <div className=" border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-6">Support Channels</h2>

              <div className="space-y-5">
                <div className="flex gap-4 items-center">
                  <FaEnvelope className="text-blue-500 text-xl" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="">support@ylms.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <FaComments className="text-green-500 text-xl" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="">Available 9 AM - 6 PM</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <FaPhoneAlt className="text-yellow-500 text-xl" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-6">System Status</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Website</span>
                  <span className="text-green-500">● Operational</span>
                </div>

                <div className="flex justify-between">
                  <span>Video Streaming</span>
                  <span className="text-green-500">● Operational</span>
                </div>

                <div className="flex justify-between">
                  <span>Payments</span>
                  <span className="text-green-500">● Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <h2 className="text-3xl font-bold">Still Need Help?</h2>

          <p className=" mt-3">
            Our support team is ready to assist you.
          </p>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium text-white">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
}

export default HelpAndSupport;
