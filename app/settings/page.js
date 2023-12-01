"use client";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";

export default function Settings() {
    const [currentSubPageID, setcurrentSubPageID] = useState(0);
    const [profileIsHovered, setProfileIsHovered] = useState(false);
    const [accessIsHovered, setAccessIsHovered] = useState(false);
    const [securityIsHovered, setSecurityIsHovered] = useState(false);
    const [integrationsIsHovered, setIntegrationsIsHovered] = useState(false);
    const [archiveIsHovered, setArchiveIsHovered] = useState(false);
    const switchSubPage = (id) => {
        if (currentSubPageID != id){
            setcurrentSubPageID(id);
        }
    }
    const profileSubPageID = 0;
    const profileSubPage = () => {
        switchSubPage(profileSubPageID);
    };
    const handleProfileHover = () => {
        setProfileIsHovered(true);
    }
    const handleProfileNotHover = () => {
        setProfileIsHovered(false);
    }
    const accessSubPageID = 1;
    const accessSubPage = () => {
        switchSubPage(accessSubPageID);
    };
    const handleAccessHover = () => {
        setAccessIsHovered(true);
    }
    const handleAccessNotHover = () => {
        setAccessIsHovered(false);
    }
    const securitySubPageID = 2;
    const securitySubPage = () => {
        switchSubPage(securitySubPageID);
    };
    const handleSecurityHover = () => {
        setSecurityIsHovered(true);
    }
    const handleSecurityNotHover = () => {
        setSecurityIsHovered(false);
    }
    const integrationsSubPageID = 3;
    const integrationsSubPage = () => {
        switchSubPage(integrationsSubPageID);
    };
    const handleArchiveHover = () => {
        setArchiveIsHovered(true);
    }
    const handleArchiveNotHover = () => {
        setArchiveIsHovered(false);
    }
    const archiveSubPageID = 4;
    const archiveSubPage = () => {
        switchSubPage(archiveSubPageID);
    };
    const handleIntegrationsHover = () => {
        setIntegrationsIsHovered(true);
    }
    const handleIntegrationsNotHover = () => {
        setIntegrationsIsHovered(false);
    }
    return (
        <main className=" text-white flex min-h-screen h-full flex-col items-center justify-start">
            <div className="z-10 max-w-6xl w-full min-h-screen h-full border-l-[1px] border-r-[1px] border-gray-700 flex flex-col items-center justify-start">
                <div className="w-full flex flex-col items-center justify-start p-4">
                    <div className="w-full flex flex-row items-center justify-between my-4">
                        <h1 className="font-medium text-2xl ">Settings</h1>
                    </div>
                    <div className="w-full h-4" />
                </div>

                <div className="w-full flex flex-col items-center justify-start">
                    <ul className="text-sm w-full flex flex-row items-center justify-start">
                        <li onClick={profileSubPage} onMouseEnter={handleProfileHover} onMouseLeave={handleProfileNotHover} className={cn(currentSubPageID === profileSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-6 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-6 text-gray-400 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full flex flex-row items-center justify-center gap-1" >
                                <Image
                                    src={cn(currentSubPageID === profileSubPageID ? "/icons/profile-white.svg" : cn(profileIsHovered ? "/icons/profile-white.svg" : "/icons/profile-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative"
                                />
                                <p>Profile</p>
                            </div>
                        </li>
                        <li onClick={accessSubPage} onMouseEnter={handleAccessHover} onMouseLeave={handleAccessNotHover} className={cn(currentSubPageID === accessSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-6 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-6 text-gray-400 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full flex flex-row items-center justify-center gap-1" >
                                <Image
                                    src={cn(currentSubPageID === accessSubPageID ? "/icons/access-white.svg" : cn(accessIsHovered ? "/icons/access-white.svg" : "/icons/access-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative"
                                />
                                <p>Access</p>
                            </div>
                        </li>
                        <li onClick={securitySubPage} onMouseEnter={handleSecurityHover} onMouseLeave={handleSecurityNotHover} className={cn(currentSubPageID === securitySubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-6 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-6 text-gray-400 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full flex flex-row items-center justify-center gap-1" >
                                <Image
                                    src={cn(currentSubPageID === securitySubPageID ? "/icons/security-white.svg" : cn(securityIsHovered ? "/icons/security-white.svg" : "/icons/security-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative"
                                />
                                <p>Security</p>
                            </div>
                        </li>
                        <li onClick={integrationsSubPage} onMouseEnter={handleIntegrationsHover} onMouseLeave={handleIntegrationsNotHover} className={cn(currentSubPageID === integrationsSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-6 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-6 text-gray-400 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full flex flex-row items-center justify-center gap-1" >
                                <Image
                                    src={cn(currentSubPageID === integrationsSubPageID ? "/icons/integrations-white.svg" : cn(integrationsIsHovered ? "/icons/integrations-white.svg" : "/icons/integrations-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative"
                                />
                                <p>Integrations</p>
                            </div>
                        </li>
                        <li onClick={archiveSubPage} onMouseEnter={handleArchiveHover} onMouseLeave={handleArchiveNotHover} className={cn(currentSubPageID === archiveSubPageID ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-6 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-6 text-gray-400 hover:text-white cursor-pointer")} >
                            <div className="h-full w-full flex flex-row items-center justify-center gap-1" >
                                <Image
                                    src={cn(currentSubPageID === archiveSubPageID ? "/icons/archive-white.svg" : cn(archiveIsHovered ? "/icons/archive-white.svg" : "/icons/archive-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative"
                                />
                                <p>Archive</p>
                            </div>
                        </li>
                        <li className="cursor-default text-transparent select-none w-screen flex flex-row items-center justify-start border-b-[1px] border-gray-700 p-2" >
                            <button className="cursor-default">
                                <p>Promotions</p>
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </main>
    );

}