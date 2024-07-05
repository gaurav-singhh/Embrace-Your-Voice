import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import LoginImage from "../Images/Login_Image.png"; // Import the image

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const isDarkTheme = useSelector((state) => state.DarkMode.isDarkTheme);

  const login = async (data) => {
    setError("");
    setLoading(true); // Set loading to true
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
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
            src={LoginImage}
            alt="Login"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>

        {/* Right section with the login form */}
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/signup"
              className={`font-medium transition-all duration-200 hover:underline ${
                isDarkTheme ? "text-blue-400" : "text-blue-700"
              }`}
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                className={`${
                  isDarkTheme ? "bg-white text-black" : "bg-white text-black"
                }`}
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                className={`${
                  isDarkTheme ? "bg-white text-black" : "bg-white text-black"
                }`}
                {...register("password", {
                  required: true,
                })}
              />
              <Button
                type="submit"
                className="w-full hover:bg-blue-500"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
