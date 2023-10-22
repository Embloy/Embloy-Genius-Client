"use client";
import React, {useEffect} from "react";
import {getCookie} from "cookies-next";
import {login, logout} from "@/lib/authentication";
import {useRouter} from "next/navigation";
import dynamic from "next/dynamic";


import { createContext, useContext, useState } from 'react';
import {get_core} from "@/lib/misc_requests";
import LoadingScreen from "@/app/components/misc/LoadingScreen";

export const UserContext = createContext();

const AuthWrapper = ({children}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const load = () => {
        try{
            setLoading(true)
            get_core("user", router).then(data => {
                console.log(data.user)
                setUser(data.user)
            })
            setLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {

        if (!getCookie("refresh", {path: "/"})) {
            logout(router);

        } else {

                login(router);
                load();
        }

    }, []);

    if (!loading && user) {
        return (
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        )
    }else {
        return <LoadingScreen/>;
    }



};

export default AuthWrapper;