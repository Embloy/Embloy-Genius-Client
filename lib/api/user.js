"use client";

import { core_get, not_core_get } from "./core";
import { setCookie } from "cookies-next";
import { siteConfig } from "@/config/site";
import { claim_access_token } from "./auth";

export async function patch_user(body) {
  try{
    const response = await not_core_get("PATCH", "/user", { user: body });
    return { type: "success", message: "User updated!" };
  } catch (error) {
    return {type: "error", message: error.message}
  }
  
}

export async function set_avatar(selectedImage) {
    const formData = new FormData();
    formData.append("image_url", selectedImage);
    const response = await not_core_get("POST", "/user/image", formData, true);
    return response;
}

export async function remove_avatar() {
  try {
    const response = await not_core_get("DELETE", "/user/image");
    return { type: "success", message: "Avatar removed!" };
  }
  catch (error) {
    return {type: "error", message: error.message}
}

}

export async function claim_core_tokens(return_integrations = false) {
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
        return integrations;
      };    
    try {
        const data = await core_get("/tokens");
        const integrations = set_integration_cookies(data.tokens);
        if (return_integrations) {
            return integrations;
        } else {
            return data.tokens;
        }

    } catch (e) {
        throw new Error(e);
    }
    

    
}