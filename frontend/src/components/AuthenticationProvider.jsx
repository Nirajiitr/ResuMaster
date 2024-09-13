import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link} from "react-router-dom";
import {GithubAuthProvider, GoogleAuthProvider} from "firebase/auth"
const AuthenticationProvider = ({login}) => {
    const githubAuthProvider = new GithubAuthProvider()
    const googleAuthProvider = new GoogleAuthProvider()
    const handleClick = async (provider)=>{
        switch(provider){
            case "Google" : 
                console.log("google")
                break;
            case "Github" :
                console.log("github")  
                break  
        }
    }
  return (
    <>
      <Link onClick={()=>handleClick("Google")}
            className="flex items-center gap-2 border-blue-100 rounded-xl border-2 px-40 py-2 hover:bg-black hover:text-white"
            to=""
          >
            <FcGoogle /> {login ? "login with Google" : "sign up with Google"}{" "}
          </Link>
          <Link onClick={()=>handleClick("Github")}
            className="flex items-center gap-2 border-blue-100 rounded-xl border-2 px-40 py-2 hover:bg-black hover:text-white"
            to=""
          >
            <FaGithub />
            {login ? "login with Github" : "sign up with Github"}{" "}
          </Link>
    </>
  )
}

export default AuthenticationProvider