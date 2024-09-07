"use client";
import React, {useState, useEffect, use} from "react";
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



export const EmbloyToggle = ({ name, onChange, className, disabled=false, unlock=true, onDisable,...props }) => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (disabled) {
      setIsOn(false);
      onChange(false);
      onDisable();
    }
  }, [disabled, onChange]);

  const toggleSwitch = () => {
    if (!disabled) {
      const newState = !isOn;
      setIsOn(newState);
      onChange(newState);
    }
  };

  return (
    <EmbloyChildrenAdvanced {...props}>
      <div 
        className={`border border-etna dark:border-biferno w-16 h-7 flex items-center rounded-lg p-1 cursor-pointer transition-colors duration-300 
            ${isOn ? 
                `${unlock ? 'bg-green-500' : 'bg-amber-200'}` 
                : 'dark:bg-nebbiolo bg-transparent'} 
            ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={toggleSwitch}
      >
        <div 
          className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 
            ${isOn ? 
              `${unlock ? 'bg-embloy-green' : 'bg-amber-600'} translate-x-8 w-6` 
              : 
              'bg-etna dark:bg-amarone translate-x-0'}`}
        ></div>
        
        <span className="ml-2 font-normal">
          <EmbloyP className="text-xs right select-none">
            {isOn ? 'On' : 'Off'}
          </EmbloyP>
        </span>
      </div>
    </EmbloyChildrenAdvanced>
  );
};
