"use client";
import React, {useContext, useEffect, useRef, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/app/components/ui/select";

interface Expiration {
    [key: string]: number;
}

const priors: Expiration[] = [
    {"1 day": 1},
    {"2 days": 2},
    {"1 Week": 7},
    {"2 Weeks": 14}
];
export function AppearanceSettings() {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const [sysThemeIsHovered, setSysThemeIsHovered] = useState(false);
    const handleWeeklyReportHover = () => {
        setSysThemeIsHovered(true);
    };
    const handleWeeklyReportNotHover = () => {
        setSysThemeIsHovered(false);
    };



    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex flex-row items-center justify-start gap-3">
                <h1 className="text-lg font-medium">Theme preferences</h1>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="text-gray-400">
                    Select Embloy`s colors or sync with your system.
                </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="w-full flex flex-row items-start justify-start gap-6">
                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium text-gray-200">Theme mode</p>
                            <select
                                className={sysThemeIsHovered ? "bg-gray-900 text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left" : "bg-black text-white h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left"}
                                onMouseEnter={handleWeeklyReportHover}
                                onMouseLeave={handleWeeklyReportNotHover}
                                onChange={(e) => setTheme(e.target.value)}
                                value={currentTheme}
                            >
                                <option value="light">Light{systemTheme === 'light' ? " (system)" : ""}</option>
                                <option value="dark">Dark{systemTheme === 'dark' ? " (system)" : ""}</option>
                            </select>

                            <p className="text-xs text-gray-700">Embloy will use your selected theme</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}