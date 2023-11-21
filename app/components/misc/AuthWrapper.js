"use client";
import React, {useEffect} from "react";
import {getCookie} from "cookies-next";
import {login, logout} from "@/lib/authentication";
import {useRouter, usePathname} from "next/navigation";


const AuthWrapper = ({children}) => {
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (!path.startsWith("/resource/public")) {
            if (!getCookie("refresh", {path: "/"})) {
                logout(router);

            } else {
                login(router);
            }
        }

    }, []);


    return (
        <>
            {children}
        </>
    );


};

export default AuthWrapper;