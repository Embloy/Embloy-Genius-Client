import {React, useState} from "react";
import '@/app/globals.css'
import {EmbloyBox, EmbloyBoxContent} from '@/app/components/ui/misc/box'
import {EmbloyH} from '@/app/components/ui/misc/stuff'
import Image from "next/image";

export const EmbloyToolbox = ({name, children, className, superClassName}) => {
    return (
        <EmbloyBox className={`max-w-fit landscape:py-2 landscape:px-2.5 portrait:py-0.5 portrait:px-2  ${superClassName}`}>
            <EmbloyBoxContent>
                <EmbloyH className={`gap-3 items-center ${className}`}>
                    {name && <p className="font-normal text-sm text-amarone mr-2">{name}</p>}
                    {children}
                </EmbloyH>
            </EmbloyBoxContent>
        </EmbloyBox>
    );
}


export const EmbloyToolboxA = ({href, target, children}) => {
    return (
        <a href={`${href}`} target={`${target}`}>
            {children}
        </a>
    )
}
export const EmbloyToolboxImg = ({path, path_hovered, height, width}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <Image
            src={
            isHovered
                ? path_hovered
                : path
            }
            alt={`Logo-${path}`}
            height={`${height}`}
            width={`${width}`}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        />
    );
}

export const EmbloyToolboxImgA = ({href, target="_self", path, path_hovered, height, width}) => {
    return (
        <EmbloyToolboxA href={href} target={target}>
            <EmbloyToolboxImg path={path} path_hovered={path_hovered} height={height} width={width} />
        </EmbloyToolboxA>
    )
}