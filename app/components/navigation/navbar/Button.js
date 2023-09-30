import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

const Navbar = () => {
    return (
        <>
            <div className="w-full h-20 bg-emerald-800 sticky top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <Logo />
                        <ul className="hidden md:flex gap-x-6 text-white">
                            <li>
                                <Link href="/">
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/schedule">
                                    <p>Schedule</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacts">
                                    <p>Sign out</p>
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