"use client"
import '../locals.css'

import React from "react";
import {NotificationSettings} from "@/app/settings/profile/NotificationSettings";
import {SystemNotificationSettings} from "@/app/settings/profile/SystemNotificationSettings";
import {GeniusSettings} from "@/app/settings/integrations/GeniusSettings";
import {ProfileInfo} from "@/app/settings/profile/ProfileInfo";
import {SubscriptionSettings} from "@/app/settings/SubscriptionSettings";
import {AppearanceSettings} from "@/app/settings/profile/Appearance";
import {useRouter} from "next/navigation";



export function ProfileSettings({store, user}) {
    const router = useRouter();
    return (
        <div>
            <div className="w-full flex flex-col items-center justify-between ">
                <div
                    className="text-sm w-full flex flex-row items-center justify-between border-b border-gray-700 p-4">
                    <div className="text-lg font-medium c3 flex flex-row items-center justify-start gap-4 ">
                        <h1>Personal information & preferences</h1>
                    </div>
                    <div className="c3 flex flex-row items-center justify-start">
                        <p>Some information may be visible to other people using Embloy services.</p>
                        <div className="w-1"/>
                        <a className="italic c3 hover:underline cursor-pointer"
                           href="https://developers.embloy.com/docs/core/account/account_management#personal-details" target="_blank" rel="noopener noreferrer"><p className="c2-5">Learn more</p></a>
                    </div>
                </div>

                <div
                    className="text-sm w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
                    <ProfileInfo router={router}/>
                    <div className="h-3"/>
                    <NotificationSettings/>
                    <div className="h-3"/>
                    <SystemNotificationSettings/>
                    {store && store.length > 0 && (
                        <>
                            <div className="h-3"/>
                            <SubscriptionSettings store={store}/>
                        </>
                    )}
                    <div className="h-3"/>
                    <GeniusSettings/>
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-between ">
                <div
                    className="text-sm w-full flex flex-row items-center justify-between border-b border-gray-700 p-4">
                    <div className="text-lg font-medium c3 flex flex-row items-center justify-start gap-4 ">
                        <h1>Appearance</h1>
                    </div>
                    <div className="c3 flex flex-row items-center justify-start">
                        <p>Choose how Embloy looks to you.</p>
                    </div>
                </div>

                <div
                    className="text-sm w-full flex flex-col items-start justify-start gap-4 border-b border-transparent p-4">
                    <AppearanceSettings/>
                </div>
            </div>
        </div>
    )

}