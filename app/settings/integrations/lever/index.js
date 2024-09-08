"use client";
import { getLeverOAuthUrl } from "@/lib/api/integration";

export const connect = () => {
    getLeverOAuthUrl()
        .then((data) => {
           window.open(data.url, "_blank");  
        });
};


export const disconnect = () => {
    //throw new Error("Not implemented");
};

export const sync = () => {
    // Custom connection logic for Service A
}

export const reset= () => {
    // Custom connection logic for Service A
}