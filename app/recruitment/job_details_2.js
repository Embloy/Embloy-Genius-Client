"use client";
import React, { useEffect, useState, useContext, useRef} from "react";
import { EmbloyH1Editable, EmbloyP } from "@/app/components/ui/misc/text"
import { EmbloyChildrenAdvanced, EmbloyH, EmbloyV } from "@/app/components/ui/misc/stuff";
import { XIcon } from "lucide-react";
import { applicationColumns } from "@/app/recruitment/application_columns";
import { ApplicationDataTable } from "@/app/recruitment/ApplicationDataTable";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export const JobDetails2 = ({job, handleDataReload, onChange, editable}) => {
    const [details, setDetails] = useState(job);

    const handle_change = (e, field) => {
        setDetails({...details, [field]: e.target.value});
    }

    useEffect (() => {
        console.log("DETAILS", details.title)
    }, [details])
    
    
    return (
        <EmbloyV>
            <EmbloyV className="border border-etna dark:border-nebbiolo p-1.5 gap-px rounded-md ">
                <EmbloyH className={"gap-2"}>
                    <EmbloyH className={"gap-1.5 "}>
                        <EmbloyChildrenAdvanced html={true} tooltip={
                            <EmbloyV className="w-52 gap-1.5 px-2 py-0.5 bg-white border border-etna rounded-md dark:bg-ciliegiolo dark:border-biferno">
                                <EmbloyP className={"text-xs font-semibold"}> Job Post Title</EmbloyP> 
                                <EmbloyP className={"italic text-xs text-testaccio dark:text-nebbiolo"}>May differ from the Job Position e.g.</EmbloyP> 
                                <ul className="list-disc ml-4">
                                    <li className="text-testaccio dark:text-nebbiolo marker:text-testaccio marker:dark:text-nebbiolo"><EmbloyP className={"italic text-xs text-inherit dark:text-inherit"}>Title: Lead Developer for iOS Team</EmbloyP></li>
                                    <li className="text-testaccio dark:text-nebbiolo marker:text-testaccio marker:dark:text-nebbiolo"><EmbloyP className={"italic text-xs text-inherit dark:text-inherit"}>Position: Senior Software Engineer</EmbloyP></li>
                                </ul>
                            </EmbloyV>
                        }>
                            <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Title:</EmbloyP>
                        </EmbloyChildrenAdvanced>
                        <EmbloyH1Editable className="text-xs font-normal w-36" initialText={details.title} placeholder="Job Title" onUpdate={(value) => {setDetails({...details, "title": value})}} />
                    </EmbloyH>
                </EmbloyH>
            </EmbloyV>
        </EmbloyV>
    )   
}
