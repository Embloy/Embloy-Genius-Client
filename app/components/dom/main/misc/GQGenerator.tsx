import React, { useRef, useState } from "react";
import "@/app/globals.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { get_core } from "@/lib/misc_requests";
import { useRouter } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";

export function GenerateGQButton({ position, jobSlug, jobId }) {
  const generateModal = useDisclosure();

  const [generating, setGenerating] = useState(false);
  const [gqValue, setGQValue] = useState<string>(null);
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [linkIsCopied, setLinkIsCopied] = useState(false);
  const [embedTopJSXIsHovered, setEmbedTopJSXIsHovered] = useState(false);

  const handleCopyGQ = () => {};

  const handleCopyGQEmbed = () => {};
  const handleGenerate = async () => {
    setGenerating(true);
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    try {
      const data = await get_core(
        `/resource?exp=${date.getTime()}&job_id=${jobId}`,
        router,
        false,
        "POST"
      );
      if (data.query_token) {
        setGQValue(`https://embloy.com/sdk/apply?gq=${data.query_token}`);
      } else {
        setGQValue(null);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 bg-embloy-green text-black rounded-lg border-[1px] border-transparent">
      <Tooltip
        title="Note: Every generated QR code automatically creates a new job that you can find in the 'Hire' section.\nThere you can also generate QR codes for existing jobs."
        placement="top"
        content={
          <div className="text-red-500 text-center">
            Note: Every generated job-link (aka Genius Query) has a default
            validity of 1 year and links to one job.
          </div>
        }
      >
        <Button
          className="w-full text-white bg-embloy-green hover:bg-embloy-green font-bold py-2 px-4 rounded border-[1px] border-embloy-green"
          onClick={() => {
            handleGenerate();
            generateModal.onOpen();
          }}
        >
          Generate job-link
        </Button>
      </Tooltip>

      <Modal
        isOpen={generateModal.isOpen}
        scrollBehavior="inside"
        className="select-text cursor-auto flex items-center justify-center"
        onOpenChange={generateModal.onOpenChange}
      >
        <ModalContent className="flex flex-col items-center justify-center w-full md:w-1/2 lg:w-1/3 overflow-auto">
          <>
            <ModalHeader className="w-full flex flex-col gap-1 items-center justify-center overflow-auto">
              <p className={cn(generating ? "opacity-25 " : "opacity-100")}>
                {position ?? jobSlug}
              </p>
            </ModalHeader>
            <ModalBody
              className={cn(
                generating ? "opacity-25 " : "opacity-100",
                "w-full flex items-center justify-center"
              )}
            >
              <div>
                {generating ? (
                  <div className="text-center text-gray-500">
                    <h2 className="font-bold text-lg">
                      Generating Genius Query...
                    </h2>
                    <p>Please wait a moment.</p>
                  </div>
                ) : (
                  !gqValue && (
                    <div className="text-center text-gray-500">
                      <h2 className="font-bold text-lg">
                        Genius Query Unavailable
                      </h2>
                      <p>
                        Please ensure you have an active subscription and
                        haven&apos;t exceeded its usage limit.
                      </p>
                    </div>
                  )
                )}
              </div>
              {generating ? (
                <button
                  className={cn(
                    generating || !gqValue
                      ? "ml-2 rounded-full button p-2 hover:underline text-xs border-2 border-embloy-gray-darker text-embloy-gray-darker cursor-not-allowed"
                      : "ml-2 rounded-full button p-2 hover:underline text-xs border-2 border-embloy-green text-embloy-green hover:text-embloy-gray"
                  )}
                  disabled={generating || !gqValue}
                >
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-4 h-4 mr-2 text-gray-500 animate-spin fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="">Loading...</span>
                  </div>
                </button>
              ) : (
                <button
                  className="w-full flex flex-col items-center justify-start border-white border-[1px] rounded-lg p-2 overflow-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard
                      .writeText(`<a href="${gqValue}" target="_blank">
  <img src="https://embloy.com/images/button-black_large.svg" style={{ width: "300px", height: "auto" }} />
</a>`);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 3000);
                  }}
                >
                  {" "}
                  <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-start gap-2">
                      <Image
                        src="/icons/rev-v-green.svg"
                        alt="Logo"
                        height="10"
                        width="10"
                        className="relative"
                      />
                      <p className="font-semibold text-sm text-embloy-green">
                        CLIENT-SIDE
                      </p>
                      <p className="font-bold text-sm">HTML</p>
                    </div>
                    <a
                      href="#"
                      onMouseEnter={() => setEmbedTopJSXIsHovered(true)}
                      onMouseLeave={() => setEmbedTopJSXIsHovered(false)}
                    >
                      <Image
                        src={
                          embedTopJSXIsHovered
                            ? "/icons/embed-purple-lighter.svg"
                            : "/icons/embed-white.svg"
                        }
                        alt="Logo"
                        height="25"
                        width="25"
                        className="relative"
                      />
                    </a>
                  </div>
                  <>
                    <div className="w-full flex flex-row items-center justify-start g-2">
                      {!isCopied && (
                        <p className="font-light text-xs text-embloy-purple-lighter opacity-60">
                          Click to copy this code
                        </p>
                      )}
                      {isCopied && (
                        <p className="font-medium text-xs text-embloy-purple-lighter opacity-60">
                          Code copied to clipboard!
                        </p>
                      )}
                    </div>
                    <SyntaxHighlighter
                      language="jsx"
                      style={nightOwl}
                      customStyle={{ maxWidth: "100%", overflowX: "none" }}
                    >
                      {`<a href="${gqValue} target="_blank">
  <img src="https://embloy.com/images/button-black_large.svg" style={{ width: "300px", height: "auto" }} />
</a>`}
                    </SyntaxHighlighter>
                  </>
                </button>
              )}
            </ModalBody>
            <ModalFooter className="flex items-center justify-center">
              {generating && (
                <button
                  className="rounded-full c2-5 hover:underline text-xs bgneg"
                  disabled={generating}
                ></button>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(gqValue);
                  setLinkIsCopied(true);
                  setTimeout(() => setLinkIsCopied(false), 3000);
                }}
                className={cn(
                  generating || !gqValue
                    ? "mr-2 rounded-full button p-2 hover:underline text-xs border-2 border-embloy-gray-darker text-embloy-gray-darker cursor-not-allowed"
                    : "mr-2 rounded-full button p-2 hover:underline text-xs border-2 border-embloy-green text-embloy-green hover:text-embloy-gray"
                )}
                disabled={generating || !gqValue}
              >
                {linkIsCopied ? "Link copied to clipboard" : "Copy link only"}
              </button>{" "}
              <button
                onClick={handleCopyGQEmbed}
                className={cn(
                  generating || !gqValue
                    ? "ml-2 rounded-full button p-2 hover:underline text-xs border-2 border-embloy-gray-darker text-embloy-gray-darker cursor-not-allowed"
                    : "ml-2 rounded-full button p-2 hover:underline text-xs border-2 border-embloy-gray-darker text-embloy-gray-darker cursor-not-allowed"
                )}
                disabled={generating || !gqValue}
              >
                Share genius query
              </button>{" "}
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
