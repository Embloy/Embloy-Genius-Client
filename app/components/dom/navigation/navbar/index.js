"use client";
import '@/app/globals.css'
import React, {useContext} from "react";
import Link from "next/link";
import Logo from "./Logo";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {SearchBar} from "@/app/components/dom/navigation/navbar/SearchBar";
import {Notifications} from "@/app/components/dom/navigation/navbar/Notifications";
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import {UserBar} from "@/app/components/dom/navigation/userbar";
import {StoreContext} from "@/app/components/dom/main/wrappers/StoreWrapper";
import {AppContext} from "@/app/components/dom/main/wrappers/AppProvider";
import LoadingScreen from "@/app/components/dom/main/screens/LoadingScreen";
import {AvatarButton} from "@/app/components/ui/misc/avatar";

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
                                </ul>

                            </div>
                            <div className="flex horizontal end-0 items-center h-full gap-x-6">
                                <SearchBar className="bg-black" />
                                <Notifications/>
                                <div onClick={toggleUserbar}  className="flex items-center justify-center m-1">
                                    <AvatarButton updated_image={null} loading={false} user={user} w={40} h={40} styles="w-10 h-10 rounded-full bg-transparent hover:bg-transparent"/>
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