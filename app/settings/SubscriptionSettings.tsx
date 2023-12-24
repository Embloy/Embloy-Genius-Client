import React, {useContext, useEffect, useState} from "react";

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


export function SubscriptionSettings() {
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


    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex flex-row items-center justify-start gap-3">
                <h1 className="text-lg font-medium">Subscriptions</h1>
                <div className="border border-gray-700 bg-black px-2 rounded-full">
                    <p className="text-gray-700 text-xs">Functionality disabled</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="text-gray-400">
                    Manage subscription plans for personal or commercial use.
                    <a
                        className="px-1 italic text-embloy-purple-lighter hover:underline cursor-pointer"
                        href="https://about.embloy.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn more
                    </a>
                    about the offered subscription options.
                </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">

                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        className="outline-none"
                        onMouseEnter={handleNotificationsHover}
                        onMouseLeave={handleNotificationsNotHover}
                        disabled={true}
                    >
                        <button
                            className={
                                notificationsIsHovered
                                    ? 'bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-none rounded-lg text-left flex flex-row cursor-not-allowed'
                                    : 'bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-none rounded-lg text-left flex flex-row cursor-not-allowed'
                            }
                        >
                            <p className="text-gray-700">
                                {Object.keys(notificationEmails).length > 0
                                    ? Object.keys(notificationEmails).find(
                                    (email) => notificationEmails[email]
                                ) || 'None selected'
                                    : 'None selected'}
                            </p>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {Object.keys(notificationEmails).map((email, index) => (
                            <DropdownMenuCheckboxItem
                                key={index}
                                className="text-gray-400 hover:text-white cursor-pointer"
                                checked={notificationEmails[email]}
                                onCheckedChange={(check) =>
                                    handleNotificationEmails(email, check)
                                }
                            >
                                {email}
                            </DropdownMenuCheckboxItem>
                        ))}
                        <div className="flex items-center justify-between mt-2">
                            <input
                                type="text"
                                placeholder="Enter new email"
                                value={newEmail}
                                className="border border-gray-700 px-2 py-1 rounded-lg text-gray-400 focus:outline-none"
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <button
                                className="bg-gray-900 text-white h-7 px-2 border-[2px] border-gray-700 rounded-lg text-sm focus:outline-none"
                                onClick={addNewEmail}
                            >
                                Add
                            </button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}