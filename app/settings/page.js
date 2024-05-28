"use client";
import React, { useContext, useState, Suspense } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AccessSettings } from "@/app/settings/access/access";
import { SecretsSettings } from "@/app/settings/secrets/secrets";
import { ProfileSettings } from "@/app/settings/profile/profile";
import { UserContext } from "@/app/components/dom/main/wrappers/UserContext";
import { StoreContext } from "@/app/components/dom/main/wrappers/StoreWrapper";
import LoadingScreen from "@/app/components/dom/main/screens/LoadingScreen";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import '@/app/globals.css'

function SettingsPanel() {
    const [currentSubPageID, setcurrentSubPageID] = useState(0);
    const [profileIsHovered, setProfileIsHovered] = useState(false);
    const [accessIsHovered, setAccessIsHovered] = useState(false);
    const [securityIsHovered, setSecurityIsHovered] = useState(false);
    const [integrationsIsHovered, setIntegrationsIsHovered] = useState(false);
    const [archiveIsHovered, setArchiveIsHovered] = useState(false);
    const [secretsIsHovered, setSecretsIsHovered] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check if the tab query parameter exists
        if (searchParams && searchParams.has("tab")) {
            // Convert the tab name to a subpage ID
            const tabToSubPageID = {
                profile: 0,
                access: 1,
                secrets: 2,
                integrations: 3,
                archive: 4,
                // security: 5,
            };
            const subPageID = tabToSubPageID[searchParams.get("tab")];

            // If the subpage ID is valid, switch to it
            if (subPageID !== undefined) {
                setcurrentSubPageID(subPageID);
            }
        }
    }, [searchParams]);

    const switchSubPage = (id) => {
        if (currentSubPageID != id) {
            setcurrentSubPageID(id);
        }
    }
    const profileSubPageID = 0;
    const profileSubPage = () => {
        switchSubPage(profileSubPageID);
    };

    const accessSubPageID = 1;
    const accessSubPage = () => {
        switchSubPage(accessSubPageID);
    };

    const secretsSubPageID = 2;
    const secretsSubPage = () => {
        switchSubPage(secretsSubPageID);
    };

    const integrationsSubPageID = 3;
    const integrationsSubPage = () => {
        switchSubPage(integrationsSubPageID);
    };

    const archiveSubPageID = 4;
    const archiveSubPage = () => {
        switchSubPage(archiveSubPageID);
    };

    const securitySubPageID = 5;
    const securitySubPage = () => {
        switchSubPage(securitySubPageID);
    };

    let user = useContext(UserContext);
    let store = useContext(StoreContext);
    if (!user) return (<LoadingScreen />);

    return (
        <main className="c0 flex min-h-screen h-full flex-col items-center justify-start">
            <div className="z-10 max-w-6xl w-full min-h-screen h-full border-l-[1px] border-r-[1px] border-gray-700 flex flex-col items-center justify-start">
                <div className="w-full flex flex-col items-center justify-start p-4">
                    <div className="w-full flex flex-row items-center justify-between my-4">
                        <h1 className="font-medium text-2xl ">Settings</h1>
                    </div>
                    <div className="w-full h-4" />
                </div>

                <div className="w-full flex flex-col items-center justify-start">
                    <ul className="text-sm w-full flex flex-row items-center justify-start">
                        <li onClick={profileSubPage} onMouseEnter={() => setProfileIsHovered(true)} onMouseLeave={() => setProfileIsHovered(false)} className={cn(currentSubPageID === profileSubPageID ? "flex flex-row items-center justify-start border-b-[1px] dark:bg-black bg-embloy-green border-embloy-green py-2 px-6 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 dark:hover:border-gray-400 py-2 px-6 text-gray-400 dark:hover:text-white hover:text-embloy-green cursor-pointer")} >
                            <div className="h-full w-full flex flex-row items-center justify-center gap-1" >
                                <Image
                                    src={cn(currentSubPageID === profileSubPageID ? "/icons/profile-white.svg" : cn(profileIsHovered ? "/icons/profile-white.svg" : "/icons/profile-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative hidden dark:block"
                                />
                                <Image
                                    src={cn(currentSubPageID === profileSubPageID ? "/icons/profile-white.svg" : cn(profileIsHovered ? "/icons/profile-green.svg" : "/icons/profile-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative dark:hidden"
                                />
                                <p>Profile</p>
                            </div>
                        </li>
                        <li onClick={accessSubPage} onMouseEnter={() => setAccessIsHovered(true)} onMouseLeave={() => setAccessIsHovered(false)} className={cn(currentSubPageID === accessSubPageID ? "flex flex-row items-center justify-start border-b-[1px] dark:bg-black bg-embloy-green border-embloy-green py-2 px-6 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 dark:hover:border-gray-400 py-2 px-6 text-gray-400 dark:hover:text-white hover:text-embloy-green cursor-pointer")} >
                            <div className="h-full w-full flex flex-row items-center justify-center gap-1" >
                                <Image
                                    src={cn(currentSubPageID === accessSubPageID ? "/icons/security-white.svg" : cn(accessIsHovered ? "/icons/security-white.svg" : "/icons/security-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative hidden dark:block"
                                />
                                <Image
                                    src={cn(currentSubPageID === accessSubPageID ? "/icons/security-white.svg" : cn(accessIsHovered ? "/icons/security-green.svg" : "/icons/security-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative dark:hidden"
                                />
                                <p>Access</p>
                            </div>
                        </li>
                        <li onClick={secretsSubPage} onMouseEnter={() => setSecretsIsHovered(true)} onMouseLeave={() => setSecretsIsHovered(false)} className={cn(currentSubPageID === secretsSubPageID ? "flex flex-row items-center justify-start border-b-[1px] dark:bg-black bg-embloy-green border-embloy-green py-2 px-6 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 dark:hover:border-gray-400 py-2 px-6 text-gray-400 dark:hover:text-white hover:text-embloy-green cursor-pointer")} >
                            <div className="h-full w-full flex flex-row items-center justify-center gap-1" >
                                <Image
                                    src={cn(currentSubPageID === secretsSubPageID ? "/icons/access-white.svg" : cn(secretsIsHovered ? "/icons/access-white.svg" : "/icons/access-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative hidden dark:block"
                                />
                                <Image
                                    src={cn(currentSubPageID === secretsSubPageID ? "/icons/access-white.svg" : cn(secretsIsHovered ? "/icons/access-green.svg" : "/icons/access-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative dark:hidden"
                                />
                                <p>Secrets</p>
                            </div>
                        </li>
                        <li onClick={integrationsSubPage} onMouseEnter={() => setIntegrationsIsHovered(true)} onMouseLeave={() => setIntegrationsIsHovered(false)} className={cn(currentSubPageID === integrationsSubPageID ? "flex flex-row items-center justify-start border-b-[1px] dark:bg-black bg-embloy-green border-embloy-green py-2 px-6 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 dark:hover:border-gray-400 py-2 px-6 text-gray-400 dark:hover:text-white hover:text-embloy-green cursor-pointer")} >
                            <div className="h-full w-full flex flex-row items-center justify-center gap-1" >
                                <Image
                                    src={cn(currentSubPageID === integrationsSubPageID ? "/icons/integrations-white.svg" : cn(integrationsIsHovered ? "/icons/integrations-white.svg" : "/icons/integrations-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative hidden dark:block"
                                />
                                <Image
                                    src={cn(currentSubPageID === integrationsSubPageID ? "/icons/integrations-white.svg" : cn(integrationsIsHovered ? "/icons/integrations-green.svg" : "/icons/integrations-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative dark:hidden"
                                />
                                <p>Integrations</p>
                            </div>
                        </li>
                        <li onClick={archiveSubPage} onMouseEnter={() => setArchiveIsHovered(true)} onMouseLeave={() => setArchiveIsHovered(false)} className={cn(currentSubPageID === archiveSubPageID ? "flex flex-row items-center justify-start border-b-[1px] dark:bg-black bg-embloy-green border-embloy-green py-2 px-6 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 dark:hover:border-gray-400 py-2 px-6 text-gray-400 dark:hover:text-white hover:text-embloy-green cursor-pointer")} >
                            <div className="h-full w-full flex flex-row items-center justify-center gap-1" >
                                <Image
                                    src={cn(currentSubPageID === archiveSubPageID ? "/icons/archive-white.svg" : cn(archiveIsHovered ? "/icons/archive-white.svg" : "/icons/archive-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative hidden dark:block"
                                />
                                <Image
                                    src={cn(currentSubPageID === archiveSubPageID ? "/icons/archive-white.svg" : cn(archiveIsHovered ? "/icons/archive-green.svg" : "/icons/archive-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative dark:hidden"
                                />
                                <p>Archive</p>
                            </div>
                        </li>
                        {/*<li onClick={securitySubPage} onMouseEnter={() => setSecurityIsHovered(true)} onMouseLeave={() => setSecurityIsHovered(false)} className={cn(currentSubPageID === securitySubPageID ? "flex flex-row items-center justify-start border-b-[1px] dark:bg-black bg-embloy-green border-embloy-green py-2 px-6 text-white cursor-pointer" : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 dark:hover:border-gray-400 py-2 px-6 text-gray-400 dark:hover:text-white hover:text-embloy-green cursor-pointer")} >
                            <div className="h-full w-full flex flex-row items-center justify-center gap-1" >
                                <Image
                                    src={cn(currentSubPageID === securitySubPageID ? "/icons/security-white.svg" : cn(securityIsHovered ? "/icons/security-white.svg" : "/icons/security-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative hidden dark:block"
                                />
                                <Image
                                    src={cn(currentSubPageID === securitySubPageID ? "/icons/security-white.svg" : cn(securityIsHovered ? "/icons/security-green.svg" : "/icons/security-light.svg"))}
                                    alt="Logo"
                                    height="20"
                                    width="20"
                                    className="relative dark:hidden"
                                />
                                <p>Security</p>
                            </div>
                        </li>*/}
                        <li className="cursor-default text-transparent select-none w-screen flex flex-row items-center justify-start border-b-[1px] border-gray-700 p-2" >
                            <button className="cursor-default">
                                <p>Promotions</p>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="w-full flex flex-col items-center justify-start">
                    {currentSubPageID === accessSubPageID && (
                        <div className="container mx-auto">
                            <AccessSettings />
                        </div>
                    )}
                    {currentSubPageID === profileSubPageID && (
                        <div className="container mx-auto">
                            <ProfileSettings user={user} store={store} />
                        </div>
                    )}
                    {currentSubPageID === secretsSubPageID && (
                        <div className="container mx-auto">
                            <SecretsSettings user={user} store={store} />
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}

export default function Settings() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <SettingsPanel />
        </Suspense>
    )
}
