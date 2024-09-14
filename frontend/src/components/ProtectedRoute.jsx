import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import Spinner from "./Spinner";
import useUser from "../hooks/useUser";
const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(false);
  const [cookies] = useCookies(["Token"]);
  const { data, isLoading, isError } = useUser();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const validateToken = async () => {
      if (user && user?._id) {
        try {
          const res = await axios.get("https://resumaster-backind.onrender.com/auth/verify", {
            withCredentials: true,
          });
          setIsValid(res.status === 200);
        } catch (error) {
          toast.error(error.response?.data?.message || "Authentication failed");
          setIsValid(false);
          localStorage.setItem("user", null);
        }
      } else if (data?.uid) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };

    validateToken();
  }, [cookies.Token, user]);

  if (!isValid) {
    return <Spinner />;
  }
 if(isLoading){
  return <Spinner />;
 }
 if(isError) toast.error(isError)
  return isValid ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
