"use client";
import React, {useContext} from "react";
import {AppContext} from "@/app/components/misc/AppProvider";
import {cn} from "@/lib/utils";
import { ThemeProvider } from "next-themes"
const AppWrapper = ({children}) => {
    let app = useContext(AppContext)
    const {appearanceMode} = app;
    return (
        <ThemeProvider attribute="class">
            <div className="flex flex-col items-center justify-center max-w-full">
                {children}
            </div>
        </ThemeProvider>
    );
};
export default AppWrapper;