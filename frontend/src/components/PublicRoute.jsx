import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PublicRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(false);
  const [cookies] = useCookies(["Token"]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const validateToken = async () => {
      if (user && user?._id) {
        try {
          const res = await axios.get("https://resumaster-backind.onrender.com/auth/verify", {
            
            withCredentials: true,
          });
          setIsValid(true);
        } catch (error) {
          toast.error(error.response?.data?.message || "Authentication failed");
          setIsValid(false);
          localStorage.setItem("user", null);
        }
      } else if(user?.uid){
        setIsValid(true);
      }
      else{
        setIsValid(false)
      }
    };

    validateToken();
  }, [cookies, user]);

  if(isValid){
   return <Navigate to="/home" replace />
  }   
  return children;
};

export default PublicRoute;
