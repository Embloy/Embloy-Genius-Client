"use client"
import './locals.css'

import React, {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {AccessTokenClaim} from "@/app/settings/AccessTokenClaim";
import {ClientTokenClaim} from "@/app/settings/ClientTokenClaim";
import {ChangePassword} from "@/app/settings/ChangePassword";



function TokenClaimScaffold({title, pre_text, link_url, link_text, post_text, button_text, child}) {
    const [clicked, setClicked] = useState(false);
    const [disableRequest, setDisableRequest] = useState(false);
    const [timeOutID, setTimeOutID] = useState(null);

    const handleRequest = () => {
        if (!disableRequest) {
            setClicked(true);
            setDisableRequest(true);
            const id =setTimeout(() => {
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
                <h1 className="text-lg font-medium">{title}</h1>
                {clicked ? (
                    <button onClick={handleClose}
                            className="px-4 py-1 rounded-full flex items-center justify center bg-black border-[2px] border-gray-400 hover:border-gray-200 text-gray-400 hover:text-gray-200">
                        <p className>Close</p>
                    </button>) : (
                    <button onClick={handleRequest}
                            className={cn(disableRequest ? "px-4 py-1 rounded-full flex items-center justify center border-[2px] border-transparent bg-gray-700 cursor-not-allowed" : "px-4 py-1 rounded-full flex items-center justify center border-[2px] border-transparent bg-embloy-purple-light hover:bg-embloy-purple-lighter")}>
                        {disableRequest ? (
                            <p className="text-gray-400">Disabled</p>
                            ):(
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


export function AccessSettings() {
    return (
        <div>
            <div className="w-full flex flex-col items-center justify-between ">
                <div
                    className="text-sm w-full flex flex-row items-center justify-between border-b border-gray-700 p-4">
                    <div className="text-lg font-medium text-gray-700 flex flex-row items-center justify-start gap-4 ">
                        <h1>Tokens</h1>
                    </div>
                    <div className="text-gray-700 flex flex-row items-center justify-start">
                        <p>Generate tokens to access the</p>
                        <div className="w-1"/>
                        <a className="italic text-gray-600 hover:underline cursor-pointer"
                           href="https://documenter.getpostman.com/view/24977803/2s9YRB2rkE"><p>Embloy API</p></a>
                        <div className="w-1"/>
                        <p>.</p>
                    </div>
                </div>

                <div
                    className="text-sm text-gray-400 w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
                    <TokenClaimScaffold
                        title="Access Token"
                        pre_text="Access Tokens are used for every interaction with the"
                        link_text="Embloy API"
                        link_url="https://documenter.getpostman.com/view/24977803/2s9YRB2rkE"
                        post_text="."
                        button_text="New Access Token"
                        child={<AccessTokenClaim/>}
                    />
                    <div className="h-3"/>
                    <TokenClaimScaffold
                        title="Client Token"
                        pre_text="Client Tokens are used for embedding Embloy Products on the client-side using the"
                        link_text="Embloy SDK"
                        link_url="https://developer.embloy.com"
                        post_text="."
                        button_text="New Client Token"
                        child={<ClientTokenClaim/>}
                    />
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-between ">
                <div
                    className="text-sm w-full flex flex-row items-center justify-between border-b border-gray-700 p-4">
                    <div className="text-lg font-medium text-gray-700 flex flex-row items-center justify-start gap-4 ">
                        <h1>Password & 2FA</h1>
                    </div>
                    <div className="text-gray-700 flex flex-row items-center justify-start">
                        <p>Change your password and set up Two-factor authentication.</p>
                    </div>
                </div>

                <div
                    className="text-sm text-gray-400 w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
                    <ChangePassword />
                </div>
            </div>
        </div>
    )

}