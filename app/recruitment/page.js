"use client";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";

export default function Jobs() {
    const [currentSubPageID, setcurrentSubPageID] = useState(0);
    const switchSubPage = (id) => {
        console.log("Old page = " + currentSubPageID)
        if (currentSubPageID != id){
            setcurrentSubPageID(id);
        }
        console.log("new page = " + currentSubPageID)
    }
    const jobsSubPageID = 0;
    const jobsSubPage = () => {
        switchSubPage(jobsSubPageID);

    };
    const applicationsSubPageID = 1;
    const applicationsSubPage = () => {
        switchSubPage(applicationsSubPageID);
    };
    const promosSubPageID = 2;
    const promosSubPage = () => {
        switchSubPage(promosSubPageID);
    };
    return (
        <main className=" text-white flex min-h-screen h-full flex-col items-center justify-start">
            <div className="z-10 max-w-6xl w-full min-h-screen h-full border-l-[1px] border-r-[1px] border-gray-700 flex flex-col items-center justify-start">
                <div className="w-full flex flex-col items-center justify-start p-4">
                    <div className="w-full flex flex-row items-center justify-between my-4">
                        <h1 className="font-medium text-2xl ">Recruitment Portal</h1>
                    </div>
                    <div className="w-full h-4" />
                </div>
                <div className="w-full flex flex-col items-center justify-start">
                    <ul className="text-sm w-full flex flex-row items-center justify-start">
                        <li onClick={jobsSubPage} className={cn(currentSubPageID === jobsSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-500 py-2 px-4 text-gray-500 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full" >
                                <p>Jobs</p>
                            </div>
                        </li>
                        <li onClick={applicationsSubPage} className={cn(currentSubPageID === applicationsSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-500 py-2 px-4 text-gray-500 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full" >
                                <p>Applications</p>
                            </div>
                        </li>
                        <li onClick={promosSubPage} className={cn(currentSubPageID === promosSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-500 py-2 px-4 text-gray-500 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full" >
                                <p>Promotions</p>
                            </div>
                        </li>
                        <li className="text-transparent select-none w-screen flex flex-row items-center justify-start border-b-[1px] border-gray-700 p-2" >
                            <button className="cursor-hidden">
                                <p>Promotions</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </main>


    );

}