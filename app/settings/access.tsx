"use client"
import './locals.css'
import '@/app/globals.css'
import React from "react";
import {AccessTokenClaim} from "@/app/settings/AccessTokenClaim";
import {ClientTokenClaim} from "@/app/settings/ClientTokenClaim";
import {ChangePassword} from "@/app/settings/ChangePassword";
import {TwoFactorAuthentication} from "@/app/settings/TwoFactorAuthentication";
import {OpenCloseScaffold} from "@/app/components/dom/main/misc/Scaffolds";

export function AccessSettings() {
    return (
        <div className="flex flex-col items-center sm:items-start">
            <div className="w-full flex flex-col items-center sm:items-start justify-between ">
                <div
                    className="text-sm w-full flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 p-4">
                    <div className="text-lg font-medium c3 flex flex-row items-center justify-start gap-4 ">
                        <h1>Tokens</h1>
                    </div>
                    <div className="c3 flex flex-row items-center justify-start">
                        <p>Generate tokens to access the</p>
                        <div className="w-1"/>
                        <a className="italic c2-5 hover:underline cursor-pointer"
                           href="https://god.gw.postman.com/run-collection/24977803-e44099dd-6647-4b78-bd7a-03293e47dee5?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D24977803-e44099dd-6647-4b78-bd7a-03293e47dee5%26entityType%3Dcollection%26workspaceId%3D6b47d1cc-f4b3-4522-8ab1-98a55f18324c" target="_blank" rel="noopener noreferrer"><p>Embloy API</p></a>
                        <div className="w-1"/>
                        <p>.</p>
                    </div>
                </div>

                <div
                    className="text-sm c2 w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
                    <OpenCloseScaffold
                        title="Access Token"
                        timeout={true}
                        headerChild={<div />}
                        pre_text="Access Tokens are used for every interaction with the"
                        link_text="Embloy API"
                        link_url="https://god.gw.postman.com/run-collection/24977803-e44099dd-6647-4b78-bd7a-03293e47dee5?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D24977803-e44099dd-6647-4b78-bd7a-03293e47dee5%26entityType%3Dcollection%26workspaceId%3D6b47d1cc-f4b3-4522-8ab1-98a55f18324c"
                        post_text="."
                        button_text="New Access Token"
                        child={<AccessTokenClaim/>}
                    />
                    <div className="h-3"/>
                    <OpenCloseScaffold
                        title="Client Token"
                        timeout={true}
                        headerChild={<div />}
                        pre_text="Client Tokens are used for embedding Embloy Products on the client-side using the"
                        link_text="Embloy SDK"
                        link_url="https://developers.embloy.com/docs/core/tokens/token_info#client-token"
                        post_text="."
                        button_text="New Client Token"
                        child={<ClientTokenClaim/>}
                    />
                </div>
            </div>

            <div className="w-full flex flex-col items-center sm:items-start justify-between ">
                <div
                    className="text-sm w-full flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 p-4">
                    <div className="text-lg font-medium c3 flex flex-row items-center justify-start gap-4 ">
                        <h1>Password & 2FA</h1>
                    </div>
                    <div className="c3 flex flex-row items-center justify-start">
                        <p>Change your password and set up two-factor authentication.</p>
                    </div>
                </div>

                <div
                    className="text-sm c2 w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
                    <ChangePassword />
                    <div className="h-3"/>
                    <TwoFactorAuthentication />
                </div>
            </div>
        </div>
    )
}