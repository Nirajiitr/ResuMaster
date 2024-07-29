import React from 'react'
import logo from "../assets/logo.svg";
import { GrDocumentDownload } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  return (
     <nav className='w-full h-16 bg-blue-200  '>
        <div className='flex justify-between items-center p-2'>
            <img className='size-12 object-cover' src={logo} alt="brand logo" />
            <div className='flex items-center gap-7'>
            <a className='flex items-center border-2 border-black rounded-lg p-1' href='./resume' > <GrDocumentDownload />My Resume</a>
             <CgProfile size="35px"/>
             </div>
        </div>
        
    </nav>
  )
}

export default Navbar