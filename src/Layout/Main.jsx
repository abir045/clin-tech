import React from "react";
import Nav from "../components/Navbar";
import { Outlet } from "react-router-dom";

import FooterBanner from "../components/Footer";

const Main = () => {
  return (
    <div>
      <Nav />
      <div className="">
        <Outlet />
      </div>

      <FooterBanner />
    </div>
  );
};

export default Main;
