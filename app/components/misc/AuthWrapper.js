"use client";
import React, {useEffect} from "react";
import {getCookie} from "cookies-next";
import {login, logout} from "@/lib/authentication";
import { useRouter} from "next/navigation";


const AuthWrapper = ({children}) => {
    const router = useRouter();



    useEffect( () => {
        if (!getCookie("refresh", {path: "/"})) {
            logout(router);

        } else {
            login(router);
        }

    }, []);



    return (
        <>
            {children}
        </>
    );



};

export default AuthWrapper;