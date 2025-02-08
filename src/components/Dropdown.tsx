"use client"
import { resetFilters, setFilterType, setTalkRatioRange } from '@/Redux/slices/ConversationSlice';
import { RootState } from '@/Redux/store';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react'
import React, {  useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Dropdown = () => {
  const dropdownRef=useRef<HTMLDivElement|null>(null)
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)

     const [minRatio, setMinRatio] = useState<number>(0);
     const [maxRatio, setMaxRatio] = useState<number>(100);
    const options:string[]=["All" ,'Sales','Marketing',]
    const filterTalkRatio = useSelector(
      (state: RootState) => state.conversation.filterTalkRatio
    );
    
    const dispatch =useDispatch()




      const handleClickOutside=(e:MouseEvent)=>{
       if(dropdownRef.current&&!dropdownRef.current.contains(e.target as Node)){
         setDropdownOpen(false)
       }
      }

      useEffect(() => {
        document.addEventListener("click", handleClickOutside);
      
         return () => {
           document.removeEventListener("click", handleClickOutside);
         };
      }, [])
      
       const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const min = Number(e.target.value);
         if (min < filterTalkRatio[1]) {
             setMinRatio(min);         
          dispatch(setTalkRatioRange([min,filterTalkRatio[1]]));
        }
       };

       
       const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const max = Number(e.target.value);
         if (max > filterTalkRatio[0]) {
           setMaxRatio(max);
          dispatch(setTalkRatioRange([filterTalkRatio[0],max]));}
       };

     useEffect(() => {
       filterByTag();
     }, [selectedIndex]);
     

       const filterByTag=()=>{
         dispatch(setFilterType(options[selectedIndex]));
       }
       const handleResetFilters=()=>{
        dispatch(resetFilters())
        setMinRatio(0)
        setMaxRatio(100)
        setSelectedIndex(0)
       }
  return (
    <div ref={dropdownRef} className="relative h-fit z-[9999999]  ">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-full  border rounded-lg px-7 py-2 flex gap-2 items-center cursor-pointer"
      >
        <SlidersHorizontal size={20} className="" />
        <h1 className="text-xl  ">Filter</h1>
      </div>
      <motion.ul
        initial={{ height: 0 }}
        animate={dropdownOpen ? { height: "auto" } : { height: 0 }}
        transition={{ duration: 0.8 }}
        className={`absolute top-full left-0 mt-1    rounded-lg  w-[250px] overflow-hidden origin-top bg-white ${
          dropdownOpen && "border shadow-md"
        } `}
      >
        {options.map((opt, idx) => (
          <li
            key={idx}
            onClick={() => setSelectedIndex(idx) }
          
            className={`px-2 py-2  cursor-pointer text-lg ${
              selectedIndex === idx && "bg-zinc-200"
            } `}
          >
            {opt}
          </li>
        ))}
        <div className="border-t py-2 px-2">
          <h3 className="text-sm font-medium mb-3">Sort by range</h3>
          <div className="flex flex-col justify-start mb-3">
            <label
              htmlFor="min-range"
              className="text-sm font-medium text-gray-500"
            >
              Min Ratio: <span className="text-gray-700">{minRatio || 0}%</span>
            </label>
            <input
              type="range"
              id="min-range"
              className="w-full mt-2 accent-purple"
              min="0"
              max="100"
              step="1"
              value={minRatio || 0}
              onChange={handleMinChange}
            />
          </div>
          <div className="flex flex-col justify-start mb-3">
            <label
              htmlFor="max-range"
              className="text-sm font-medium text-gray-500"
            >
              Max Ratio:{" "}
              <span className="text-gray-700">{maxRatio || 100}%</span>
            </label>
            <input
              type="range"
              id="max-range"
              className="w-full mt-2 accent-purple"
              min="0"
              max="100"
              step="1"
              value={maxRatio || 100}
              onChange={handleMaxChange}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleResetFilters}
            className="text-white  rounded-lg px-3 py-2 bg-purple mb-2  mr-2"
          >
            Reset
          </button>
        </div>
      </motion.ul>
    </div>
  );
}

export default Dropdown