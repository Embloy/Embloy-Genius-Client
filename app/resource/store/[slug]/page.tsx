"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import LoadingScreen from "@/app/components/misc/LoadingScreen";
import {get_genius_query, get_ops} from "@/lib/misc_requests";
import ErrorScreen from "@/app/components/misc/ErrorScreen";
import {isNotNumeric} from "@/lib/utils/helpers";
import {useRouter} from "next/navigation";

export default function Page({params}) {
    const [content, setContent] = useState(null)
    const router = useRouter();
    useEffect(() => {
        get_ops('store/' + params.slug + '/', router).then( data => {
            console.log(data)
        })
    }, [])
    if(content == null) {
        return <LoadingScreen/>;
    }
    if (!isNotNumeric(content)) {
        return <ErrorScreen/>;
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden flex items-center justify-center">
            <Image
                src="/img/store_screen.svg"
                alt="Logo"
                height="20000"
                width="20000"
            />
            <div className="fixed left-1/4 w-1/2 h-screen z-50 flex flex-col items-center justify-start">
                <div className="h-24"/>
                <div className="w-1/2 bg-black border border-gray-700 rounded-lg flex flex-col items-start justify-start px-4 py-2">
                    <h1 className="text-white">Enable Embloy Smart for your organization</h1>
                    <p className="text-white">TEST</p>
                </div>
                <div className="h-12"/>
            </div>
        </div>
    )
}