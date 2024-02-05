"use client";
import {cn} from "@/lib/utils";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {cast_date, cast_datetime} from "@/lib/utils/formats";
import '../globals.css'

export function JobDetails({job}) {
    const [settingsIsHovered, setSettingsIsHovered] = useState(false)
    const handleSettingsHover = () => {
        setSettingsIsHovered(true)
    }
    const handleSettingsNotHover = () => {
        setSettingsIsHovered(false)
    }

    const [position, setPosition] = useState(null) // todo: make it like in calendar


    const detailsClass = "w-full h-[500px] absolute flex flex-col items-center justify-between p-4 cursor-default"
    const headerClass = "w-full flex flex-row items-center justify-between"
    const textClass = "cursor-text"
    const circleButtonClass = "rounded-full px-2 py-1 border-[2px] border-gray-700 hover:border-gray-400 text-gray-700 hover:text-gray-400"
    const set_data = () => {
        setPosition(job['position'])
    }
    useEffect(() => {
        set_data()
    }, [])
    return (
        <div className={detailsClass}>
            <div className="w-full flex flex-col items-center justify-start gap-2">
                <div className={headerClass}>
                    <p className={cn(textClass, "font-normal text-lg c2")}>{job.position}</p>
                    <div className="flex flex-row items-center justify-end-rev gap-4">
                        <p className={cn(textClass, "font-normal text-xs c3")}>Created
                            on: {cast_date(job.description.created_at, 'us')}</p>
                        <p className={cn(textClass, "font-normal text-xs c3")}>Last updated
                            on: {cast_datetime(job.description.updated_at, 'us')}</p>
                        <button className="p-2 hover:bg0-r" onMouseEnter={handleSettingsHover}
                                onMouseLeave={handleSettingsNotHover}>
                            <Image
                                src={settingsIsHovered ? "/icons/settings-vertical-light.svg" : "/icons/settings-vertical-dark.svg"}
                                alt="Logo"
                                height="3"
                                width="3"
                                className="relative"
                            />
                        </button>

                    </div>
                </div>
                <div className={cn(headerClass, 'justify-start gap-2')}>
                    {job.job_type ? (
                        <p className={cn(textClass, "px-4 py-1 bg-blue-950 rounded-full border border-embloy-blue font-normal text-embloy-blue text-xs")}>Category: {job.job_type}</p>):
                        (<button
                            className="py-1 px-4 bg-blue-950 dark:bg-blue-950 hover:bg-blue-950 dark:hover:bg-blue-950 rounded-full border border-embloy-blue font-normal text-embloy-blue text-xs cursor-pointer hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white text-embloy-green dark:text-embloy-green ml-2">
                            <p className={cn(textClass, " font-normal cursor-pointer text-xs bgneg")}>+ Add Category</p>
                        </button>)}
                    {job.start_slot ? (
                        <p className={cn(textClass, "px-4 py-1 bg-purple-950 rounded-full border border-embloy-purple-lighter font-normal text-embloy-purple-lighter text-xs")}>Onboarding
                            on: {cast_date(job.start_slot, 'us')}</p>) :
                        (<button
                            className="py-1 px-4 bg-purple-950 dark:bg-purple-950 hover:bg-purple-950 dark:hover:bg-purple-950 r rounded-full border border-embloy-purple-ligher font-normal text-embloy-purple-lighter text-xs cursor-pointer hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white text-embloy-green dark:text-embloy-green ml-2">
                            <p className={cn(textClass, " font-normal cursor-pointer text-xs bgneg")}>+ Add Onboarding date</p>
                        </button>)
                    }
                    {job.salary && job.currency ? (
                        <p className={cn(textClass, "px-4 py-1 bg-emerald-950 rounded-full border border-embloy-green font-normal text-embloy-green text-xs")}>Salary: {job.currency} {job.salary}/hour</p>
                    ) : (
                        <button
                            className="py-1 px-4 bg-emerald-950 dark:bg-emerald-950 hover:bg-emerald-950 dark:hover:bg-emerald-950 rounded-full border border-embloy-green font-normal text-embloy-green text-xs cursor-pointer hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white text-embloy-green dark:text-embloy-green ml-2">
                            <p className={cn(textClass, " font-normal cursor-pointer text-xs bgneg")}>+ Add Salary</p>
                        </button>

                    )}

                </div>
                <div className={headerClass}>
                    <div className="flex flex-col items-center justify-start">

                        <div className="flex flex-col items-start justify-start">
                            <p className="text-xs font-light text-gray-400 ">Position (required)</p>
                            <input
                                className="text-sm font-normal text-gray-400 p-2 bg-black rounded-full border-[2px] border-gray-400"
                                type="text"
                                name="position"
                                placeholder="Position"
                                value={position}
                                disabled={true}

                            />
                        </div>

                    </div>


                    <div className="max-w-3/10 flex flex-col items-center justify-start">


                        {Object.keys(job).map((key, index) => (
                            <p key={index} className="text-xs font-light text-gray-400">
                                {`${key}: ${job[key]}`}
                            </p>
                        ))}


                    </div>

                </div>
            </div>

            <div className={headerClass}>
                <p className={cn(textClass, "font-normal text-sm text-gray-700")}>Last update
                    on {cast_date(job['description']['updated_at'], 'us')}</p>
            </div>
        </div>
    )

}