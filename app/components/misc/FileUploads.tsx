import React, {useContext, useRef, useState} from "react";
import '../../globals.css';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {cn} from "@/lib/utils";
import Image from "next/image";

export function UploadFileButton({formats = ['*'], img, head, style}) {
    const fileInputRef = useRef(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [fileContent, setFileContent] = useState<string>('');
    const [mod, setMod] = useState(false);
    const handleDivClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result as string;
                setFileContent(content);
                onOpen();

            };

            reader.readAsText(file);
        } else {
            console.error('Please select a valid JSON file.');
        }
    };
    const [uploadsIsHovered, setUploadsIsHovered] = useState(false)
    const handleUploadsHover = () => {
        setUploadsIsHovered(true)
    }
    const handleUploadsNotHover = () => {
        setUploadsIsHovered(false)
    }
    return (
        !isOpen ? (
            <div onClick={handleDivClick} className="relative inline-block">
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept={formats.join(',')}
                />
                <Image
                    src={cn(uploadsIsHovered ? "/icons/"+img+"-light.svg" : "/icons/"+img+"-dark.svg")}
                    alt="columns"
                    height="25"
                    width="25"
                    className={style}
                    onMouseEnter={handleUploadsHover}
                    onMouseLeave={handleUploadsNotHover}
                    />
            </div>
        ) : (
            <Modal
                isOpen={isOpen}
                scrollBehavior="inside"
                size="5xl"
                className="select-text cursor-auto"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{head}</ModalHeader>
                            <ModalBody>
                                <pre className="c0">{fileContent}</pre>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        )
    );
}
