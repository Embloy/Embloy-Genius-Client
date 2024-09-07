import {React, useState} from "react";
import '@/app/globals.css'
import {EmbloyBox, EmbloyBoxContent} from '@/app/components/ui/misc/box'
import {EmbloyH, EmbloyChildrenAdvanced} from '@/app/components/ui/misc/stuff'
import Image from "next/image";


export const EmbloyToolbox = ({name, children, className, superClassName}) => {
    return (
        <EmbloyBox className={`max-w-fit landscape:py-[8px] landscape:px-[10px] portrait:py-0.5 portrait:px-2  ${superClassName}`}>
            <EmbloyBoxContent>
                <EmbloyH className={`gap-3 items-center ${className}`}>
                    {name && <p className="font-normal text-sm text-amarone mr-2">{name}</p>}
                    {children}
                </EmbloyH>
            </EmbloyBoxContent>
        </EmbloyBox>
    );
}



export const EmbloyToolboxA = ({href, target, children, ...props}) => {
    return (
        <EmbloyChildrenAdvanced {...props}>
            <a href={`${href}`} target={`${target}`}>
                {children}
            </a>
        </EmbloyChildrenAdvanced>
    )
}
export const EmbloyToolboxImg = ({disabled=false, path, path_hovered, height, width, className, ...props}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <EmbloyChildrenAdvanced {...props}>
            <Image
                src={!disabled &&
                isHovered
                    ? path_hovered
                    : path
                }
                alt={`Logo-${path}`}
                height={`${height}`}
                width={`${width}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`relative select-none ${className}`}
            />
        </EmbloyChildrenAdvanced>
    );
}

export const EmbloyToolboxImgA = ({disabled, href, target="_self", path, path_hovered, path_disabled, dark_path, dark_path_hovered, dark_path_disabled, height, width, ...props}) => {
    return (
        <EmbloyChildrenAdvanced {...props}>
            <EmbloyToolboxA href={href} target={target} >
                <EmbloyToolboxImg disabled={disabled} className="block dark:hidden" path={path_disabled && disabled ? path_disabled : path} path_hovered={path_hovered} height={height} width={width} />
                <EmbloyToolboxImg disabled={disabled} className="hidden dark:block" path={dark_path && disabled ? dark_path_disabled : dark_path} path_hovered={dark_path_hovered} height={height} width={width} />
            </EmbloyToolboxA>
        </EmbloyChildrenAdvanced>
    )
}

export const EmbloyToolboxImgAdvanced = ({disabled, path, path_hovered, path_disabled, dark_path, dark_path_hovered, dark_path_disabled, height, width, ...props}) => {
    return (
        <EmbloyChildrenAdvanced {...props}>
            <EmbloyToolboxImg className="block dark:hidden" disabled={disabled} path={path_disabled && disabled ? path_disabled : path} path_hovered={path_hovered} height={height} width={width} />
            <EmbloyToolboxImg className="hidden dark:block" disabled={disabled} path={dark_path && disabled ? dark_path_disabled : dark_path} path_hovered={dark_path_hovered} height={height} width={width} />
        </EmbloyChildrenAdvanced>
    )
}

export const EmbloyToolboxImgButton = ({onClick, path, path_hovered, path_disabled, dark_path, dark_path_hovered, dark_path_disabled, height, width, ...props}) => {
    return (
        <button onClick={onClick} className={`${props.disabled && "cursor-not-allowed"}`} disabled={props.disabled}>
             <EmbloyToolboxImgAdvanced path={path} path_hovered={path_hovered} path_disabled={path_disabled} dark_path={dark_path} dark_path_hovered={dark_path_hovered} dark_path_disabled={dark_path_disabled} height={height} width={width} {...props}/>
        </button>
    )
}