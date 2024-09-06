"use client";
import React, {useState, forwardRef, useImperativeHandle} from "react";
import '@/app/globals.css'
import { Tooltip } from "@nextui-org/react";
import {EmbloyP} from '@/app/components/ui/misc/text'
import { ex } from "@fullcalendar/core/internal-common";

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
export const EmbloyChildrenAdvanced = ({className, children, tooltip, disabled}) => {
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
                <div className={`${className} ${disabled && 'cursor-not-allowed'}`}>
                    {children}
                </div>
            </Tooltip>
        )

    } else {
        return (
            <div className={`${className} ${disabled && 'cursor-not-allowed'}`}>
                {children}
            </div>
        )
    }
}



const EmbloyToggle = forwardRef(({ name, onChange, className, ...props }, ref) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(prevState => {
      const newState = !prevState;
      if (onChange) {
        onChange(newState);
      }
      return newState;
    });
  };

  return (
    <EmbloyChildrenAdvanced {...props}>
        <div 
        className={`border border-etna dark:border-biferno w-16 h-7 flex items-center rounded-lg p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-green-500' : 'dark:bg-nebbiolo bg-transparent'} ${className}`}
        onClick={toggleSwitch}
        >
        <div 
            className={`${isOn ? 'bg-embloy-green' : 'bg-etna dark:bg-amarone'} w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-8 w-6' : 'translate-x-0'}`}
        ></div>
        
        <span className="ml-2 font-normal">
            <EmbloyP className="text-xs right">
                {isOn ? 'On' : 'Off'}
            </EmbloyP>
        </span>
        </div>
    </EmbloyChildrenAdvanced>
  );
});
EmbloyToggle.displayName = 'EmbloyToggle';

export default EmbloyToggle;
