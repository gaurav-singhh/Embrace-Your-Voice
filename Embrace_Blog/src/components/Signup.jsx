import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SignUpImage from "../Images/Signup_image.jpg"; // Import the image

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.DarkMode.isDarkTheme);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    setLoading(true); // Set loading to true
    try {
      console.log(data);
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div
      className={`flex items-center justify-center w-full h-screen ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`flex w-full max-w-4xl mx-auto shadow-lg rounded-lg ${
          isDarkTheme ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Left section with the image */}
        <div className="hidden md:flex md:w-1/2">
          <img
            src={SignUpImage}
            alt="Signup"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>

        {/* Right section with the signup form */}
        <div
          className={`w-full md:w-1/2 p-10 ${
            isDarkTheme ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
          } rounded-r-lg`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className={`font-medium transition-all duration-200 hover:underline ${
                isDarkTheme ? "text-blue-400" : "text-blue-700"
              }`}
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(create)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
                className={`${
                  isDarkTheme ? "bg-white text-black" : "bg-white text-black"
                }`}
              />
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
                className={`${
                  isDarkTheme ? "bg-white text-black" : "bg-white text-black"
                }`}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
                className={`${
                  isDarkTheme ? "bg-white text-black" : "bg-white text-black"
                }`}
              />
              <Button
                type="submit"
                className={`w-full ${
                  isDarkTheme
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
