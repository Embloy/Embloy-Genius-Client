"use client";
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import { columns} from "@/app/recruitment/jobs_columns";
import { JobDataTable} from "@/app/recruitment/JobDataTable";
import './locals.css'
import {get_core} from "@/lib/misc_requests";
import {useRouter} from "next/navigation";

export default function Jobs() {
    // subpages
    const [currentSubPageID, setcurrentSubPageID] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const switchSubPage = (id) => {
        if (currentSubPageID != id){
            setcurrentSubPageID(id);
        }
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

    const router = useRouter();
    const [data, setData] = useState(null);
    useEffect(() => {
        get_core("/user/jobs", router).then(data => {
            setData(data.jobs)
            setReloadData(false)
        }).catch(e => {
            console.log(e)
        });
    },[reloadData])



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
                        <li className="cursor-default text-transparent select-none w-screen flex flex-row items-center justify-start border-b-[1px] border-gray-700 p-2 pointer-events-none" >
                            <button className="cursor-default">
                                <p>Promotions</p>
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="w-full flex flex-col items-center justify-start">
                    {currentSubPageID === jobsSubPageID && (
                        <div className="container mx-auto">
                            <JobDataTable columns={columns} data={data} handleDataReload={() => setReloadData(true)}  />
                        </div>
                    )}



                </div>

            </div>
        </main>


    );

}