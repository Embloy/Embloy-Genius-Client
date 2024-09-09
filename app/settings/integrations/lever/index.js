"use client";
import { getLeverOAuthUrl, disconnectLever } from "@/lib/api/integration";
import { deleteCookie } from "cookies-next";
import { siteConfig } from "@/config/site";
const issuer = "lever";

export const verify = (activeIntegrations) => {
    if (activeIntegrations.filter((integration) => integration.issuer === issuer).length > 0) {
        return true;
    } else {
        return false;
    }
};

export const connect = () => {
    getLeverOAuthUrl()
        .then((data) => {
           window.open(data.url, "_blank");
           return true;  
        })
        .catch(() => {
            return false;
        });
};


export const disconnect = (active_integrations) => {
    const ids = active_integrations
        .filter((integration) => integration.issuer === issuer)
        .map((token) => token.id);
    disconnectLever(ids)
        .then((data) => {
            console.log("disconnectLever", data);
            deleteCookie("active_integrations", { path: "/", domain: `${siteConfig.core_domain}` });
            return true;
        })
        .catch(() => {
            console.log("error catched");
            return false;
        });
};

export const sync = () => {
    // Custom connection logic for Service A
}

export const reset= () => {
    // Custom connection logic for Service A
}