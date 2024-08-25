import React from "react";
import '@/app/globals.css'
export const EmbloyBox = ({children, className}) => {
    return (
        <div className={`w-full flex landscape:flex-row portrait:flex-col items-start landscape:justify-between portrait:justify-start bg-chianti landscape:px-10 portrait:px-4 landscape:py-6 portrait:py-5 rounded-lg g-4 ${className} `}>
            {children}
        </div>
    );
}

export const EmbloyBoxContent = ({children, className}) => {
    return (
        <div className={`flex flex-col items-start justify-start gap-20px w-full `}>
            {/*
            if lilboxhead and boxhead
			<div>
				<h1 .lilboxhead> lilboxhead
				<h1 .boxhead > boxhead
			<EmbloySeperator>
		elif lilboxhead
			<h1 .lilboxhead> lilboxhead
			<EmbloySeperator>
		elif boxhead 
			<h1 .boxhead> boxhead
			<EmbloySeperator>
            */}
            <div className={`w-full flex flex-col items-start justify-start ${className}`}>
                {children}
            </div>
        </div>
    );
}