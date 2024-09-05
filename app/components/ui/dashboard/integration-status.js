"use client";
import React, { useState } from "react";
import '@/app/globals.css'


const IntegrationStatus = ({ message }) => {
    const [showAll, setShowAll] = useState(false)
    const handleToggle = () => {
        setShowAll(!showAll);
    };
    //fetch integrtations
    // make table 
    return(
        <div className="flex flex-col items-start justify-start">
            <div className="flex flex-row items-center justify-start text-xs font-sm text-amarone hover:text-barbera ">
                <button onClick={handleToggle} className=" flex items-center gap-2">
                    {showAll ? "Hide inactivated" : "Show all"}
                </button>
            </div>
            {showAll && (
                <div className="mt-2">
                    {message}
                </div>
            )}
        </div>
    );
};

export default IntegrationStatus;



