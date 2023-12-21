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

export function GeniusSettings() {

    const [genius, setGenius] = useState(false); //todo: replace with backend integration
    const [GeniusIsHovered, setGeniusIsHovered] = useState(false);
    const handleGeniusHover = () => {
        setGeniusIsHovered(true);
    };
    const handleGeniusNotHover = () => {
        setGeniusIsHovered(false);
    };

    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex flex-row items-center justify-start gap-3">
                <h1 className="text-lg font-medium">Embloy Genius</h1>
                <div className="border border-transparent bg-red-500 px-2 rounded-full">
                    <p className="text-white text-xs">Inactive</p>
                </div>
                <div className="border border-gray-700 bg-black px-2 rounded-full">
                    <p className="text-gray-700 text-xs">Functionality disabled</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="text-gray-400">
                    Receive candidate suggestions aligning with your individual requirements.
                    <a className="px-1 italic text-embloy-purple-lighter hover:underline cursor-pointer"
                       href="https://about.embloy.com">Learn more</a>
                </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">

                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleGeniusHover}
                                         onMouseLeave={handleGeniusNotHover}
                                         disabled={true}

                    >
                        <button
                            className={GeniusIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left cursor-not-allowed" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left cursor-not-allowed"}>
                            <p className="text-gray-700">{genius ? "Enabled" : "Disabled"}</p>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                            key={"Enabled"}
                            className="capitalize text-gray-400 hover:text-white cursor-pointer"
                            checked={genius == true}
                            onCheckedChange={(check) => {
                                if (check) {
                                    setGenius(true)
                                }
                            }}
                        >
                            {"Enabled"}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            key={"Disabled"}
                            className="capitalize text-gray-400 hover:text-white cursor-pointer"
                            checked={genius == false}
                            onCheckedChange={(check) => {
                                if (check) {
                                    setGenius(false)
                                }
                            }}
                        >
                            {"Disabled"}
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
        </div>
    )
}