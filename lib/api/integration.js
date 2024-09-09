"use client";
import { core_get, core_standard_action } from "@/lib/api/core";
export async function getLeverOAuthUrl() {
    const url = await core_get("/integrations/lever/auth");
    const data = await url.json();
    return data;
    /*const accessToken = getCookie("access_token", { path: "/", domain: `${siteConfig.core_domain}` });
    const response = await fetch(`${siteConfig.core_api_url}/integrations/lever/auth`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(response.statusText);
    }
    */
}

export async function disconnectLever(token_ids) {
    token_ids.forEach(async (token_id) => {
        await core_standard_action("DELETE", `/tokens/${token_id}`, {})
    });
}