"use client";
import React, {useEffect, useRef, useState} from "react";
import '@/app/globals.css'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {patch_core, post_core} from "@/lib/misc_requests";
import {EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
interface UploadError {
    job: any; // Adjust the type based on your job structure
    error: any; // Adjust the type based on the error structure
}
export function RemoveJobButton({ formats = ['*'], router, img, style, getSelectedRows,onUploadSuccess, getJob}) {
    const consentModal = useDisclosure()
    const errorModal = useDisclosure()
    const [fileContent, setFileContent] = useState<string>('');

    const handleDivClick = () => {
        if (!consentModal.isOpen && Object.keys(getSelectedRows()).length > 0) {
            consentModal.onOpen();
        }
    };

    const [uploading, setUploading] = useState(false);
    const [uploadErrors, setUploadErrors] = useState<UploadError[]>([]); // [{job: job, error: error}
    const handleRemoval = async () => {
        const selectedRows = getSelectedRows();
        if (selectedRows) {
            setUploading(true);
            let accumulatedErrors = [];
            for (const job in selectedRows) {
                const job_id = getJob(job).job_id;
                try {
                    const res = await patch_core(`/jobs?id=${job_id}`, router, {job_status: 'archived'})
                } catch (e) {
                    console.log("Error occurred during removing job: ", e);
                    accumulatedErrors.push({ job, error: e });
                }
            }
            setUploading(false);
            consentModal.onClose();
            if (accumulatedErrors.length > 0) {
                setUploadErrors(accumulatedErrors);
                errorModal.onOpen();
            } else {
                onUploadSuccess();
            }
        }
    }

    const [uploadsIsHovered, setUploadsIsHovered] = useState(false);

    const handleUploadsHover = () => {
        setUploadsIsHovered(true);
    };

    const handleUploadsNotHover = () => {
        setUploadsIsHovered(false);
    };

    return (
        <div onClick={handleDivClick} className={cn(Object.keys(getSelectedRows()).length > 0 ? "relative inline-block" : "relative inline-block" + " cursor-not-allowed")}>
            <div className={cn(Object.keys(getSelectedRows()).length > 0 ? "cursor-pointer" : "" + "pointer-events-none")}>
                <EmbloyToolboxImgAdvanced tooltip="Remove Active Posting(s)" path="/icons/svg/black/bin.svg" path_hovered="/icons/svg/leidoveneta/bin.svg" dark_path="/icons/svg/amarone/bin.svg" dark_path_hovered="/icons/svg/barbera/bin.svg" height="12" width="12" disabled={undefined} path_disabled={undefined} dark_path_disabled={undefined} />
            </div>
            <Modal
                isOpen={consentModal.isOpen}
                scrollBehavior="inside"
                size="xs"
                className="select-text cursor-auto"
                onOpenChange={consentModal.onOpenChange}
            >
                <ModalContent>

                    <>
                        <ModalHeader className="flex flex-col gap-1">Confirmation</ModalHeader>
                        <ModalBody className={cn(uploading ?  "opacity-25 " : "opacity-100")}>
                            <p className="c0">{`Are you sure you want to remove ${Object.keys(getSelectedRows()).length} job(s)?`}</p>
                        </ModalBody>
                        <ModalFooter>
                            {uploading && (
                                <button className="rounded-full c2-5 hover:underline text-xs bgneg" disabled={uploading}>
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
                            }} className={cn(uploading ? "rounded-full c3 cursor-not-allowed text-xs bgneg" : "rounded-full c2-5 hover:underline text-xs bgneg")} disabled={uploading}>
                                <p>Cancel</p>
                            </button>
                            <button onClick={() => {
                                handleRemoval().then(r => { });
                            }} className={cn(uploading ? "rounded-full c3 cursor-not-allowed text-xs bgneg" : "rounded-full c2-5 hover:underline text-xs bgneg")} disabled={uploading}>
                                <p>Ok</p>
                            </button>
                        </ModalFooter>
                    </>

                </ModalContent>
            </Modal>
            <Modal
                isOpen={errorModal.isOpen}
                scrollBehavior="inside"
                size="xs"
                className="select-text cursor-auto"
                onOpenChange={errorModal.onOpenChange}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">Error</ModalHeader>
                        <ModalBody>
                            <p className="c0">{`${uploadErrors.length} Error(s) occurred during removal.`}</p>
                            {uploadErrors.map((error, index) => (
                                <div key={index} className="flex flex-col gap-1">
                                    <p className="c0">{`Error ${index + 1}:`}</p>
                                    <p className="c0">{`Job: ${JSON.stringify(error.job)}`}</p>
                                    <p className="c0">{`Error: ${error.error}`}</p>
                                </div>
                            ))
                            }

                        </ModalBody>
                        <ModalFooter>
                            <a href={"https://about.embloy.com/en/contact"} className="rounded-full c2-5 hover:underline text-xs bgneg">
                                <p>Help</p>
                            </a>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </div>
    );
}
