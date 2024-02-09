"use client";
import {cn} from "@/lib/utils";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {cast_date, cast_datetime} from "@/lib/utils/formats";
import '@/app/globals.css'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import {DropdownMenuItem} from "@radix-ui/react-dropdown-menu";
import {patch_core} from "@/lib/misc_requests";
import {useRouter} from "next/navigation";


export function JobDetails({job, onUploadSuccess, onClose}) {
    const router = useRouter();
    const [settingsIsHovered, setSettingsIsHovered] = useState(false)
    const handleSettingsHover = () => {
        setSettingsIsHovered(true)
    }
    const handleSettingsNotHover = () => {
        setSettingsIsHovered(false)
    }

    const [position, setPosition] = useState(null) // todo: make it like in calendar


    const detailsClass = "w-full absolute flex flex-col items-center justify-between p-4 cursor-default"
    const headerClass = "w-full flex flex-row items-center justify-between"
    const textClass = "cursor-text"
    const set_data = () => {
        setPosition(job['position'])
    }

    const [listIsHovered, setListIsHovered] = useState(false);
    const handleListHover = () => {
        setListIsHovered(true);
    };
    const handleListNotHover = () => {
        setListIsHovered(false);
    };
    const [unlistIsHovered, setUnlistIsHovered] = useState(false);
    const handleUnlistHover = () => {
        setUnlistIsHovered(true);
    };
    const handleUnlistNotHover = () => {
        setUnlistIsHovered(false);
    };
    const [removeIsHovered, setRemoveIsHovered] = useState(false);
    const handleRemoveHover = () => {
        setRemoveIsHovered(true);
    };
    const handleRemoveNotHover = () => {
        setRemoveIsHovered(false);
    };


    const [uploading, setUploading] = useState(false)
    const updateStatus = async (e, job_id, status) => {
        console.log("Handling image change")
        if (job_id && status) {
            setUploading(true);
            const result = await patch_core(`/jobs?id=${job_id}`, router, {status: status})
            onUploadSuccess();
            if (status === 'archived') {
                onClose()
            }


        }
        setUploading(false);
    };

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
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="outline-none">
                                <button className="p-2 hover:bg0-r" onMouseEnter={handleSettingsHover}
                                        onMouseLeave={handleSettingsNotHover}>
                                    {
                                        uploading ?
                                            <button className="rounded-full c2-5 hover:underline text-xs bgneg z-50"
                                                    disabled={uploading}>
                                                <div role="status">
                                                    <svg aria-hidden="true"
                                                         className="inline w-4 h-4 mr-2 text-gray-500 animate-spin fill-white"
                                                         viewBox="0 0 100 101" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="currentColor"/>
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentFill"/>
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </button>
                                            :
                                            <Image
                                                src={settingsIsHovered ? "/icons/settings-vertical-light.svg" : "/icons/settings-vertical-dark.svg"}
                                                alt="Logo"
                                                height="3"
                                                width="3"
                                                className="relative"
                                            />
                                    }

                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {job.status && job.status === 'private' && (
                                    <DropdownMenuItem
                                        key="0"
                                        className="capitalize c2 hover:c0 cursor-pointer py-1.5 pl-4 pr-8 text-xs outline-none flex flex-row items-center "
                                        onSelect={(e) => {
                                            updateStatus(e, job.job_id, 'public')
                                        }}
                                        onMouseEnter={handleListHover}
                                        onMouseLeave={handleListNotHover}
                                    >
                                        {"Publish"}
                                        <Image
                                            src={cn(listIsHovered ? "/icons/sm-list-white.svg" : "/icons/sm-list-light.svg")}
                                            alt="columns"
                                            height="20"
                                            width="20"
                                            className="relative ml-px"
                                        />
                                    </DropdownMenuItem>
                                )}
                                {job.status && job.status === 'public' && (
                                    <DropdownMenuItem
                                        key="1"
                                        className="capitalize c2 hover:c0 cursor-pointer py-1.5 pl-4 pr-8 text-xs outline-none flex flex-row items-center"
                                        onSelect={(e) => {
                                            updateStatus(e, job.job_id, 'private')
                                        }}
                                        onMouseEnter={handleUnlistHover}
                                        onMouseLeave={handleUnlistNotHover}
                                    >
                                        {"Unlist"}
                                        <Image
                                            src={cn(unlistIsHovered ? "/icons/sm-unlist-white.svg" : "/icons/sm-unlist-light.svg")}
                                            alt="columns"
                                            height="20"
                                            width="20"
                                            className="relative ml-px"
                                        />
                                    </DropdownMenuItem>
                                )}
                                {job.status && job.status === 'archived' ? (
                                    <DropdownMenuItem
                                        key="3"
                                        className="capitalize c2 hover:c0 cursor-pointer py-1.5 pl-4 pr-8 text-xs outline-none flex flex-row items-center"
                                        onSelect={(e) => {
                                            updateStatus(e, job.job_id, 'private')
                                        }}
                                    >
                                        {"Retrieve"}
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem
                                        key="2"
                                        className="capitalize c2 hover:c0 cursor-pointer py-1.5 pl-4 pr-8 text-xs outline-none flex flex-row items-center"
                                        onSelect={(e) => {
                                            updateStatus(e, job.job_id, 'archived')
                                        }}
                                        onMouseEnter={handleRemoveHover}
                                        onMouseLeave={handleRemoveNotHover}
                                    >
                                        {"Remove/Archive"}
                                        <Image
                                            src={cn(removeIsHovered ? "/icons/sm-delete-white.svg" : "/icons/sm-delete-light.svg")}
                                            alt="columns"
                                            height="17"
                                            width="17"
                                            className="relative ml-px"
                                        />
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
                <div className={cn(headerClass, 'justify-start gap-2')}>
                    {job.status && (
                        <p className={cn(textClass, "px-4 py-1 bg-red-950 rounded-full border border-red-500 font-normal text-red-500 text-xs")}>{(() => {
                            if (job.status === 'private') {
                                return "Unlisted";
                            } else if (job.status === 'public') {
                                return "Public";
                            } else if (job.status === 'archived') {
                                return "Archived";
                            } else {
                                return "Unknown";
                            }
                        })()}</p>)
                    }
                    {job.job_type ? (
                            <p className={cn(textClass, "px-4 py-1 bg-blue-950 rounded-full border border-embloy-blue font-normal text-embloy-blue text-xs")}>Category: {job.job_type}</p>) :
                        (<button
                            className="py-1 px-4 bg-blue-950 dark:bg-blue-950 hover:bg-blue-950 dark:hover:bg-blue-950 rounded-full border border-embloy-blue font-normal text-embloy-blue text-xs cursor-pointer hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white text-embloy-blue dark:text-embloy-blue ml-2">
                            <p className={cn(textClass, " font-normal cursor-pointer text-xs bgneg")}>+ Add Category</p>
                        </button>)}
                    {job.start_slot ? (
                            <p className={cn(textClass, "px-4 py-1 bg-purple-950 rounded-full border border-embloy-purple-lighter font-normal text-embloy-purple-lighter text-xs")}>Onboarding
                                on: {cast_date(job.start_slot, 'us')}</p>) :
                        (<button
                            className="py-1 px-4 bg-purple-950 dark:bg-purple-950 hover:bg-purple-950 dark:hover:bg-purple-950 rounded-full border border-embloy-purple-lighter font-normal text-embloy-purple-lighter text-xs cursor-pointer hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white text-embloy-purple-lighter dark:text-embloy-purple-lighter ml-2">
                            <p className={cn(textClass, " font-normal cursor-pointer text-xs bgneg")}>+ Add Onboarding
                                date</p>
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
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Application Options</h2>
                    {job.application_options.map((option, index) => {
                        return (
                            <div key={index} className="mt-2">
                                <p className="text-sm font-semibold">{option.question}</p>
                                {option.options.map((opt, optIndex) => (
                                    <p key={optIndex} className="text-xs font-light text-gray-400">
                                        {opt}
                                    </p>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )

}