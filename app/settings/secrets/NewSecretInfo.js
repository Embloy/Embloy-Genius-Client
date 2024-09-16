import React, { useEffect, useState} from "react";
import '@/app/globals.css'
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle, EmbloyButton} from "@/app/components/ui/misc/stuff";
import { EmbloyInput, EmbloyInputbox, EmbloyInputboxElement, EmbloyRadioOption, EmbloySelectOption } from "@/app/components/ui/misc/input";
import { EmbloyP } from "@/app/components/ui/misc/text";
import { parseAbsoluteToLocal } from "@internationalized/date";
import Link from "next/link";
import { not_core_get } from "@/lib/api/core";
export function NewSecretInfo({refresh}) {
    const [issuer, setIssuer] = useState("");
    const [secret, setSecret] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState(null);
    const [disabled, setDisabled] = useState(true);
    let [token_expiration, set_token_expiration] = React.useState(() => {
        let date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        return parseAbsoluteToLocal(date.toISOString());
      });


    useEffect(() => {
        if ((issuer !== "" || secret !== "" || name !== "" || type !== "") && (status === "success" || status === "error")) {
            setStatus(null);
            setMessage(null);
        }
        if ((issuer !== "" && secret !== "" && name !== "" && type !== "" && token_expiration && status === null) || (status == "success" || status === "error")) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }
    , [status, issuer, secret, name, type]);
    
    const min = new Date(new Date().getTime() + 1 * 60 * 1000).toISOString().split('.')[0];
    const max = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0] + 'T00:00';
    const hunderedYears = new Date(new Date().setFullYear(new Date().getFullYear() + 100)).toISOString().split('T')[0] + 'T00:00';


    const add_secret = async (e) => {
        e.preventDefault();
        if (status !== "success" && status !== "error") {
            setMessage(null);
            setStatus("loading");
            
            let body = {
                name: name,
                issuer: issuer,
                token: secret,
                token_type: type,
                issued_at: new Date().toISOString(),
                expires_at: token_expiration
            }
            if (typeof body.expires_at === "object") {
                body.expires_at = hunderedYears;
                
            } 
            try {
                const res = await not_core_get("POST", "/tokens", body);
                if (res) {
                    await refresh(true);
                    setStatus("success");
                    setMessage("Secret added!");
                    setIssuer("")
                    setSecret("")
                    setName("")
                    setType("")
                    set_token_expiration(parseAbsoluteToLocal(new Date().toISOString()));
                } else {
                    setStatus("error");
                    setMessage("Refresh the page");
                }
                

            } catch (error) {
                console.log(error);
                setStatus("error");
                if (error.status === 403) {
                    setMessage("Insufficient level");
                } else {
                    setMessage("Try again later");
                }
            }

        } else {
            setStatus(null)
            setMessage(null)
            setIssuer("")
            setSecret("")
            setName("")
            setType("")
            set_token_expiration(parseAbsoluteToLocal(new Date().toISOString()));
        }
    }
    



    return (  
        <EmbloyV className="gap-4">
            <EmbloyInputbox>
                <EmbloyV className="gap-4">
                    <EmbloyInputboxElement head="Add new secret" />
                    <EmbloyH className="justify-between">
                        <EmbloyH className="gap-2">
                            <EmbloyInput
                                name="Name"
                                value={name}
                                required={true}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Secret Name"
                                className="landscape:w-2/12"
                            />
                            <EmbloyInput
                                variant="select"
                                onChange={(e) => setIssuer(e.target.value)}
                                value={issuer}
                                className="landscape:w-1/12"
                            >
                                <EmbloySelectOption placeholder={true} head="Select Issuer"/>
                                <EmbloySelectOption value="embloy" head="Embloy"/>
                                <EmbloySelectOption value="ashby" head="Ashby"/>
                                <EmbloySelectOption value="lever" head="Lever"/>
                            </EmbloyInput>
                            <EmbloyInput
                                variant="select"
                                onChange={(e) => setType(e.target.value)}
                                value={type}
                                className="landscape:w-1/12"
                            >
                                <EmbloySelectOption placeholder={true} head="Select Type"/>
                                <EmbloySelectOption value="api_key" head="API Key"/>
                                <EmbloySelectOption value="refresh_token" head="Refresh Token"/>
                                <EmbloySelectOption value="access_token" head="Access Token"/>
                                <EmbloySelectOption value="client_token" head="Client Token"/>
                                <EmbloySelectOption value="request_token" head="Request Token"/>
                            </EmbloyInput>
                            <EmbloyInput
                                variant="datetime-local"
                                onChange={(e) => set_token_expiration(e.target.value)}
                                value={token_expiration}
                                className="landscape:w-2/12"
                                min={min}
                                max={max}
                            />
                            <EmbloyInput
                                name="Secret"
                                value={secret}
                                required={true}
                                onChange={(e) => setSecret(e.target.value)}
                                placeholder="Secret Content"
                                className="landscape:w-3/12"
                            />
                        </EmbloyH>
                        <EmbloyH className="items-center justify-end landscape:w-2/12">
                            <EmbloyButton name="Save" onStatus={status} onMessage={message} className="landscape:w-44" onClick={add_secret} disabled={disabled}/>
                        </EmbloyH>
                    </EmbloyH>
                        <EmbloyP variant="mini" className="">{"All secrets are first encrypted and then stored using a "}
                            <Link target="_blank" className="underline italic" href="https://en.wikipedia.org/wiki/Symmetric-key_algorithm">symmetric key algorithm</Link>
                            .
                        </EmbloyP>
                </EmbloyV>
            </EmbloyInputbox>
        </EmbloyV>
        
    )
}