import React, { useState } from "react";
import "@/app/globals.css";
import { post_core } from "@/lib/misc_requests";
import { useRouter } from "next/navigation";
import Token from "@/lib/types/token";

export function SecretsForm({ tokens, setTokens }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formError, setFormError] = useState(null);

  const [tokenName, setTokenName] = useState("");
  const [tokenIssuer, setTokenIssuer] = useState("ashby");
  const [tokenType, setTokenType] = useState("api_key");
  const [tokenSecret, setTokenSecret] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log("TokenIssuer", tokenIssuer);
    console.log("TokenType", tokenType);
    if (!isLoading) {
      if (!tokenName || !tokenIssuer || !tokenType || !tokenSecret) {
        setFormError("All fields are required.");
        return;
      } else {
        setFormError("");
      }

      setIsLoading(true);

      try {
        const path = "/tokens";
        const body = {
          name: tokenName,
          issuer: tokenIssuer,
          token: tokenSecret,
          issued_at: new Date().toISOString(),
          expires_at: new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 365
          ).toISOString(), // 1 year from now
          token_type: tokenType,
        };
        const res = await post_core(path, router, body, false);
        console.log(res);
        if ((res.status = 201)) {
          setTokenName("");
          setTokenIssuer("ashby");
          setTokenType("api_key");
          setTokenSecret("");
          const newToken: Token = res.token;
          setTokens((prevTokens) => [...prevTokens, newToken]);
        }

        setIsLoading(false);
        setError(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className="text-lg font-medium">Create new secret</h1>
      </div>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <div className="w-full flex flex-row items-start justify-between">
            <div className=" flex flex-col items-start justify-start gap-1">
              <div className="flex flex-row items-start justify-start gap-6">
                <div className="flex flex-col items-start justify-start gap-1">
                  <p className="font-medium c1">Name</p>
                  <input
                    className="c0 h-8 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"
                    type="text"
                    name="note"
                    value={tokenName}
                    required={true}
                    maxLength={100}
                    onChange={(e) => setTokenName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                  <p className="font-medium c1">Issuer</p>
                  <select
                    className="c0 h-8 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"
                    name="issuer"
                    value={tokenIssuer}
                    required={true}
                    onChange={(e) => setTokenIssuer(e.target.value)}
                  >
                    <option value="embloy">Embloy</option>
                    <option value="ashby">Ashby</option>
                    <option value="lever">Lever</option>
                  </select>
                </div>{" "}
                <div className="flex flex-col items-start justify-start gap-1">
                  <p className="font-medium c1">Type</p>
                  <select
                    className="c0 h-8 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"
                    name="type"
                    value={tokenType}
                    required={true}
                    onChange={(e) => setTokenType(e.target.value)}
                  >
                    <option value="api_key">API key</option>
                    <option value="refresh_token">Refresh token</option>
                    <option value="access_token">Access token</option>
                    <option value="client_token">Client token</option>
                    <option value="request_token">Request token</option>
                  </select>
                </div>
                <div className="flex flex-col items-start justify-start gap-1">
                  <p className="font-medium c1">Secret</p>
                  <input
                    className="c0 h-8 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"
                    type="password"
                    name="note"
                    value={tokenSecret}
                    required={true}
                    onChange={(e) => setTokenSecret(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-start">
                <p className="text-xs c3">
                  All secrets are first encrypted and then stored using a{" "}
                </p>
                <div className="w-1" />
                <a
                  className=" text-xs italic c2-5 hover:underline cursor-pointer"
                  href="https://en.wikipedia.org/wiki/Symmetric-key_algorithm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>symmetric-key algorithm</p>
                </a>
              </div>
            </div>
            <div className="flex flex-col items-end justify-start gap-1">
              <p className="font-medium text-transparent select-none">*</p>

              {!!isLoading && (
                <button
                  disabled={true}
                  className="text-embloy-purple-lighter h-8 px-4 border-[2px] border-embloy-purple-lighter outline-none rounded-full cursor-wait"
                >
                  <p className="select-none">Loading</p>
                </button>
              )}

              {!isLoading && (
                <div className="flex flex-row items-center gap-2">
                  {formError && (
                    <p className="select-none text-xs text-red-500">
                      {formError}
                    </p>
                  )}
                  {error && (
                    <div className="flex flex-row items-center justify-end gap-2">
                      <p className="select-none text-xs text-red-500">
                        Something went wrong.
                      </p>
                    </div>
                  )}
                  <button
                    onClick={handleCreate}
                    className="text-embloy-purple-light hover:text-embloy-purple-lighter h-8 px-4 border-[2px] border-embloy-purple-light hover:border-embloy-purple-lighter outline-none rounded-full"
                  >
                    <p className="select-none">Save</p>
                  </button>
                </div>
              )}

              <div className="flex flex-row items-center justify-start">
                <p className="text-xs c3">Not sure what to select?</p>
                <div className="w-1" />
                <a
                  className=" text-xs italic c2-5 hover:underline cursor-pointer"
                  href="https://developers.embloy.com/docs/category/guides"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>Check out our detailed Guides</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
