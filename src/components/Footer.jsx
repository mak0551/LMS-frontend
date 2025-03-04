import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-zinc-200 pt-12 pb-8 font-mono mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">
              <span className="text-pink-500">Learn</span>Hub
            </h3>
            <p className="text-zinc-400 text-sm">
              Your gateway to knowledge with top-tier courses and instructors.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-zinc-400 hover:text-pink-500 transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-pink-500 transition-colors duration-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-pink-500 transition-colors duration-300"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-zinc-100">
              Quick Links
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allcourses"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/viewTeachers"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  Teachers
                </Link>
              </li>
              <li>
                <Link
                  to="/mylearnings"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  My Learnings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-zinc-100">
              Support
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link
                  to="/"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-zinc-100">
              Newsletter
            </h4>
            <p className="text-zinc-400 text-sm mb-4">
              Get updates on new courses and offers.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md bg-zinc-700 text-zinc-200 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-zinc-50 rounded-md transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-700 flex flex-col md:flex-row justify-between items-center text-zinc-400 text-sm">
          <p>© {new Date().getFullYear()} LearnHub. All rights reserved.</p>
          <p>
            Built with <span className="text-pink-500">♥</span> for learners
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;