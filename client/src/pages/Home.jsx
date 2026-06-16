import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import TechStack from "../components/TechStack";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
const Home = ({ darkMode, setDarkMode }) => {
  return (
    <>
      <div
        className={`
min-h-screen
transition-all
${darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}
`}
      >
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div
          className={`
            h-px
            ${darkMode ? "bg-zinc-800" : "bg-gray-200"}
            `}
        />
        <HeroSection darkMode={darkMode} setDarkMode={setDarkMode} />
        <div
          className={`
            h-px
            ${darkMode ? "bg-zinc-800" : "bg-gray-200"}
            `}
        />
        <Features darkMode={darkMode} setDarkMode={setDarkMode} />
        <div
          className={`
            h-px
            ${darkMode ? "bg-zinc-800" : "bg-gray-200"}
            `}
        />
      </div>
      <TechStack darkMode={darkMode} setDarkMode={setDarkMode} />
      <div
        className={`
    h-px
    ${darkMode ? "bg-zinc-800" : "bg-gray-200"}
  `}
      />
      <CTA darkMode={darkMode} setDarkMode={setDarkMode}/>
      <div
        className={`
    h-px
    ${darkMode ? "bg-zinc-800" : "bg-gray-200"}
  `}
      />
      <Footer darkMode={darkMode} setDarkMode={setDarkMode}/>
    </>
  );
};

export default Home;
