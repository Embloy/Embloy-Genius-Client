import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/app/globals.css";
import { delete_core, patch_core } from "@/lib/misc_requests";
import Token from "@/lib/types/token";
import { formatDistanceToNow } from "date-fns";

export function SecretsList({ tokens, setTokens, removeToken }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(false);
  const [formError, setFormError] = useState(null);
  const [excludeTokens, setExcludeTokens] = useState(true);
  const [filterActive, setFilterActive] = useState(false);
  const [inputType, setInputType] = useState("password");

  const [tokenId, setTokenId] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenIssuer, setTokenIssuer] = useState("ashby");
  const [tokenType, setTokenType] = useState("api_key");
  const [tokenSecret, setTokenSecret] = useState("");
  const [tokenActivityStatus, setTokenActivityStatus] = useState("");
  const [editingTokenId, setEditingTokenId] = useState("");
  const [copiedId, setCopiedId] = useState("");

  const handleUpdate = async (e) => {
    if (!isUpdating) {
      if (!tokenName || !tokenIssuer || !tokenType || !tokenSecret) {
        setFormError("All fields are required.");
        return;
      } else {
        setFormError("");
      }

      setError(false);
      setIsUpdating(true);

      try {
        const path = `/tokens/${tokenId}`;
        const body = {
          name: tokenName,
          issuer: tokenIssuer,
          token: tokenSecret,
          active: tokenActivityStatus === "true",
          token_type: tokenType,
        };
        const res = await patch_core(path, router, body, false);
        console.log("res", res);
        setEditingTokenId("");
        const newToken: Token = res.token;
        removeToken(editingTokenId);
        setTokens((prevTokens) => [newToken, ...prevTokens]);

        setIsUpdating(false);
      } catch (error) {
        console.log("error: ", error);
        setError(true);
      }
      setIsUpdating(false);
    }
  };

  const isExpired = (token) => {
    return new Date() >= new Date(token.expires_at);
  };

  const handleEdit = (token) => {
    setTokenId(token.id);
    setTokenName(token.name);
    setTokenIssuer(token.issuer);
    setTokenType(token.token_type);
    setTokenSecret(token.token);
    setTokenActivityStatus(token.active);
    setEditingTokenId(token.id);
  };

  const handleDelete = async (tokenId) => {
    try {
      const path = `/tokens/${tokenId}`;
      const res = await delete_core(path, router);
      // Refresh the tokens list after a token is deleted
      removeToken(tokenId);
    } catch (error) {
      console.error("Failed to delete token:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <div className="w-full flex flex-row items-center justify-start gap-3">
        <h1 className="text-lg font-medium">Your account secrets</h1>

        <div
          className="border border-gray-400 p-1 px-2 rounded-full cursor-pointer"
          onClick={() => setExcludeTokens((prevState) => !prevState)}
        >
          <p className={excludeTokens ? "c1 text-xs" : "c1 text-xs"}>
            {excludeTokens
              ? "Load internal authentication tokens"
              : "Exclude internal authentication tokens"}
          </p>
        </div>

        <div
          className="border border-gray-400 p-1 px-2 rounded-full cursor-pointer"
          onClick={() => setFilterActive((prevState) => !prevState)}
        >
          <p className={filterActive ? "c1 text-xs" : "c1 text-xs"}>
            {filterActive ? "Show all secrets" : "Show only active secrets"}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-start">
        <p className="c2">
          This is a list of secret keys associated with your account. Remove any
          keys that you do not recognize.{" "}
          <a
            className="italic text-embloy-purple dark:text-embloy-purple-lighter hover:underline cursor-pointer"
            href="https://developers.embloy.com/docs/core/tokens/secrets"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
        </p>
      </div>
      <div className="w-full flex flex-row items-center justify-between">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <div className="w-full flex flex-row items-start justify-between">
            <div className="w-full flex flex-col items-start justify-start border border-gray-700 rounded-lg mt-2 mb-6">
              {tokens ? (
                tokens
                  .filter((token) => {
                    if (excludeTokens) {
                      return !(
                        token.issuer === "embloy" &&
                        (token.token_type === "access_token" ||
                          token.token_type === "request_token")
                      );
                    }
                    return true;
                  })
                  .filter((token) =>
                    filterActive ? token.active && !isExpired(token) : true
                  )
                  .map((token) => (
                    <React.Fragment key={token.id}>
                      <div
                        className={`w-full flex flex-col ${
                          editingTokenId == token.id &&
                          "dark:bg-embloy-gray-darkest bg-embloy-gray-lightest"
                        }`}
                      >
                        <div className="w-full px-2 py-2 flex flex-row items-start justify-between">
                          <div className="flex flex-row items-start justify-start gap-1">
                            <Image
                              className="mt-3 hidden dark:block"
                              src={
                                token.issuer === "embloy"
                                  ? "/icons/security-green.svg"
                                  : "/icons/security-white.svg"
                              }
                              alt="Logo"
                              height="50"
                              width="50"
                            />
                            <Image
                              className="mt-3 dark:hidden"
                              src={
                                token.issuer === "embloy"
                                  ? "/icons/security-green.svg"
                                  : "/icons/security-light.svg"
                              }
                              alt="Logo"
                              height="50"
                              width="50"
                            />

                            <div className="flex flex-col items-start justify-start gap-1">
                              <div className="flex flex-row items-center justify-start gap-2">
                                <p
                                  className={`font-medium text-sm ${
                                    isExpired(token) ? "c3" : "c1"
                                  }`}
                                >
                                  {token.name}
                                </p>
                                <div
                                  className={`border border-transparent px-2 rounded-full ${
                                    isExpired(token)
                                      ? "bg-gray-800 text-white"
                                      : token.active
                                      ? "bg-green-300 text-black"
                                      : "bg-red-500 text-white"
                                  }`}
                                >
                                  <p className="text-xs">
                                    {isExpired(token)
                                      ? "Expired"
                                      : token.active
                                      ? "Active"
                                      : "Inactive"}
                                  </p>
                                </div>
                              </div>
                              <p
                                className={`text-sm font-light ${
                                  isExpired(token) ? "c3" : "c1"
                                }`}
                              >
                                {token.issuer.charAt(0).toUpperCase() +
                                  token.issuer.slice(1).toLowerCase()}{" "}
                                —{" "}
                                {token.token_type
                                  .split("_")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ")}
                              </p>
                              <p
                                className={`c2 text-s ${
                                  isExpired(token) ? "c3" : "c2"
                                }`}
                              >
                                Added{" "}
                                {new Date(
                                  token.created_at
                                ).toLocaleDateString()}{" "}
                                —{" "}
                                {isExpired(token)
                                  ? `expired ${formatDistanceToNow(
                                      new Date(token.expires_at)
                                    )} ago`
                                  : `expires on ${new Date(
                                      token.expires_at
                                    ).toLocaleDateString()}`}
                              </p>{" "}
                              <p className="c2 text-s"></p>
                            </div>
                          </div>
                          <div className="flex flex-row gap-2 pt-5">
                            {editingTokenId == token.id ? (
                              <button
                                onClick={() => setEditingTokenId("")}
                                title="Close editor"
                                className="border-[1px] border-gray-700 rounded-xl px-2 text-sm text-red-500 p-1"
                              >
                                <p>✖️</p>
                              </button>
                            ) : (
                              <button
                                disabled={!token.active}
                                title="Copy to clipboard"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigator.clipboard.writeText(token.token);
                                  setCopiedId(token.id);
                                  setTimeout(() => setCopiedId(""), 2000); // Reset after 2 seconds
                                }}
                                className="border-[1px] border-gray-700 rounded-xl px-2 text-sm text-red-500 p-1 cursor-pointer"
                              >
                                <p>{copiedId == token.id ? "✅" : "📋"} </p>
                              </button>
                            )}
                            <button
                              disabled={isExpired(token) || isUpdating}
                              title={
                                isExpired
                                  ? "Only non expired tokens can be edited!"
                                  : "Edit token"
                              }
                              onClick={() =>
                                editingTokenId == token.id
                                  ? handleUpdate(token)
                                  : handleEdit(token)
                              }
                              className={`border-[1px] border-gray-700 rounded-xl px-2 text-sm ${
                                isExpired(token)
                                  ? "text-gray-500 cursor-not-allowed"
                                  : "dark:text-embloy-purple-lighter text-embloy-purple ed p-1"
                              }
                              ${isUpdating && "cursor-not-allowed"}
                              `}
                            >
                              <p
                                className={
                                  editingTokenId == token.id
                                    ? `${
                                        isUpdating
                                          ? "text-gray-500"
                                          : "text-embloy-purple dark:text-embloy-purple-lighter"
                                      }`
                                    : ""
                                }
                              >
                                {editingTokenId == token.id
                                  ? `${
                                      isUpdating ? "Saving ..." : "Save changes"
                                    }`
                                  : "Edit"}
                              </p>
                            </button>
                            {editingTokenId != token.id && (
                              <button
                                title="Delete token forever"
                                onClick={() => handleDelete(token.id)}
                                className="border-[1px] border-gray-700 rounded-xl px-2 text-sm text-red-500 p-1 cursor-pointer"
                              >
                                <p>Delete</p>
                              </button>
                            )}
                          </div>
                        </div>
                        {editingTokenId === token.id && (
                          <>
                            <div className="w-full h-px bg-gray-900" />
                            <div className="flex flex-row items-start justify-start gap-6 p-4">
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
                                  onChange={(e) =>
                                    setTokenIssuer(e.target.value)
                                  }
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
                                  <option value="refresh_token">
                                    Refresh token
                                  </option>
                                  <option value="access_token">
                                    Access token
                                  </option>
                                  <option value="client_token">
                                    Client token
                                  </option>
                                  <option value="request_token">
                                    Request token
                                  </option>
                                </select>
                              </div>
                              <div className="flex flex-col items-start justify-start gap-1">
                                <p className="font-medium c1">Secret</p>
                                <div className="relative">
                                  <input
                                    className="c0 h-8 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg cursor-not-allowed"
                                    type={inputType}
                                    name="note"
                                    disabled
                                    value={tokenSecret}
                                    required={true}
                                    onChange={(e) =>
                                      setTokenSecret(e.target.value)
                                    }
                                  />
                                  <button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                    onClick={() => {
                                      setInputType(
                                        inputType === "password"
                                          ? "text"
                                          : "password"
                                      );
                                      setTimeout(
                                        () => setInputType("password"),
                                        3000
                                      );
                                    }}
                                  >
                                    <Image
                                      className="hidden dark:block"
                                      src={
                                        inputType === "password"
                                          ? "/icons/sm-list-white.svg"
                                          : "/icons/sm-unlist-white.svg"
                                      }
                                      alt="Eye icon"
                                      height="25"
                                      width="25"
                                    />
                                    <Image
                                      className="dark:hidden"
                                      src={
                                        inputType === "password"
                                          ? "/icons/sm-list-dark.svg"
                                          : "/icons/sm-unlist-dark.svg"
                                      }
                                      alt="Eye icon"
                                      height="25"
                                      width="25"
                                    />
                                  </button>
                                </div>
                              </div>{" "}
                              <div className="flex flex-col items-start justify-start gap-1">
                                <p className="font-medium c1">Enable/Disable</p>
                                <select
                                  className="c0 h-8 w-40 px-2 border-[2px] border-gray-700 outline-none rounded-lg"
                                  name="active"
                                  value={tokenActivityStatus}
                                  required={true}
                                  onChange={(e) =>
                                    setTokenActivityStatus(e.target.value)
                                  }
                                >
                                  <option value="true">Active</option>
                                  <option value="false">Inactive</option>
                                </select>
                              </div>
                            </div>
                            <div className="text-center flex flex-col">
                              {formError && editingTokenId == token.id && (
                                <p className="select-none text-xs text-red-500">
                                  {formError}
                                </p>
                              )}
                              {error && editingTokenId == token.id && (
                                <div className="center gap-2 mb-2">
                                  <p className="select-none text-xs text-red-500">
                                    Something went wrong.
                                  </p>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                        <div className="w-full h-px bg-gray-700" />
                      </div>
                    </React.Fragment>
                  ))
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
