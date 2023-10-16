"use client";
import Image from "next/image";

const ErrorScreen = () => {
    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center z-50 bg-black overflow-hidden">
            <div role="status" className="pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white"
                     className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path
                        d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
                <span className="sr-only">An error occurred. Please try again later. </span>
            </div>
            <p className="text-white">An error occurred. Please try again later. </p>

            <p className=" absolute bottom-5 text-white font-normal text-sm"> by Embloy Platforms GbR </p>


        </div>
    );
}

export default ErrorScreen;