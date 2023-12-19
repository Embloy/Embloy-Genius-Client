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



export function NotificationSettings() {
    const [notificationsIsHovered, setNotificationsIsHovered] = useState(false);
    const handleNotificationsHover = () => {
        setNotificationsIsHovered(true);
    }

    const handleNotificationsNotHover = () => {
        setNotificationsIsHovered(false)
    }



    let user = useContext(UserContext)
    const [notificationEmails, setNotificationEmails] = useState([]);

    const handleNotificationEmails = (e) => {
        setNotificationEmails(e)
    }

    const [newEmail, setNewEmail] = useState(null);

    useEffect(() => {
        if (user && !notificationEmails.includes(user.email)){
            let bin = [...notificationEmails, user.email];
            handleNotificationEmails(bin)
        }
    }, [user, notificationEmails]);


    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex flex-row items-center justify-start gap-3">
                <h1 className="text-lg font-medium">Notifications Email</h1>
                <div className="border border-gray-700 bg-black px-2 rounded-full" >
                    <p className="text-gray-700 text-xs">Functionality disabled</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="text-gray-400">
                    Choose where you would like emails to be sent. You can add more than one email address.
                </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        className="outline-none"
                        onMouseEnter={handleNotificationsHover}
                        onMouseLeave={handleNotificationsNotHover}
                    >
                        <button
                            className={
                                notificationsIsHovered
                                    ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left"
                                    : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left"
                            }
                        >
                            <p>
                                {notificationEmails.length > 0
                                    ? notificationEmails[0]
                                    : "None selected"}
                            </p>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {notificationEmails.map((email, index) => (
                            <DropdownMenuCheckboxItem
                                key={index}
                                className="text-gray-400 hover:text-white cursor-pointer"
                                checked={true}
                                onCheckedChange={(check) => {
                                    const updatedNotificationEmails = check
                                        ? [...notificationEmails, email]
                                        : notificationEmails.filter(
                                            (mail) => mail !== email
                                        );
                                    handleNotificationEmails(
                                        updatedNotificationEmails
                                    );
                                }}
                            >
                                {email}
                            </DropdownMenuCheckboxItem>
                        ))}
                        <div className="flex items-center justify-between mt-2">
                            <input
                                type="text"
                                placeholder="Enter new email"
                                className="border border-gray-700 px-2 py-1 rounded-lg text-gray-400 focus:outline-none"
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <button
                                className="bg-gray-900 text-white h-7 px-2 border-[2px] border-gray-700 rounded-lg text-sm focus:outline-none"
                                onClick={() => {
                                    // Add the new email to the list
                                    if (newEmail.trim() !== "") {
                                        handleNotificationEmails([
                                            ...notificationEmails,
                                            newEmail.trim(),
                                        ]);
                                        setNewEmail(""); // Clear the input field
                                    }
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="w-full flex flex-col items-start justify-start gap-1">
                    <div className="w-full flex flex-row items-start justify-between">
                        <div className="w-full flex flex-col items-start justify-start border border-gray-700 rounded-lg mt-2 mb-6">
                            <div className="w-full px-2 py-2 flex flex-row items-start justify-between">
                                <div className="flex flex-row items-start justify-start gap-4">
                                    <Image
                                        src="/icons/logo_black_white.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative"
                                    />
                                    <div className="flex flex-col items-start justify-start gap-1">
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="text-gray-200 font-medium text-sm">Embloy Mobile</p>
                                        </div>
                                        <p className="text-gray-700 text-xs">Embloy Mobile can be used for two-factor authentication by installing the app on your iOS device and signing into your account.</p>
                                    </div>
                                </div>
                                <button disabled={true} className="border-[2px] border-gray-700 rounded-full px-2 text-gray-700 text-sm cursor-not-allowed">
                                    <p>Add</p>
                                </button>
                            </div>


                            <div className="w-full h-px bg-gray-700" />

                            <div className="w-full px-2 py-2 flex flex-row items-start justify-between">
                                <div className="flex flex-row items-start justify-start gap-4">
                                    <Image
                                        src="/icons/mobile-white.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative"
                                    />
                                    <div className="flex flex-col items-start justify-start gap-1">
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="text-gray-200 font-medium text-sm">SMS/Text message</p>
                                        </div>
                                        <p className="text-gray-700 text-xs">Get one-time suthentication codes sent to your phone via SMS. (Android user´s choice)</p>
                                    </div>
                                </div>
                                <button disabled={true} className="border-[2px] border-gray-700 rounded-full px-2 text-gray-700 text-sm cursor-not-allowed">
                                    <p>Add</p>
                                </button>
                            </div>



                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}