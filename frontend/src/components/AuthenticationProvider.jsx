import React from "react";
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
const AuthenticationProvider = ({ login }) => {
  const githubAuthProvider = new GithubAuthProvider();
  const googleAuthProvider = new GoogleAuthProvider();
  const navigate = useNavigate()
  const handleClick = async (provider) => {
    switch (provider) {
      case "Google":
        await signInWithPopup(auth, googleAuthProvider)
          .then((result) => {
           
            localStorage.setItem("user",JSON.stringify({Fullname : result.user.displayName, email : result.user.email, profileP: result.user.photoURL}));

            navigate("/home");

            toast.success(result.operationType);
          })
          .catch((error) => {
            toast.error("sever error")
            navigate("/")
          });
        break;
      case "Github":
        await signInWithPopup(auth, githubAuthProvider)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });

        break;
    }
  };
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
