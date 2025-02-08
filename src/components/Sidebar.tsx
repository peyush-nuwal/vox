'use client'
import {
  MessagesSquare,
  ChartColumn,
  FileSearch,
  CalendarCheck,
  Network,
  Settings,
  CircleHelp,
} from "lucide-react";
import React, { JSX, useState } from "react";

type Option = {
  id: number;
  title: string;
  logo: JSX.Element; // Store the rendered JSX element
};

const Sidebar = () => {
  const options: Option[] = [
    {
      id: 1,
      title: "Conversations",
      logo: <MessagesSquare size={25} />,
    },
    {
      id: 2,
      title: "Analytics",
      logo: <ChartColumn size={25} />,
    },
    {
      id: 3,
      title: "Audit",
      logo: <FileSearch size={25} />,
    },
    {
      id: 4,
      title: "Key Moments",
      logo: <CalendarCheck size={25} />,
    },
    {
      id: 5,
      title: "Statistics",
      logo: <ChartColumn size={25} />,
    },
    {
      id: 6,
      title: "Integration",
      logo: <Network size={25} />,
    },

    {
      id: 7,
      title: "Settings",
      logo:<Settings size={25} />,
    },

    {
      id: 8,
      title: "Help",
      logo: <CircleHelp  size={25} />,
    },
  ];
   
  const [selectedOption, setSelectedOption] = useState<string>("Conversations");
  return (
    <div className="relative z-50 bg-white shadow-lg w-[250px] h-screen flex flex-col">
      <h1 className="font-bold text-4xl text-purple mx-4 my-2 mb-8">Vox</h1>
      <div className=" w-full px-3">
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center gap-4 px-4 py-3   cursor-pointer text-xl text-purple  ${
              selectedOption === option.title
                ? "bg-purple text-white rounded-md "
                : "text-purple hover:bg-gray-200"
            } `}
            id={option.title}
            onClick={() => setSelectedOption(option.title)}
          >
            {option.logo}
            <span className="text-xl   ">{option.title}</span>
          </div>
        ))}
      </div>
      <h1 className=" mt-auto mb-5 mx-3 px-6 py-3 text-red-800  hover:text-red-600 hover:bg-gray-200 text-center text-xl ">
        {" "}
        Logout
      </h1>
    </div>
  );
};

export default Sidebar;
