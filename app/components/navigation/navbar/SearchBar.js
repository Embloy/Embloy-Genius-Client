"use client";
import React from "react";

export function SearchBar(props) {
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            console.log('enter press here! ')
        }
    }

    return (

        <input
            className="bg-black hover:bg-gray-800 text-gray-400 border-[1px] border-gray-700 rounded-full h-10 w-52 px-4"
            type="text"
            name="name"
            placeholder="Search"
            onKeyDown={handleKeyPress}
        />

    )
}