"use client";
import React,{ useState} from "react";
import '@/app/globals.css'
import { cn } from "@/lib/utils";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "@/app/components/ui/misc/stuff";
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
            <div className={`w-full min-h-screen landscape:max-w-80% portrait:max-w-93% flex flex-col items-center justify-start border-l-[1px] border-r-[1px] border-gray-700 p-4 ${className}`}>
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


export const EmbloySubPageNav = ({className, pages, checked, handleClick}) => {
    return (
        <ul className="text-sm w-full flex flex-row items-center justify-start gap-2 ">
            {pages.map((page, index) => (
                <li
                    key={index}
                    className={cn(
                        checked === page.id ? "stylish-header-default stylish-header-text-default cursor-default" : "cursor-pointer stylish-header stylish-header-text"
                    )}
                    onClick={() => handleClick(page.id)}

                >
                    <p>{page.name}</p>
                </li>
            ))}
        </ul>
    );
}
export const EmbloySubPage = ({pages, children, className}) => {
    const [activePage, setActivePage] = useState(pages[0].id);
    const handleClick = (id) => {
        if (activePage !== id) {
            setActivePage(id);
        }
    }
    return (
        <EmbloyV>
            <EmbloySubPageNav pages={pages} checked={activePage} handleClick={handleClick} />
            <EmbloySpacer />
            {React.Children.map(children, (child, index) => (
                <div key={index} className={cn(activePage === child.props.id ? "" : "hidden")}>
                    {child}
                </div>
            ))}
        </EmbloyV>
    );  
}