import React from "react";
import '@/app/globals.css'
import { EmbloySeperator } from "../stuff";
import Note from "@/app/components/ui/misc/note";
export const EmbloyBox = ({children, className}) => {
    return (
        <div className={`border-[1px] border-etna dark:border-chianti w-full flex landscape:flex-row portrait:flex-col items-start landscape:justify-between portrait:justify-start bg-transparent dark:bg-chianti landscape:px-6 portrait:px-4 landscape:py-6 portrait:py-5 rounded-lg g-4 ${className} `}>
            {children}
        </div>
    );
}

export const EmbloyBoxContent = ({children, className, lilboxhead, boxhead, notes}) => {
    return (
        <div className={`flex flex-col items-start justify-start gap-20px w-full `}>
            {boxhead && lilboxhead && (
                <div></div>
            )}
            {!boxhead && lilboxhead && (
                <div></div>
            )}
            {boxhead && !lilboxhead && (
                <>
                    <h1 className="text-xl font-normal text-page-header">{boxhead}</h1>
                    <EmbloySeperator />
                </>
            )}
            {notes && notes.length > 0 && (
                <div className="flex flex-row justify-start gap-1.5">
                    {notes.map((note, index) => (
                        <Note key={index} message={note.message} />
                    ))}
                </div>
            )}
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