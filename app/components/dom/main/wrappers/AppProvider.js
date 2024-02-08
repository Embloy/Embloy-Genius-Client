"use client";
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import {createContext, useState} from "react";
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
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </AppContext.Provider>
    ) ;
}
export default AppProvider;