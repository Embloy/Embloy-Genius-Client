"use client";
import React, { useEffect, useState, useContext, useRef} from "react";
import { EmbloyH1Editable, EmbloyP } from "@/app/components/ui/misc/text"
import { EmbloyChildrenAdvanced, EmbloyH, EmbloyV } from "@/app/components/ui/misc/stuff";
import { XIcon } from "lucide-react";
import { applicationColumns } from "@/app/recruitment/application_columns";
import { ApplicationDataTable } from "@/app/recruitment/ApplicationDataTable";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { EmbloyInput, EmbloySelectOption } from "@/app/components/ui/misc/input";

export const JobDetails2 = ({job, handleDataReload, onChange, editable}) => {
    const [details, setDetails] = useState(job);

    const handle_change = (e, field) => {
        setDetails({...details, [field]: e.target.value});
    }

    useEffect (() => {
        console.log("DETAILS", details.job_type)
    }, [details])

    console.log("type", details.job_type)

    const areas = [
        {value: "Software Development", label: "Software Development"},
        {value: "Accounting", label: "Accounting"},
        {value: "Presales", label: "Presales"},
        {value: "Food", label: "Food"},
    ]
    
    return (
        <EmbloyV>
            <EmbloyV className="border border-etna dark:border-nebbiolo p-1.5 gap-px rounded-md ">
                <EmbloyH className={"gap-2"}>
                    <EmbloyH className={"gap-1.5 max-w-fit"}>
                        <EmbloyChildrenAdvanced html={true} tooltip={
                            <EmbloyV className="w-52 gap-1.5 p-2 bg-white border border-etna rounded-md dark:bg-ciliegiolo dark:border-biferno">
                                <EmbloyH className="gap-1.5 items-center">
                                    <InfoCircledIcon className="w-4 h-4 text-capri dark:text-capri" />
                                    <EmbloyP className={"text-xs font-semibold"}>Job Post Title</EmbloyP> 
                                </EmbloyH>
                                <EmbloyP className={"max-w-52 italic text-xs text-testaccio dark:text-nebbiolo"}>May differ from the Job Position e.g.</EmbloyP> 
                                <ul className="list-disc ml-4 max-w-52">
                                    <li className="text-testaccio dark:text-nebbiolo marker:text-testaccio marker:dark:text-nebbiolo"><EmbloyP className={"italic text-xs text-inherit dark:text-inherit"}>Title: Lead Developer for iOS Team</EmbloyP></li>
                                    <li className="text-testaccio dark:text-nebbiolo marker:text-testaccio marker:dark:text-nebbiolo"><EmbloyP className={"italic text-xs text-inherit dark:text-inherit"}>Position: Senior Software Engineer</EmbloyP></li>
                                </ul>
                            </EmbloyV>
                        }>
                            <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Title:</EmbloyP>
                        </EmbloyChildrenAdvanced>
                        <EmbloyH1Editable className="text-xs font-normal w-36" initialText={details.title} placeholder="Job Title" onUpdate={(value) => {setDetails({...details, "title": value})}} />
                    </EmbloyH>
                    <EmbloyH className={"gap-1.5 max-w-fit"}>
                        <EmbloyChildrenAdvanced html={true} tooltip={
                            <EmbloyV className="w-52 gap-1.5 p-2 bg-white border border-etna rounded-md dark:bg-ciliegiolo dark:border-biferno">
                                <EmbloyH className="gap-1.5 items-center">
                                    <InfoCircledIcon className="w-4 h-4 text-capri dark:text-capri" />
                                    <EmbloyP className={"text-xs font-semibold"}>Job Area</EmbloyP> 
                                </EmbloyH>
                                <EmbloyP className={"max-w-52 italic text-xs text-testaccio dark:text-nebbiolo break-words"}>A broad category or specialization of work, it could also be the Department, Team, or Branch e.g.</EmbloyP> 
                                <ul className="list-disc ml-4 max-w-52">
                                    <li className="text-testaccio dark:text-nebbiolo marker:text-testaccio marker:dark:text-nebbiolo"><EmbloyP className={"italic text-xs text-inherit dark:text-inherit"}>Software Development</EmbloyP></li>
                                    <li className="text-testaccio dark:text-nebbiolo marker:text-testaccio marker:dark:text-nebbiolo"><EmbloyP className={"italic text-xs text-inherit dark:text-inherit"}>Accounting</EmbloyP></li>
                                    <li className="text-testaccio dark:text-nebbiolo marker:text-testaccio marker:dark:text-nebbiolo"><EmbloyP className={"italic text-xs text-inherit dark:text-inherit"}>Presales</EmbloyP></li>
                                    <li className="text-testaccio dark:text-nebbiolo marker:text-testaccio marker:dark:text-nebbiolo"><EmbloyP className={"italic text-xs text-inherit dark:text-inherit"}>...</EmbloyP></li>
                                </ul>
                            </EmbloyV>
                        }>
                            <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Area:</EmbloyP>
                        </EmbloyChildrenAdvanced>
                        
                        <EmbloyInput
                            variant="select-light"
                            onChange={(e) => setDetails({...details, "job_type": e.target.value})}
                            value={details.job_type || ""}
                            className={`w-52 text-xs ${(details.job_type && details.job_type !== "") ? "text-black dark:text-white" : "text-testaccio dark:text-nebbiolo"}`}
                        >
                            <EmbloySelectOption placeholder={true}>
                                <label className="text-xs text-black dark:text-white">Select Job Area</label>
                            </EmbloySelectOption>
                            {areas.map((area, index) => {
                                return <EmbloySelectOption key={index} value={area.value}  >
                                            <label className="text-xs text-black dark:text-white">{area.label}</label>
                                        </EmbloySelectOption>
                                    })}
                        </EmbloyInput>
                        {details.job_type !== job.job_type && 
                            <button className="hover:bg-primitivo/10 dark:hover:bg-primitivo/10 rounded-sm transition-colors duration-200" onClick={() => {setDetails({...details, "job_type": null})}}>
                                <XIcon className="w-4 h-4 text-primitivo dark:text-primitivo" />
                            </button>
                        }
                    </EmbloyH>
                </EmbloyH>
            </EmbloyV>
        </EmbloyV>
    )   
}
