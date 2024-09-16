import React, { useState} from "react";
import '@/app/globals.css'
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle, EmbloyButton} from "@/app/components/ui/misc/stuff";
import { EmbloyInput, EmbloyInputbox, EmbloyInputboxElement, EmbloyRadioOption, EmbloySelectOption } from "@/app/components/ui/misc/input";
import { EmbloyP } from "@/app/components/ui/misc/text";
import { claim_access_token } from "@/lib/api/auth";

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
                const token = await claim_access_token(access_token_note, access_token_expiration);
                if (token) {
                    setStatus("success");
                    setMessage("Copied to clipboard");
                    navigator.clipboard.writeText(token);
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
                        <EmbloyInput
                            variant="select"
                            onChange={(e) => set_access_token_expiration(e.target.value)}
                            value={access_token_expiration}
                            className="landscape:w-6/12"
                            disabled={true}
                            
                        >
                            <EmbloySelectOption placeholder={true} head="Exp. in < 20 Min."/>
                            <EmbloySelectOption value={60} head="Exp. in 1 Min."/>
                            <EmbloySelectOption value={1800} head="Exp. in 30 Min."/>
                            <EmbloySelectOption value={3600} head="Exp. in 1 Hour"/>
                            <EmbloySelectOption value={14400} head="Exp. in 4 Hours"/>
                            <EmbloySelectOption value={43200} head="Exp. in 12 Hours"/>
                        </EmbloyInput>
                        <EmbloyInput disabled={true} onChange={(e) => set_access_token_note(e.target.value)} value={access_token_note} className="landscape:w-6/12" placeholder="Note"/>
                    </EmbloyH>
                    <EmbloyH className="items-center justify-end ">
                        <EmbloyButton name="Generate" onStatus={status} onMessage={message} className="landscape:w-44" onClick={generate_access_token}/>


                    </EmbloyH>

                    
                </EmbloyInputboxElement>
            </EmbloyInputbox>
        </EmbloyV>
        
    )
}