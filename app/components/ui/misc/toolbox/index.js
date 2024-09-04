import React from "react";
import '@/app/globals.css'
import {EmbloyBox, EmbloyBoxContent} from '@/app/components/ui/misc/box'
import {EmbloyH} from '@/app/components/ui/misc/stuff'

export const EmbloyToolbox = ({name, children, className, superClassName}) => {
    return (
        <EmbloyBox className={`max-w-fit landscape:py-2 landscape:px-2 portrait:py-0.5 portrait:px-2  ${superClassName}`}>
            <EmbloyBoxContent>
                <EmbloyH className={`gap-3 items-center ${className}`}>
                    {name && <p className="font-normal text-sm text-amarone mr-2">{name}</p>}
                    {children}
                </EmbloyH>
            </EmbloyBoxContent>
        </EmbloyBox>
    );
}