import React, {useEffect, useState} from "react";

import '@/app/globals.css'
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle, EmbloyButton} from "@/app/components/ui/misc/stuff";
import { NewSecretInfo } from "./NewSecretInfo";
import { claim_core_tokens } from "@/lib/api/user";
import { SecretDataTable } from "./SecretDataTable";
import { secretListColumns } from "./secret_list_columns";


export function SecretInfo({onShow}) {
    const [showExpired, setShowExpired] = useState(false);
    const [showInternal, setShowInternal] = useState(false)
    const [secrets, setSecrets] = React.useState([]);
    const invalidateToken = async (token_ids) => {
        if (secrets) {
            let new_tokens = secrets.map((token) => {
                if (token_ids.includes(token.id)) {
                    return { ...token, active: false }; 
                }
                return token; 
            });
            setSecrets(new_tokens);
            await getSecrets();
        }
    };
    const validateToken = async (token_ids) => {
        if (secrets) {
            let new_tokens = secrets.map((token) => {
                if (token_ids.includes(token.id)) {
                    return { ...token, active: true }; 
                }
                return token; 
            });
            
            setSecrets(new_tokens);
            await getSecrets();
        }
    };

    const deleteToken = async (token_ids) => {
        if (secrets) {
            let new_tokens = secrets.filter((token) => !token_ids.includes(token.id));
            setSecrets(new_tokens);
            await getSecrets();
        }
    }
    const getSecrets = async () => {
        const isExpired = (token) => {
            return new Date() >= new Date(token.expires_at);
        };
        const isInternal = (token) => {
            if ((token.token_type === "refresh_token" || token.token_type === "access_token") && token.issuer === "embloy") {
                return true;
            } else {
                return false;
            }
        };
        try {
            let tokens = await claim_core_tokens();
            
            if (!showExpired) {
                tokens = tokens.filter((token) => !isExpired(token));
            }
            if (!showInternal) {
                tokens = tokens.filter((token) => !isInternal(token));
            }
            setSecrets(tokens); 
        } catch (error) {
            console.log("Failed to fetch tokens:", error);
        }
    }

    useEffect(() => {
        getSecrets();
    }, [showExpired, showInternal]);
    const handleInternal = () => {
        setShowInternal(!showInternal);
    }
    const handleExpired = () => {
        setShowExpired(!showExpired);
    }
    useEffect(() => {
        if (onShow) {
            getSecrets();
        }
    }, [onShow]);

    return (  
        <EmbloyV className="gap-8">
            <NewSecretInfo refresh={getSecrets}/>
            <EmbloyV className="gap-4">
                <SecretDataTable 
                    columns={secretListColumns}
                    data={secrets}
                    onTokenDelete={deleteToken}
                    onTokenInvalidate={invalidateToken}
                    onInternal={handleInternal}
                    internal={showInternal}
                    onExpired={handleExpired}
                    expired={showExpired}
                    onTokenValidate={validateToken}
                />
            </EmbloyV>
        </EmbloyV>
        
    )
}