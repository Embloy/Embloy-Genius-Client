"use client";
import React, {useState, forwardRef, useImperativeHandle} from "react";
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



export const EmbloyToggle = forwardRef((className, props, ref) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(prevState => !prevState);
  };

  // Expose the state and toggle function to the parent
  useImperativeHandle(ref, () => ({
    toggleSwitch,  // Expose the toggle function
    isOn,          // Expose the current state
  }));

  return (
    <div 
      className={`w-16 h-7 flex items-center rounded-lg p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-green-500' : 'dark:bg-nebbiolo'} ${className}`}
      onClick={toggleSwitch}
    >
      <div 
        className={`${isOn ? 'bg-embloy-green' : 'dark:bg-amarone'} w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-8 w-6' : 'translate-x-0'}`}
      ></div>
     
      <span className="ml-2 text-amarone font-normal">
        <EmbloyP className="text-xs right">
            {isOn ? 'On' : 'Off'}
        </EmbloyP>
      </span>
    </div>
  );
});
