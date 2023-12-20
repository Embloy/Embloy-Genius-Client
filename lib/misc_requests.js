"use client";
import React from 'react';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {login, logout} from "@/lib/authentication";

export const get_genius_query = (path) => {
    try {
        let url = "http://192.168.56.1:3000/api/v0/" + path;
        //let url = "http://192.168.178.126:3000/api/v0/" + path;
        return new Promise((resolve, reject) => {
            fetch(url, {method: 'GET',})
                .then(async (response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        return response.status;
                    }
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });

        })
    } catch (e) {}
}
export const get_core = (path, router, recursive = false) => {
    try {
        if (!getCookie("refresh", {path: "/"})) {
            throw new Error("No refresh token found");
        }
        let url = "http://192.168.56.1:3000/api/v0/" + path;
        //let url = "http://192.168.178.126:3000/api/v0/" + path;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'access_token': getCookie("access", {path: "/"})
                }),
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else if (response.status === 401 && !recursive) {
                        await login(router);
                        return get_core(path, router, true);
                    } else {
                        throw new Error(response.statusText);
                    }
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    // Handle any errors that occurred during the request or response
                    console.error(error);
                    reject(error);
                });
        });
    } catch (e) {
        logout(router);
    }
}
