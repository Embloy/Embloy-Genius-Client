"use client";
import React, {useEffect, useState} from "react";

export default function Serializer() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');
        const oldFormat = urlParams.get('oldFormat');
        const newFormat = urlParams.get('newFormat');
        const redirect = urlParams.get('redirect');
        const mode = urlParams.get('mode');
        console.log(data, oldFormat, newFormat, redirect, mode);
    }, []);

}