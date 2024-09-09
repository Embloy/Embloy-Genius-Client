"use client";
import "../locals.css";
import "@/app/globals.css";
import React, { useEffect, useState } from "react";
import { AccessTokenClaim } from "@/app/settings/secrets/AccessTokenClaim";
import { ClientTokenClaim } from "@/app/settings/secrets/ClientTokenClaim";
import { GeniusQueryTokenClaim } from "@/app/settings/secrets/GeniusQueryTokenClaim";
import { SecretsForm } from "@/app/settings/secrets/SecretsForm";
import { SecretsList } from "@/app/settings/secrets/SecretsList";
import { OpenCloseScaffold } from "@/app/components/dom/main/misc/Scaffolds";
import Token from "@/lib/types/token";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { siteConfig } from "@/config/site";
import { claim_core_tokens } from "@/lib/api/user";

export function SecretsSettings() {
  const router = useRouter();
  const [tokens, setTokens] = useState<Token[]>([]);

  const setIntegrationCookies = (tokens: Token[]) => {
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

  const removeToken = (idToRemove: number) => {
    console.log("Called remove token with token id: ", idToRemove);
    console.log("Current size: ", tokens.length);
    setTokens((prevTokens) =>
      prevTokens.filter((token) => token.id !== idToRemove)
    );
    console.log("Post size: ", tokens.length);
  };

  const handleGet = async () => {
    try {
      const claimed_tokens = await claim_core_tokens();
      setTokens(claimed_tokens);
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="flex flex-col items-center sm:items-start">
      <div className="w-full flex flex-col items-center sm:items-start justify-between ">
        <div className="text-sm w-full flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 p-4">
          <div className="text-lg font-medium c3 flex flex-row items-center justify-start gap-4 ">
            <h1>Embloy tokens</h1>
          </div>
          <div className="c3 flex flex-row items-center justify-start">
            <p>Generate tokens to access the</p>
            <div className="w-1" />
            <a
              className="italic c2-5 hover:underline cursor-pointer"
              href="https://docs.embloy.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Embloy API</p>
            </a>
            <div className="w-1" />
            <p>.</p>
          </div>
        </div>

        <div className="text-sm c2 w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
          <OpenCloseScaffold
            title="Access token"
            timeout={false}
            headerChild={<div />}
            pre_text="Access tokens are used for every interaction with the"
            link_text="Embloy API"
            link_url="https://docs.embloy.com"
            post_text="."
            button_text="New access token"
            child={<AccessTokenClaim />}
          />
          <div className="h-3" />
          <OpenCloseScaffold
            title="Client token"
            timeout={false}
            headerChild={<div />}
            pre_text="Client tokens are used for embedding Embloy Products on the client-side using the"
            link_text="Embloy SDK"
            link_url="https://developers.embloy.com/docs/sdks/overview"
            post_text="."
            button_text="New client token"
            child={<ClientTokenClaim />}
          />
          <div className="h-3" />
          <OpenCloseScaffold
            title="Genius-Query token"
            timeout={false}
            headerChild={<div />}
            pre_text="Genius-Query tokens are used to link to jobs using"
            link_text="Genius-Queries"
            link_url="https://developers.embloy.com/docs/core/genius_queries"
            post_text="."
            button_text="New Genius-Query"
            child={<GeniusQueryTokenClaim />}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center sm:items-start justify-between ">
        <div className="text-sm w-full flex flex-col sm:flex-row items-center justify-between border-b border-gray-700 p-4">
          <div className="text-lg font-medium c3 flex flex-row items-center justify-start gap-4 ">
            <h1>3rd-party secrets</h1>
          </div>
          <div className="c3 flex flex-row items-center justify-start">
            <p>Manage 3rd-party secrets such as API keys.</p>
          </div>
        </div>
        <div className="text-sm c2 w-full flex flex-col items-start justify-start gap-4 border-b border-gray-700 p-4">
          <SecretsForm tokens={tokens} setTokens={setTokens} />
          <div className="h-3" />
          <SecretsList
            tokens={tokens}
            setTokens={setTokens}
            removeToken={removeToken}
          />
        </div>
      </div>
    </div>
  );
}
