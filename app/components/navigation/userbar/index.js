"use client";
import React, {useContext} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {logout} from "@/lib/authentication";
import Link from "next/link";

export const UserBar = ({ isVisible, onClose, userData, storeData }) => {
    const router = useRouter();
    function calculateMinutesFromNow(timestamp) {
        const currentTime = new Date();
        const inputTime = new Date(timestamp);
        const timeDifference = inputTime.getTime() - currentTime.getTime();
        const minutes = Math.floor(timeDifference / (1000 * 60)) * (-1);

        return minutes;
    }
    function out (){
        logout(router);
    }


    const sidebarClass = `z-50 fixed top-0 right-0 h-full w-96 border-l-[1px] border-gray-700 transition-transform transform ${isVisible ? 'translate-x-0' : 'translate-x-full'}`;
    const sidebarfieldClass = `w-full flex flex-row justify-start items-start text-white gap-2.5 hover:bg-gray-700 p-2.5 cursor-pointer`;
    const sidebarfieldleftClass = `w-1/7 flex flex-col justify-start items-start text-white gap-2.5`;
    const sidebarfieldrightClass = `w-6/7 flex flex-col justify-start items-start text-white gap-1.5`;




    return (
        <div className={sidebarClass}>
            <div className="flex h-full w-full">
                    {userData && storeData ? (
                        <div className="h-full w-full flex flex-col justify-start items-center">
                            <div className="w-full h-4" />
                            <div className="w-full flex flex-col justify-start items-start text-white px-2.5">
                                <div className="w-full h-2.5" />
                                <div className="w-full flex flex-row justify-start items-center text-white gap-2.5">
                                    <div className="w-1/6 flex flex-col justify-start items-start text-white gap-2.5">
                                        <button className={`w-10 h-10 rounded-full bg-red-400`}></button>
                                    </div>
                                    <div className="w-5/6 flex flex-col justify-start items-start text-white gap-1.5">
                                        <p className="font-bold">{userData.first_name} {userData.last_name}</p>
                                        <p className="text-sm">{userData.email}</p>
                                    </div>
                                </div>
                                <div className="w-full h-4" />
                            </div>

                            <div className="w-full h-4" />
                            <div className="w-full bg-gray-700 h-[1px]" />
                            <div className="w-full h-4" />

                            <a className={sidebarfieldClass} href="https://www.about.embloy.com" target="_blank" rel="noopener noreferrer">
                                <div className={sidebarfieldleftClass}>
                                    <Image
                                        src="/icons/logo_black_white.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative"
                                    />
                                </div>
                                <div className={sidebarfieldrightClass}>
                                    <p className="text-sm">Embloy Account</p>
                                </div>
                            </a>

                            <div className={sidebarfieldClass} onClick={out}>
                                <div className={sidebarfieldleftClass}>
                                    <Image
                                        src="/icons/logout.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative"
                                    />
                                </div>
                                <div className={sidebarfieldrightClass}>
                                    <p className="text-sm">Logout</p>
                                </div>
                            </div>

                            <div className="w-full h-4" />
                            <div className="w-full bg-gray-700 h-[1px]" />
                            <div className="w-full h-4" />


                            <a className={sidebarfieldClass} href="https://documenter.getpostman.com/view/24977803/2s9YRB2rkE" target="_blank" rel="noopener noreferrer">
                                <div className={sidebarfieldleftClass}>
                                    <Image
                                        src="/icons/api.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative"
                                    />
                                </div>
                                <div className={sidebarfieldrightClass}>
                                    <p className="text-sm">API</p>
                                </div>
                            </a>


                            <div className={sidebarfieldClass} onClick={out}>
                                <div className={sidebarfieldleftClass}>
                                    <Image
                                        src="/icons/languages.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative"
                                    />
                                </div>
                                <div className={sidebarfieldrightClass}>
                                    <p className="text-sm" >Languages</p>
                                </div>
                            </div>


                            <Link className={sidebarfieldClass} href="/settings" onClick={onClose}>
                                <div className={sidebarfieldleftClass}>
                                    <Image
                                        src="/icons/settings.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative"
                                    />
                                </div>
                                <div className={sidebarfieldrightClass}>
                                    <p className="text-sm" >Settings</p>
                                </div>
                            </Link>


                            <div className="w-full h-4" />
                            <div className="w-full bg-gray-700 h-[1px]" />
                            <div className="w-full h-4" />


                            <a className={sidebarfieldClass} href="https://about.embloy.com/en/contact/" target="_blank" rel="noopener noreferrer">
                                <div className={sidebarfieldleftClass}>
                                    <Image
                                        src="/icons/help.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative"
                                    />
                                </div>
                                <div className={sidebarfieldrightClass}>
                                    <p className="text-sm">Help</p>
                                </div>
                            </a>


                            <a className={sidebarfieldClass} href="https://about.embloy.com/en/contact/" target="_blank" rel="noopener noreferrer">
                                <div className={sidebarfieldleftClass}>
                                    <Image
                                        src="/icons/feedback.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative"
                                    />
                                </div>
                                <div className={sidebarfieldrightClass}>
                                        <p className="text-sm">Feedback</p>
                                </div>
                            </a>



                            <div className="w-full h-4" />
                            <div className="w-full bg-gray-700 h-[1px]" />
                            <div className="w-full h-4" />

                            <div className="w-full flex flex-row justify-start items-start text-white gap-2.5 p-2.5">
                                <div className="w-full flex flex-row justify-start items-center text-white gap-2.5">
                                    <p className="text-sm text-gray-700 italic">On Embloy for {calculateMinutesFromNow(userData["created_at"])} minutes!</p>
                                </div>
                            </div>
                            <div className="w-full h-4" />
                            <button className="text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-full border-solid border-[2px] border-gray-700" onClick={onClose}>Close</button>
                        </div>
                    ): (
                        <button>Sign in</button>
                    )}

            </div>
        </div>
    );
}