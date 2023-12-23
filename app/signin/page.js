"use client";
import React, {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {request_refresh, request_access} from "@/lib/authentication";
import {getCookie, getCookies, setCookie} from "cookies-next";
import ErrorScreen from "@/app/components/misc/ErrorScreen";

const Signin = () => {
    const router = useRouter();
    const [loginError, setLoginError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    async function signin(username, password) {
        try {
            if (username === "" || password === "") {
                throw new Error("No username / pw provided");
            }

            request_refresh(username, password)
                .then((token) => {
                    setCookie("refresh", token, {path: "/"})
                    request_access(getCookie("refresh", {path: "/"}))
                        .then((token) => {
                            setCookie("access", token, {path: "/"})
                            router.replace("/");
                        })
                        .catch((error) => {
                            setLoginError(true);
                            setUsername("");
                            setPassword("");
                            throw new Error("Login failed" + " : " + error);
                        });


                })
                .catch(() => {
                    setLoginError(true);
                    setUsername("");
                    setPassword("");
                });


        } catch (error) {
            console.log("Login failed: " + error);

        }
    }

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            await signin(username, password);
            setLoginError(false);

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className={`fixed inset-0 flex flex-col justify-center items-center z-50 bg-black overflow-hidden`}>
            <div
                className=" border-[1px] border-gray-700 rounded-lg flex flex-col items-center justify-center px-10 py-8">
                <Image
                    src="/img/logo_on_dark.png"
                    alt="Logo"
                    height="50"
                    width="125"
                    className="mb-8"
                />
                <h1 className="mb-4 text-white text-2xl">Sign in</h1>
                <p className="mb-8 text-white text-md">Use your Embloy Account</p>
                <div className="flex flex-col items-center justify-center">
                    <form onSubmit={handleLogin}>
                        {loginError ? (
                            <>
                                <input
                                    className="focus:outline-none mb-2 px-5 bg-black hover:bg-gray-700 text-white border-[1px] border-red-500 rounded-full h-14 w-96 rounded-lg"
                                    minLength="3"
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
                                    className="focus:outline-none mb-2 px-5 bg-black hover:bg-gray-700 text-white border-[1px] border-red-500 rounded-full h-14 w-96 rounded-lg"
                                    minLength="5"
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
                                    className="focus:outline-none mb-2 px-5 bg-black hover:bg-gray-700 text-white border-[1px] border-gray-700 rounded-full h-14 w-96 rounded-lg"
                                    minLength="3"
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
                                    className="focus:outline-none mb-2 px-5 bg-black hover:bg-gray-700 text-white border-[1px] border-gray-700 rounded-full h-14 w-96 rounded-lg"
                                    minLength="5"
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <br />
                            </>
                        )}
                        <div className="h-16"></div>
                        <div className="flex flex-row items-center justify-between">
                            <button
                                type="button"
                                className="mt-3 inline-flex mx-2 justify-center py-2 text-sm font-semibold text-gray-400 hover:text-white"
                            >
                                Create account
                            </button>
                            <button
                                type="submit"
                                className="mt-3 inline-flex w-20 h-10 rounded-lg border-[2px] border-black items-center justify-center rounded-full text-sm font-semibold bg-gradient-to-r from-embloy-green to-embloy-blue text-green-950 hover:text-white hover:border-[2px] hover:border-white"
                            >
                                Next
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <div className="flex flex-row text-xs items-center justify-center">
                <button
                    type="button"
                    className="mt-3 inline-flex mx-2 justify-center py-2 text-gray-700 hover:text-gray-400"
                >
                    Help
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex mx-2 justify-center py-2 text-gray-700 hover:text-gray-400"
                >
                    Privacy & Terms
                </button>
            </div>

            <p className=" absolute bottom-5 text-white font-normal text-sm"> by Embloy Platforms GbR </p>
        </div>
    );
};

export default Signin;