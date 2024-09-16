"use client";
import React from "react";
import '@/app/globals.css'
import { SettingsPage, SettingsSection } from "@/app/components/dom/main/misc/settings_section";
import { PasswordInfo } from "./PasswordInfo";
import { TwoFaInfo } from "./TwoFaInfo";

export function AccessControl() {
    return (
        <SettingsPage>
            <SettingsSection head="Password">
                <PasswordInfo/>
            </SettingsSection>
            <SettingsSection head="2FA">
                <TwoFaInfo/>
            </SettingsSection>
        </SettingsPage>
    );
}