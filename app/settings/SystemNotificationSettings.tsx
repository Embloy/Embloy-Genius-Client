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


export function SystemNotificationSettings() {
    const [notificationsIsHovered, setNotificationsIsHovered] = useState(false);
    const handleNotificationsHover = () => {
        setNotificationsIsHovered(true);
    };

    const handleNotificationsNotHover = () => {
        setNotificationsIsHovered(false);
    };

    let user = useContext(UserContext);
    const [notificationEmails, setNotificationEmails] = useState({});
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        if (user && !notificationEmails[user.email]) {
            setNotificationEmails((prevEmails) => ({
                ...prevEmails,
                [user.email]: true, // todo: repace with locic that checks wheter this mail is actually in the notifications
            }));
        }
    }, [user, notificationEmails]);

    const handleNotificationEmails = (email, isChecked) => {
        setNotificationEmails((prevEmails) => ({
            ...prevEmails,
            [email]: isChecked,
        }));
    };

    const addNewEmail = () => {
        if (newEmail.trim() !== '') {
            setNotificationEmails((prevEmails) => ({
                ...prevEmails,
                [newEmail.trim()]: false,
            }));
            setNewEmail('');
        }
    };
    const router = useRouter();

    const [note, setNote] = useState('');
    const [noteIsHovered, setNoteIsHovered] = useState(false);
    const handleNoteHover = () => {
        setNoteIsHovered(true);
    };
    const handleNoteNotHover = () => {
        setNoteIsHovered(false);
    };
    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const [expires, setExpires] = useState(60);
    const [expiresIsHovered, setExpiresIsHovered] = useState(false);
    const handleExpiresHover = () => {
        setExpiresIsHovered(true);
    };
    const handleExpiresNotHover = () => {
        setExpiresIsHovered(false);
    };
    const handleExpires = (e) => {
        setExpires(e);
    }

    let expirations = [];
    async function fetch_access_token() {
        try {
            // todo: check parameters, if any given
            try {
                return request_access(getCookie("refresh", {path: "/"}))
                    .then((token) => {
                        return token
                    })
                    .catch((error) => {
                        logout(router);
                    });

            } catch (error) {
                logout(router);
            }

        } catch (error) {
            console.log("Fetching failed: " + error);

        }
    }


    const [isLoading, setIsLoading] = useState(false);
    const [success, setSucess] = useState(null);
    const accessTokenRef = useRef(null);
    const handleGenerate = async (e) => {
        //todo: take parameters into account
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = await fetch_access_token();
            if (token) {
                accessTokenRef.current.value = token;
                accessTokenRef.current.select();
                document.execCommand('copy'); // all browsers except firefox don't support mozillas new standard function yet...; https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand?retiredLocale=de#browser_compatibility
                setSucess(true);
            } else {
                setSucess(false);
            }


            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setSucess(false);
            setIsLoading(false);
        }

    }


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
                            <p className="font-medium text-gray-200">Email weekly sum-up</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleExpiresHover}
                                                     onMouseLeave={handleExpiresNotHover}>
                                    <button
                                        className={expiresIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left"}>
                                        <p>{expires} sec.</p>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {
                                        expirations.map((expiration, index) => {
                                            const key = Object.keys(expiration)[0];
                                            const value = Object.values(expiration)[0];
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={index}
                                                    className="capitalize text-gray-400 hover:text-white cursor-pointer"
                                                    checked={value == expires}
                                                    onCheckedChange={(check) => {
                                                        if (check) {
                                                            handleExpires(value)
                                                        }
                                                    }}
                                                >
                                                    {key}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <p className="text-xs text-gray-700">Weekly user traffic survey reception.</p>
                        </div>


                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium text-gray-200">Client token expiration reminder</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleExpiresHover}
                                                     onMouseLeave={handleExpiresNotHover}>
                                    <button
                                        className={expiresIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left"}>
                                        <p>{expires} sec.</p>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {
                                        expirations.map((expiration, index) => {
                                            const key = Object.keys(expiration)[0];
                                            const value = Object.values(expiration)[0];
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={index}
                                                    className="capitalize text-gray-400 hover:text-white cursor-pointer"
                                                    checked={value == expires}
                                                    onCheckedChange={(check) => {
                                                        if (check) {
                                                            handleExpires(value)
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
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleExpiresHover}
                                                     onMouseLeave={handleExpiresNotHover}>
                                    <button
                                        className={expiresIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left"}>
                                        <p>{expires} sec.</p>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {
                                        expirations.map((expiration, index) => {
                                            const key = Object.keys(expiration)[0];
                                            const value = Object.values(expiration)[0];
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={index}
                                                    className="capitalize text-gray-400 hover:text-white cursor-pointer"
                                                    checked={value == expires}
                                                    onCheckedChange={(check) => {
                                                        if (check) {
                                                            handleExpires(value)
                                                        }
                                                    }}
                                                >
                                                    {key}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <p className="text-xs text-gray-700">Direct message reception alerts.</p>
                        </div>

                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium text-gray-200">System status push alert</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleExpiresHover}
                                                     onMouseLeave={handleExpiresNotHover}>
                                    <button
                                        className={expiresIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left"}>
                                        <p>{expires} sec.</p>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {
                                        expirations.map((expiration, index) => {
                                            const key = Object.keys(expiration)[0];
                                            const value = Object.values(expiration)[0];
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={index}
                                                    className="capitalize text-gray-400 hover:text-white cursor-pointer"
                                                    checked={value == expires}
                                                    onCheckedChange={(check) => {
                                                        if (check) {
                                                            handleExpires(value)
                                                        }
                                                    }}
                                                >
                                                    {key}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        })}
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