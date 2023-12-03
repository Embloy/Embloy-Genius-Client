import React, {useContext, useEffect, useState} from "react";

import {UserContext} from "@/app/components/misc/UserContext";
import {login, logout, request_access, request_client, request_refresh, update_password} from "@/lib/authentication";
import {getCookie, setCookie} from "cookies-next";
import {useRouter} from "next/navigation";

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

export function ChangePassword() {
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
            <div className="w-full flex flex-row items-center justify-between">
                <h1 className="text-lg font-medium">Change password</h1>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="w-full flex flex-col items-start justify-start gap-1">
                    <div className="w-full flex flex-row items-start justify-between">
                        <div className=" flex flex-col items-start justify-start gap-1">
                            <div className="flex flex-row items-start justify-start gap-6">
                                <div className="flex flex-col items-start justify-start gap-1">
                                    <p className="font-medium text-gray-200">Old password*</p>
                                    <input
                                        className={oldPasswordIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[1.4px] border-gray-700 outline-none rounded-lg" : "bg-black text-white h-7 w-40 px-2 border-[1.4px] border-gray-700 outline-none rounded-lg"}
                                        type="password"
                                        name="note"
                                        value={oldPassword}
                                        required={true}
                                        onChange={handleOldPasswordChange}
                                        onMouseEnter={handleOldPasswordHover}
                                        onMouseLeave={handleOldPasswordNotHover}
                                    />

                                </div>
                                <div className="flex flex-col items-start justify-start gap-1">
                                    <p className="font-medium text-gray-200">New password*</p>
                                    <input
                                        className={newPasswordIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[1.4px] border-gray-700 outline-none rounded-lg" : "bg-black text-white h-7 w-40 px-2 border-[1.4px] border-gray-700 outline-none rounded-lg"}
                                        type="password"
                                        name="note"
                                        value={newPassword}
                                        required={true}
                                        onChange={handleNewPasswordChange}
                                        onMouseEnter={handleNewPasswordHover}
                                        onMouseLeave={handleNewPasswordNotHover}
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-start gap-1">
                                    <p className="font-medium text-gray-200">Confirm new password*</p>
                                    <input
                                        className={newnewPasswordIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[1.4px] border-gray-700 outline-none rounded-lg" : "bg-black text-white h-7 w-40 px-2 border-[1.4px] border-gray-700 outline-none rounded-lg"}
                                        type="password"
                                        name="note"
                                        value={newnewPassword}
                                        required={true}
                                        onChange={handleNewNewPasswordChange}
                                        onMouseEnter={handleNewNewPasswordHover}
                                        onMouseLeave={handleNewNewPasswordNotHover}
                                    />
                                </div>


                            </ div>
                            <div className="flex flex-row items-center justify-start">
                                <p className="text-xs text-gray-700">Make sure the new password is at least 8
                                    characters
                                    including a number
                                    and a lowercase letter.</p>
                                <div className="w-1"/>
                                <a className=" text-xs italic text-gray-600 hover:underline cursor-pointer"
                                   href="https://documenter.getpostman.com/view/24977803/2s9YRB2rkE"><p>Learn
                                    more</p></a>
                            </div>

                        </div>
                        <div className="flex flex-col items-end justify-start gap-1">
                            <p className="font-medium text-transparent select-none">*</p>
                            {disableRequest ? (
                                isLoading ? (
                                    <button
                                        disabled={true}
                                        className="bg-black text-embloy-purple-lighter h-7 px-4 border-[1.4px] border-embloy-purple-lighter outline-none rounded-full cursor-wait">
                                        <p className="select-none">Loading</p>
                                    </button>
                                ) : (success ? (
                                    <button
                                        disabled={true}
                                        className="bg-black text-embloy-purple-light h-7 px-4 border-[1.4px] border-transparent hover:border-transparent outline-none rounded-full">
                                        <p className="select-none">Password updated!</p>
                                    </button>
                                ) : (
                                    passwordMissmatch ? (
                                        <div className="flex flex-row items-center justify-end gap-2">
                                            <p className="select-none text-xs text-red-500">New Password doesn't
                                                match confirmation password.</p>
                                            <button
                                                disabled={true}
                                                className="bg-black text-gray-700 h-7 px-4 border-[1.4px] border-gray-700 outline-none rounded-full cursor-not-allowed">
                                                <p className="select-none">Wait...</p>
                                            </button>
                                        </div>
                                    ) : (
                                            <div className="flex flex-row items-center justify-end gap-2">
                                                <p className="select-none text-xs text-red-500">Something went
                                                    wrong.</p>
                                                <button
                                                    disabled={true}
                                                    className="bg-black text-gray-700 h-7 px-4 border-[1.4px] border-gray-700 outline-none rounded-full cursor-not-allowed">
                                                    <p className="select-none">Wait...</p>
                                                </button>
                                            </div>
                                        )

                                ))

                            ) : (

                                (success !== null && success === false) ? (

                                    passwordMissmatch ? (
                                        <div className="flex flex-row items-center justify-end gap-2">
                                            <p className="select-none text-xs text-red-500">New Password doesn't
                                                match confirmation password.</p>
                                            <button onClick={handleUpdate}
                                                    className="bg-black text-embloy-purple-light hover:text-embloy-purple-lighter h-7 px-4 border-[1.4px] border-embloy-purple-light hover:border-embloy-purple-lighter outline-none rounded-full">
                                                <p className="select-none">Try again</p>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row items-center justify-end gap-2">
                                            <p className="select-none text-xs text-red-500">Something went
                                                wrong.</p>
                                            <button onClick={handleUpdate}
                                                    className="bg-black text-embloy-purple-light hover:text-embloy-purple-lighter h-7 px-4 border-[1.4px] border-embloy-purple-light hover:border-embloy-purple-lighter outline-none rounded-full">
                                                <p className="select-none">Try again</p>
                                            </button>
                                        </div>
                                    )


                                ) : (
                                    <button onClick={handleUpdate}
                                            className="bg-black text-embloy-purple-light hover:text-embloy-purple-lighter h-7 px-4 border-[1.4px] border-embloy-purple-light hover:border-embloy-purple-lighter outline-none rounded-full">
                                        <p className="select-none">Update</p>
                                    </button>
                                )

                            )}
                            {!disableRequest && (
                                (success === null || success === false) && (
                                    <a className=" text-xs italic text-gray-600 hover:underline cursor-pointer"
                                       href="https://about.embloy.com"><p>I forgot my password</p></a>
                                )
                            )}

                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}