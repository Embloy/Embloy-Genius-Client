import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import { logout } from "@/lib/api/auth";
import {useRouter} from "next/navigation";
import Image from "next/image";
import '@/app/globals.css'


export function TwoFactorAuthentication() {
    let {user, company} = useContext(UserContext)
    const router = useRouter();
    const [disableRequest, setDisableRequest] = useState(false);
    const [timeOutID, setTimeOutID] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSucess] = useState(null);
    const [passwordMissmatch, setPasswordMissmatch] = useState(false);
    const handleRequest = () => {
        if (!disableRequest) {
            setDisableRequest(true);
            const id = setTimeout(() => {
                setDisableRequest(false);
            }, 60000); // in milliseconds => 1 min
            setTimeOutID(id);
        }
    }


    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordIsHovered, setOldPasswordIsHovered] = useState(false);

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value)
    }
    const handleOldPasswordHover = () => {
        setOldPasswordIsHovered(true);

    }
    const handleOldPasswordNotHover = () => {
        setOldPasswordIsHovered(false);
        ;

    }

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordIsHovered, setNewPasswordIsHovered] = useState(false);

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value)
    }
    const handleNewPasswordHover = () => {
        setNewPasswordIsHovered(true);

    }
    const handleNewPasswordNotHover = () => {
        setNewPasswordIsHovered(false);
        ;

    }

    const [newnewPassword, setNewNewPassword] = useState('');
    const [newnewPasswordIsHovered, setNewNewPasswordIsHovered] = useState(false);

    const handleNewNewPasswordChange = (e) => {
        setNewNewPassword(e.target.value)
    }
    const handleNewNewPasswordHover = () => {
        setNewNewPasswordIsHovered(true);

    }
    const handleNewNewPasswordNotHover = () => {
        setNewNewPasswordIsHovered(false);
        ;

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
            <div className="w-full flex flex-row items-center justify-start gap-3">
                <h1 className="text-lg font-medium">Set up Two-factor authentication</h1>
                <div className="border border-transparent bg-red-500 px-2 rounded-full" >
                    <p className="text-white text-xs">Inactive</p>
                </div>
                <div className="border border-gray-700 px-2 rounded-full" >
                    <p className="c3 text-xs">Functionality disabled</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="c2">
                    Two-factor authentication minimizes the chances of unauthorized access. In the event of a compromised password, the supplementary authentication step acts as an effective barrier against potential breaches.
                    <a
                        className="px-1 italic text-embloy-purple-lighter hover:underline cursor-pointer"
                        href="https://documenter.getpostman.com/view/24977803/2s9YRB2rkE"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn more
                    </a>
                    about the benefits of 2FA.
                </p>
            </div>

            <div className="w-full flex flex-row items-center justify-between">
                <div className="w-full flex flex-col items-start justify-start gap-1">
                    <div className="w-full flex flex-row items-start justify-between">
                        <div className="w-full flex flex-col items-start justify-start border border-gray-700 rounded-lg mt-2 mb-6">





                            <div className="w-full px-2 py-2 flex flex-row items-start justify-between">
                                <div className="flex flex-row items-start justify-start gap-4">
                                    <Image
                                        src="/icons/logo_black_white.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative hidden dark:block"
                                    />
                                    <Image
                                        src="/icons/logo_white_black.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative dark:hidden"
                                    />
                                    <div className="flex flex-col items-start justify-start gap-1">
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="c1 font-medium text-sm">Embloy Mobile</p>
                                        </div>
                                        <p className="c3 text-xs">Embloy Mobile can be used for two-factor authentication by installing the app on your iOS device and signing into your account.</p>
                                    </div>
                                </div>
                                <button disabled={true} className="border-[2px] border-gray-700 rounded-full px-2 c3 text-sm cursor-not-allowed">
                                    <p>Add</p>
                                </button>
                            </div>


                            <div className="w-full h-px bg-gray-700" />

                            <div className="w-full px-2 py-2 flex flex-row items-start justify-between">
                                <div className="flex flex-row items-start justify-start gap-4">
                                    <Image
                                        src="/icons/mobile-white.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative hidden dark:block"
                                    />
                                    <Image
                                        src="/icons/mobile-black.svg"
                                        alt="Logo"
                                        height="25"
                                        width="25"
                                        className="relative dark:hidden"
                                    />
                                    <div className="flex flex-col items-start justify-start gap-1">
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="c1 font-medium text-sm">SMS/Text message</p>
                                        </div>
                                        <p className="c3 text-xs">Get one-time suthentication codes sent to your phone via SMS. (Android users&apos; choice)</p>
                                    </div>
                                </div>
                                <button disabled={true} className="border-[2px] border-gray-700 rounded-full px-2 c3 text-sm cursor-not-allowed">
                                    <p>Add</p>
                                </button>
                            </div>



                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}