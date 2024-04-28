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
} from "@nextui-org/react";
import { cn } from "@/lib/utils";
import QRCode from "qrcode.react";
import { get_core } from "@/lib/misc_requests";
import { useRouter } from "next/navigation";

export function GenerateQRButton({ head }) {
  const generateModal = useDisclosure();
  const errorModal = useDisclosure();

  const [generating, setGenerating] = useState(false);
  const [qrValue, setQrValue] = useState<string>(null);
  const qrRef = useRef(null);
  const router = useRouter();
  const handleGenerate = async () => {
    console.log("Started Generating");
    setGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    get_core("/pi/v0/resource/qr", router)
      .then((data) => {
        if (data.link) {
          setQrValue(data.link);
        } else {
          setQrValue(null);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    setGenerating(false);
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "embloy-qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 bg-embloy-green text-black rounded-lg border-[1px] border-transparent">
      <Button
        className="w-full text-white bg-embloy-green hover:bg-embloy-green font-bold py-2 px-4 rounded border-[1px] border-embloy-green"
        onClick={() => {
          handleGenerate();
          generateModal.onOpen();
        }}
      >
        Generate QR Code
      </Button>

      <Modal
        isOpen={generateModal.isOpen}
        scrollBehavior="inside"
        className="select-text cursor-auto flex items-center justify-center"
        onOpenChange={generateModal.onOpenChange}
      >
        <ModalContent className="flex flex-col items-center justify-center">
          <>
            <ModalHeader className="flex flex-col gap-1 items-center justify-center">
              {head}
            </ModalHeader>
            <ModalBody
              className={cn(
                generating ? "opacity-25 " : "opacity-100",
                "flex items-center justify-center"
              )}
            >
              <div ref={qrRef}>
                {generating ? (
                  <div className="text-center text-gray-500">
                    <h2 className="font-bold text-lg">Generating QR Code...</h2>
                    <p>Please wait a moment.</p>
                  </div>
                ) : qrValue ? (
                  <QRCode value={qrValue} />
                ) : (
                  <div className="text-center text-gray-500">
                    <h2 className="font-bold text-lg">QR Code Unavailable</h2>
                    <p>
                      Please ensure you have an active subscription and haven't
                      exceeded its usage limit.
                    </p>
                  </div>
                )}
              </div>{" "}
            </ModalBody>{" "}
            <ModalFooter className="flex items-center justify-center">
              {generating && (
                <button
                  className="rounded-full c2-5 hover:underline text-xs bgneg"
                  disabled={generating}
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
                    <span className="sr-only">Loading...</span>
                  </div>
                </button>
              )}
              <button
                onClick={handleDownloadQR}
                className={cn(
                  generating || !qrValue
                    ? "rounded-full button p-2 hover:underline text-xs border-2 border-embloy-gray-darker text-embloy-gray-darker cursor-not-allowed"
                    : "rounded-full button p-2 hover:underline text-xs border-2 border-embloy-green text-embloy-green hover:text-embloy-gray"
                )}
                disabled={generating || !qrValue}
              >
                Download QR Code
              </button>{" "}
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={errorModal.isOpen}
        scrollBehavior="inside"
        size="xs"
        className="select-text cursor-auto flex items-center justify-center"
        onOpenChange={errorModal.onOpenChange}
      >
        <ModalContent className="flex flex-col items-center justify-center">
          <>
            <ModalHeader className="flex flex-col gap-1 items-center justify-center">
              Error
            </ModalHeader>
            <ModalBody className="flex items-center justify-center">
              <QRCode value={qrValue} />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}
