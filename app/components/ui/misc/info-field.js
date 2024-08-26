import React from 'react';
import '@/app/globals.css'
import Note from "@/app/components/ui/misc/note";
const InfoField = ({title, notes, children}) => {
    return(
        <div className="p-4 flex flex-col items-start justify-between gap-3 bg-body text-white rounded-lg border-[1px] border-gray-700 transition duration-200 ease-in-out hover:border-embloy-gray-light overflow-auto">
            <h1 className="font-sm text-xl text-white">{title}</h1>
            
            <div className="w-full h-[1px] bg-gray-700"/>

            {notes && notes.length > 0 && (
                <div className="flex flex-row justify-start gap-1.5">
                    {notes.map((note, index) => (
                        <Note key={index} message={note.message} />
                    ))}
                </div>
            )}
            
            <div >
                {children}              
            </div>
        </div>
    );
};

export default InfoField;
