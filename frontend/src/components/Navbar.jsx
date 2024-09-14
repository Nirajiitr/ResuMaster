import React from "react";
import logo from "../assets/logo.svg";
import { GrDocumentDownload } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { GoSignIn } from "react-icons/go";
const Navbar = ({ location, signupModel, showLoginModel }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className="w-full h-16 bg-blue-200  ">
      <div className="flex justify-between items-center p-2">
        <img className="size-12 object-cover" src={logo} alt="brand logo" />
        <div className="flex items-center gap-7 ">
          {location === "AuthPage" ? (
            <>
              <button
                onClick={() => signupModel(true)}
                className="flex items-center border-2 border-slate-700 px-5 py-2 rounded-xl hover:text-white hover:bg-black  "
              >
                {" "}
                <GoSignIn size="20px" />
                signup
              </button>
              <button
                onClick={() => showLoginModel(true)}
                className="flex items-center border-2 border-slate-700 px-5 py-2 rounded-xl hover:text-white hover:bg-black  "
              >
                login <CiLogin size="20px" />
              </button>
            </>
          ) : (
            <>
              <Link
                className="flex items-center border-2 border-black rounded-lg p-1 "
                to={"./resume"}
              >
                {" "}
                <GrDocumentDownload />
                My Resume
              </Link>
              {user?.profile ? (
                <img
                  src={user.profile}
                  className="size-9 profile-style rounded-full"
                />
              ) : (
                <CgProfile className="profile-style " size="35px" />
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
