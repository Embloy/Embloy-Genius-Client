"use client";
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import '@/app/globals.css'
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgButton, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle} from "@/app/components/ui/misc/stuff";
import { EmbloyH1, EmbloyP } from "@/app/components/ui/misc/text";
import { EmbloyPageNoAccess } from "@/app/components/ui/misc/page";

export const SettingsPage = ({children, sandboxed=true}) => {
    let {user, company, subscription} = useContext(UserContext)
    return (
    <EmbloyV className={"gap-2 "}>
       {sandboxed ? (
                    children
                ) : user && user.type === "SandboxUser" ? (
                    <EmbloyPageNoAccess variant="settings" />
                ) : (
                    children
            )}
    </EmbloyV> 
    )
}

export const SettingsSection = ({children, head}) => {
    return (
        <>
            <EmbloyH className={"items-center justify-between border-t border-etna dark:border-biferno border-etna pt-2"}>
                <EmbloyH1 className={"text-lg"}>{head}</EmbloyH1>
            </EmbloyH>
            <EmbloyV className={"gap-2"}>
                {children}
            </EmbloyV>
            <EmbloySpacer/>
        </>
    )
}
