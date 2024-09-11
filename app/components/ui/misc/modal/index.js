"use client";
import React, {useState, useEffect, use} from "react";
import '@/app/globals.css'
import {EmbloyH1, EmbloyP} from '@/app/components/ui/misc/text'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@nextui-org/react";
import { EmbloyV } from "@/app/components/ui/misc/stuff";
export const EmbloyModalLinePrinter = ({lines, ...props}) => {
    return (
        <EmbloyV className="rounded-lg dark:border-nebbiolo border-[1px] border-etna bg-body dark:bg-aglianico p-2 gap-2">
            {lines.map((line, index) => (
                <EmbloyP key={index} className="text-xs whitespace-pre-wrap">{line}</EmbloyP>
            ))}
        </EmbloyV>
    );
}

export const EmbloyModal = ({variant="default", children, head, className, isOpen, onOpenChange, ...props}) => {
    return (
        <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        className={`select-text cursor-auto flex items-center justify-center border-[1px] border-etna bg-body dark:bg-chianti rounded-lg dark:border-biferno`}
        size={"3xl"}
        onOpenChange={onOpenChange}
        {...props}
        >
            <ModalContent className="w-full flex flex-col items-center justify-center">
            <>
                <ModalHeader className="flex flex-col gap-1 items-center justify-center">
                    <EmbloyH1 className="text-sm">{head}</EmbloyH1>
                </ModalHeader>
                <ModalBody
                className={"w-full opacity-100 flex items-center justify-center p-2 "} 
                >  
                    {variant === "lineprinter" && (
                        <EmbloyModalLinePrinter lines={children} />
                    )}
                    {variant === "default" && (
                    <EmbloyV className="rounded-lg dark:border-nebbiolo border-[1px] border-etna bg-body dark:bg-aglianico p-2">
                        {children}
                    </EmbloyV>
                    )}
                    
                
                </ModalBody>
                <ModalFooter className="flex items-center justify-center">
                
                </ModalFooter>
            </>
            </ModalContent>
        </Modal>
    );
}

