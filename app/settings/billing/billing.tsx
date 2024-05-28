"use client";
import "../locals.css";

import React from "react";
import { SubscriptionSettings } from "@/app/settings/SubscriptionSettings";

export function BillingSettings({ store }) {
  return (
    <div>
      <div className="w-full flex flex-col items-center justify-between ">
        <div className="text-sm w-full flex flex-row items-center justify-between border-b border-gray-700 p-4">
          <div className="text-lg font-medium c3 flex flex-row items-center justify-start gap-4 ">
            <h1>Subscriptions & billing information</h1>
          </div>
          <div className="c3 flex flex-row items-center justify-start">
            <p>Manage your subscription plan.</p>
            <div className="w-1" />
            <a
              className="italic c3 hover:underline cursor-pointer"
              href="https://developers.embloy.com/docs/category/subscriptions"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="c2-5">Learn more</p>
            </a>
          </div>
        </div>

        <div className="text-sm w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
          {store && store.length > 0 && (
            <>
              <div className="h-3" />
              <SubscriptionSettings store={store} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
