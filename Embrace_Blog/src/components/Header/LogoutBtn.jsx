import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    setLoading(true); // Set loading to true
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <button
      className="inline-block px-1 py-2 duration-200 text-gray-300 rounded-full border border-transparent hover:border-white hover:bg-red-700 hover:text-white"
      onClick={logoutHandler}
      disabled={loading} // Disable the button while loading
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}

export default LogoutBtn;
