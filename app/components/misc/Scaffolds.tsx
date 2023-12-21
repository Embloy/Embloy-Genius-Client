"use client"
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

export function OpenCloseScaffold({title, pre_text, link_url, link_text, post_text, button_text, headerChild, child, timeout}) {
    const [clicked, setClicked] = useState(false);
    const [disableRequest, setDisableRequest] = useState(false);
    const [timeOutID, setTimeOutID] = useState(null);

    const handleRequest = () => {
        setClicked(true);
        if (!disableRequest && timeout) {
            setDisableRequest(true);
            const id = setTimeout(() => {
                setDisableRequest(false);
            }, 60000); // in milliseconds => 1 min
            setTimeOutID(id);
        }
    }

    const handleClose = () => {
        setClicked(false);
    }

    useEffect(() => {
        return () => {
            if (timeOutID) {
                clearTimeout(Number(timeOutID)); // Clear the timeout on component unmount
            }
        };
    }, [timeOutID]);


    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-row items-center justify-start gap-3">
                    <h1 className="text-lg font-medium">{title}</h1>
                    {headerChild}
                </div>

                {clicked ? (
                    <button onClick={handleClose}
                            className="px-4 py-1 rounded-full flex items-center justify-center bg-black border-[2px] border-gray-400 hover:border-gray-200 text-gray-400 hover:text-gray-200">
                        <p>Close</p>
                    </button>) : (
                    <button onClick={handleRequest}
                            className={cn(timeout && disableRequest ? "px-4 py-1 rounded-full flex items-center justify-center border-[2px] border-transparent bg-gray-700 cursor-not-allowed" : "px-4 py-1 rounded-full flex items-center justify center border-[2px] border-transparent bg-embloy-purple-light hover:bg-embloy-purple-lighter")}>
                        {timeout && disableRequest ? (
                            <p className="text-gray-400">Disabled</p>
                        ) : (
                            <p className="text-white">{button_text}</p>
                        )}
                    </button>
                )}
            </div>
            <div className="flex flex-row items-center justify-start">
                <p className="text-gray-400">{pre_text}</p>
                <div className="w-1"/>
                <a className="italic text-embloy-purple-lighter hover:underline cursor-pointer"
                   href={link_url}><p>{link_text}</p></a>
                <div className="w-1"/>
                <p>{post_text}</p>
            </div>
            {clicked && (
                <div className="w-full">
                    {child}
                </div>
            )}
        </div>
    )
}
