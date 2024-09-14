import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firebase.confi";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
const AuthenticationProvider = ({ login }) => {
  const githubAuthProvider = new GithubAuthProvider();
  const googleAuthProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const handleClick = async (provider) => {
    
    switch (provider) {
      case "Google":
        setLoading(true)
        await setPersistence(auth, browserSessionPersistence).then(()=>{
          return signInWithPopup(auth, googleAuthProvider)})
         
          .then((result) => {
             
              setLoading(false)
            navigate("/home");

            toast.success(result.operationType);
          })
          .catch((error) => {
            setLoading(false)
            toast.error("something went wrong...");
            navigate("/");
          });
        break;
      case "Github":
        setLoading(true)
        await setPersistence(auth, browserSessionPersistence).then(()=>{
          return signInWithPopup(auth, githubAuthProvider)})
          .then((result) => {
            setLoading(false)
            navigate("/home");
            toast.success(result.operationType);
          })
          .catch((error) => {
            setLoading(false)
            toast.error("something went wrong...");
            navigate("/");
          });

        break;
    }
  };
  if(loading){
    return <Spinner />
  }
  return (
    <>
      <Link
        onClick={() => handleClick("Google")}
        className="flex items-center gap-2 border-blue-100 rounded-xl border-2 px-40 py-2 hover:bg-black hover:text-white"
        to=""
      >
        <FcGoogle /> {login ? "login with Google" : "sign up with Google"}{" "}
      </Link>
      <Link
        onClick={() => handleClick("Github")}
        className="flex items-center gap-2 border-blue-100 rounded-xl border-2 px-40 py-2 hover:bg-black hover:text-white"
        to=""
      >
        <FaGithub />
        {login ? "login with Github" : "sign up with Github"}{" "}
      </Link>
    </>
  );
};

export default AuthenticationProvider;
