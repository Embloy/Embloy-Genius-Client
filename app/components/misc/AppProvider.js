"use client";
import React, {useEffect, createContext, useContext, useState} from "react";

export const AppContext = createContext();

const AppProvider = ({children}) => {

    // ----- Userbar -----
    const [isUserbarVisible, setUserbarVisible] = useState(false);
    const toggleUserbar = () => {
        setUserbarVisible(!isUserbarVisible);
    };


    // ----- Render -----
    return (
        <AppContext.Provider value={{ isUserbarVisible, toggleUserbar}} >
            {children}
        </AppContext.Provider>
    ) ;
}
export default AppProvider;