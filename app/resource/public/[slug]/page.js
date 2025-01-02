"use client";
import React, { useEffect, useState } from "react";
import LoadingScreen from "@/app/components/dom/main/screens/LoadingScreen";
import ErrorScreen from "@/app/components/dom/main/screens/ErrorScreen";
import { get_genius_query } from "@/lib/misc_requests";
import { isNotNumeric } from "@/lib/utils/helpers";
import Signin from "./signin";

export default function Page({ params: paramsPromise }) {
    const [content, setContent] = useState(null);
    const [slug, setSlug] = useState(null);

    useEffect(() => {
        async function fetchParams() {
            const params = await paramsPromise; // Await the promise
            setSlug(params.slug);
        }
        fetchParams();
    }, [paramsPromise]);

    useEffect(() => {
        if (slug && slug !== "signin") {
            get_genius_query("/resource/" + slug).then((data) => {
                setContent(data);
            });
        }
    }, [slug]);

    if (!slug) {
        return <LoadingScreen />;
    }

    if (slug === "signin") {
        return <Signin />;
    }

    if (content == null) {
        return <LoadingScreen />;
    }

    if (!isNotNumeric(content)) {
        return <ErrorScreen />;
    }

    const bin = content["query_result"];

    return <div className={"text-white"}>{bin["job"]}</div>;
}
