import React from "react";
import Image from "next/image";
const Signin = () => {
    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center z-50 bg-black overflow-hidden">
            <div className="border-[1px] border-gray-700 rounded-lg flex flex-col items-center justify-center px-10 py-8">
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
                    <form action="submit">
                        <input className="mb-2 px-5 bg-black hover:bg-gray-800 text-gray-400 border-[1px] border-gray-700 rounded-full h-14 w-96 rounded-lg" minLength="3" name="username" id="username" type="text" placeholder='Email' required></input><br/>
                        <input className="mb-2 px-5 bg-black hover:bg-gray-800 text-gray-400 border-[1px] border-gray-700 rounded-full h-14 w-96 rounded-lg " minLength="5" name="password" id="password" type="password" placeholder='Password' required></input><br/>
                        <div className="h-16"></div>
                        <div className="flex flex-row items-center justify-between">
                            <button
                                type="button"
                                className="mt-3 inline-flex mx-2 justify-center py-2 text-sm font-semibold text-gray-400 hover:text-gray-200"
                            >
                                Create account
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-20 h-10 rounded-lg border-[2px] border-black items-center justify-center rounded-full text-sm font-semibold bg-gradient-to-r from-embloy-green to-embloy-blue text-green-950 hover:text-white hover:border-[2px] hover:border-white"
                            >
                                Next
                            </button>
                        </div>
                    </form>
                    <></>
                </div>
            </div>


            <p className=" absolute bottom-5 text-white font-normal text-sm"> by Embloy Platforms GbR </p>
        </div>
    );
};

export default Signin;