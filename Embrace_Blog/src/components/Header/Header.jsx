import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { NavLink } from "react-router-dom"; // Changed to NavLink
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeThemeToDark,
  changeThemeToLight,
} from "../../store/darkModeSlice"; // Adjusted import path

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const isDarkTheme = useSelector((state) => state.DarkMode.isDarkTheme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (isDarkTheme) {
      dispatch(changeThemeToLight());
    } else {
      dispatch(changeThemeToDark());
    }
  };

  const handleModeClick = () => {
    toggleTheme(); // Call toggleTheme function to change theme
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Blogs",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Create Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-4 shadow bg-black border-t-2 border-t-black">
      <Container>
        <nav className="flex flex-wrap items-center justify-between">
          <div className="hidden sm:block">
            <NavLink to="/" activeClassName="border-white">
              <Logo width="100px" />
            </NavLink>
          </div>

          <div className="mr-3">
            <ul className="flex items-center space-x-4">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        className={({ isActive }) =>
                          ` ${
                            isActive
                              ? "border-blue-100 rounded-full text-white"
                              : "text-gray-300"
                          }
                          inline-block px-2 py-2 text-gray-300 border border-transparent hover:border-blue-100 rounded-full`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
              <li className="ml-auto flex items-center">
                {/* Flex container for Dark Mode text and toggle */}
                {/* Dark Mode Text with onClick handler */}
                <div
                  className="text-sm font-medium text-white mr-2 cursor-pointer hover:underline"
                  onClick={handleModeClick}
                >
                  Dark
                </div>
                {/* Toggle Button */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    onChange={toggleTheme}
                    checked={isDarkTheme}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-[calc(100%-2px)] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
