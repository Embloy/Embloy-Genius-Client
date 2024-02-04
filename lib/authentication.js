"use client";
import React from 'react';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import { siteConfig } from '@/config/site';


export const request_refresh = (email, password) => {
    return new Promise((resolve, reject) => {
        fetch(`${siteConfig.core_api_url}/auth/token/refresh`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(email + ':' + password)
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then((data) => {
                resolve(data.refresh_token);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request or response
                console.error(error);
                reject(error);
            });
    });
}


export const request_access = (refresh_token) => {
    return new Promise((resolve, reject) => {
        fetch(`${siteConfig.core_api_url}/auth/token/access`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'refresh_token': refresh_token
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then((data) => {
                resolve(data.access_token);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request or response
                console.error(error);
                reject(error);
            });
    });
}

export function logout(router) {
    deleteCookie("access", {path: "/"})
    deleteCookie("refresh", {path: "/"})
    router.replace("/signin")
}

export function login(router) {
    try {
        request_access(getCookie("refresh", {path: "/"}))
            .then((token) => {
                setCookie("access", token, {path: "/"})
            })
            .catch((error) => {
                logout(router);
            });

    } catch (error) {
        logout(router);
    }
}

export const request_client = (access_token) => {
    return new Promise((resolve, reject) => {
        fetch(`${siteConfig.core_api_url}/auth/token/client`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'access_token': access_token
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then((data) => {
                resolve(data.client_token);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request or response
                console.error(error);
                reject(error);
            });
    });
}


export const update_password = (access_token, password, password_confirmation) => {
    const body = {
        "user": {
            "password": password,
            "password_confirmation": password_confirmation
        }
    };
    return new Promise((resolve, reject) => {
        fetch(`${siteConfig.core_api_url}/user/password`, {
            method: 'PATCH',
            headers: new Headers({
                'Content-Type': 'application/json',
                'access_token': access_token
            }),
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request or response
                reject(error);
            });
    });
}





