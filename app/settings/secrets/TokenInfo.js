import React from "react";

import '@/app/globals.css'
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle, EmbloyButton} from "@/app/components/ui/misc/stuff";
import { AccessTokenInfo } from "./AccessTokenInfo";
import { ClientTokenInfo } from "./ClientTokenInfo";

export function TokenInfo(reload) {
    return (  
        <EmbloyV className="gap-4">
            <AccessTokenInfo/>
            <ClientTokenInfo/>
        </EmbloyV>
        
    )
}