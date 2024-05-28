"use client";
import React from "react";
import { useTheme } from "next-themes";
import '@/app/globals.css'

export function AppearanceSettings() {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;



    return (
        <div className="w-full flex flex-col items-start justify-start gap-4">
            <div className="w-full flex flex-row items-center justify-start gap-3">
                <h1 className="text-lg font-medium c2">Theme preferences</h1>
            </div>

            <div className="flex flex-row items-center justify-start">
                <p className="c2">
                    Select Embloy`s colors or sync with your system.
                </p>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1">
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="w-full flex flex-row items-start justify-start gap-6">
                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="font-medium c1">Theme mode</p>
                            <select
                                className="c0 h-7 w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left"
                                onChange={(e) => setTheme(e.target.value)}
                                value={currentTheme}
                            >
                                <option value="light">Light{systemTheme === 'light' ? " (system)" : ""}</option>
                                <option value="dark">Dark{systemTheme === 'dark' ? " (system)" : ""}</option>
                            </select>

                            <p className="text-xs c3">Embloy will use your selected theme</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}