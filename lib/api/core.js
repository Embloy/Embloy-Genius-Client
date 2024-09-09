"use client";
import { siteConfig } from "@/config/site";
import {logout, claim_access_token, force_access_token} from "@/lib/api/auth";


const standard_action = async (mode, url, body, access) => {
    const response = await fetch(`${siteConfig.core_api_url}${url}`, {
        method: mode,
        headers: {
            "Authorization": `Bearer ${access}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return response;
}

export async function core_standard_action(mode, url, body) {
    console.log("core_standard_action", mode, url, body);
    const accessToken = await claim_access_token();
    let response = await standard_action(mode, url, body, accessToken);
    if (!response.ok) {
        if (response.status === 401) {
            const new_access_token = await force_access_token();
            if (new_access_token) {
                response = await standard_action(mode, url, body, new_access_token);
            } else {
                console.log("logout 1");
                logout();
                throw new Error({status:401});

            }
        }
    }
    try {
        console.log("core_standard_action response", response);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log("core_standard_action error", e);
        throw new Error(500);
    }
}
/*

export async function core_delete(url, body) {
    const accessToken = await claim_access_token();
    let response = await standard_action("DELETE", url, body, accessToken);
    if (!response.ok) {
        if (response.status === 401) {
            const new_access_token = await force_access_token();
            if (new_access_token) {
                response = await standard_action("DELETE", url, body, new_access_token);
            } else {
                logout();
                throw new Error({status:401});
            }
        } else {
            throw new Error({status:response.status});
        }
    }
    try {
        const data = await response.json();
        return data;
    } catch (e) {
        return 500; 
    }
}

export async function core_post(url, body) {
    const accessToken = await claim_access_token();
    let response = await standard_action("POST", url, body, accessToken);
    if (!response.ok) {
        if (response.status === 401) {
            const new_access_token = await force_access_token();
            if (new_access_token) {
                response = await standard_action("POST", url, body, new_access_token);
            } else {
                logout();
                throw new Error({status:401});
            }
        } else {
            throw new Error({status:response.status});
        }
    }
    try {
        const data = await response.json();
        return data;
    } catch (e) {
        return 500; 
    }
}
    */

export async function core_get(url) {
    const get = async (url, access) => {
        const response = await fetch(`${siteConfig.core_api_url}${url}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access}`,
            },
        });
        return response;
    }
    const accessToken = await claim_access_token();
    let response = await get(url, accessToken);
    if (!response.ok) {
        if (response.status === 401) {
            const new_access_token = await force_access_token();
            if (new_access_token) {
                response = await get(url, new_access_token);
            } else {
                logout();
                throw new Error({status:401});
            }
        } else {
            throw new Error({status:response.status});
        }
    }

    try {
        const data = await response.json();
        return data;
    } catch (e) {
        throw new Error(500);
    }
}