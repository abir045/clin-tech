import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

const Nav = () => {
  return (
    <div className="">
      <Navbar fluid className="bg-[#0f172af2] text-white py-5">
        <NavbarBrand
          as={Link}
          href="https://flowbite-react.com"
          className="flex items-center pl-10"
        >
          {/* <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          /> */}
          <div className="relative mr-3 w-[34px] h-[34px]">
            <svg className="brain-container" viewBox="0 0 100 100">
              <path
                d="M20 40 C20 25, 40 15, 50 15 C60 15, 80 25, 80 40
                   C80 50, 70 60, 60 65 C70 70, 80 80, 80 90
                   C80 105, 60 115, 50 115 C40 115, 20 105, 20 90
                   C20 80, 30 70, 40 65 C30 60, 20 50, 20 40 Z"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="2"
              ></path>
            </svg>
            <svg className="circuit-lines" viewBox="0 0 100 100">
              <path
                d="M35 40 H65 M50 40 V80
                   M35 60 H65 M25 50 H75"
                stroke="#93c5fd"
                strokeWidth="1.5"
                fill="none"
              ></path>
              <circle cx="35" cy="80" r="2" fill="#93c5fd"></circle>
              <circle cx="65" cy="80" r="2" fill="#93c5fd"></circle>
            </svg>
          </div>

          <span className="self-center whitespace-nowrap text-[23px] font-bold dark:text-white">
            Clin
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse className="mr-10">
          <Link href="#" className="text-white font-medium">
            About
          </Link>
          <Link as={Link} href="#" className="text-white">
            Our Solutions
          </Link>
          <Link href="#" className="text-white">
            in Action
          </Link>
          <Link href="#" className="text-white">
            Technology
          </Link>
          <Link href="#" className="text-white">
            Benefits
          </Link>
          <Link href="#" className="text-white">
            Case Use
          </Link>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default Nav;
