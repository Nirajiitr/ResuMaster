import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import brandLogo from "../assets/logo.svg";

const AuthPage = ({ showSignupModel, showLoginModel, login }) => {
  return (
    <div className="fixed inset-0 bg-slate-700 bg-opacity-80 flex justify-center items-center">
      <div className="bg-blue-300 text-black w-[600px] h-[600px] rounded-xl">
        <div className="flex justify-between p-3 ">
          <img className="size-10" src={brandLogo} alt="brand logo" />
          {login ? (
            <>
              <h1 className="text-3xl font-bold">Welcome back</h1>
              <IoCloseCircle
                size="24px"
                className="hover:cursor-pointer hover:scale-105"
                onClick={() => showLoginModel(false)}
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">Sign Up to ResuMaster</h1>
              <IoCloseCircle
                size="24px"
                className="hover:cursor-pointer hover:scale-105"
                onClick={() => showSignupModel(false)}
              />
            </>
          )}
        </div>
        <form action="">
          <div className="grid grid-rows-2 grid-cols-2 gap-5 p-10">
            <input
              className="rounded-3xl focus:outline-none p-3"
              type="text"
              placeholder="Enter your firstname "
            />
            <input
              className="rounded-3xl focus:outline-none p-3"
              type="text"
               placeholder="Enter your lastname "
            />
            <input
              className="rounded-3xl focus:outline-none p-3"
              type="email"
               placeholder="Enter your email "
            />
            
            <input
              className="rounded-3xl focus:outline-none p-3"
              type="password"
               placeholder="Enter your password "
            />
            
            <input
              className="rounded-3xl focus:outline-none p-3"
              type="password"
               placeholder="Enter your confirm password "
            />
            
              <fieldset className="border-black border-2 flex justify-center rounded-lg  gap-3 ">
                <legend className="text-center ">Select gender</legend>

                <label className="flex items-center gap-1 cursor-pointer" htmlFor="male">
                 
                  male
                  <input type="radio" id="male" name="gender" value="male" />
                </label>
                <label className="flex items-center gap-1 cursor-pointer" htmlFor="female">
                 
                  female
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                  />
                </label>
                <label className="flex items-center gap-1 cursor-pointer" htmlFor="other">
                 
                  other
                  <input type="radio" id="other" name="gender" value="other" />
                </label>
              </fieldset>
            
            <button
              className=" justify-stretch border-2 text-2xl py-3 rounded-3xl border-black hover:bg-black hover:text-white col-span-2"
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
