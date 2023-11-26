"use client";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import { columns} from "@/app/recruitment/columns";
import { DataTable} from "@/app/components/misc/DataTable";
import './locals.css'
import Image from "next/image";

const test_jobs = [{id:0, position: "CEO", salary:500, currency: 0}, {id:1, position: "CTO", salary:400, currency: 0}, {id:2, position: "COO", salary:400, currency: 0}]




export default function Jobs() {
    // subpages
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


    // filter
    const [filterIsHovered, setFilterIsHovered] = useState(false);

    const handleFilterHover = () => {
        setFilterIsHovered(true)
    }
    const handleFilterNotHover = () => {
        setFilterIsHovered(false)
    }

    // fetch data
    // todo: remove dummy and fetch actual jobs

    const data = test_jobs


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
                        <li onClick={jobsSubPage} className={cn(currentSubPageID === jobsSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-4 text-gray-400 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full" >
                                <p>Jobs</p>
                            </div>
                        </li>
                        <li onClick={applicationsSubPage} className={cn(currentSubPageID === applicationsSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-4 text-gray-400 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full" >
                                <p>Applications</p>
                            </div>
                        </li>
                        <li onClick={promosSubPage} className={cn(currentSubPageID === promosSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-4 text-gray-400 hover:text-white cursor-pointer")} >
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

                <div className="w-full flex flex-col items-center justify-start">
                    <div className="text-sm w-full flex flex-row items-center justify-between">
                        <div className="px-4 bg-black hover:bg-gray-900 flex flex-row items-center justify-start" onMouseEnter={handleFilterHover} onMouseLeave={handleFilterNotHover}>
                            <Image
                                src={"/icons/filter-dark.svg"}
                                alt="Logo"
                                height="25"
                                width="25"
                                className="relative"
                            />
                            <input className={filterIsHovered ? "bg-gray-900 text-white h-10 w-96 px-2 placeholder-gray-900 border-none outline-none" : "bg-black text-white h-10 w-96 px-2 placeholder-gray-900 border-none outline-none"}
                                   type="text"
                                   name="name"
                                   placeholder="Filter"
                            />
                        </div>

                    </div>
                </div>

                <div className="w-full flex flex-col items-center justify-start">
                    <div className="container mx-auto">
                        <DataTable columns={columns} data={data}  />
                    </div>
                </div>

            </div>
        </main>


    );

}