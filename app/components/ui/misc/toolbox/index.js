import {React, useState} from "react";
import '@/app/globals.css'
import {EmbloyBox, EmbloyBoxContent} from '@/app/components/ui/misc/box'
import {EmbloyH} from '@/app/components/ui/misc/stuff'
import {EmbloyP} from '@/app/components/ui/misc/text'
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";

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

const EmbloyToolboxElement = ({className, children, tooltip}) => {
    console.log("TOOLTIP", tooltip)
    if (tooltip) {
        return (
            <Tooltip
                title={`Tip-${tooltip}`}
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

export const EmbloyToolboxA = ({href, target, children, ...props}) => {
    return (
        <EmbloyToolboxElement {...props}>
            <a href={`${href}`} target={`${target}`}>
                {children}
            </a>
        </EmbloyToolboxElement>
    )
}
export const EmbloyToolboxImg = ({path, path_hovered, height, width, className, ...props}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <EmbloyToolboxElement {...props}>
            <Image
                src={
                isHovered
                    ? path_hovered
                    : path
                }
                alt={`Logo-${path}`}
                height={`${height}`}
                width={`${width}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`relative ${className}`}
            />
        </EmbloyToolboxElement>
    );
}

export const EmbloyToolboxImgA = ({href, target="_self", path, path_hovered, dark_path, dark_path_hovered, height, width, ...props}) => {
    return (
        <EmbloyToolboxElement {...props}>
            <EmbloyToolboxA href={href} target={target}>
                <EmbloyToolboxImg className="block dark:hidden" path={path} path_hovered={path_hovered} height={height} width={width} />
                <EmbloyToolboxImg className="hidden dark:block" path={dark_path} path_hovered={dark_path_hovered} height={height} width={width} />
            </EmbloyToolboxA>
        </EmbloyToolboxElement>
    )
}

export const EmbloyToolboxImgAdvanced = ({path, path_hovered, dark_path, dark_path_hovered, height, width, ...props}) => {
    return (
        <EmbloyToolboxElement {...props}>
            <EmbloyToolboxImg className="block dark:hidden" path={path} path_hovered={path_hovered} height={height} width={width} />
            <EmbloyToolboxImg className="hidden dark:block" path={dark_path} path_hovered={dark_path_hovered} height={height} width={width} />
        </EmbloyToolboxElement>
    )
}