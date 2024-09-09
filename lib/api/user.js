"use client";

import { core_get } from "./core";
import { setCookie } from "cookies-next";
import { siteConfig } from "@/config/site";

export async function claim_core_tokens() {
    const set_integration_cookies = (tokens) => {
        const integrations = tokens
          .filter(
            (token) =>
              token.issuer !== "embloy" &&
              token.active &&
              new Date(token.expires_at) > new Date()
          )
          .map(({ id, active, expires_at, issuer, last_used_at, token_type }) => ({
            id,
            active,
            expires_at,
            issuer,
            last_used_at,
            token_type,
          }));
    
        console.log("Setting active integrations cookie: ", integrations);
    
        setCookie("active_integrations", JSON.stringify(integrations), {
          path: "/",
          domain: `${siteConfig.core_domain}`,
        });
      };    
    try {
        const data = await core_get("/tokens");
        set_integration_cookies(data.tokens);
        return data.tokens;

    } catch (e) {
        throw new Error(500);
    }
    

    
}