"use client";
import React from "react";

export const UserBar = ({ isVisible, onClose, userData }) => {
    const sidebarClass = `fixed top-0 right-0 h-full w-72 bg-black border-l-[1px] border-gray-700 transition-transform transform ${isVisible ? 'translate-x-0' : 'translate-x-full'}`;
    return (
        <div className={sidebarClass}>
            <div className="sidebar-content">
                {/* Sidebar content goes here */}
                <button className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}