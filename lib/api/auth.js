"use client";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { decode } from "jsonwebtoken"
import { siteConfig } from "@/config/site";


export async function update_password(password, confirmation) {
    const response = await fetch(`${siteConfig.core_api_url}/user/password`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${getCookie("access_token", {path: "/", domain: `${siteConfig.core_domain}`})}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user: {
                password: password,
                password_confirmation: confirmation,
            },
        }),
    });
    if (!response.ok) {
        throw new Error(response.status);
    }
    return 200;
}

export function logout(router) {
    deleteCookie("access_token", {path: "/", domain: `${siteConfig.core_domain}`});
    deleteCookie("refresh_token", {path: "/", domain: `${siteConfig.core_domain}`});
    if (router) {
        router.push("/signin");
    }
}
export async function login(email, password) {
    try {
        await claim_refresh_token(email, password);
    } catch (error) {
        console.log("Error logging in");
        return 401;
    }
    try {
        await claim_access_token();
    } catch (error) {
        console.log("Error claiming access token");
        return 500;
    }
    return 200;
}

export function check_token_expiration(token) {
    console.log("Checking token expiration");
    try {const decoded_token = decode(token);
    const exp = decoded_token.exp;
    const current_time = Date.now() / 1000;
    if (exp < current_time) {
        console.log("Token expired");
        return true;
    }
    console.log("Token not expired");
    return false;
    } catch (error) {
        console.log("Error checking token expiration");
        return true;
}
}

export async function force_access_token() {
    deleteCookie("access_token", {path: "/", domain: `${siteConfig.core_domain}`});
    return await claim_access_token();
}
export async function claim_access_token(note="", expiration=0) {
    const existing_access_token = getCookie("access_token", {path: "/", domain: `${siteConfig.core_domain}`});
    const not_usable = check_token_expiration(existing_access_token);
    console.log("IS TOKEN IVANKA NOT USABLE", not_usable);
    if (not_usable === false) {
        console.log("Existing access token -> RETURN TO SENDER", existing_access_token);
        return existing_access_token;
    } else {
        console.log("No existing access token -> CLAIMING NEW ACCESS TOKEN");
        const refresh_token = getCookie("refresh_token", {path: "/", domain: `${siteConfig.core_domain}`});
        
        if (!refresh_token) {
            console.log("No refresh token");
            throw new Error(404);
        }
        if (check_token_expiration(refresh_token) === true) {
            console.log("Invalid refresh token");
            logout();
            throw new Error(401);
        }
        const params = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refresh_token,
          });
        const access_token_response = await fetch(`${siteConfig.core_api_url}/auth/token/access`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: params.toString(),
            });

        const access_token_result = await access_token_response.json();

        if (!access_token_result || !access_token_result.access_token) {
            console.log("Invalid access token");
            logout();
            throw new Error(access_token_response.status);
        }

        setCookie("access_token", access_token_result.access_token, {path: "/", domain: `${siteConfig.core_domain}`});
        return access_token_result.access_token;         
    }
}
export async function claim_refresh_token(email, password) {
    const encoded_creds = btoa(`${email.trim().toLowerCase()}:${password}`);
    const refresh_token_response = await fetch(`${siteConfig.core_api_url}/auth/token/refresh`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded_creds}`,
        },
    });
    const refresh_token_result = await refresh_token_response.json();

    if (!refresh_token_result || !refresh_token_result.refresh_token) {
       throw new Error(refresh_token_response.status);
    }

    setCookie("refresh_token", refresh_token_result.refresh_token, {path: "/", domain: `${siteConfig.core_domain}`});
    return refresh_token_result.refresh_token;

}  

export async function processResponse(router, response) {
    if (!response.ok) {
        if (response.status === 401) {
            await login(router);
            return processResponse(response);
        } else {
            throw new Error(response.status);
        }
    }
    else {
        return response;
    }
}