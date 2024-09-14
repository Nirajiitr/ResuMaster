import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import brandLogo from "../assets/logo.svg";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import axios from "axios";
import AuthenticationProvider from "../components/AuthenticationProvider";
import useUser from "../hooks/useUser";
import Spinner from "../components/Spinner";
const AuthPage = ({ showSignupModel, showLoginModel, login }) => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPass: "",
    gender: "",
  });
  const [Loading, setLoading ] = useState(false)
  const navigate = useNavigate();
  const { data, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data]);
  if (isLoading) {
    <Spinner />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endPoint = login ? "login" : "register";
    try {
      setLoading(true)
      const res = await axios.post(
        `https://resumaster-backind.onrender.com/auth/${endPoint}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data.newUser));
      setLoading(false)
      toast.success(res.data.message);
      navigate("/home"); 
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message);
      navigate("/");
    }

    setUserData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPass: "",
      gender: "",
    });
  };

  if(Loading){
    return <Spinner />
  }
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
        <form onSubmit={handleSubmit}>
          <div className="grid grid-rows-2 grid-cols-2 gap-5 p-10">
            {!login && (
              <>
                <input
                  className="rounded-3xl focus:outline-none p-3"
                  type="text"
                  placeholder="Enter your firstname "
                  name="firstname"
                  required
                  value={userData.firstname}
                  onChange={(e) =>
                    setUserData({ ...userData, firstname: e.target.value })
                  }
                />
                <input
                  className="rounded-3xl focus:outline-none p-3"
                  type="text"
                  placeholder="Enter your lastname "
                  name="lastname"
                  required
                  value={userData.lastname}
                  onChange={(e) =>
                    setUserData({ ...userData, lastname: e.target.value })
                  }
                />
              </>
            )}

            <input
              className="rounded-3xl focus:outline-none p-3"
              type="email"
              placeholder="Enter your email "
              name="email"
              required
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            <input
              className="rounded-3xl focus:outline-none p-3"
              type="password"
              placeholder="Enter your password "
              name="password"
              required
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            {!login && (
              <>
                <input
                  className="rounded-3xl focus:outline-none p-3"
                  type="password"
                  placeholder="Enter your confirm password "
                  name="confirmPass"
                  required
                  value={userData.confirmPass}
                  onChange={(e) =>
                    setUserData({ ...userData, confirmPass: e.target.value })
                  }
                />

                <fieldset className="border-blue-100 border-2 flex justify-center rounded-lg  gap-3 ">
                  <legend className="text-center ">Select gender</legend>

                  <label
                    className="flex items-center gap-1 cursor-pointer"
                    htmlFor="male"
                  >
                    male
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={userData.gender === "male"}
                      onChange={(e) =>
                        setUserData({ ...userData, gender: e.target.value })
                      }
                    />
                  </label>
                  <label
                    className="flex items-center gap-1 cursor-pointer"
                    htmlFor="female"
                  >
                    female
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={userData.gender === "female"}
                      onChange={(e) =>
                        setUserData({ ...userData, gender: e.target.value })
                      }
                    />
                  </label>
                  <label
                    className="flex items-center gap-1 cursor-pointer"
                    htmlFor="other"
                  >
                    other
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      checked={userData.gender === "other"}
                      onChange={(e) =>
                        setUserData({ ...userData, gender: e.target.value })
                      }
                    />
                  </label>
                </fieldset>
              </>
            )}

            <button
              className=" justify-stretch border-2 text-2xl py-3 rounded-3xl border-blue-100 hover:bg-black hover:text-white col-span-2"
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
        <div className="flex w-full items-center">
          <hr className="w-[50%]" />
          or
          <hr className="w-[50%]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-5">
          <AuthenticationProvider login={login} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
