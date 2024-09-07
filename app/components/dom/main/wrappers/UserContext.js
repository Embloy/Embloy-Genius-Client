"use client";
import React, {useEffect} from "react";
import {getCookie} from "cookies-next";
import {logout} from "@/lib/api/auth";
import { createContext, useState } from 'react';
import {get_core} from "@/lib/misc_requests";
import {usePathname, useRouter} from "next/navigation";
import { siteConfig } from "@/config/site";

export const UserContext = createContext();
const UserWrapper = ({children}) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if(pathname!=="/signin" && getCookie("refresh_token", {path: "/", domain: `${siteConfig.core_domain}`})) {
            get_core("/user", router).then(data => {
                setUser(data.user)
            }).catch(e => {
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