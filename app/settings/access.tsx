"use client"
import './locals.css'
import '../globals.css'
import React, {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {AccessTokenClaim} from "@/app/settings/AccessTokenClaim";
import {ClientTokenClaim} from "@/app/settings/ClientTokenClaim";
import {ChangePassword} from "@/app/settings/ChangePassword";
import {TwoFactorAuthentication} from "@/app/settings/TwoFactorAuthentication";
import {OpenCloseScaffold} from "@/app/components/misc/Scaffolds";

export function AccessSettings() {
    return (
        <div>
            <div className="w-full flex flex-col items-center justify-between ">
                <div
                    className="text-sm w-full flex flex-row items-center justify-between border-b border-gray-700 p-4">
                    <div className="text-lg font-medium c3 flex flex-row items-center justify-start gap-4 ">
                        <h1>Tokens</h1>
                    </div>
                    <div className="c3 flex flex-row items-center justify-start">
                        <p>Generate tokens to access the</p>
                        <div className="w-1"/>
                        <a className="italic c2-5 hover:underline cursor-pointer"
                           href="https://documenter.getpostman.com/view/24977803/2s9YRB2rkE"><p>Embloy API</p></a>
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
                        link_url="https://documenter.getpostman.com/view/24977803/2s9YRB2rkE"
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
                        link_url="https://developer.embloy.com"
                        post_text="."
                        button_text="New Client Token"
                        child={<ClientTokenClaim/>}
                    />
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-between ">
                <div
                    className="text-sm w-full flex flex-row items-center justify-between border-b border-gray-700 p-4">
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