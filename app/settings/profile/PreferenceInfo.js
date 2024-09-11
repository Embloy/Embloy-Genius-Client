import React, { useEffect} from "react";
import { useTheme } from "next-themes";
import '@/app/globals.css'
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle} from "@/app/components/ui/misc/stuff";
import { EmbloyInputbox, EmbloyInputboxElement, EmbloyInput, EmbloySelectOption } from "@/app/components/ui/misc/input";

export function PreferenceInfo() {
    const { systemTheme, theme, setTheme } = useTheme();

    return (  
        <EmbloyV className="gap-4">
            <EmbloyInputbox>
                <EmbloyInputboxElement head="Theme" description="Select your theme preference.">
                    <EmbloyInput
                        variant="select"
                        onChange={(e) => setTheme(e.target.value)}
                        value={theme}
                    >
                        <EmbloySelectOption value="light" head="Light"/>
                        <EmbloySelectOption value="dark" head="Dark"/>
                        <EmbloySelectOption value="system" head={"System (" + systemTheme + ")"}/>
                    </EmbloyInput>
                </EmbloyInputboxElement>
                
            </EmbloyInputbox>
            <EmbloyInputbox>
                <EmbloyInputboxElement head="Language" description="Select your language preference.">
                    <EmbloyInput
                        variant="select"
                        onChange={undefined}
                        value="en-us"
                        disabled={true}
                    >
                        <EmbloySelectOption value="en-us" head="English (US)" />
                    </EmbloyInput>
                </EmbloyInputboxElement>
            </EmbloyInputbox>
        </EmbloyV>
        
    )
}