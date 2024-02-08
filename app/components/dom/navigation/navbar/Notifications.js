import React from "react";
import Image from "next/image";

//TODO: notifications system
export function Notifications(props) {
    return (
        <button className="h-full ">
            <Image
                src="/icons/bell.svg"
                alt="Logo"
                height="21"
                width="21"
                className="relative"
            />
        </button>
    )
}