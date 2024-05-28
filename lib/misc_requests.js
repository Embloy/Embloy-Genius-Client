"use client";
import React from 'react';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {login, logout} from "@/lib/authentication";
import { siteConfig } from '@/config/site';

export const upload_profile_image = (file,router,recursive) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image_url', file);
        fetch(`${siteConfig.core_api_url}/user/image`, {
            method: 'POST',
            headers: new Headers({
                'access_token': getCookie("access", {path: "/"})
            }),
            body: formData,
        })
            .then(async(response) => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401 && !recursive) {
                    await login(router);
                    return upload_profile_image(file,router, true);
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
}
export const delete_core = (path, router, body, recursive) => {
    return new Promise((resolve, reject) => {
        fetch(siteConfig.core_api_url + path, {
            method: 'DELETE',
            headers: new Headers({
                'access_token': getCookie("access", {path: "/"}),
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(body),
        }).then(async (response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401 && !recursive) {
                await login(router);
                return delete_core(path, router,body, true);
            } else {
                throw new Error(response.statusText);
            }
        })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });

    });
}
export const post_core = (path, router, body, recursive) => {
    return new Promise((resolve, reject) => {
        fetch(siteConfig.core_api_url + path, {
            method: 'POST',
            headers: new Headers({
                'access_token': getCookie("access", {path: "/"}),
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(body),
        }).then(async (response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401 && !recursive) {
                await login(router);
                return post_core(path, router,body, true);
            } else {
                throw new Error(response.statusText);
            }
        })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });

    });
}

export const patch_core = (path, router, body, recursive) => {
    return new Promise((resolve, reject) => {
        fetch(siteConfig.core_api_url + path, {
            method: 'PATCH',
            headers: new Headers({
                'access_token': getCookie("access", {path: "/"}),
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(body),
        }).then(async (response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401 && !recursive) {
                await login(router);
                return patch_core(path, router,body, true);
            } else {
                throw new Error(response.statusText);
            }
        })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });

    });
}

export const get_genius_query = (path) => {
    try {
        let url = siteConfig.core_api_url + path;
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
    } catch (e) {
    }
}


export const get_ops = (path, router, recursive = false) => {
    try {
        if (!getCookie("refresh", {path: "/"})) {
            throw new Error("No refresh token found");
        }
        let url = siteConfig.api_url + path;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'text/plain',
                    'Authorization': `Bearer ${getCookie("access", {path: "/"})}`
                }),
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else if (response.status === 204 && !recursive) {
                       return [];
                    } else if (response.status === 401 && !recursive) {
                        await login(router);
                        return get_ops(path, router, true);
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
export const get_core = (path, router, recursive = false, method = 'GET') => {
    try {
        if (!getCookie("refresh", {path: "/"})) {
            throw new Error("No refresh token found");
        }
        let url = siteConfig.core_api_url + path;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: method,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'access_token': getCookie("access", {path: "/"})
                }),
            })
                .then(async (response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else if (response.status === 204 && !recursive) {
                        return [];
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
