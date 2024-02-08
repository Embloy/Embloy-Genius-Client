"use client";
import { useState } from "react";
import Navbar from "./navbar";
import {usePathname} from "next/navigation";


const Navigation = () => {
    // toggle sidebar
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    if (!pathname.startsWith("/resource/public")){
        return (
            <>
                <Navbar toggle={toggle} />
            </>
        );
    }

};

export default Navigation;