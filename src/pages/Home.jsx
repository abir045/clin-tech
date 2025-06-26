import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Solutions from "../components/Solutions";
import InAction from "../components/InAction";
import ChatListFetcher from "../components/Chats";
import Technology from "../components/Technology";
import Benefits from "../components/Benefits";
import CaseUse from "../components/CaseUse";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Solutions />
      <InAction />
      <Technology />
      <Benefits />
      <CaseUse />
      <Contact />
      {/* <ChatListFetcher /> */}
    </div>
  );
};

export default Home;
