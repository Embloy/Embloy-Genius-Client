"use client";
import "../locals.css";
import "@/app/globals.css";
import React from "react";
import { ChangePassword } from "@/app/settings/access/ChangePassword";
import { TwoFactorAuthentication } from "@/app/settings/access/TwoFactorAuthentication";

export function AccessSettings() {
  return (
    <div className="flex flex-col items-center sm:items-start">
      <div className="w-full flex flex-col items-center sm:items-start justify-between ">
        <div className="text-sm w-full flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 p-4">
          <div className="text-lg font-medium c3 flex flex-row items-center justify-start gap-4 ">
            <h1>Password & 2FA</h1>
          </div>
          <div className="c3 flex flex-row items-center justify-start">
            <p>Change your password and set up two-factor authentication.</p>
          </div>
        </div>

        <div className="text-sm c2 w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
          <ChangePassword />
          <div className="h-3" />
          <TwoFactorAuthentication />
        </div>
      </div>
    </div>
  );
}
