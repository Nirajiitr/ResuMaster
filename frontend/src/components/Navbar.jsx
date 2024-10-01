import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { GrDocumentDownload } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { GoSignIn } from "react-icons/go";

import { AiOutlineLogout } from "react-icons/ai";
import { auth } from "../utils/firebase.confi";
import { useQueryClient } from "react-query";
import useUser from "../hooks/useUser";
import Spinner from "./Spinner";

const Navbar = ({ location, signupModel, showLoginModel }) => {
  const navigate = useNavigate()
  const [Menu, setMenu] = useState(false)
  const queryClient = useQueryClient()
  const {data,isLoading} = useUser()
   const handleLogout = async()=>{
    await auth.signOut().then(()=>{
      queryClient.setQueryData("user", null)
      localStorage.removeItem("Token")
    })
    navigate("/")
   }
   if(isLoading){
    return <Spinner />
   }
  return (
    <nav className="w-full h-16 bg-blue-300 px-12 ">
      <div className="flex justify-between items-center p-2">
        <img className="size-12 object-cover" src={logo} alt="brand logo" />
        <div className="flex items-center gap-7 relative ">
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
              {data?.photoURL? (
                <img
                  src={data?.photoURL}
                  className="size-9 profile-style rounded-full"
                   onClick={()=>setMenu(!Menu)}
                />
              ) : (
                <CgProfile onClick={()=>setMenu(!Menu)} className="profile-style" size="35px" />
              )}
            </>
          )}
          {
            Menu &&  <div onMouseLeave={()=>setMenu(!Menu)} className=" overflow-x-hidden profile-animation absolute text-lg flex items-center flex-col gap-3 p-3 bg-blue-200 rounded-md text-black w-60 right-0 top-0 ">
            {
             data && data?._id? <CgProfile  size="80px" /> :
             <img
             src={data?.photoURL}
             className="size-20  rounded-full"
           />
            }
            <Link to="/profile" className=" hover:underline whitespace-nowrap hover:scale-105 hover:duration-500 hover:decoration-blue-700 hover:cursor-pointer ">My account</Link>
            <Link to="/add/tamplete" className="hover:underline whitespace-nowrap hover:scale-105 hover:duration-500 hover:decoration-blue-700 hover:cursor-pointer ">Add new tamplete </Link>
            <Link to="/new/resume" className="hover:underline whitespace-nowrap hover:scale-105 hover:duration-500 hover:decoration-blue-700 hover:cursor-pointer ">create new </Link>
            <button onClick={handleLogout} className="flex gap-1 text-lg btn items-center rounded-lg px-2">Logout<AiOutlineLogout /></button>
         </div>
          }
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
