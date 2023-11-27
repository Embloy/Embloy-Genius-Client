"use client";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import { columns} from "@/app/recruitment/jobs_columns";
import { DataTable} from "@/app/components/datatable/DataTable";
import './locals.css'
import Image from "next/image";

const tet_jobs = [
    {id:0, position: "CEO", salary:500, currency: 0},
    {id:1, position: "CTO", salary:400, currency: 0},
    {id:2, position: "COO", salary:400, currency: 0},
    {id:3, position: "CScrumO (prsudo c level Lakei als joke)", salary:400, currency: 0},
    {id:4, position: "CBarO", salary:400, currency: 0},
    {id:5, position: "CIO", salary:400, currency: 0},
    {id:6, position: "CHrO", salary:400, currency: 0},
    {id:7, position: "CPO", salary:400, currency: 0},
    {id:8, position: "CLO", salary:400, currency: 0},
    {id:9, position: "Depp", salary:400, currency: 0},
    {id:10, position: "Lakei", salary:400, currency: 0},
    {id:11, position: "Lakei", salary:400, currency: 0},
    {id:12, position: "Lakei", salary:400, currency: 0},
    {id:13, position: "Lakei", salary:400, currency: 0},
    {id:14, position: "Lakei", salary:400, currency: 0},
    {id:15, position: "Lakei", salary:400, currency: 0},
    {id:16, position: "Lakei", salary:400, currency: 0},
    {id:17, position: "Lakei", salary:400, currency: 0},
    {id:18, position: "Lakei", salary:400, currency: 0},

]


const test_jobs = [
    {job_id:0, job_type:"Scrum"},
    {job_id:1, job_type:"Scrum"},
    {job_id:2, job_type:"Scrum"},
    {job_id:3, job_type:"Scrum"},
    {job_id:4, job_type:"Scrum"},
    {job_id:5, job_type:"Scrum"},

]



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
                    {currentSubPageID === jobsSubPageID && (
                        <div className="container mx-auto">
                            <DataTable columns={columns} data={data}  />
                        </div>
                    )}
                </div>

            </div>
        </main>


    );

}