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
export const EmbloyChildrenAdvanced = ({className, children, tooltip, disabled, ...props}) => {
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



export const EmbloyToggle = ({ name, onChange, className, disabled=false, unlock=true, forceStatus, ...props }) => {
  const [isOn, setIsOn] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    console.log("forceStatus", forceStatus);
    if (forceStatus === "active") {
        setPending(false);
        setIsOn(true);
    } else if (forceStatus === "inactive") {
        setPending(false);
        setIsOn(false);
    } else if (forceStatus === "connect") {
        setPending(true);
        setIsOn(true);
    } else if (forceStatus === "disconnect") {
        setPending(true);
        setIsOn(false);
    }

  }, [forceStatus]);

  const toggleSwitch = () => {
    if (!disabled) {
      const newState = !isOn;
      onChange(newState);
    }
  };

  return (
    <EmbloyChildrenAdvanced {...props}>
      <div 
        className={`
            border border-etna dark:border-biferno w-16 h-7 flex items-center rounded-lg p-1 cursor-pointer transition-colors duration-300 
            ${isOn ? 
                (pending ? 'cursor-wait bg-amber-200 dark:bg-amber-200' : 'bg-green-500 dark:bg-green-500' ) 
                : (pending ? 'cursor-wait bg-amber-200 dark:bg-amber-200' : 'dark:bg-nebbiolo bg-transparent')
            } 
            ${disabled === true && 'opacity-50 cursor-not-allowed'} ${className}`}
        onClick={toggleSwitch}
      >
            <div 
                className={`
                    w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 
                    ${isOn ? 
                        (pending ? 'cursor-wait dark:bg-amber-600 bg-amber-600 translate-x-8 w-6' : 'bg-embloy-green dark:bg-embloy-green translate-x-8 w-6') 
                        : (pending ? 'cursor-wait dark:bg-amber-600 bg-amber-600 translate-x-0' : 'bg-etna dark:bg-amarone translate-x-0')
                    }
                    ${disabled === true && 'opacity-50 cursor-not-allowed'}
                `}
            />

        <span className={`ml-2 font-normal  ${disabled === true && 'opacity-50 cursor-not-allowed'}`}>
          <EmbloyP className="text-xs right select-none">
            {isOn ? 'On' : 'Off'}
          </EmbloyP>
        </span>
      </div>
    </EmbloyChildrenAdvanced>
  );
};

export const EmbloyButton = ({ name, className, disabled=false, unlock=true, variant="default", type="button",  onStatus, onClick, onMessage, ...props }) => {
    let text = name;
    const loading = (onStatus === "loading");
    const success = (onStatus === "success");
    const error = (onStatus === "error");
    
    let color = "bg-black dark:bg-amarone border-black dark:border-amarone "; 
    let textcolor = "text-white dark:text-white";
    if (type === "text") {
        textcolor = "text-golfotrieste dark:text-amarone";
        if (disalbed === false) {
            textcolor = textcolor + " hover:text-golfonapoli dark:hover:text-barbera";
        }
    }
    if (loading===false && disabled === false) {
        color = color + " hover:bg-leidoveneta dark:hover:bg-barbera hover:border-leidoveneta dark:hover:border-barbera ";
    }
    if (variant === "paypal") {
        color = "bg-golfotrieste dark:bg-nebbiolo border-golfotrieste dark:border-rubeno x";
        if (loading===false && disabled === false) {
            color = color + " hover:bg-golfonapoli dark:hover:bg-barbera hover:border-golfonapoli dark:hover:border-barbera";
        }
    } 
    if (loading) {
        color = color + " cursor-wait";
    }
    if (success) {
        textcolor = "text-embloy-green dark:text-embloy-green";
    }

    if (error) {
        textcolor = "text-primitivo dark:text-primitivo";
    }

    if (onMessage) {
        text = onMessage;
    }
    if (type === "button") {
        return (
            <EmbloyChildrenAdvanced {...props}>
                <button 
                    onClick={(e) => {
                        if (disabled === false) {
                            onClick(e);
                        }
                    }}
                    className={`
                        w-full border py-2 px-4 flex items-center justify-center rounded-full transition-colors duration-300 ${color}
                        ${(disabled === true) && 'opacity-50 cursor-not-allowed'}  ${className}`}
                >
                    {loading ? (
                        <svg aria-hidden="true"                                                   
                            className="inline w-5 h-5 text-gray-500 animate-spin fill-white"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                        </svg>) : 
                        <EmbloyP className={textcolor}>{text}</EmbloyP>}

                </button>
            </EmbloyChildrenAdvanced>
        );
    } 
    if (type === "text") {
        return (
            <EmbloyChildrenAdvanced {...props}>
                <button 
                    onClick={(e) => {
                        if (disabled === false) {
                            onClick(e);
                        }
                    }}
                    className={`
                        w-full flex flex-col items-start justify-center 
                        ${(disabled === true) && 'opacity-50 cursor-not-allowed'} `}
                >
                    <EmbloyP className={`${textcolor} transition-colors duration-300 ${className}`}>{text}</EmbloyP>
                </button>
            </EmbloyChildrenAdvanced>
        );
    }

}