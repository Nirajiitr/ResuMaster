import React, { useState } from "react";
import resumeImg from "../assets/resume-sample-1.webp";
const CreateNewModel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
   const [title, setTitle] = useState(null)
    
  return (
    <>
      <div className="card bg-base-100 image-full w-96 shadow-xl">
        <figure>
          <img src={resumeImg} alt="resume img" />
        </figure>
        <div className="card-body flex flex-col justify-center items-center">
          <button onClick={openModal} className="btn btn-primary">
            Create Now
          </button>
        </div>
      </div>

      {isOpen && (
        <dialog className="modal" open>
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="p-1">Add a title for your remuse</p>
            <input
              type="text"
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Web Development, MERN Stack, etc."
              className="input focus:outline-none input-bordered w-full max-w-xs"
            />
            <button disabled={!title} className="btn btn-outlin px-5 mt-5 ml-auto self-end">Create</button>
          </div>
        </dialog>
      )}
    </>
  );
};

export default CreateNewModel;
