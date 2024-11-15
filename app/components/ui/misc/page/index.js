"use client";
import React, {useContext, useEffect, useState} from "react";
import '@/app/globals.css'
import { cn } from "@/lib/utils";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "@/app/components/ui/misc/stuff";
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import { EmbloyP, EmbloyH1 } from "../text";
export const EmbloyPageMount = ({children, className}) => {
    return (
        <div className={`overflow-x-hidden flex flex-col w-full min-h-screen ${className}`}>
            {children}
        </div>
    );
}

export const EmbloyPageLight = ({children, className}) => {
    return (
        <EmbloyH className={`justify-center`}>
            <div className={`w-full min-h-screen landscape:max-w-80% portrait:max-w-93% flex flex-col items-center justify-start border-l-[1px] border-r-[1px] border-gray-700 p-4 ${className}`}>
                {children}
            </div>
        </EmbloyH>
    );
}

export const EmbloyPageNoAccess = ({className, variant}) => {
    return (
        <EmbloyV className={`p-4 h-screen items-center justify-center gap-2 ${variant==="settings" && "border-t dark:border-biferno pt-2"} ${className}`}>
            
            <EmbloyH className="w-fit justify-center">
                <div className="p-4 bg-fragole rounded-full ">
                    <EmbloyH1 className="text-2xl">Ah, so this is what that Sandbox mode 🏖️ does....</EmbloyH1>
                </div>
            </EmbloyH>
            <EmbloyH className="w-fit justify-center">
                <EmbloyP className="text-2xl italic dark:text-nebbiolo text-vesuvio">Sorry, this feature is not available in Sandbox mode.</EmbloyP>
            </EmbloyH>
        </EmbloyV>
    );
}
export const EmbloyPage = ({children, className, sandboxed=true}) => {
    let user = useContext(UserContext)
    

    return (
        <EmbloyH className={`justify-between`}>
            <EmbloyV className="landscape:max-w-10% items-start">
                {user && user.type === "SandboxUser" && (
                    <EmbloyH className="fixed top-0 left-0 h-screen justify-start">
                        <div className="flex flex-col w-[50px] h-full items-center justify-center text-white bg-fragole">
                            <p className="rotate-[270deg] w-[470px] text-right">Sandbox mode 🏖️ - access to some features may be limited.</p>
                        </div>
                </EmbloyH>
                ) }
            </EmbloyV>
            <div className={`z-20 w-full min-h-screen landscape:max-w-80% portrait:max-w-93% flex flex-col items-center justify-start border-l-[1px] border-r-[1px] border-gray-700 p-4 ${className}`}>
                {sandboxed ? (
                    children
                ) : user && user.type === "SandboxUser" ? (
                    <EmbloyPageNoAccess />
                ) : (
                    children
                )}
            </div>
            <EmbloyV className="landscape:max-w-10% ">
                {user && user.type === "SandboxUser" && (
                    <EmbloyH className="fixed top-0 right-0 h-screen justify-end">
                        <div className="flex flex-col w-[50px] h-full items-center justify-center text-white bg-fragole">
                            <p className="rotate-[90deg] w-[470px] text-left">Sandbox mode 🏖️ - access to some features may be limited.</p>
                        </div>
                    </EmbloyH>
                ) }
            </EmbloyV>
        </EmbloyH>
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


export const EmbloySubPageNav = ({className, pages, checked, handleClick}) => {
    return (
        <ul className="text-sm w-full flex flex-row items-center justify-start gap-2 ">
            {pages.map((page, index) => (
                <li
                    key={index}
                    className={cn(
                        checked === page.id ? "stylish-header-default stylish-header-text-default cursor-default" : "cursor-pointer stylish-header stylish-header-text"
                    )}
                    onClick={() => {
                        handleClick(page.id)
                    }}

                >
                    <p>{page.name}</p>
                </li>
            ))}
        </ul>
    );
}
export const EmbloySubPage = ({pages, children, className, onPageChange, externalSetActivePage}) => {
    const [activePage, setActivePage] = useState(pages[0].id);
    const handleClick = (id) => {
        if (activePage !== id) {
            setActivePage(id);
            if (onPageChange) {
                onPageChange(id);
            }
        }
    }
    useEffect(() => {
        if (externalSetActivePage && externalSetActivePage !== activePage) {
          setActivePage(externalSetActivePage);
        }
      }, [externalSetActivePage, activePage]);
    return (
        <EmbloyV>
            <EmbloySubPageNav pages={pages} checked={activePage} handleClick={handleClick} />
            <EmbloySpacer />
            {React.Children.map(children, (child, index) => (
                <div key={index} className={cn(activePage === child.props.id ? "w-full" : "hidden")}>
                    {child}
                </div>
            ))}
        </EmbloyV>
    );  
}