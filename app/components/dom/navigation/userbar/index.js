"use client";
import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {logout} from "@/lib/api/auth";
import Link from "next/link";
import '@/app/globals.css'
import xwIcon from "@/public/icons/x-icon-white.svg"
import xbIcon from "@/public/icons/x-icon-black.svg"
import { EmbloyBox, EmbloyBoxContent } from "@/app/components/ui/misc/box";
import { EmbloyH, EmbloyV, EmbloySeperator, EmbloySpacer } from "@/app/components/ui/misc/stuff";
import { EmbloyP, EmbloyH1 } from "@/app/components/ui/misc/text";
import {AvatarButton} from "@/app/components/ui/misc/avatar";
import { EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
const UserBarItem = ({name, link, close, target="_self", icon, className}) => {
    const listStyle = "stylish-header stylish-header-text p-[10px] bg-transparent dark:bg-chianti landscape:dark:hover:bg-biferno cursor-pointer border-[1px] dark:border-biferno border-etna";
    return (
        <li className={listStyle} onClick={close}>
            {link ? (<Link href={link} target={target}>
                <EmbloyH className="items-center gap-2">
                    <EmbloyToolboxImgAdvanced path={"/icons/svg/black/"+icon+".svg"} dark_path={"/icons/svg/white/"+icon+".svg"} height={13} width={13} />
                    <EmbloyP className={`select-none ${className}`}>{name}</EmbloyP>
                </EmbloyH>
                
            </Link>) : (<div>
                <EmbloyP className={`select-none ${className}`}>{name}</EmbloyP>
            </div>)}
            
        </li>
    );
}

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
        onClose();
        logout(router);
    }


    const sidebarClass = `bg-body z-50 fixed top-0 right-0 h-full w-96 border-l-[1px] border-ischia dark:border-ischia transition-transform transform ${isVisible ? 'translate-x-0' : 'translate-x-full'}`;
    const sidebarfieldClass = `w-full flex flex-row justify-start items-start c0 gap-2.5 dark:hover:bg-gray-700 hover:bg-gray-200 p-2.5 cursor-pointer`;
    const sidebarfieldleftClass = `w-1/7 flex flex-col justify-start items-start c0 gap-2.5`;
    const sidebarfieldrightClass = `w-6/7 flex flex-col justify-start items-start c0 gap-1.5`;




    return (
        <div className={`bg-body z-50 fixed top-0 right-0 h-full transition-transform transform ${isVisible ? ' translate-x-0' : ' translate-x-full'} border-l-[1px] landscape:px-6 portrait:px-4 border-gray-700`}>
            <div className="flex h-full w-full">
                    {userData ? (
                        <EmbloyV className="h-full items-center landscape:py-2 portrait:py-2 gap-4">
                            <EmbloyV className="gap-2.5 pt-[5px]">
                                <EmbloyH className='flex items-center justify-end'>
                                    <Image src={xwIcon} className='w-8 h-8 hidden dark:block cursor-pointer' onClick={onClose} />
                                    <Image src={xbIcon} className='w-8 h-8 block dark:hidden cursor-pointer' onClick={onClose}/>
                                </EmbloyH>
                                <EmbloySeperator className="dark:bg-biferno bg-etna h-[2px]" />
                            </EmbloyV>
                            <EmbloySpacer className="h-[2px]" />
                            <EmbloyV className="gap-2">
                                <EmbloyH className="w-full flex flex-row justify-between items-center gap-2.5 border-[1px] rounded-lg p-4 bg-transparent dark:bg-chianti dark:border-biferno border-etna">
                                    <AvatarButton loading={false} updated_image={null} user={userData} w={40} h={40} styles="w-10 h-10 rounded-full bg-transparent hover:bg-transparent"/>
                                    <EmbloyV className="w-4/6 justify-start items-start gap-1.5">
                                        <EmbloyH1 className="font-semibold text-sm line-clamp-1">{userData.first_name} {userData.last_name}</EmbloyH1>
                                        <EmbloyP className="text-xs w-56 line-clamp-1">{userData.email}</EmbloyP>
                                    </EmbloyV>
                                </EmbloyH>
                            </EmbloyV>

                            <EmbloySpacer className="h-[2px]" />
                            <ul className="flex flex-col gap-4 w-full">
                                    <EmbloySpacer className="h-px" />
                                    <UserBarItem icon="embloy" name="To Embloy.com" link="https://www.embloy.com" target="_blank" close={onClose}/>
                                    <UserBarItem icon="urllink" name="API Doc" link="/account" close={onClose}/>
                                    <UserBarItem icon="setting" name="Settings" link="/settings" close={onClose}/>
                                    <UserBarItem icon="issue" name="Report an issue" link="/settings" close={onClose}/>
                                    <UserBarItem icon="ask" name="Help & Support" link="/settings" close={onClose}/>
                                    <UserBarItem name="Logout" close={out} className="text-primitivo dark:text-zinfandel"/>
                                    <EmbloySpacer className="h-px" />
                                    <EmbloySeperator className="dark:bg-biferno bg-etna h-[2px]" />
                            </ul>

                            <EmbloyH className="gap-2.5 p-2.5">
                                <EmbloyP className="text-xs dark:text-rubeno text-vesuvio italic">This Account is {calculateMinutesFromNow(userData["created_at"])} minutes old!</EmbloyP>
                            </EmbloyH>
                        </EmbloyV>
                    ): (
                        <button>Sign in</button>
                    )}

            </div>
        </div>
    );
}