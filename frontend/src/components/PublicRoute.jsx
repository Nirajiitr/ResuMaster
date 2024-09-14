import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import useUser from "../hooks/useUser";

const PublicRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(false);
  const [cookies] = useCookies(["Token"]);
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isLoading, isError } = useUser();
  useEffect(() => {
    const validateToken = async () => {
      if (user && user?._id) {
        try {
          const res = await axios.get(
            "https://resumaster-backind.onrender.com/auth/verify",
            {
              withCredentials: true,
            }
          );
          setIsValid(true);
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

  
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) toast.error(isError);
  if (isValid) {
    return <Navigate to="/home" replace />;
  }
  return children;
  
};

export default PublicRoute;
