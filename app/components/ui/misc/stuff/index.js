import React from "react";
import '@/app/globals.css'
import { Tooltip } from "@nextui-org/react";
import {EmbloyP} from '@/app/components/ui/misc/text'

export const EmbloyV = ({children, className}) => {
    return (
        <div className={`w-full flex flex-col items-start justify-start ${className}`}>
            {children}
        </div>
    );
}

export const EmbloyH = ({children, className}) => {
    return (
        <div className={`w-full flex flex-row items-start justify-start ${className}`}>
            {children}
        </div>
    );
}

export const EmbloyLHPV = ({children, className}) => {
    return (
        <div className={`w-full flex landscape:flex-row portrait:flex-col items-start justify-start ${className}`}>
            {children}
        </div>
    );
}

export const EmbloyLVPH = ({children, className}) => {
    return (
        <div className={`w-full flex landscape:flex-col portrait:flex-row items-start justify-start ${className}`}>
            {children}
        </div>
    );
}


export const EmbloySeperator = ({className}) => {
    return (
        <div className={`w-full bg-etna dark:bg-biferno h-4px rounded-full ${className}`} />
    );
}

export const EmbloySpacer = ({className}) => {
    return (
        <div className={`w-full h-20px ${className}`} />
    );
}
export const EmbloyChildrenAdvanced = ({className, children, tooltip}) => {
    if (tooltip) {
        return (
            <Tooltip
                title={`${tooltip}`}
                placement="top"
                content={
                    <EmbloyP className="text-xs">
                        {tooltip}
                    </EmbloyP>
                    }
            >
                <div className={className}>
                    {children}
                </div>
            </Tooltip>
        )

    } else {
        return (
            <div className={className}>
                {children}
            </div>
        )
    }
}