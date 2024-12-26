"use client";
import React, {useContext, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import {UserBar} from "@/app/components/dom/navigation/userbar";
import {StoreContext} from "@/app/components/dom/main/wrappers/StoreWrapper";
import Image from "next/image";
import "@/app/globals.css";

const Footerbar = () => {
    const pathname = usePathname()
    const [isUserbarVisible, setUserbarVisible] = useState(false);

    function toggleUserbar() {
        setUserbarVisible(!isUserbarVisible);
    }


    let {user, company, subscription} = useContext(UserContext)
    let store = useContext(StoreContext)


    return (
        <>
            <div
                className="z-20 w-full h-14 border-t-[1px] border-etna dark:border-ischia flex flex-row items-center justify-center bg-body">
                <div className="container h-full max-w-7/12 flex flex-row items-center justify-center gap-12">

                    <div className="flex flex-row items-center justify-start gap-2">
                        <Image
                            src="/icons/logo_black_white.svg"
                            alt="Logo"
                            height="25"
                            width="25"
                            className="relative hidden dark:block"
                        />
                        <Image
                            src="/icons/logo_white_black.svg"
                            alt="Logo"
                            height="25"
                            width="25"
                            className="relative block dark:hidden"
                        />
                        <p className="text-black dark:text-white text-xs font-normal">© 2024 Embloy Platforms UG (haftungsbeschränkt)</p>
                    </div>
                    <ul className="hidden md:flex gap-x-6 text-black dark:text-white text-xs font-normal">
                        <li>
                        <a href="https://about.embloy.com" target="_blank" rel="noopener noreferrer">
                                <p className="hover:underline">About</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://embloy.com/en-US/resources/terms" target="_blank" rel="noopener noreferrer">
                                <p className="hover:underline">Terms</p>
                            </a>
                        </li>
                        <li>
                        <a href="https://embloy.com/en-US/resources/privacy" target="_blank" rel="noopener noreferrer">
                                <p className="hover:underline">Privacy</p>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:feedback@embloy.com" target="_blank" rel="noopener noreferrer">
                                <p className="hover:underline">Security</p>
                            </a>
                        </li>
                        <li>
                            <Link href="/">
                                <p className="hover:underline">Cookies</p>
                            </Link>
                        </li>
                        <li>
                            <a href="https://about.embloy.com/en/contact" target="_blank" rel="noopener noreferrer">
                                <p className="hover:underline">Help & Contact</p>
                            </a>
                        </li>
                        <li>
                            <a href="https://about.embloy.com/en/contact/" target="_blank" rel="noopener noreferrer">
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