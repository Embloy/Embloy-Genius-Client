"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button";
import '@/app/globals.css'
const Logo = () => {
    //update the size of the logo when the size of the screen changes
    const [width, setWidth] = useState(0);

    const updateWidth = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWidth);
        updateWidth();
    }, []);

    // change between the logo and the button when the user scrolls
    const [showButton, setShowButton] = useState(false);

    const changeNavButton = () => {
        if (window.scrollY >= 400 && window.innerWidth < 768) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeNavButton);
    }, []);

    return (
        <>
            <Link href="/" style={{ display: showButton ? "none" : "block" }}>
                <Image
                    src="/img/logo_on_dark.png"
                    alt="Logo"
                    height="20"
                    width="100"
                    className="relative hidden dark:block"
                />
                <Image
                    src="/img/logo_on_light.png"
                    alt="Logo"
                    height="20"
                    width="100"
                    className="relative dark:hidden"
                />
            </Link>
            <div
                style={{
                    display: showButton ? "block" : "none",
                }}
            >
                <Button />
            </div>
        </>
    );
};

export default Logo;
