import React, { useState} from "react";
import '@/app/globals.css'
import { EmbloyV, EmbloyH, EmbloyButton} from "@/app/components/ui/misc/stuff";
import { EmbloyInput, EmbloyInputbox, EmbloyInputboxElement, EmbloySelectOption } from "@/app/components/ui/misc/input";
import { force_access_token } from "@/lib/api/auth";

export function AccessTokenInfo() {
    const [access_token_expiration, set_access_token_expiration] = useState("");
    const [access_token_note, set_access_token_note] = useState('');
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);

    const generate_access_token = async (e) => {
        e.preventDefault();
        if (status !== "success" && status !== "error") {
            setMessage(null);
            setStatus("loading");
            try {
                const token = await force_access_token(access_token_note, access_token_expiration);
                if (token) {
                    setStatus("success");
                    setMessage("Copied to clipboard");
                    navigator.clipboard.writeText(token);
                    setTimeout(() => {
                        setStatus(null);
                        setMessage(null);
                    }, 2500);
                }
            } catch (error) {
                setStatus("error");
                setMessage("Try again later");
        }} else {
            setStatus(null)
            setMessage(null)
            set_access_token_expiration(null)
            set_access_token_note('')
        }

    }



    return (  
        <EmbloyV className="gap-4">
            <EmbloyInputbox>
                <EmbloyInputboxElement head="Access Token" description="Access Tokens are required for any interaction with the Embloy API">
                    <EmbloyH className="items-center gap-2">
                    </EmbloyH>
                    <EmbloyH className="items-center justify-end ">
                        <EmbloyButton name="Generate" onStatus={status} onMessage={message} disabled={status !== null} className="landscape:w-44" onClick={generate_access_token}/>
                    </EmbloyH>

                    
                </EmbloyInputboxElement>
            </EmbloyInputbox>
        </EmbloyV>
        
    )
}