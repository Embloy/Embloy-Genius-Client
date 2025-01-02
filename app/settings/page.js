"use client";
import React, { useContext, useState, Suspense } from "react";
import { UserContext } from "@/app/components/dom/main/wrappers/UserContext";
import { StoreContext } from "@/app/components/dom/main/wrappers/StoreWrapper";
import LoadingScreen from "@/app/components/dom/main/screens/LoadingScreen";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import '@/app/globals.css'
import { useRouter } from 'next/navigation';
import { EmbloyPageMount, EmbloyPage, EmbloyPageBody, EmbloyPageBodySection, EmbloySubPage } from "@/app/components/ui/misc/page";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "@/app/components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA} from "@/app/components/ui/misc/toolbox";
import { IntegrationControl } from "./integrations/IntegrationControl";
import { ProfileControl } from "./profile/ProfileControl";
import { AccessControl } from "./access/AccessControl";
import { BillingControl } from "./billing/BillingControl";
import { SecretsControl } from "./secrets/SecretsControl";
import { ArchiveControl } from "./integrations/ArchiveControl";
import { getCookie } from "cookies-next";
import { siteConfig } from "@/config/site";

function SettingsPanel() {
    const router = useRouter();
    const [currentSubPageID, setcurrentSubPageID] = useState(0);
    
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check if the tab query parameter exists
        if (searchParams && searchParams.has("tab")) {
            // Convert the tab name to a subpage ID
            const tabToSubPageID = {
                profile: 0,
                access: 1,
                secrets: 3,
                billing: 2,
                integrations: 4,
                archive: 5,
                // security: 5,
            };
            const subPageID = tabToSubPageID[searchParams.get("tab")];

            // If the subpage ID is valid, switch to it
            if (subPageID !== undefined) {
                setcurrentSubPageID(subPageID);
            }
        } else {
            handlePageChange(currentSubPageID);
        }
    }, [searchParams]);

 
    let {user, company, subscription} = useContext(UserContext)
    let store = useContext(StoreContext);

    const subPages = [{name:'Profile', id:0}, {name:'Access', id:1}, {name:'Billing', id:2}, {name:'Secrets', id:3}, {name:'Integrations', id:4}]
    const [integrations, setIntegrations] = useState([]);
    const setIntegrationToken = () => {
        const res = getCookie("ep_active_integrations", {path: "/", domain: `${siteConfig.core_domain}`});
        if (res !== undefined) {
           setIntegrations(JSON.parse(res));
        } else {
            setIntegrations([]);
        }
    };

    const handlePageChange = (id) => {
        setIntegrationToken();
        setcurrentSubPageID(id);
        const tabName = subPages.find(page => page.id === id).name.toLowerCase();
        router.push(`?tab=${tabName}`);
    }

    if (!user) return (<LoadingScreen />);

    return (
        <EmbloyPageMount className="overflow-hidden">
            <EmbloyPage>
                <EmbloyPageBody >
                    <EmbloyPageBodySection>
                    <EmbloyV>
                        <EmbloyH className="justify-between">
                            <h1 className="page-header">Settings</h1>
                            <EmbloyToolbox superClassName="portrait:hidden">
                            <EmbloyToolboxImgA href="https://developers.embloy.com/docs/category/genius" height="12" width="12" path="/icons/svg/black/ask.svg" path_hovered="/icons/svg/capri/ask.svg" dark_path="/icons/svg/amarone/ask.svg" dark_path_hovered="/icons/svg/barbera/ask.svg" target="_blank" />
                            </EmbloyToolbox>
                        </EmbloyH>
                        <EmbloySpacer />
                        <EmbloySubPage 
                            pages={subPages}
                            onPageChange={handlePageChange}
                            externalSetActivePage={currentSubPageID}
                        >
                            <EmbloyV id={0} className="gap-3">
                                <ProfileControl />
                            </EmbloyV>
                            <EmbloyV id={1} className="gap-3">
                                <AccessControl />
                            </EmbloyV>
                            <EmbloyV id={2} className="gap-3">
                                <BillingControl />
                            </EmbloyV>
                            <EmbloyV id={3} className="gap-3">
                                <SecretsControl onShow={currentSubPageID === 3} />
                            </EmbloyV>
                            <EmbloyV id={4} className="gap-3">
                                <IntegrationControl activeIntegrations={ integrations } />
                            </EmbloyV>
                            <EmbloyV id={5} className="gap-3">
                                <ArchiveControl />
                            </EmbloyV>
                        </EmbloySubPage>
                        </EmbloyV>
                    </EmbloyPageBodySection>
                </EmbloyPageBody>
            </EmbloyPage>
        
            </EmbloyPageMount>
        
    );
    
}

export default function Settings() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <SettingsPanel />
        </Suspense>
    )
}
