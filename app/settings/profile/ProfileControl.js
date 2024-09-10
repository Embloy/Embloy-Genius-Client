"use client";
import React, {useEffect, useState} from "react";
import '@/app/globals.css'
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgButton, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle} from "@/app/components/ui/misc/stuff";
import { EmbloyH1, EmbloyP } from "@/app/components/ui/misc/text";
import {ProfileInfo} from "@/app/settings/profile/ProfileInfo.js";
export function ProfileControl({}) {
    return (
        <EmbloyV className={"gap-2 border-t dark:border-biferno pt-2"}>
            <EmbloyH className={"items-center justify-between"}>
                <EmbloyH1 className={"text-lg"}>Account Details</EmbloyH1>
            </EmbloyH>
            <EmbloyV className={"gap-2"}>
                <EmbloyV className={"gap-2"}>
                    <ProfileInfo />
                </EmbloyV>
            </EmbloyV>
            <EmbloyH className={"items-center justify-between border-t dark:border-biferno pt-2"}>
                <EmbloyH1 className={"text-lg"}>Preferences</EmbloyH1>
            </EmbloyH>
            <EmbloyV className={"gap-2"}>
                <EmbloyV className={"gap-2"}>
                </EmbloyV>
            </EmbloyV>
        </EmbloyV> 
    );
}