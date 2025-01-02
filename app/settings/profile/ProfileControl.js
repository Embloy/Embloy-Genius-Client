"use client";
import React, {useContext} from "react";
import '@/app/globals.css'
import {ProfileInfo} from "@/app/settings/profile/ProfileInfo.js";
import {PreferenceInfo} from "@/app/settings/profile/PreferenceInfo.js";
import { SettingsPage, SettingsSection } from "@/app/components/dom/main/misc/settings_section";
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import { CompanyInfo } from "@/app/settings/profile/CompanyInfo.js";

export function ProfileControl() {
    let {user, company, subscription} = useContext(UserContext)
    return (
        <SettingsPage>
            <SettingsSection head="Account Details">
                <ProfileInfo />
            </SettingsSection>
            { user  && subscription && subscription.status === "active" && (subscription.name === "default" || subscription.name === "enterprise_1" || subscription.name === "enterprise_2") &&
                <SettingsSection head="Company Details">
                    <CompanyInfo />
                </SettingsSection>
            }
            <SettingsSection head="Preferences">
                <PreferenceInfo/>
            </SettingsSection>
        </SettingsPage>
    );
}