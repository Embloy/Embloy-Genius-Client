import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import {cn} from "@/lib/utils";
import { usePathname } from "next/navigation";
import {SearchBar} from "@/app/components/navigation/navbar/SearchBar";
import {Notifications} from "@/app/components/navigation/navbar/Notifications";

const Navbar = () => {
    const pathname = usePathname()
    return (
        <>
            <div className="z-20 bg-black w-full h-14 sticky top-0 border-b-[1px] border-gray-700 flex flex-row items-center justify-center">
                <div className="container h-full max-w-7/12 flex flex-row items-center justify-between">
                    <div className="flex horizontal start-0 items-center h-full gap-x-6">
                        <Logo />
                        <div className=" h-3/5 w-[1px] rounded-full bg-gray-700" />
                        <ul className="hidden md:flex gap-x-6 font-normal text-sm">
                            <li className={cn(
                                pathname === "/" ? "text-white" : "text-gray-400 hover:text-gray-200"
                            )}>
                                <Link href="/">
                                    <p>Home</p>
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
                        <Button />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;