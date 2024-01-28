"use client";
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

const Navbar = () => {
    const pathname = usePathname()

    let app = useContext(AppContext)
    let user = useContext(UserContext)
    let store = useContext(StoreContext)

    const { isUserbarVisible, toggleUserbar } = app;


    return (
        <>
            <div className="z-20 bg-black w-full h-14 sticky top-0 border-b-[1px] border-gray-700 flex flex-row items-center justify-center"  >
                <div className="container h-full max-w-7/12 flex flex-row items-center justify-between">
                    <div className="flex horizontal start-0 items-center h-full gap-x-6">
                        <Logo />
                        <div className=" h-3/5 w-[1px] rounded-full" />
                        <ul className="hidden md:flex gap-x-6 font-normal">
                            <li className={cn(
                                pathname === "/" ? "text-white" : "text-gray-400 hover:text-gray-200"
                            )}>
                                <Link href="/">
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li className={cn(
                                pathname?.startsWith("/recruitment") ? "text-white" : "text-gray-400 hover:text-gray-200"
                            )}>
                                <Link href="/recruitment">
                                    <p>Hire</p>
                                </Link>
                            </li>
                            <li className={cn(
                                pathname?.startsWith("/calendar") ? "text-white" : "text-gray-400 hover:text-gray-200"
                            )}>
                                <Link href="/calendar">
                                    <p>Calendar</p>
                                </Link>
                            </li>
                        </ul>

                    </div>
                    <div className="flex horizontal end-0 items-center h-full gap-x-6">
                        <SearchBar />
                        <Notifications />
                        <div onClick={toggleUserbar}>
                            <Button onClick={toggleUserbar}></Button>
                        </div>
                    </div>
                </div>
            </div>
            <UserBar isVisible={isUserbarVisible} onClose={toggleUserbar} userData={user} storeData={store}/>
        </>
    );
};

export default Navbar;