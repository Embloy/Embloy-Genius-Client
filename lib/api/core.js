"use client";
import { siteConfig } from "@/config/site";
import {logout, claim_access_token, force_access_token} from "@/lib/api/auth";


const standard_action = async (mode, url, body, access, formData=false) => {
    let header = {};
    if (formData===true) {
        header = {
            "Authorization": `Bearer ${access}`,
        };
    } else {
        header = {
            "Authorization": `Bearer ${access}`,
            "Content-Type": "application/json",
        };
    }
    const response = await fetch(`${siteConfig.core_api_url}${url}`, {
        method: mode,
        headers: header,
        body: formData ? body : JSON.stringify(body),
    });
    return response;
}

export async function not_core_get(mode, url, body={}, formData=false) {
    const accessToken = await claim_access_token();
    let response = await standard_action(mode, url, body, accessToken, formData);
    if (!response.ok) {
        if (response.status === 401) {
            const new_access_token = await force_access_token();
            if (new_access_token) {
                response = await standard_action(mode, url, body, new_access_token, formData);
            } else {
                logout();
                let error = Error("Unauthorized");
                error.status = 401;
                throw error;

            }
        }
        else if (response.status === 403) {
            let error = Error("Forbidden");
            error.status = 403;
            throw error;
        }
        else if (response.status === 429) {
            let error = Error("Embloy Subscription Limit Reached");
            error.status = 429;
            throw error;
        }
        else if (response.status === 503) {
            let error = Error("Embloy Service Unavailable");
            error.status = 503
            throw error;
        }
        else {
            let error = Error("Internal Server Error");
            error.status = response.status;
            throw error;
            
        }
    } 
    try {
        const data = await response.json();
        return data;
    } catch (e) {
        let error = Error("Internal Parsing Error");
        error.status = 500;
        throw error;	
    }
}


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
                let error = Error("Unauthorized");
                error.status = 401;
                throw error;
            }
        }
        else if (response.status === 429) {
            let error = Error("Embloy Subscription Limit Reached");
            error.status = 429;
            throw error;
        }
        else if (response.status === 503) {
            let error = Error("Embloy Service Unavailable");
            error.status = 503
            throw error;
        } else {
            let error = Error("Internal Server Error");
            error.status = response.status;
            throw error;
        }
    }

    try {
        const data = await response.json();
        return data;
    } catch (e) {
        let error = Error("Internal Parsing Error");
        error.status = 500;
        throw error;	
    }
}