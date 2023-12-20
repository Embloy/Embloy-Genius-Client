import React, {useContext, useEffect, useRef, useState} from "react";

import {UserContext} from "@/app/components/misc/UserContext";
import {login, logout, request_access, request_client, request_refresh, update_password} from "@/lib/authentication";
import {getCookie, setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import {ChevronDown} from "lucide-react";
import {cast_date, date_seconds_from_now} from "@/lib/utils/formats";

interface Expiration {
    [key: string]: number;
}

const priors: Expiration[] = [
    {"1 day": 1},
    {"2 days": 2},
    {"1 Week": 7},
    {"2 Weeks": 14}
];
export function SystemNotificationSettings() {

    const [weeklyReport, setWeeklyReport] = useState(false); //todo: replace with backend integration
    const [weeklyReportIsHovered, setWeeklyReportIsHovered] = useState(false);
    const handleWeeklyReportHover = () => {
        setWeeklyReportIsHovered(true);
    };
    const handleWeeklyReportNotHover = () => {
        setWeeklyReportIsHovered(false);
    };
    const [dmPushAlert, setDmPushAlert] = useState(false); //todo: replace with backend integration
    const [dmPushAlertIsHovered, setDmPushAlertIsHovered] = useState(false);
    const handleDmPushAlertHover = () => {
        setDmPushAlertIsHovered(true);
    };
    const handleDmPushAlertNotHover = () => {
        setDmPushAlertIsHovered(false);
    };
    const [sysPushAlert, setSysPushAlert] = useState(false); //todo: replace with backend integration
    const [sysPushAlertIsHovered, setSysPushAlertIsHovered] = useState(false);
    const handleSysPushAlertHover = () => {
        setSysPushAlertIsHovered(true);
    };
    const handleSysPushAlertNotHover = () => {
        setSysPushAlertIsHovered(false);
    };

    const [ctExpirationAlertIsHovered, setCtExpirationAlertIsHovered] = useState(false);
    const [prior,setPrior] = useState(1);
    const handleCtExpirationAlertHover = () => {
        setCtExpirationAlertIsHovered(true);
    };
    const handleCtExpirationAlertNotHover = () => {
        setCtExpirationAlertIsHovered(false);
    };


    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex flex-row items-center justify-start gap-3">
                <h1 className="text-lg font-medium">System Notifications</h1>
                <div className="border border-gray-700 bg-black px-2 rounded-full">
                    <p className="text-gray-700 text-xs">Functionality disabled</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="text-gray-400">
                    Toggle receiving notifications about certain system properties.
                </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="w-full flex flex-row items-start justify-start gap-6">
                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium text-gray-200">Weekly sum-up email</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleWeeklyReportHover}
                                                     onMouseLeave={handleWeeklyReportNotHover}
                                                     disabled={true}
                                >
                                    <button
                                        className={weeklyReportIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left cursor-not-allowed" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left cursor-not-allowed"}>
                                        <p>{weeklyReport ? "Enabled" : "Disabled"}</p>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuCheckboxItem
                                        key={"Enabled"}
                                        className="capitalize text-gray-400 hover:text-white cursor-pointer"
                                        checked={weeklyReport == true}
                                        onCheckedChange={(check) => {
                                            if (check) {
                                                setWeeklyReport(true)
                                            }
                                        }}
                                    >
                                        {"Enabled"}
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        key={"Disabled"}
                                        className="capitalize text-gray-400 hover:text-white cursor-pointer"
                                        checked={weeklyReport == false}
                                        onCheckedChange={(check) => {
                                            if (check) {
                                                setWeeklyReport(false)
                                            }
                                        }}
                                    >
                                        {"Disabled"}
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <p className="text-xs text-gray-700">Weekly user traffic survey reception.</p>
                        </div>


                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium text-gray-200">Client token expiration reminder</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleCtExpirationAlertHover}
                                                     onMouseLeave={handleCtExpirationAlertNotHover}
                                                     disabled={true}
                                >
                                    <button
                                        className={ctExpirationAlertIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left cursor-not-allowed" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left cursor-not-allowed"}>
                                        <p>{prior} days</p>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {
                                        priors.map((expiration, index) => {
                                            const key = Object.keys(expiration)[0];
                                            const value = Object.values(expiration)[0];
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={index}
                                                    className="capitalize text-gray-400 hover:text-white cursor-pointer"
                                                    checked={value == prior}
                                                    onCheckedChange={(check) => {
                                                        if (check) {
                                                            setPrior(value)
                                                        }
                                                    }}
                                                >
                                                    {key}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <p className="text-xs text-gray-700">Timely client token expiration notifications.</p>
                        </div>



                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium text-gray-200">DM push alert</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleDmPushAlertHover}
                                                     onMouseLeave={handleDmPushAlertNotHover}>
                                    <button
                                        className={dmPushAlertIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left"}>
                                        <p>{dmPushAlert ? "Enabled" : "Disabled"}</p>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuCheckboxItem
                                        key={"Enabled"}
                                        className="capitalize text-gray-400 hover:text-white cursor-pointer"
                                        checked={dmPushAlert == true}
                                        onCheckedChange={(check) => {
                                            if (check) {
                                                setDmPushAlert(true)
                                            }
                                        }}
                                    >
                                        {"Enabled"}
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        key={"Disabled"}
                                        className="capitalize text-gray-400 hover:text-white cursor-pointer"
                                        checked={dmPushAlert == false}
                                        onCheckedChange={(check) => {
                                            if (check) {
                                                setDmPushAlert(false)
                                            }
                                        }}
                                    >
                                        {"Disabled"}
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <p className="text-xs text-gray-700">Direct message reception alerts.</p>
                        </div>

                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium text-gray-200">System status push alert</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleSysPushAlertHover}
                                                     onMouseLeave={handleSysPushAlertNotHover}>
                                    <button
                                        className={sysPushAlertIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left"}>
                                        <p>{sysPushAlert ? "Enabled" : "Disabled"}</p>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuCheckboxItem
                                        key={"Enabled"}
                                        className="capitalize text-gray-400 hover:text-white cursor-pointer"
                                        checked={sysPushAlert == true}
                                        onCheckedChange={(check) => {
                                            if (check) {
                                                setSysPushAlert(true)
                                            }
                                        }}
                                    >
                                        {"Enabled"}
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        key={"Disabled"}
                                        className="capitalize text-gray-400 hover:text-white cursor-pointer"
                                        checked={sysPushAlert == false}
                                        onCheckedChange={(check) => {
                                            if (check) {
                                                setSysPushAlert(false)
                                            }
                                        }}
                                    >
                                        {"Disabled"}
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <p className="text-xs text-gray-700">Real-time system functionality notifications.</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}