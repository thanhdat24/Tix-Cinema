import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="dark:bg-coolGray-800 dark:text-coolGray-100 bg-white fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <a href="#" aria-label="Back to homepage" class="flex items-center">
          <img
            className="absolute top-1/10 left-3.5 w-14"
            src="./assets/img/web-logo.png"
            alt="logo"
          />
        </a>
        <ul className="items-stretch hidden space-x-3 lg:flex ">
          <li className="flex">
            <NavLink
              to="/home"
              className="flex items-center px-4 -mb-1  dark:border-transparent text-black font-medium hover:text-red-500 "
              activeClassName=" text-red-500"
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contact"
              className="flex items-center px-4 -mb-1  dark:border-transparent text-black font-medium hover:text-red-500 "
              activeClassName=" text-red-500"
            >
              Contact
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className="flex items-center px-4 -mb-1  dark:border-transparent text-black font-medium hover:text-red-500 "
              activeClassName=" text-red-500"
            >
              News
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <button className="self-center px-8 py-3 rounded">Sign in</button>
          <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">
            Sign up
          </button>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-coolGray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
