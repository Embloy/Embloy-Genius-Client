"use client";
import React, {useEffect, useRef, useState} from "react";
import '@/app/globals.css'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {patch_core, post_core} from "@/lib/misc_requests";
import {EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyH1, EmbloyP } from "@/app/components/ui/misc/text";
import { not_core_get } from "@/lib/api/core";

export function RemoveJobButton({ getSelectedRows,onUploadSuccess, getJob}) {
    const consentModal = useDisclosure()

    const handleDivClick = () => {
        if (!consentModal.isOpen && Object.keys(getSelectedRows()).length > 0) {
            consentModal.onOpen();
        }
    };

    const [status, setStatus] = useState(null);

    const handleRemoval = async () => {
        const selectedRows = getSelectedRows();
        if (selectedRows) {
            setStatus("loading");
            let accumulatedErrors = [];
            for (const job in selectedRows) {
                const job_id = getJob(job).id;
                try {
                    const res = await not_core_get("PATCH", `/jobs?id=${job_id}`, {job_status: 'archived'})
                    console.log("Job removed: ", res);
                } catch (e) {
                    console.log("Error occurred during removing job: ", e);
                    accumulatedErrors.push(e);
                }
            }
            if (accumulatedErrors.length === 0) {
                onUploadSuccess();
                setStatus(null);
            } else {
                setStatus("error");
            }
            consentModal.onClose();
        }
    }

    const [isWindows, setIsWindows] = useState(false);

    useEffect(() => {
        if (typeof navigator !== "undefined") {
            setIsWindows(navigator.userAgent.includes("Windows"));
        }
    }, []);

    return (
        <div onClick={handleDivClick} className={cn(Object.keys(getSelectedRows()).length > 0 ? "relative inline-block" : "relative inline-block" + " cursor-not-allowed")}>
            <div className={cn(Object.keys(getSelectedRows()).length > 0 ? "cursor-pointer" : "" + "pointer-events-none")}>
                <EmbloyToolboxImgAdvanced tooltip="Remove Active Posting(s)" path="/icons/svg/black/bin.svg" path_hovered="/icons/svg/capri/bin.svg" dark_path="/icons/svg/amarone/bin.svg" dark_path_hovered="/icons/svg/barbera/bin.svg" height="12" width="12" disabled={Object.keys(getSelectedRows()).length === 0} path_disabled={"/icons/svg/etna/bin.svg"} dark_path_disabled={"/icons/svg/nebbiolo/bin.svg"} failure={undefined} path_failure={undefined} path_failure_hovered={undefined} success={undefined} action={undefined} path_success={undefined} path_success_hovered={undefined} path_action={undefined} path_hovered_action={undefined} dark_path_action={undefined} dark_path_hovered_action={undefined} />
            </div>
            
            <Modal
                isOpen={consentModal.isOpen}
                scrollBehavior="inside"
                size="xs"
                className={`${isWindows && "w-64 rounded-md bg-white dark:bg-chianti border-[1px] border-etna dark:border-nebbiolo" } "select-text cursor-auto"`}
                onOpenChange={consentModal.onOpenChange}
            >
                <ModalContent className={`${!isWindows && "pt-4 "}`}>

                    <>
                        <ModalBody className={`${isWindows && "w-full flex flex-col items-end"} ${cn(status === "loading" ? "opacity-25" : "opacity-100")}`}>
                            <EmbloyP className="text-sm w-full text-left">
                                {`Remove ${Object.keys(getSelectedRows()).length} job${Object.keys(getSelectedRows()).length > 1 ? 's' : ''}?`}
                            </EmbloyP>
                        </ModalBody>
                        <ModalFooter className={undefined}>
                            {status === "loading" && (
                                <button className="rounded-full c2-5 hover:underline text-xs bgneg" disabled={status === "loading"}>
                                    <div role="status">
                                        <svg aria-hidden="true"
                                             className="inline w-4 h-4 mr-2 text-gray-500 animate-spin fill-white"
                                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"/>
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </button>

                            )}
                            <button onClick={() => {
                                consentModal.onClose();
                            }} className={cn(status === "loading" ? "cursor-not-allowed py-0.5 px-1.5" : "rounded-md py-0.5 px-1.5")} disabled={status === "loading"}>
                                <EmbloyP className="text-xs text-capri dark:text-capri hover:underline">Cancel</EmbloyP>
                            </button>
                            <button onClick={() => {
                                handleRemoval().then(r => { });
                            }} className={cn(status === "loading" ? "cursor-not-allowed py-0.5 px-1.5" : "rounded-sm py-0.5 px-1.5 transition-colors duration-200")} disabled={status === "loading"}>
                                <EmbloyP className="text-xs text-primitivo dark:text-primitivo hover:underline">Remove</EmbloyP>
                            </button>
                        </ModalFooter>
                    </>

                </ModalContent>
            </Modal>
        </div>
    );
}
