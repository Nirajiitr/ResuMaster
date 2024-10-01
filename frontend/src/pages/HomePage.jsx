import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreateNewModel from "../components/CreateNewModel ";

const HomePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden overflow-y-scroll no-scrollbar">
      <Navbar />
      <div className="flex flex-col justify-center items-center p-10 flex-grow">
        <h2 className="font-bold text-3xl">New Resume</h2>
        <p className="mb-10">Start Creating AI Resume to Your Next Job Role</p>
        <CreateNewModel />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
