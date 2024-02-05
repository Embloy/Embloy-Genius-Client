"use client";
import {cn} from "@/lib/utils";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {cast_date} from "@/lib/utils/formats";

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
            <div className="w-full flex flex-col items-center justify-start gap-8">
                <div className={headerClass}>
                    <p className={cn(textClass, "font-normal text-base text-gray-700")}>Job Details</p>
                    <div className="flex flex-row items-center justify-end-rev gap-4">
                        <button className={circleButtonClass}>
                            <p className="font-normal text-xs">Edit</p>
                        </button>
                        <button className="p-2" onMouseEnter={handleSettingsHover} onMouseLeave={handleSettingsNotHover}>
                            <Image
                                src={settingsIsHovered ? "/icons/settings-vertical-light.svg" : "/icons/settings-vertical-dark.svg"}
                                alt="Logo"
                                height="4"
                                width="4"
                                className="relative"
                            />
                        </button>
                    </div>
                </div>
                <div className={headerClass}>

                    <div className="max-w-6/10 flex flex-col items-center justify-start">

                        <div className="flex flex-col items-start justify-start">
                            <p className="text-xs font-light text-gray-400 ">Position (required)</p>
                            <input
                                className="text-sm font-normal text-gray-400 p-2 bg-black rounded-full border-[2px] border-gray-400"
                                type="text"
                                name="position"
                                placeholder="Position"
                                value={position}
                                disabled={true}
                                onChange={console.log("change")}

                            />
                        </div>

                    </div>

                    <div className="max-w-3/10 flex flex-col items-center justify-start">

                        <div className="flex flex-col items-start justify-start">
                            <p className="text-xs font-light text-gray-400 ">Position (required)</p>
                            <input
                                className="text-sm font-normal text-gray-400 p-2 bg-black rounded-full border-[2px] border-gray-400"
                                type="text"
                                name="position"
                                placeholder="Position"
                                value={position}
                                disabled={true}
                                onChange={console.log("change")}

                            />
                        </div>

                    </div>

                </div>
            </div>

            <div className={headerClass}>
                <p className={cn(textClass, "font-normal text-sm text-gray-700")}>Last update on {cast_date(job['description']['updated_at'], 'us')}</p>
            </div>
        </div>
    )

}