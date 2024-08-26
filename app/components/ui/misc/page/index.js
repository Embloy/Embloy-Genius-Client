import React from "react";
import '@/app/globals.css'
export const EmbloyPageMount = ({children, className}) => {
    return (
        <div className={`overflow-x-hidden flex flex-col w-full min-h-screen ${className}`}>
            {children}
        </div>
    );
}

export const EmbloyPage = ({children, className}) => {
    return (
        <div className={`w-full flex flex-col items-center justify-start`}>
            <div className={`w-full min-h-screen landscape:max-w-75% portrait:max-w-93% flex flex-col items-center justify-start border-l-[1px] border-r-[1px] border-gray-700 p-4 ${className}`}>
                {children}
            </div>
        </div>
    );
}

export const EmbloyPageBody = ({children, className}) => {
    return (
        <div className={`w-full flex flex-col items-start justify-start gap-45px ${className}`}>
            {children}
        </div>
    );
}

export const EmbloyPageBodySection = ({children, className, enablePortrait = false}) => {
    return (
        <div className={`w-full flex flex-col items-start justify-start gap-5px`}>
            {enablePortrait === true ? (
                <div className={`w-full flex landscape:flex-row items-start landscape:justify-between portrait:flex-col portrait:justify-start portrait:gap-15px ${className}`}>
                    {children}
                </div>
            ):(
                <div className={`w-full flex flex-row items-start justify-between ${className}`}>
                    {children}
                </div>
            )}
            
        </div>
    );
}
