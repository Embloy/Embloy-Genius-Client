"use client";
import React, {useEffect, useRef, useState} from "react";
import '@/app/globals.css'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {post_core} from "@/lib/misc_requests";
interface UploadError {
    job: any; // Adjust the type based on your job structure
    error: any; // Adjust the type based on the error structure
}
export function RemoveJobButton({ formats = ['*'], router, img, head, style, getSelectedRows,onUploadSuccess}) {
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
    const handleUpload = async () => {
        const jsonData = JSON.parse(fileContent);
        if (jsonData && Array.isArray(jsonData)) {
            setUploading(true);
            let accumulatedErrors = [];
            for (const job of jsonData) {
                try {
                    console.log("Trying to post job");
                    const res = await post_core('/jobs', router, job);
                } catch (e) {
                    console.log("Error occurred during posting job: ", e);
                    accumulatedErrors.push({ job, error: e });
                }
            }

            setUploading(false);
            setFileContent('');
            //uploadModal.onClose();
            if (accumulatedErrors.length > 0) {
                setUploadErrors(accumulatedErrors);
                errorModal.onOpen();
            } else {
                onUploadSuccess();;
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
        <div onClick={handleDivClick} className="relative inline-block">
            <Image
                src={cn(uploadsIsHovered && Object.keys(getSelectedRows()).length > 0 ? "/icons/" + img + "-light.svg" : "/icons/" + img + "-dark.svg")}
                alt="columns"
                height="25"
                width="25"
                className={cn(Object.keys(getSelectedRows()).length > 0 ? style : style + " cursor-not-allowed")}
                onMouseEnter={handleUploadsHover}
                onMouseLeave={handleUploadsNotHover}
            />
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
                        <ModalBody>
                            <p className="c0">{`Are you sure you want to remove ${Object.keys(getSelectedRows()).length} job(s)?`}</p>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={() => {
                                setFileContent('');
                                consentModal.onClose();
                            }} className={cn(uploading ? "rounded-full c3 cursor-not-allowed text-xs bgneg" : "rounded-full c2-5 hover:underline text-xs bgneg")} disabled={uploading}>
                                <p>Cancel</p>
                            </button>
                            <button onClick={() => {
                                handleUpload();
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
                            <p className="c0">{`${uploadErrors.length} Error(s) occurred during uploading.`}</p>
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
                            <a href={"https://about.embloy.com/en/contact"} onClick={() => {
                                handleUpload();
                            }} className="rounded-full c2-5 hover:underline text-xs bgneg">
                                <p>Help</p>
                            </a>
                        </ModalFooter>
                    </>

                </ModalContent>
            </Modal>
        </div>
    );
}
