"use client";
import React, {useEffect, useState} from "react";
import '@/app/globals.css'
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgButton, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle} from "@/app/components/ui/misc/stuff";
import { EmbloyH1, EmbloyP } from "@/app/components/ui/misc/text";
import {ProfileInfo} from "@/app/settings/profile/ProfileInfo.js";
import {PreferenceInfo} from "@/app/settings/profile/PreferenceInfo.js";
import { SettingsPage, SettingsSection } from "@/app/components/dom/main/misc/settings_section";


export function AccessControl() {
    return (
        <SettingsPage>
            <SettingsSection head="Account Details">
                <ProfileInfo />
            </SettingsSection>
            <SettingsSection head="Preferences">
                <PreferenceInfo/>
            </SettingsSection>
        </SettingsPage>
    );
}