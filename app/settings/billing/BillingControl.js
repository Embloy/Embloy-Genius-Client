"use client";
import React, {useEffect, useState} from "react";
import '@/app/globals.css'
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgButton, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle, EmbloyButton} from "@/app/components/ui/misc/stuff";
import { EmbloyH1, EmbloyP } from "@/app/components/ui/misc/text";
import {ProfileInfo} from "@/app/settings/profile/ProfileInfo.js";
import {PreferenceInfo} from "@/app/settings/profile/PreferenceInfo.js";
import { SettingsPage, SettingsSection } from "@/app/components/dom/main/misc/settings_section";
import { useRouter } from "next/navigation"
import { EmbloyInput, EmbloyInputbox, EmbloyInputboxElement, EmbloyRadioOption, EmbloySelectOption } from "@/app/components/ui/misc/input";
import { not_core_get, core_get } from "@/lib/api/core";
import { cast_date } from "@/lib/utils/cast";


export const freePlan = {
    name: "Embloy Free",
    internal_name: "basic",
    description:
      "One-Click-Application, apply to as many jobs as you want and no ads.",
    stripePriceId: "price_1Pxb4zKMiBrigNb6XPZOmA7z",
  }
  
  export const smartPlan = {
    name: "Embloy Smart",
    internal_name: "premium",
    description:
      "Up to 50 active job postings and client token customization.",
    stripePriceId: "price_1Pxb6NKMiBrigNb6gnrCGjCH",
  }
  
  export const geniusPlan = {
    name: "Embloy Genius",
    internal_name: "enterprise_1",
    description: "Unlimited job postings and much more.",
    stripePriceId: "price_1Pxb7WKMiBrigNb6UpAWSMrT",
  }
   
  export const enterprise2 = {
    name: "Embloy Premium",
    internal_name: "enterprise_2",
    description: "Coming soon.",
    stripePriceId: "price_1Pxb7WKMiBrigNb6UpAWSMrT",
  }
   
export const enterprise3 = {
    name: "Embloy Enterprise",
    internal_name: "enterprise_3",
    description: "Coming soon.",
    stripePriceId: "price_1Pxb7WKMiBrigNb6UpAWSMrT",
}

function SubscriptionItem(subscription) {
    const plans = [freePlan, smartPlan, geniusPlan, enterprise2, enterprise3];
    let activePlan = "";
    let nextPlan = "";
    for (let plan of plans) {
        if (plan.stripePriceId === subscription.subscription.processor_plan) {
            activePlan = plan.name;
            const index = plans.indexOf(plan);
            if (index < plans.length - 1) {
                nextPlan = plans[index + 1];
            }
            break;
        } 
    }

    const [upgStatus, setUpgStatus] = useState(null);
    const [upgMessage, setUpgMessage] = useState(null);

    const handleUpgrade = async () => {
        setUpgMessage(null);
        setUpgStatus("loading");
        try {
            const res = await not_core_get("post", "/checkout?tier=" + nextPlan.internal_name + "&payment_mode=subscription&origin=genius");
            if (res) {
                setUpgStatus("success");
                setUpgMessage("Redirected to Stripe");
                window.location.href = res.url;
            } else {
                setUpgStatus("error");
                setUpgMessage("Failed to redirect");
            }
        } catch (e) {
            setUpgStatus("error");
            setUpgMessage("Try again later");
        }
    };

    const [cncStatus, setCncStatus] = useState(null);
    const [cncMessage, setCncMessage] = useState(null);

    const handleCancel = async () => {
        setCncMessage(null);
        setCncStatus("loading");
        try {
            const res = await core_get("/checkout/portal");
            if (res) {
                setCncStatus("success");
                setCncMessage("Redirected to Stripe");
                window.location.href = res.portal_session.url;
            } else {
                setCncStatus("error");
                setCncMessage("Failed to redirect");
            }
        } catch (e) {
            setCncStatus("error");
            setCncMessage("Try again later");
        }
    }

    return (
        <EmbloyInputbox>
            <EmbloyInputboxElement head={"Active " + activePlan + " Subscription"} description={"Your plan renews on " + cast_date(subscription.subscription.current_period_end, "us")} />
            <EmbloyH className="justify-end gap-4">
                <EmbloyButton variant="bold" name="Manage Subscription" onStatus={cncStatus} onMessage={cncMessage} onClick={handleCancel} className="" />
                {nextPlan !== "" && <EmbloyButton name={"Upgrade to " + nextPlan.name} onStatus={upgStatus} onMessage={upgMessage} disabled={nextPlan === ""} onClick={handleUpgrade} className="" />}
            </EmbloyH>
        </EmbloyInputbox>
    );
}

function NoSubscriptionItem() {
    const [plan, setPlan] = useState("");
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState(null);
    const handleSubscribe = async () => {
        setMessage(null);
        setStatus("loading");
        try {
            const res = await not_core_get("post", "/checkout?tier=" + plan + "&payment_mode=subscription&origin=genius");
            if (res) {
                setStatus("success");
                setMessage("Redirected to Stripe");
                window.location.href = res.url;
            } else {
                setStatus("error");
                setMessage("Failed to subscribe");
                setPlan("");
            }
        } catch (e) {
            setStatus("error");
            setMessage("Try again later");
            setPlan("");
            
        }
        
    };
    return (
        <EmbloyInputbox>
            <EmbloyInputboxElement head="No active subscription" description="Subscribe to unlock Embloy for Business">
                <EmbloyH className="justify-between">
                    <EmbloyInput
                        variant="select"
                        onChange={(e) => setPlan(e.target.value)}
                        value={plan}
                        className="w-full"
                    >
                        <EmbloySelectOption placeholder={true} head="Select Plan"/>
                        <EmbloySelectOption value="basic" head="Free plan"/>
                        <EmbloySelectOption value="premium" head="Smart plan"/>
                        <EmbloySelectOption value="enterprise_1" head="Genius plan"/>
                    </EmbloyInput>
                </EmbloyH>
                <EmbloyH className="justify-end">
                    <EmbloyButton name="Subscribe" onStatus={status} onMessage={message} disabled={ plan === ""} onClick={handleSubscribe} className="landscape:w-44" />
                </EmbloyH>
            </EmbloyInputboxElement>
        </EmbloyInputbox>
    );
};

function SubscriptionInfo(){
    const [activeSubscription, setActiveSubscription] = useState(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchSubscription = async () => {
            setIsLoading(true);
            try {
                const subscription = await core_get("/client/subscriptions/active?info=0");
                if (subscription) {
                    setActiveSubscription(subscription.subscription);
                } else {
                    setActiveSubscription(null);
                }
            } catch (e) {
            }
            setIsLoading(false);
        };
        fetchSubscription();
    }, [router]);
    return (
        <EmbloyV className="gap-4">
            <EmbloyP>
                Manage your Embloy Subscription plans. Details on available plans can be found 
                <a
                    className="px-1 italic text-embloy-purple-lighter hover:underline cursor-pointer"
                    href="https://developers.embloy.com/docs/core/subscriptions/subscription_info"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    here
                </a>
                .
            </EmbloyP>
            <EmbloyV>
                {isLoading ? (
                    <EmbloyInputbox>
                        <EmbloyInputboxElement head="" description="" />
                    </EmbloyInputbox>
                ) : (
                    activeSubscription === null ? (
                        <NoSubscriptionItem />
                    ) : (
                        <SubscriptionItem subscription={activeSubscription} />
                    )
                )}
            </EmbloyV>
        </EmbloyV>
    );
}
export function BillingControl() {
    
    return (
        <SettingsPage >
            <SettingsSection head="Subscriptions">
                <SubscriptionInfo />
            </SettingsSection>
        </SettingsPage>
    );
}
