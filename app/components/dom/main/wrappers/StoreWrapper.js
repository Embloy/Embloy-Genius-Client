"use client";
import React, {useEffect} from "react";
import {getCookie} from "cookies-next";
import {logout} from "@/lib/api/auth";
import { createContext, useState } from 'react';
import { get_ops} from "@/lib/misc_requests";
import {usePathname, useRouter} from "next/navigation";
import { siteConfig } from "@/config/site";
export const StoreContext = createContext();
const StoreWrapper = ({children}) => {
    const [store, setStore] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if(pathname!=="/signin" && getCookie("refresh_token", {path: "/", domain: `${siteConfig.core_domain}`})) {
            get_ops("/store", router).then(data => {
                setStore(data)
            }).catch(e => {
                console.log(e)
            });

        } else if (!pathname.startsWith("/resource/public")){
            logout();
        }
    }, [pathname])


    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );

};

export default StoreWrapper;