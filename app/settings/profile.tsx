"use client"
import './locals.css'

import React, {useContext, useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {AccessTokenClaim} from "@/app/settings/AccessTokenClaim";
import {ClientTokenClaim} from "@/app/settings/ClientTokenClaim";
import {ChangePassword} from "@/app/settings/ChangePassword";
import {TwoFactorAuthentication} from "@/app/settings/TwoFactorAuthentication";
import {UserContext} from "@/app/components/misc/UserContext";
import Image from "next/image";


function TokenClaimScaffold({title, pre_text, link_url, link_text, post_text, button_text, child}) {
    const [clicked, setClicked] = useState(false);
    const [disableRequest, setDisableRequest] = useState(false);
    const [timeOutID, setTimeOutID] = useState(null);

    const handleRequest = () => {
        if (!disableRequest) {
            setClicked(true);
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
                <h1 className="text-lg font-medium">{title}</h1>
                {clicked ? (
                    <button onClick={handleClose}
                            className="px-4 py-1 rounded-full flex items-center justify-center bg-black border-[2px] border-gray-400 hover:border-gray-200 text-gray-400 hover:text-gray-200">
                        <p>Close</p>
                    </button>) : (
                    <button onClick={handleRequest}
                            className={cn(disableRequest ? "px-4 py-1 rounded-full flex items-center justify-center border-[2px] border-transparent bg-gray-700 cursor-not-allowed" : "px-4 py-1 rounded-full flex items-center justify center border-[2px] border-transparent bg-embloy-purple-light hover:bg-embloy-purple-lighter")}>
                        {disableRequest ? (
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

function ProfileInfo() {
    let user = useContext(UserContext)
    const [changesMade, setChangesMade] = useState(false);
    const [nameIsHovered, setNameIsHovered] = useState(false);
    const [nameIsClicked, setNameIsClicked] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const nameHover = () => {
        setNameIsHovered(true);
    }
    const nameNotHover = () => {
        setNameIsHovered(false);
    }
    const nameClick = () => {
        if (firstName == '') {
            setFirstName(user.first_name)
        }
        if (lastName == '') {
            setLastName(user.last_name)
        }
        setNameIsClicked(!nameIsClicked);
    }
    const handleNameSubmit = (e) => {
        if (e.key === 'Enter') {
            nameClick();
            checkChanges();
        }
    }

    const [fNameIsHovered, setfNameIsHovered] = useState(false);
    const fNameHover = () => {
        setfNameIsHovered(true);
    }
    const fNameNotHover = () => {
        setfNameIsHovered(false);
    }

    const [lNameIsHovered, setlNameIsHovered] = useState(false);
    const lNameHover = () => {
        setlNameIsHovered(true);
    }
    const lNameNotHover = () => {
        setlNameIsHovered(false);
    }

    const [emailIsHovered, setEmailIsHovered] = useState(false);
    const [emailIsClicked, setEmailIsClicked] = useState(false);
    const [email, setEmail] = useState('');
    const emailHover = () => {
        setEmailIsHovered(true);
    }
    const emailNotHover = () => {
        setEmailIsHovered(false);
    }
    const emailClick = () => {
        if (email == ''){
            setEmail(user.email);
        }
        setEmailIsClicked(!emailIsClicked);
    }
    const handleEmailSubmit = (e) => {
        if (e.key === 'Enter') {
            emailClick();
            checkChanges();

        }
    }

    const checkChanges = () => {
        if(email != '' && email != user.email && !changesMade){
            setChangesMade(true);
        }
        if((firstName != '' && firstName != user.first_name || lastName != '' && lastName != user.last_name)&& !changesMade  ){
            setChangesMade(true);
        }
        if (email == user.email && firstName == user.first_name && lastName == user.last_name){
            setChangesMade(false)
        }
    }



    return (

        <div className="w-full flex flex-col items-start justify-start gap-4">
            {user ? (
                <div className="w-full flex flex-row items-start justify-between">
                    <div className=" flex flex-col items-start justify-start">
                        {nameIsClicked ? (
                            <div
                                 className="flex flex-row items-start justify-start py-4 rounded-lg">
                                <p className="w-[150px] left font-medium text-gray-400">Name</p>
                                <input
                                    className={fNameIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"}
                                    type="text"
                                    name="First Name"
                                    value={firstName}
                                    required={true}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    onMouseEnter={fNameHover}
                                    onMouseLeave={fNameNotHover}
                                    onKeyPress={handleNameSubmit}
                                />
                                <div className="w-2" />
                                <input
                                    className={lNameIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"}
                                    type="text"
                                    name="Last Name"
                                    value={lastName}
                                    required={true}
                                    onChange={(e) => setLastName(e.target.value)}
                                    onMouseEnter={lNameHover}
                                    onMouseLeave={lNameNotHover}
                                    onKeyPress={handleNameSubmit}
                                />
                            </div>
                        ) : (
                            <div onMouseEnter={nameHover} onMouseLeave={nameNotHover}
                                 className="flex flex-row items-start justify-start py-4 rounded-lg">
                                <p className="w-[150px] left font-medium text-gray-400">Name</p>
                                <p className="w-[200px] left px-4">{firstName == '' ? user.first_name : firstName} {lastName == '' ? user.last_name : lastName}</p>
                                {nameIsHovered && (
                                    <button onClick={nameClick}
                                            className="text-xs italic text-gray-600 hover:underline cursor-pointer">
                                        <p>Edit</p>
                                    </button>
                                )}
                            </div>
                        )}
                        {emailIsClicked ? (
                            <div
                                className="flex flex-row items-start justify-start py-4 rounded-lg">
                                <p className="w-[150px] left font-medium text-gray-400">Email</p>
                                <input
                                    className={emailIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"}
                                    type="email"
                                    name="Email"
                                    value={email}
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onMouseEnter={emailHover}
                                    onMouseLeave={emailNotHover}
                                    onKeyPress={handleEmailSubmit}
                                />
                            </div>
                        ) : (
                            <div onMouseEnter={emailHover} onMouseLeave={emailNotHover}
                                 className="flex flex-row items-start justify-start py-4 rounded-lg">
                                <p className="w-[150px] left font-medium text-gray-400">Email</p>
                                <p className="w-[200px] left px-4">{email == '' ? user.email : email}</p>
                                {emailIsHovered && (
                                    <button onClick={emailClick}
                                            className="text-xs italic text-gray-600 hover:underline cursor-pointer">
                                        <p>Edit</p>
                                    </button>
                                )}
                            </div>
                        )}

                        {user.user_type == "company" && (
                            <div className="flex flex-row items-start justify-between py-4 rounded-lg">
                                <p className="w-[150px] left font-medium text-gray-400">Company</p>
                                <p className="w-[300px] left px-4">@MUSS NOCH WEG</p>
                            </div>
                        )}

                        {changesMade && (
                            <button
                                className="my-4 px-4 py-1 bg-black border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter text-embloy-purple-light hover:text-embloy-purple-lighter rounded-full cursor-pointer"
                            >
                                Update
                            </button>
                        )}
                    </div>
                    <div>
                        <div className="relative inline-block">
                            <Image
                                src="https://about.embloy.com/assets/banner_2-38f470bc.png"
                                alt="Logo"
                                height="30"
                                width="30"
                                className="rounded-full w-64 h-64"
                            />
                            <button
                                className="absolute bottom-4 left-4 px-4 py-1 bg-black border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter text-embloy-purple-light hover:text-embloy-purple-lighter rounded-full cursor-pointer"
                            >
                                Edit
                            </button>
                        </div>

                    </div>
                </div>
            ) : (
                <button>Sign in</button>
            )}

        </div>
    )
}

export function ProfileSettings() {
    let user = useContext(UserContext)
    return (
        <div>
            <div className="w-full flex flex-col items-center justify-between ">
                <div
                    className="text-sm w-full flex flex-row items-center justify-between border-b border-gray-700 p-4">
                    <div className="text-lg font-medium text-gray-700 flex flex-row items-center justify-start gap-4 ">
                        <h1>Personal information</h1>
                    </div>
                    <div className="text-gray-700 flex flex-row items-center justify-start">
                        <p>Some information may be visible to other people using Embloy services.</p>
                        <div className="w-1"/>
                        <a className="italic text-gray-600 hover:underline cursor-pointer"
                           href="https://about.embloy.com"><p>Learn more</p></a>
                    </div>
                </div>

                <div
                    className="text-sm text-gray-400 w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
                    <ProfileInfo/>
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
                        <p>Change your password and set up two-factor authentication.</p>
                    </div>
                </div>

                <div
                    className="text-sm text-gray-400 w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
                    <ChangePassword/>
                    <div className="h-3"/>
                    <TwoFactorAuthentication/>
                </div>
            </div>
        </div>
    )

}