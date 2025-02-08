import Image from "next/image";
import React from "react";
import bae from "../../public/bae.jpeg";
import {Bell} from 'lucide-react'
const Navbar = () => {
  return (
    <div className="fixed top-0 right-0 bg-white shadow-md h-[80px] w-[calc(100vw-250px)] flex justify-end items-center  px-6 ">
      <div className="mr-5 relative cursor-pointer hover:scale-110 transition-all ease-in-out duration-200">
        <Bell size={20} />
        <div className="absolute top-0 right-0 bg-red-600 h-2 w-2 rounded-full"></div>
      </div>
      <div className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
          <Image
            src={bae}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className=" font-medium">peyush nuwal</h1>
          <h3 className="text-slate-700 text-sm">sales </h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
