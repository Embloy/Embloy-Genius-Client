"use client";
import React, {useEffect, useState} from "react";
import LoadingScreen from "@/app/components/misc/LoadingScreen";
import ErrorScreen from "@/app/components/misc/ErrorScreen";
import {get_genius_query} from "@/lib/misc_requests";

export default function Page({ params }) {
    const [content, setContent] = useState(null)

    function isNotNumeric(value) {
        return isNaN(value);
    }

    useEffect(() => {
        get_genius_query("resource/" + params.slug).then( data => {
            setContent(data)
        })
    }, [])

    if(content == null) {
        return <LoadingScreen/>;
    }

    if (!isNotNumeric(content)){
        return <ErrorScreen/>;
    }

    const bin = content["query_result"]


    return <div className={"text-white"}>{bin["job"]}</div>

}
