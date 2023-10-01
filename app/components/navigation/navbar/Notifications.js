import Image from 'next/image';
import React from "react";

//TODO: notifications system
export function Notifications(props) {
    return (
        <button>
            <Image
                priority
                src="/icons/bell.svg"
                height={32}
                width={32}
                alt="Notifications"
            />
        </button>
    )
}