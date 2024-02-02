"use client";
import '../../../globals.css'
import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import {cn} from "@/lib/utils";
import {usePathname, useRouter} from "next/navigation";
import {SearchBar} from "@/app/components/navigation/navbar/SearchBar";
import {Notifications} from "@/app/components/navigation/navbar/Notifications";
import {UserContext} from "@/app/components/misc/UserContext";
import {UserBar} from "@/app/components/navigation/userbar";
import {StoreContext} from "@/app/components/misc/StoreWrapper";
import {AppContext} from "@/app/components/misc/AppProvider";
import Image from "next/image";
import LoadingScreen from "@/app/components/misc/LoadingScreen";
import {alpha_24} from "@/lib/utils/formats";

const Navbar = () => {
    const pathname = usePathname()

    let app = useContext(AppContext)
    let user = useContext(UserContext)
    let store = useContext(StoreContext)

    const {isUserbarVisible, toggleUserbar} = app;


    return (
        <>{user ?
            (

                <>
                    <div
                        className="bgs z-20 w-full h-14 sticky top-0 border-b-[1px] border-gray-700 flex flex-row items-center justify-center">
                        <div className="container h-full max-w-7/12 flex flex-row items-center justify-between">
                            <div className="flex horizontal start-0 items-center h-full gap-x-6">
                                <Logo/>
                                <div className=" h-3/5 w-[1px] rounded-full"/>
                                <ul className="hidden md:flex gap-x-6 font-normal">
                                    <li className={cn(
                                        pathname === "/" ? "c0" : "text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                    )}>
                                        <Link href="/">
                                            <p>Home</p>
                                        </Link>
                                    </li>
                                    <li className={cn(
                                        pathname?.startsWith("/recruitment") ? "c0" : "text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                    )}>
                                        <Link href="/recruitment">
                                            <p>Hire</p>
                                        </Link>
                                    </li>
                                    <li className={cn(
                                        pathname?.startsWith("/calendar") ? "c0" : "text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                    )}>
                                        <Link href="/calendar">
                                            <p>Calendar</p>
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                            <div className="flex horizontal end-0 items-center h-full gap-x-6">
                                <SearchBar/>
                                <Notifications/>
                                <div onClick={toggleUserbar} className="flex items-center justify-center">
                                    <button onClick={toggleUserbar} className="w-10 h-10 rounded-full bg-transparent hover:bg-transparent flex items-center justify-center">
                                        <Image
                                            src={user.image_url ? user.image_url : `/icons/${alpha_24.includes(user.first_name.charAt(0).toLowerCase()) ? user.first_name.charAt(0).toUpperCase() : 'Slug'}.svg`
                                            }
                                            alt="Profile"
                                            height="40"
                                            width="40"
                                            className="rounded-full"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <UserBar isVisible={isUserbarVisible} onClose={toggleUserbar} userData={user}
                             storeData={store}/></>) : (
                <LoadingScreen/>
            )
        }</>
    );
};

export default Navbar;