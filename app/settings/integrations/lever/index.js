"use client";
import { core_get, not_core_get } from "@/lib/api/core"; 
import { claim_core_tokens } from "@/lib/api/user";
const issuer = "lever";

export const verify = (activeIntegrations) => {
    if (activeIntegrations.filter((integration) => integration.issuer === issuer).length > 0) {
        return true;
    } else {
        return false;
    }
};

export const connect = () => {
    core_get("/integrations/lever/auth")
        .then((data) => {
            window.open(data.url, "_blank");
            return true;  
        })
        .catch(() => {
            return false;
        });
};


export const disconnect = (active_integrations) => {
    const disconnect_id = async (token_id) => {
        await not_core_get("DELETE", `/tokens/${token_id}`, {});
    };
    const ids = active_integrations
        .filter((integration) => integration.issuer === issuer)
        .map((token) => token.id);

    try {
        ids.forEach(async (id) => {
            await disconnect_id(id);
        });
        claim_core_tokens()
            .then(() => {
                return true;
            })
            .catch(() => {
                throw new Error("Error claiming core tokens");
            });
        return true;
    } catch (error) {
        console.error("Error disconnecting from Lever", error);
        return false
    }
};

export const sync = () => {
    // Custom connection logic for Service A
}

export const reset= () => {
    // Custom connection logic for Service A
}