"use client";
import React from "react";
import '@/app/globals.css'
import {ProfileInfo} from "@/app/settings/profile/ProfileInfo.js";
import {PreferenceInfo} from "@/app/settings/profile/PreferenceInfo.js";
import { SettingsPage, SettingsSection } from "@/app/components/dom/main/misc/settings_section";


export function ProfileControl() {
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