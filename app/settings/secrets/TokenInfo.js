import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import '@/app/globals.css'
import {AvatarButton} from "@/app/components/ui/misc/avatar";
import { not_core_get } from "@/lib/api/core";
import '@/app/globals.css'
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle, EmbloyButton} from "@/app/components/ui/misc/stuff";
import { EmbloyInput, EmbloyInputbox, EmbloyInputboxElement, EmbloyRadioOption, EmbloySelectOption } from "@/app/components/ui/misc/input";
import { patch_user, set_avatar as post_avatar, remove_avatar } from "@/lib/api/user";
import { EmbloyP } from "@/app/components/ui/misc/text";
import { force_login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
export function TokenInfo(reload) {
    let user = useContext(UserContext)
    let router = useRouter();
    const [access_token_expiration, set_access_token_expiration] = useState(60);
    const [error, setError] = useState(null);



    return (  
        <EmbloyV className="gap-4">
            <EmbloyInputbox>
                <EmbloyInputboxElement head="Access Token" description="Access Tokens are required for any interaction with the Embloy API">
                    <EmbloyH className="items-center">
                        <EmbloyP className="landscape:w-3/12">Expires in:</EmbloyP>
                        <EmbloyInput
                            variant="select"
                            onChange={(e) => set_access_token_expiration(e.target.value)}
                            value={access_token_expiration}
                            className="landscape:w-9/12"
                        >
                            <EmbloySelectOption value={60} head="1 Min."/>
                            <EmbloySelectOption value={1800} head="30 Min."/>
                            <EmbloySelectOption value={3600} head="1 Hour"/>
                            <EmbloySelectOption value={14400} head="4 Hours"/>
                            <EmbloySelectOption value={43200} head="12 Hours"/>
                        </EmbloyInput>
                    </EmbloyH>
                    <EmbloyH className="items-center justify-end">
                        <EmbloyButton name="Generate Token" onClick={async () => {} }/>


                    </EmbloyH>

                    
                </EmbloyInputboxElement>
            </EmbloyInputbox>
        </EmbloyV>
        
    )
}