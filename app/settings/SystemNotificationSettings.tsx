import React, {useContext, useEffect, useRef, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import '../globals.css'

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
                <h1 className="text-lg font-medium c2">System Notifications</h1>
                <div className="border border-gray-700 px-2 rounded-full">
                    <p className="c3 text-xs">Functionality disabled</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="c2">
                    Toggle receiving notifications about certain system properties.
                </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="w-full flex flex-row items-start justify-start gap-6">
                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium c1">Weekly sum-up email</p>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleWeeklyReportHover}
                                                     onMouseLeave={handleWeeklyReportNotHover}
                                                     disabled={true}

                                >
                                    <button className="c0 h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left cursor-not-allowed">
                                        <p className="c3">{weeklyReport ? "Enabled" : "Disabled"}</p>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuCheckboxItem
                                        key={"Enabled"}
                                        className="capitalize c2 hover:c0 cursor-pointer"
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
                                        className="capitalize c2 hover:c0 cursor-pointer"
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
                            <p className="text-xs c3">Weekly user traffic survey reception.</p>
                        </div>


                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium c1">Client token expiration reminder</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleCtExpirationAlertHover}
                                                     onMouseLeave={handleCtExpirationAlertNotHover}
                                                     disabled={true}
                                >
                                    <button className="c0 h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left cursor-not-allowed">
                                        <p className="c3">{prior} days</p>
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
                                                    className="capitalize c2 hover:c0 cursor-pointer"
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
                            <p className="text-xs c3">Timely client token expiration notifications.</p>
                        </div>



                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium c1">DM push alert</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleDmPushAlertHover}
                                                     onMouseLeave={handleDmPushAlertNotHover}
                                                     disabled={true}
                                >
                                    <button className="c0 h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left cursor-not-allowed">
                                        <p className="c3">{dmPushAlert ? "Enabled" : "Disabled"}</p>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuCheckboxItem
                                        key={"Enabled"}
                                        className="capitalize c2 hover:c0 cursor-pointer"
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
                                        className="capitalize c2 hover:c0 cursor-pointer"
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
                            <p className="text-xs c3">Direct message reception alerts.</p>
                        </div>

                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium c1">System status push alert</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleSysPushAlertHover}
                                                     onMouseLeave={handleSysPushAlertNotHover}
                                                     disabled={true}

                                >
                                    <button
                                        className="c0 h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left cursor-not-allowed">
                                        <p className="c3">{sysPushAlert ? "Enabled" : "Disabled"}</p>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuCheckboxItem
                                        key={"Enabled"}
                                        className="capitalize c2 hover:c0 cursor-pointer"
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
                                        className="capitalize c2 hover:c0 cursor-pointer"
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
                            <p className="text-xs c3">Real-time system functionality notifications.</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}