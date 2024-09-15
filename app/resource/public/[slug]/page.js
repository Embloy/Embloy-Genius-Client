"use client";
import React, {useEffect, useState} from "react";
import LoadingScreen from "@/app/components/dom/main/screens/LoadingScreen";
import ErrorScreen from "@/app/components/dom/main/screens/ErrorScreen";
import {get_genius_query} from "@/lib/misc_requests";
import {isNotNumeric} from "@/lib/utils/helpers";
import Signin from "./signin/page";

export default function Page({params}) {
    const [content, setContent] = useState(null)



    useEffect(() => {
        if (params.slug !== "signin") {
            get_genius_query("/resource/" + params.slug).then(data => {
                setContent(data)
            })
        }
    }, [])
    if (params.slug === "signin") {
        return <Signin/>
    }

    if (content == null) {
        return <LoadingScreen/>;
    }

    if (!isNotNumeric(content)) {
        return <ErrorScreen/>;
    }

    const bin = content["query_result"]


    return <div className={"text-white"}>{bin["job"]}</div>

}
