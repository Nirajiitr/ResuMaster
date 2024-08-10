import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import resumeSample1 from "../assets/resume-sample-1.webp";
import resumeSample2 from "../assets/resume-sample-2.webp";
import resumeSample3 from "../assets/resume-sample-3.webp";
import { useState } from "react";
import AuthPage from "./AuthPage";

const DefaultPage = () => {
  const resumeSample = [resumeSample1, resumeSample2, resumeSample3];
  const [signupModel, setSignupModel] = useState(false)
  const [loginModel, setLoginModel] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-slate-500 relative overflow-y-auto no-scrollbar">
      <Navbar location="AuthPage" signupModel = {setSignupModel} showLoginModel={setLoginModel}  />
      <div className=" flex ">
        <div className="bg-gray-700 text-white w-[40%] hover:rounded-xl ">
          <div className="flex items-start gap-1 overflow-hidden  hover:scale-95 hover:rounded-xl transition-transform duration-100   w-full ">
            {resumeSample.map((img_url, index) => (
              <img
                key={index}
                className={`  h-full animate-swipe rounded-md`}
                src={img_url}
                alt="sample resume"
              />
            ))}
          </div>
        </div>
        <div className="bg-blue-400 w-[60%] h-full">
          <div className="flex flex-col gap-2 p-5 items-center">
            <h1 className="text-6xl font-mono font-bold p-5">
              Welcome to ResuMaster
            </h1>
            <p className="font-sans">
              Welcome to ResuMaster! Create a professional resume in just a few
              easy steps. Customize your resume with our user-friendly interface
              and stand out from the crowd.
            </p>
            <div className="mt-16">
              <h2 className="text-2xl font-mono">Features:</h2>
              <ul className="ml-12 p-5 font-serif text-lg">
                <li>- Easy to use</li>
                <li>- Customizable templates</li>
                <li>- Instant PDF download</li>
              </ul>
            </div>
            <button onClick={()=>setSignupModel(true)} className="mt-20 ml-60 bg-green-500 p-5 px-10 rounded-lg hover:scale-105 transition-transform duration-500 hover:shadow-lg text-white text-xl font-mono">
              get start
            </button>
          </div>
        </div>
        {
          signupModel &&
          <AuthPage showSignupModel={setSignupModel} />
        }
        {
          loginModel &&
          <AuthPage showLoginModel={setLoginModel} login="true" />
        }
       
      </div>

      <Footer />
    </div>
  );
};

export default DefaultPage;
