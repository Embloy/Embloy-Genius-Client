"use client";
import { getCookie } from "cookies-next";
import { siteConfig } from "@/config/site";

export async function getLeverOAuthUrl() {
    const accessToken = getCookie("access_token", { path: "/", domain: `${siteConfig.core_domain}` });
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
    

}