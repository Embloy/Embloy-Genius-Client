"use client";
import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname, useRouter} from "next/navigation";
import {SearchBar} from "@/app/components/navigation/navbar/SearchBar";
import {Notifications} from "@/app/components/navigation/navbar/Notifications";
import {UserContext} from "@/app/components/misc/UserContext";
import {UserBar} from "@/app/components/navigation/userbar";
import {StoreContext} from "@/app/components/misc/StoreWrapper";
import Logo from "@/app/components/navigation/navbar/Logo";
import Image from "next/image";

const Footerbar = () => {
    const pathname = usePathname()
    const [isUserbarVisible, setUserbarVisible] = useState(false);

    function toggleUserbar() {
        setUserbarVisible(!isUserbarVisible);
    }


    let user = useContext(UserContext)
    let store = useContext(StoreContext)


    return (
        <>
            <div
                className="w-full h-14 border-t-[1px] border-gray-700 flex flex-row items-center justify-center">
                <div className="container h-full max-w-7/12 flex flex-row items-center justify-center gap-12">

                    <div className="flex flex-row items-center justify-start gap-2">
                        <Image
                            src="/icons/logo_dark_white.svg"
                            alt="Logo"
                            height="25"
                            width="25"
                            className="relative"
                        />
                        <p className="text-gray-700 text-xs font-normal">© 2024 Embloy Platforms GbR</p>
                    </div>
                    <ul className="hidden md:flex gap-x-6 text-gray-700 text-xs font-normal">
                        <li>
                            <a href="https://about.embloy.com">
                                <p className="hover:underline">About</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.embloy.com/en/policy/terms-of-service">
                                <p className="hover:underline">Terms</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.embloy.com/en/policy/privacy">
                                <p className="hover:underline">Privacy</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.embloy.com/en/security">
                                <p className="hover:underline">Security</p>
                            </a>
                        </li>
                        <li>
                            <Link href="/">
                                <p className="hover:underline">Cookies</p>
                            </Link>
                        </li>
                        <li>
                            <a href="https://about.embloy.com/en/contact">
                                <p className="hover:underline">Help & Contact</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://about.embloy.com/en/contribution/">
                                <p className="hover:underline">Partners & Investor Relations</p>
                            </a>
                        </li>
                    </ul>


                </div>
            </div>
            <UserBar isVisible={isUserbarVisible} onClose={toggleUserbar} userData={user} storeData={store}/>
        </>
    );
};

export default Footerbar;