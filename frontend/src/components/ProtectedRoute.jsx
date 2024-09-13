import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const [cookies]=useCookies("Token")
   
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const validateToken = async () => {
      if (user) {
        try {
          const res = await axios.get("http://localhost:8888/auth/verify", {
            withCredentials: true,
          });
          setIsValid(res.status === 200);
        } catch (error) {
          toast.error(error.response?.data?.message || "Authentication failed");
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }
    };

    validateToken();
  }, [cookies, user]);

  if (isValid === null) {
    return <div>Loading...</div>; 
   
  }

  return isValid ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
