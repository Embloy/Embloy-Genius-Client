"use client";
import { core_get, not_core_get } from "@/lib/api/core"; 
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { siteConfig } from "@/config/site";
const issuer = "lever";

export const verify = (activeIntegrations) => {
    if (activeIntegrations.filter((integration) => integration.issuer === issuer).length > 0) {
        return true;
    } else {
        return false;
    }
};

export const connect = async () => {
    try {
        const data = await core_get("/integrations/lever/auth");
        window.open(data.url, "_self");
    } catch (error) {
        console.error("Error connecting to Lever", error);
    }       
};


export const disconnect = async (active_integrations) => {
    const delete_ids_from_cookie = (ids) => {
        const active_integrations = JSON.parse(getCookie("active_integrations", {path: "/", domain: `${siteConfig.core_domain}`}));
        const integrations_without_ids = active_integrations.filter((integration) => !ids.includes(integration.id));
        console.log("integrations_without_ids", integrations_without_ids);
        deleteCookie("active_integrations", {path: "/", domain: `${siteConfig.core_domain}`});
        setCookie("active_integrations", JSON.stringify(integrations_without_ids), {path: "/", domain: `${siteConfig.core_domain}`});
        return integrations_without_ids;
    };
    const disconnect_id = async (token_id) => {
        await not_core_get("DELETE", `/tokens/${token_id}`, {});
    };
    const ids = active_integrations
        .filter((integration) => integration.issuer === issuer)
        .map((token) => token.id);


    try {
        ids.forEach(async (id) => {
            await disconnect_id(id);
        });
        const remaining = delete_ids_from_cookie(ids);
        return remaining;
    } catch (error) {
        console.error("Error disconnecting from Lever", error);
        return false
    }
};

export const sync = () => {
    // Custom connection logic for Service A
}

export const reset= () => {
    // Custom connection logic for Service A
}