"use client";
import React, {useEffect} from "react";
import {getCookie} from "cookies-next";
import {logout} from "@/lib/api/auth";
import { createContext, useState } from 'react';
import {usePathname, useRouter} from "next/navigation";
import { siteConfig } from "@/config/site";
import { core_get } from "@/lib/api/core";

export const UserContext = createContext();
const UserWrapper = ({children}) => {
    const [user, setUser] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        if(pathname!=="/signin" && getCookie("ep_refresh_token", {path: "/", domain: `${siteConfig.core_domain}`})) {
            core_get("/user")
                .then(data => {
                    setUser(data.user)
                    console.log(data.user)
                })  
                .catch(e => {
                    console.log(e)
                });

        } else if (!pathname.startsWith("/resource/public")){
            logout();
        }
    }, [pathname])


    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );

};

export default UserWrapper;