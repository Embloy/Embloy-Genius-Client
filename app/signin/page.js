"use client";
import React, {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {request_refresh, request_access} from "@/lib/authentication";
import {getCookie, setCookie} from "cookies-next";
import '@/app/globals.css'
import { Spinner } from "@nextui-org/react";

const Signin = () => {
    const router = useRouter();
    const [loginError, setLoginError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    async function signin(username, password) {
        try {
            setIsLoading(true);
    
            if (username === "" || password === "") {
                throw new Error("No username / pw provided");
            }
    
            request_refresh(username, password)
                .then((token) => {
                    setCookie("refresh", token, {path: "/"})
                    request_access(getCookie("refresh", {path: "/"}))
                        .then((data) => {
                            setCookie("access", data.access_token, {path: "/"})
                            router.replace("/");
                            setIsLoading(false);
                        })
                        .catch((error) => {
                            setLoginError(true);
                            setUsername("");
                            setPassword("");
                            setIsLoading(false);
                            throw new Error("Login failed" + " : " + error);
                        });
                })
                .catch(() => {
                    setLoginError(true);
                    setUsername("");
                    setPassword("");
                    setIsLoading(false);
                });
        } catch (error) {
            console.log("Login failed: " + error);
            setIsLoading(false);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await signin(username, password);
          setLoginError(false);
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div className={`fixed inset-0 flex flex-col justify-center items-center z-50 overflow-hidden bg0-r`}>
            <div
                className=" border-[1px] border-gray-700 rounded-lg flex flex-col items-center justify-center px-10 py-8">
                <Image
                    src="/img/logo_on_dark.svg"
                    alt="Logo"
                    height="50"
                    width="185"
                    className="mb-8 relative hidden dark:block"
                />
                <Image
                    src="/img/logo_on_light.svg"
                    alt="Logo"
                    height="50"
                    width="185"
                    className="mb-8 dark:hidden"
                />
                <h1 className="mb-4 c0 text-2xl">Sign in</h1>
                <p className="mb-8 c0 text-md">Use your Embloy Account</p>
                <div className="flex flex-col items-center justify-center">
                    <form onSubmit={handleLogin}>
                        {loginError ? (
                            <>
                                <input
                                    className="dark:focus:bg-gray-700 focus:bg-gray-200 mb-2 px-5 c0 border-[1px] border-red-500 rounded-full h-14 w-96 rounded-lg"
                                    minLength="0"
                                    maxlength="150"
                                    name="username"
                                    id="username"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <br />
                                <input
                                    className="dark:focus:bg-gray-700 focus:bg-gray-200 mb-2 px-5 c0 border-[1px] border-red-500 rounded-full h-14 w-96 rounded-lg"
                                    minLength="8"
                                    maxlength="72"
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <br />
                                <p className="text-sm text-red-500">Login failed.</p>
                            </>
                        ) : (
                            <>
                                <input
                                    className="dark:focus:bg-gray-700 focus:bg-gray-200 mb-2 px-5 c0 border-[1px] border-gray-700 rounded-full h-14 w-96 rounded-lg"
                                    minLength="0"
                                    maxLength="150"
                                    name="username"
                                    id="username"
                                    type="text"
                                    placeholder="Email"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <br />
                                <input
                                    className="dark:focus:bg-gray-700 focus:bg-gray-200 mb-2 px-5 c0 border-[1px] border-gray-700 rounded-full h-14 w-96 rounded-lg"
                                    minLength="8"
                                    maxLength="72"
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <br/>
                            </>
                        )}
                        <div className="h-16"></div>
                        <div className="flex flex-row items-center justify-between">
                            <button
                                type="button"
                                className="mt-3 inline-flex mx-2 justify-center py-2 text-sm font-semibold c2 hover:text-green-950 dark:hover:text-white"
                            >
                                Create account
                            </button>
                            <button
                                type="submit"
                                className="mt-3 inline-flex w-20 h-10 rounded-lg border-[2px] border-white dark:border-black items-center justify-center rounded-full text-sm font-semibold bg-gradient-to-r from-embloy-green to-embloy-blue text-green-950 dark:hover:text-white hover:text-black hover:border-[2px] dark:hover:border-white hover:border-green-950"
                            >
                            {isLoading ? (
                                <svg aria-hidden="true"
                                    className="inline w-7 h-7 text-gray-500 animate-spin fill-white"
                                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                            ) : 'Next'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <div className="flex flex-row text-xs items-center justify-center">
                <button
                    type="button"
                    className="mt-3 inline-flex mx-2 justify-center py-2 c3 hover:c2"
                >
                    Help
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex mx-2 justify-center py-2 c3 hover:c2"
                >
                    Privacy & Terms
                </button>
            </div>

            <p className=" absolute bottom-5 text-white font-normal text-sm"> by Embloy Platforms GbR </p>
        </div>
    );
};

export default Signin;