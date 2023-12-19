import React, {useContext, useEffect, useState} from "react";

import {UserContext} from "@/app/components/misc/UserContext";
import {login, logout, request_access, request_client, request_refresh, update_password} from "@/lib/authentication";
import {getCookie, setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import Image from "next/image";

async function fetch_refresh_and_access(username, password, router) {

    if (username === "" || password === "") {
        throw new Error("No username / pw provided");
    }

    return request_refresh(username, password)
        .then((token) => {
            return request_access(token)
                .then((token) => {
                    return token
                })
                .catch((error) => {
                    logout(router);
                });

        })
        .catch((error) => {
            logout(router);
        });


}

async function change_password(access, password, password_confirmation) {
    if (password === "" || password_confirmation === "") {
        throw new Error("No username / pw provided");
    }

    return update_password(access, password, password_confirmation)
        .then((res) => {
            return res
        })

}

export function NotificationSettings() {
    let user = useContext(UserContext)
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


    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!disableRequest) {
            setIsLoading(true);
            const email = user.email;
            const password = oldPassword;
            const new_password = newPassword;
            const newnew_password = newnewPassword;


            try {
                setDisableRequest(true);
                const access = await fetch_refresh_and_access(email, password, router);
                const res = await change_password(access, new_password, newnew_password)
                setOldPassword('');
                setNewPassword('');
                setNewNewPassword('');

                if (res) {
                    setSucess(true);

                } else {
                    setSucess(false);
                }



                setPasswordMissmatch(false);
                setIsLoading(false);
                const id = setTimeout(() => {
                    setDisableRequest(false);
                }, 60000); // in milliseconds => 1 min
                setTimeOutID(id);

            } catch (error) {
                console.log(error)
                console.log("was received")
                if (error == "Error: 422") {
                    setPasswordMissmatch(true);
                }
                setSucess(false);
                setIsLoading(false);
                const id = setTimeout(() => {
                    setDisableRequest(false);
                }, 30000); // in milliseconds => 1 min
                setTimeOutID(id);

            }
        }
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
                <div className="border border-gray-700 bg-black px-2 rounded-full" >
                    <p className="text-gray-700 text-xs">Functionality disabled</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="text-gray-400">
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
                                        className="relative"
                                    />
                                    <div className="flex flex-col items-start justify-start gap-1">
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="text-gray-200 font-medium text-sm">Embloy Mobile</p>
                                        </div>
                                        <p className="text-gray-700 text-xs">Embloy Mobile can be used for two-factor authentication by installing the app on your iOS device and signing into your account.</p>
                                    </div>
                                </div>
                                <button disabled={true} className="border-[2px] border-gray-700 rounded-full px-2 text-gray-700 text-sm cursor-not-allowed">
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
                                        className="relative"
                                    />
                                    <div className="flex flex-col items-start justify-start gap-1">
                                        <div className="flex flex-row items-center justify-start gap-2">
                                            <p className="text-gray-200 font-medium text-sm">SMS/Text message</p>
                                        </div>
                                        <p className="text-gray-700 text-xs">Get one-time suthentication codes sent to your phone via SMS. (Android users's choice)</p>
                                    </div>
                                </div>
                                <button disabled={true} className="border-[2px] border-gray-700 rounded-full px-2 text-gray-700 text-sm cursor-not-allowed">
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