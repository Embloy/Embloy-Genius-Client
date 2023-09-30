import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = () => {
    return (
        <>
            <div className="w-full h-20 sticky top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <Logo />
                        <ul className="hidden md:flex gap-x-6 text-white font-normal text-sm^">
                            <li className="hover:underline">
                                <Link href="/">
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li className="hover:underline">
                                <Link href="/calendar">
                                    <p>Calendar</p>
                                </Link>
                            </li>
                        </ul>
                        <Button />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;