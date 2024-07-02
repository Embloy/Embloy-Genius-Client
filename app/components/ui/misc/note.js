import React from 'react';
import '@/app/globals.css'
import Image from "next/image";

const Note = ({ message }) => {
    return(
        <div className="p-[5px] flex flex-row items-center justify-start rounded-lg border-[1px] border-embloy-purple-blueish gap-1.5 ">
            <Image
                src="/icons/exclamation-circle.svg"
                alt="Logo"
                height="15"
                width="15"
                className="relative"
            />
            <h1 className="font-semibold text-xs text-embloy-purple-blueish">
                Note:
            </h1>
            <p className="font-light text-xs text-embloy-purple-blueish">
            {message}
            </p>
        </div>
    );
};

export default Note;



