import React from "react";
import { Link } from "react-router-dom";
import blogImage from "../Images/blog.png"; // Adjust the import path according to your file structure
import Container from "./container/Container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeThemeToDark, changeThemeToLight } from "../store/darkModeSlice";

function InitialPage() {
  const authStatus = useSelector((state) => state.auth.status);
  const isDarkTheme = useSelector((state) => state.DarkMode.isDarkTheme);
  const dispatch = useDispatch();

  return (
    <Container>
      <div
        className={`mx-auto w-full min-h-screen  ${
          isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <aside className="relative overflow-hidden rounded-lg sm:mx-16 mx-2 sm:py-8">
          <div className="relative z-10 max-w-screen-xl px-4 pb-5 pt-5 sm:py-24 mx-auto sm:px-6 lg:px-8">
            <h1
              className={`text-center text-2xl sm:text-4xl py-10 font-medium ${
                isDarkTheme ? "text-white" : "text-gray-900"
              }`}
            >
              Embrace Your Voice, Share Your Story.
            </h1>
            <div className="flex flex-col justify-between sm:flex-row items-center space-y-8 sm:space-y-0 sm:space-x-8">
              <div className="sm:w-1/2 text-center sm:text-left">
                <h2
                  className={`text-4xl font-bold sm:text-5xl ${
                    isDarkTheme ? "text-white" : "text-gray-950"
                  }`}
                >
                  Welcome to Embrace!
                  <span className="block text-4xl">Join our community</span>
                </h2>
                <p
                  className={`text-xl mb-8 ${
                    isDarkTheme ? "text-white" : "text-gray-950"
                  }`}
                >
                  Read amazing posts and share your thoughts!
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    className={`inline-flex items-center px-6 py-3 font-medium rounded-lg hover:opacity-75 ${
                      isDarkTheme
                        ? "bg-white text-blue-500"
                        : "bg-gray-800 text-white"
                    }`}
                    to={authStatus ? "/all-posts" : "/login"}
                  >
                    Explore Blogs
                  </Link>
                  <Link
                    className={`inline-flex items-center px-6 py-3 font-medium rounded-lg hover:opacity-75 ${
                      isDarkTheme
                        ? "bg-white text-purple-500 border-blue-500"
                        : "bg-gray-800 text-white border-gray-800"
                    }`}
                    to={authStatus ? "/add-post" : "/login"}
                  >
                    Create Your Blog
                  </Link>
                </div>
              </div>
              <div className="sm:w-1/2 flex justify-center sm:justify-end">
                <img
                  className="w-110"
                  src={blogImage}
                  alt="Blog illustration"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}

export default InitialPage;
