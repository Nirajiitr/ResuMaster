import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
const Spinner = () => {
  return (
    <div className=" w-screen h-screen flex items-center justify-center bg-blue-300">
      <MoonLoader color="#000" />
    </div>
  );
};

export default Spinner;
