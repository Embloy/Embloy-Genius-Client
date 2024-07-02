import React from "react";
import Image from "next/image";

//TODO: notifications system
export function Notifications(props) {
    return (
        <button className="h-full flex flex-row items-center justify-center">
            <div className="btn">
                <Image
                    src="/icons/bell.svg"
                    alt="Logo"
                    height="21"
                    width="21"
                    className="relative"
                />
            </div>
            
        </button>
    )
}