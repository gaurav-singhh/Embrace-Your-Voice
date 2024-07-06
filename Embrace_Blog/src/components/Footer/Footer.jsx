import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import Container from "../container/Container";
import LinkedInLogo from "../../Images/LinkedIn_logo.png";
import GitHubLogo from "../../Images/GitHub_logo.png";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-black border-t-2 border-t-black">
      <Container>
        <div className="flex flex-wrap justify-center text-center md:text-left">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col items-center md:items-start justify-between h-full">
              <div className="inline-flex items-center mb-4 ml-0 md:ml-[100px]">
                <Logo width="210px" />
              </div>
              <div>
                <p className="text-sm text-gray-400 px-3">
                  &copy; Copyright 2024. All Rights Reserved by Gaurav Singh.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="mb-9 text-xs font-semibold tracking-px uppercase text-gray-300">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-500 hover:text-gray-700"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-500 hover:text-gray-700"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-500 hover:text-gray-700"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 hover:text-gray-700"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="mb-9 text-xs font-semibold tracking-px uppercase text-gray-300">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-500 hover:text-gray-700"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-500 hover:text-gray-700"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <a
                    className="text-base font-medium text-gray-500 hover:text-gray-700 inline-flex items-center"
                    href="https://www.linkedin.com/in/gaurav-singh-b18404299/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={LinkedInLogo}
                      alt="LinkedIn Logo"
                      width="16"
                      height="16"
                      className="mr-1"
                    />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    className="text-base font-medium text-gray-500 hover:text-gray-700 inline-flex items-center"
                    href="https://github.com/gaurav-singhh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={GitHubLogo}
                      alt="GitHub Logo"
                      width="16"
                      height="16"
                      className="mr-1"
                    />
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="mb-9 text-xs font-semibold tracking-px uppercase text-gray-300">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-500 hover:text-gray-700"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="text-base font-medium text-gray-500 hover:text-gray-700"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-500 hover:text-gray-700"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Footer;
