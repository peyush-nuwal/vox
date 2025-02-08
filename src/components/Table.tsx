'use client'
import { Calendar, ChevronDown, CircleUserRound, Clock, EllipsisVertical, Headset, Phone, Plus, Search } from 'lucide-react';
import React, { useEffect,  useState } from 'react'
import Dropdown from './Dropdown';

import CircularProgress from "@mui/joy/CircularProgress";
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';
import {  setSearchQuery } from '@/Redux/slices/ConversationSlice';


const Table = () => {
  
    
  const [expendRow, setExpendRow] = useState<number[]>([])
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
 const [query, setQuery] = useState<string>("")
  const conversations=useSelector((state:RootState)=>state.conversation.filteredData)
  const dispatch = useDispatch()
  
  const options: string[] = ["edit", "delete"];
  const getColor = (value: number) => {
    if (value < 50) return "danger"; 
    if (value < 80) return "warning"; 
    return "success"; 
  };

  
  const handleRowOpen=(num :number)=>{
     setExpendRow((prevValue)=>prevValue.includes(num)?  prevValue.filter((val)=>val!==num):[...prevValue,num])
  }

  const onValueChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
     
      setQuery(e.target.value)
  }
   
   
    
  useEffect(() => {
    dispatch(setSearchQuery(query));
  }, [query])
  
  return (
    <div className="w-[calc(100vw-250px)] h-[100vh-100px]  pb-5 shadow-md overflow-y-scroll mt-[100px]">
      <div className="w-[95%] mx-auto h-full   rounded-lg">
        <div className="bg-white h-16 w-full flex items-center px-4 py-3 ">
          <h1 className="text-xl font-semibold">All Conversations</h1>

          <div className="ml-auto flex items-center gap-5">
            <div className="relative h-12 w-[250px]   ">
              <Search
                size={20}
                className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Type here"
                onChange={(e)=>onValueChange(e)}
                value={query}
                className="bg-white border outline-none h-full w-full rounded-md pl-8 pr-2"
              />
            </div>
            <Dropdown />
            <button className=" px-3 py-2 flex items-center rounded-lg gap-2 bg-purple text-white">
              <Plus />
              <span className="text-lg ">Add Conversation</span>
            </button>
          </div>
        </div>
        <div className="w-full  ">
          <div className="h-10 border-t border-b grid grid-cols-7">
            <div className="col-span-2 px-4 py-2 font-medium text-lg text-gray-400 text-start whitespace-nowrap">
              Conversation ID
            </div>
            <div className="col-span-1 px-4 py-2 font-medium text-lg text-gray-400 text-start whitespace-nowrap">
              Owners
            </div>
            <div className=" col-span-1 px-4 py-2 font-medium text-lg text-gray-400 text-start whitespace-nowrap">
              Talk Ratio
            </div>
            <div className="col-span-1 px-4 py-2 font-medium text-lg text-gray-400 text-start whitespace-nowrap">
              Type
            </div>
            <div className="col-span-1 px-4 py-2 font-medium text-lg text-gray-400 text-start whitespace-nowrap">
              Action
            </div>
            <div className="col-span-1"></div>
          </div>

          <div>
            {conversations.map((conv, idx) => (
              <div
                key={conv.id}
                className="relative bg-white h-auto rounded-md border  "
              >
                <div className=" grid grid-cols-7 items-center">
                  <div className="col-span-2 px-4 py-2  text-lg  text-start whitespace-nowrap">
                    <h1 className="text-lg ">{conv.id}</h1>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm">
                        <Clock size={15} className="text-blue-500" />
                        {conv.time}
                        {}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <Calendar size={15} className="text-red-600" />{" "}
                        {conv.date}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <Phone size={15} className="text-green-500" />{" "}
                        {conv.duration}
                      </span>
                    </div>
                  </div>
                  <div className=" col-span-1 px-4 py-2  text-lg  text-start whitespace-nowrap">
                    {conv.owner}
                  </div>
                  <div className="col-span-1 px-4 py-2  text-lg  text-start whitespace-nowrap">
                    <CircularProgress
                      size="lg"
                      determinate
                      value={conv.talkRatio}
                      color={getColor(conv.talkRatio)}
                    >
                      {conv.talkRatio}%
                    </CircularProgress>
                  </div>
                  <div className="col-span-1 px-4 py-2  text-lg  text-start whitespace-nowrap flex flex-col gap-1">
                    {conv.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`w-fit rounded-full px-3 py-1 mt-2 text-sm ${
                          tag === "Admin"
                            ? "bg-pink-600/20 border border-pink-600 text-pink-600"
                            : tag === "Sales"
                            ? "bg-blue-600/20 border border-blue-600 text-blue-600"
                            : "bg-yellow-600/20 border border-yellow-600 text-yellow-600"
                        } `}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="col-span-1 text-lg  text-start whitespace-nowrap ">
                    <div
                      onClick={() => setMenuOpen(conv.id)}
                      className="relative h-fit     ml-4 "
                    >
                      <div className="w-fit  border rounded-lg p-2 flex  items-center cursor-pointer">
                        <EllipsisVertical size={20} className="" />
                      </div>
                      <ul
                        className={`absolute top-full left-0 mt-1 z-[999999] flex-col border  rounded-lg  w-[150px] overflow-hidden  bg-white ${
                          conv.id === menuOpen ? "flex   " : "hidden"
                        } `}
                      >
                        {options.map((opt, idx) => (
                          <li
                            key={idx}
                            className={`px-2 py-2  cursor-pointer text-base hover:bg-zinc-200
                        `}
                          >
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div
                    onClick={() => handleRowOpen(idx)}
                    className="col-span-1 px-4 py-2  text-lg  text-start whitespace-nowrap cursor-pointer "
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: expendRow.includes(idx) ? 180 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="w-fit"
                    >
                      <ChevronDown size={30} />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={
                    expendRow.includes(idx)
                      ? { height: 300, padding: 16 }
                      : { height: 0, padding: 0 }
                  }
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="   w-full  bg-white overflow-hidden border-x border-b "
                >
                  <div className="w-full mx-auto  h-full flex gap-3 px-2 py-4">
                    <div className="w-[40%] h-full rounded-lg   py-3 overflow-hidden bg-white border shadow-md">
                      <h1 className="text-xl font-medium px-2 py-1  border-b-2">
                        Summary
                      </h1>
                      <p className="w-full h-full overflow-y-auto   my-2 pb-10 px-2 text-base text-gray-500 ">
                        {conv.summary}
                      </p>
                    </div>
                    <div className="w-[60%] h-full rounded-lg   py-3 overflow-hidden border bg-white shadow-md">
                      <h1 className="text-xl font-medium px-2 py-1  border-b-2">
                        Transcript
                      </h1>
                      <div className="w-full h-60 my-2  overflow-y-scroll pb-16">
                        {conv.chat.map((chat, idx) => (
                          <span key={idx} className="flex px-2 py-1 gap-3 ">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <div
                                className={`p-1 rounded-full w-fit ${
                                  chat.sender === "Employee"
                                    ? "bg-blue-600/20 text-blue-600"
                                    : "bg-pink-600/20 text-pink-600"
                                }  `}
                              >
                                {chat.sender === "Employee" ? (
                                  <Headset size={20} />
                                ) : (
                                  <CircleUserRound size={20} />
                                )}
                              </div>
                              <span>{chat.time}</span>
                            </div>
                            <p className="bg-gray-200 px-2 py-1 w-full text-wrap border rounded-md">
                              {chat.message}
                            </p>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table
