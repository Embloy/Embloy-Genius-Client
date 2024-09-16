import React, { useState, useEffect} from "react";
import '@/app/globals.css'
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle, EmbloyButton} from "@/app/components/ui/misc/stuff";
import { EmbloyInput, EmbloyInputbox, EmbloyInputboxElement, EmbloyRadioOption, EmbloySelectOption } from "@/app/components/ui/misc/input";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { claim_client_token } from "@/lib/api/auth";
import { not_core_get } from "@/lib/api/core";

export function GeniusQueryTokenInfo() {
    let [client_token_expiration, set_client_token_expiration] = React.useState(() => {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        return parseAbsoluteToLocal(date.toISOString());
      });

    const [client_token_note, set_client_token_note] = useState('');
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);
    const min = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] + 'T00:00';
    const max = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0] + 'T00:00';
    useEffect(() => {
        set_client_token_expiration(min);
    }, [])
    const generate_client_token = async (e) => {
        e.preventDefault();
        if (status !== "success" && status !== "error") {
            setMessage(null);
            setStatus("loading");
            try {
                const token = await not_core_get("POST", `/auth/token/client?exp=${client_token_expiration}`);
                if (token) {
                    setStatus("success");
                    setMessage("Copied to clipboard");
                    navigator.clipboard.writeText(token.client_token);
                }
            } catch (error) {
                console.log(error);
                setStatus("error");
                if (error.status === 403) {
                    setMessage("Insufficient level");
                } else {
                    setMessage("Try again later");
                }
        }} else {
            setStatus(null)
            setMessage(null)
            set_client_token_expiration(min)
            set_client_token_note('')
        }

    }



    return (  
        <EmbloyV className="gap-4">
            <EmbloyInputbox>
                <EmbloyInputboxElement head="Genius Query Token" description="Genius Queries are an advanced Embloy function for sharing individualized resources">
                    <EmbloyH className="items-center gap-2">
                        <EmbloyInput
                            variant="datetime-local"
                            onChange={(e) => set_client_token_expiration(e.target.value)}
                            value={client_token_expiration}
                            className="landscape:w-6/12"
                            min={min}
                            max={max}
                            
                        />
                        
                        <EmbloyInput disabled={true} onChange={(e) => set_client_token_note(e.target.value)} value={client_token_note} className="landscape:w-6/12" placeholder="Note"/>
                    </EmbloyH>
                    <EmbloyH className="items-center justify-end ">
                        <EmbloyButton name="Generate" onStatus={status} onMessage={message} className="landscape:w-44" onClick={generate_client_token}/>
                    </EmbloyH>

                    
                </EmbloyInputboxElement>
            </EmbloyInputbox>
        </EmbloyV>
        
    )
}