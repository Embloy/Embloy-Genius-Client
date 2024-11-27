import React, {useContext, useEffect, useState} from "react";
import '@/app/globals.css'
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import { login, update_password } from "@/lib/api/auth";

export function ChangePassword() {
    let {user, company} = useContext(UserContext)
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
                
                try {
                    await login(email, password);
                    await update_password(new_password, newnew_password)
                    setSucess(true);
                } catch (error) {
                    setSucess(false);
                }
                
                setOldPassword('');
                setNewPassword('');
                setNewNewPassword('');



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
                                    <p className="font-medium c1">Old password*</p>
                                    <input
                                        className="c0 h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"
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
                                    <p className="font-medium c1">New password*</p>
                                    <input
                                        className="c0 h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"
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
                                    <p className="font-medium c1">Confirm new password*</p>
                                    <input
                                        className="c0 h-7 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"
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
                                <p className="text-xs c3">Make sure the new password is at least 8
                                    and at most 72 characters.</p>
                                <div className="w-1"/>
                                <a className=" text-xs italic c2-5 hover:underline cursor-pointer"
                                   href="https://developers.embloy.com/docs/core/account/account_security" target="_blank" rel="noopener noreferrer"><p>Learn more</p></a>
                            </div>

                        </div>
                        <div className="flex flex-col items-end justify-start gap-1">
                            <p className="font-medium text-transparent select-none">*</p>
                            {disableRequest ? (
                                isLoading ? (
                                    <button
                                        disabled={true}
                                        className="text-embloy-purple-lighter h-7 px-4 border-[2px] border-embloy-purple-lighter outline-none rounded-full cursor-wait">
                                        <p className="select-none">Loading</p>
                                    </button>
                                ) : (success ? (
                                    <button
                                        disabled={true}
                                        className="text-embloy-purple-light h-7 px-4 border-[2px] border-transparent hover:border-transparent outline-none rounded-full">
                                        <p className="select-none">Password updated!</p>
                                    </button>
                                ) : (
                                    passwordMissmatch ? (
                                        <div className="flex flex-row items-center justify-end gap-2">
                                            <p className="select-none text-xs text-red-500">New Password doesn&apos;t
                                                match confirmation password.</p>
                                            <button
                                                disabled={true}
                                                className="c3 h-7 px-4 border-[2px] border-gray-700 outline-none rounded-full cursor-not-allowed">
                                                <p className="select-none">Wait...</p>
                                            </button>
                                        </div>
                                    ) : (
                                            <div className="flex flex-row items-center justify-end gap-2">
                                                <p className="select-none text-xs text-red-500">Something went
                                                    wrong.</p>
                                                <button
                                                    disabled={true}
                                                    className="c3 h-7 px-4 border-[2px] border-gray-700 outline-none rounded-full cursor-not-allowed">
                                                    <p className="select-none">Wait...</p>
                                                </button>
                                            </div>
                                        )

                                ))

                            ) : (

                                (success !== null && success === false) ? (

                                    passwordMissmatch ? (
                                        <div className="flex flex-row items-center justify-end gap-2">
                                            <p className="select-none text-xs text-red-500">New Password doesn&apos;t
                                                match confirmation password.</p>
                                            <button onClick={handleUpdate}
                                                    className="text-embloy-purple-light hover:text-embloy-purple-lighter h-7 px-4 border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter outline-none rounded-full">
                                                <p className="select-none">Try again</p>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row items-center justify-end gap-2">
                                            <p className="select-none text-xs text-red-500">Something went
                                                wrong.</p>
                                            <button onClick={handleUpdate}
                                                    className="text-embloy-purple-light hover:text-embloy-purple-lighter h-7 px-4 border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter outline-none rounded-full">
                                                <p className="select-none">Try again</p>
                                            </button>
                                        </div>
                                    )


                                ) : (
                                    <button onClick={handleUpdate}
                                            className="text-embloy-purple-light hover:text-embloy-purple-lighter h-7 px-4 border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter outline-none rounded-full">
                                        <p className="select-none">Update</p>
                                    </button>
                                )

                            )}
                            {!disableRequest && (
                                (success === null || success === false) && (
                                    <a className=" text-xs italic c2-5 hover:underline cursor-pointer"
                                       href="https://embloy.com/password-reset" target="_blank" rel="noopener noreferrer"><p>I forgot my password</p></a>
                                )
                            )}

                        </div>


                    </div>

                </div>

            </div>
        </div>
    )
}