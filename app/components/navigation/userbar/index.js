"use client";
import React, {useContext} from "react";


export const UserBar = ({ isVisible, onClose, userData }) => {
    const sidebarClass = `z-50 fixed top-0 right-0 h-full w-72 bg-black border-l-[1px] border-gray-700 transition-transform transform ${isVisible ? 'translate-x-0' : 'translate-x-full'}`;

    return (
        <div className={sidebarClass}>
            <div className="flex h-full w-full">
                    {userData ? (
                        <div className="h-full w-full flex flex-col justify-start items-center text-white ">
                            <div className="w-full flex flex-row justify-start items-center text-white gap-2.5">
                                <button className={`w-10 h-10 rounded-full bg-red-400`}></button>
                                <p>{userData.first_name} {userData.last_name}</p>
                            </div>
                            <div className="w-full bg-gray-700 h-[1px]" />
                            <button className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded" onClick={onClose}>Close</button>
                        </div>
                    ): (
                        <button>Sign in</button>
                    )}

            </div>
        </div>
    );
}