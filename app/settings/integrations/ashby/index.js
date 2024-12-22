"use client";
import { core_get, not_core_get } from "@/lib/api/core"; 
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { siteConfig } from "@/config/site";
import { parseWebhookLog } from "@/lib/utils/helper";
const issuer = "ashby";
export const verify = (activeIntegrations) => {
    if (activeIntegrations.filter((integration) => integration.issuer === issuer).length > 0) {
        return true;
    } else {
        return false;
    }
};



export const disconnect = async (active_integrations) => {
    const delete_ids_from_cookie = (ids) => {
        const active_integrations = JSON.parse(getCookie("ep_active_integrations", {path: "/", domain: `${siteConfig.core_domain}`}));
        const integrations_without_ids = active_integrations.filter((integration) => !ids.includes(integration.id));
        deleteCookie("ep_active_integrations", {path: "/", domain: `${siteConfig.core_domain}`});
        setCookie("ep_active_integrations", JSON.stringify(integrations_without_ids), {path: "/", domain: `${siteConfig.core_domain}`});
        return integrations_without_ids;
    };
    const invalidateToken = async (token_id) => {
        try {
            await not_core_get("PATCH", `/tokens/${token_id}`, {active: false})
            return true
        } catch (e) {
            return false
        }
    }
    const ids = active_integrations
        .filter((integration) => integration.issuer === issuer)
        .map((token) => token.id);
    
    try {
        ids.forEach(async (id) => {
            await invalidateToken(id);
        });
        const remaining = delete_ids_from_cookie(ids);
        return remaining;
    } catch (error) {
        return false
    }
    
};

export const sync = async () => { 
    try {
        const res = await not_core_get("POST", "/jobs/sync/ashby", {});
        return {type: "success", message: "Synced with Ashby!"};
    }
    catch (error) {
        return {type: "error", message: error.message}
    }
  };
  

export const reset = async () => {
    try {
        const res = await not_core_get("POST", "/user/webhooks/ashby", {});
        return {type: "success", message: parseWebhookLog(res.message)};
    }
    catch (error) {
        return {type: "error", message: error.message}
    }
}