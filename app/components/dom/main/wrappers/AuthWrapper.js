"use client";
import React, {useEffect} from "react";
import {claim_access_token, logout } from "@/lib/api/auth";
import {useRouter, usePathname} from "next/navigation";


const AuthWrapper = ({children}) => {
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            if (!path.startsWith("/resource/public")) {
                try {
                    await claim_access_token();
                    router.push(path);
                } catch (error) {
                    logout();
                }
            } 
        };

    
    checkAuth();  
  }, [path, router]);


    return (
        <>
            {children}
        </>
    );


};

export default AuthWrapper;