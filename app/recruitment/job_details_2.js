"use client";
import React, { useEffect, useState, useContext, useRef} from "react";
import { EmbloyH1Editable, EmbloyP, EmbloyH1 } from "@/app/components/ui/misc/text"
import { EmbloyChildrenAdvanced, EmbloyH, EmbloyV } from "@/app/components/ui/misc/stuff";
import { XIcon } from "lucide-react";
import { applicationColumns } from "@/app/recruitment/application_columns";
import { ApplicationDataTable } from "@/app/recruitment/ApplicationDataTable";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { EmbloyInput, EmbloySelectOption } from "@/app/components/ui/misc/input";
import { not_core_get } from "@/lib/api/core";
import { country_codes, job_areas } from "@/lib/types/stuff";

export const JobDetails2 = ({job, handleDataReload, onChange, editable}) => {
    const [details, setDetails] = useState(job);
    const [locationStatus, setLocationStatus] = useState(false);
    const [location, setLocation] = useState({city: job.city, address: job.address, postal_code: job.postal_code, country_code: job.country_code});
    const location_not_null = location.city || location.address || location.postal_code || location.country_code;
    useEffect(() => {
        if (location.country_code === "XX") {
            setLocation({...location, "city": null, "address": null, "postal_code": null});
        }
    }, [location.country_code]);

    const handle_change = (e, field) => {
        setDetails({...details, [field]: e.target.value});
    }

    const location_text = () => {
        let string = "";
        if (location.address && location.address !== "") {
            string += location.address + ", ";
        }
        if (location.postal_code && location.postal_code !== "") {
            string += location.postal_code + ", ";
        }
        if (location.city && location.city !== "") {
            string += location.city + ", ";
        }
        if (location.country_code && location.country_code !== "") {
            if (location.country_code === "XX") {
                string += "Remote";
            } else {
                string += location.country_code;
            }
        }
        if (string.endsWith(", ")) {
            string = string.slice(0, -2);
        }
        if (string === "") {
            string = null;
        }
        return string;
    }



    

    const handleSave = async (key, value) => {
        if (key !== null && key !== undefined && key.trim() !== "" && job[key] !== undefined && value !== undefined && value !== details[key]) {
            try {
                await not_core_get("PATCH", `/jobs/${job.id}`, {[key]: value});
                handleDataReload();
                setDetails({...details, [key]: value});
            } catch (e) {
                setDetails({...details, [key]: job[key]});
            }
        } 
    }

    const handleLocationSave = async () => {
        if (location.city !== details.city) {
            try {
                await not_core_get("PATCH", `/jobs/${job.id}`, {"city": location.city});
                handleDataReload();
                setDetails({...details, "city": location.city});
            } catch (e) {
                setDetails({...details, "city": job.city});
                setLocation({...location, "city": job.city});
            }
        }

        if (location.address !== details.address) {
            try {
                await not_core_get("PATCH", `/jobs/${job.id}`, {"address": location.address});
                handleDataReload();
                setDetails({...details, "address": location.address});
            } catch (e) {
                setDetails({...details, "address": job.address});
                setLocation({...location, "address": job.address});
            }
        }

        if (location.postal_code !== details.postal_code) {
            try {
                await not_core_get("PATCH", `/jobs/${job.id}`, {"postal_code": location.postal_code});
                handleDataReload();
                setDetails({...details, "postal_code": location.postal_code});
            } catch (e) {
                setDetails({...details, "postal_code": job.postal_code});
                setLocation({...location, "postal_code": job.postal_code});
            }
        }
        if (location.country_code !== details.country_code) {
            try {
                await not_core_get("PATCH", `/jobs/${job.id}`, {"country_code": location.country_code});
                handleDataReload();
                setDetails({...details, "country_code": location.country_code});
            } catch (e) {
                setDetails({...details, "country_code": job.country_code});
                setLocation({...location, "country_code": job.country_code});
            }
        }
        setLocationStatus(false);
        
    }
    
    return (
        <EmbloyV>
            <EmbloyH className={"justify-start"}>
                <EmbloyH1 className="text-sm">Details</EmbloyH1>
            </EmbloyH>
            <EmbloyV className="border border-etna dark:border-nebbiolo p-1.5 gap-px rounded-md ">
                <EmbloyH className={"gap-2"}>
                    { (editable || (!editable && job.position && job.position !== "")) &&
                        <EmbloyH className={"gap-1.5 max-w-fit"}>
                            <EmbloyChildrenAdvanced html={true} tooltip={
                                <EmbloyV className="w-52 gap-1.5 p-2">
                                    <EmbloyH className="gap-1.5 items-center">
                                        <InfoCircledIcon className="w-4 h-4 text-capri dark:text-capri" />
                                        <EmbloyP className={"text-xs font-semibold underline"}>Job Position</EmbloyP> 
                                    </EmbloyH>
                                    <EmbloyP className={"max-w-52 italic text-xs"}>Level of the Job. May differ from the Job Title e.g.</EmbloyP> 
                                    <ul className="list-disc ml-4 max-w-52">
                                        <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Title: Lead Developer for iOS Team</EmbloyP></li>
                                        <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Position: Senior Software Engineer</EmbloyP></li>
                                    </ul>
                                </EmbloyV>
                            }>
                                <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Position:</EmbloyP>
                            </EmbloyChildrenAdvanced>
                            {editable ? 
                                <EmbloyH1Editable className="text-xs font-normal w-36" maxLength="100" initialText={details.position !== null ? details.position : ""} placeholder="Job Position" onUpdate={(value) => {
                                    handleSave("position", value)
                                }} keydown={(e) => {handleSave("position", e)}} /> 
                                : 
                                <EmbloyH1 className="text-xs font-normal max-w-fit">{details.position}</EmbloyH1>
                            }
                    </EmbloyH>
                    }
                    { (editable || (!editable && job.job_type && job.job_type !== "")) &&
                        <EmbloyH className={"gap-1.5 max-w-60"}>
                            <EmbloyChildrenAdvanced html={true} tooltip={
                                <EmbloyV className="w-52 gap-1.5 p-2">
                                    <EmbloyH className="gap-1.5 items-center">
                                        <InfoCircledIcon className="w-4 h-4 text-capri dark:text-capri" />
                                        <EmbloyP className={"text-xs font-semibold underline"}>Job Area</EmbloyP> 
                                    </EmbloyH>
                                    <EmbloyP className={"max-w-52 italic text-xs break-words"}>A broad category or specialization of work, it could also be the Department, Team, or Branch e.g.</EmbloyP> 
                                    <ul className="list-disc ml-4 max-w-52">
                                        <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Software Development</EmbloyP></li>
                                        <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Back Office</EmbloyP></li>
                                        <li className="marker:text-black marker:dark:text-white"><EmbloyP className={"italic text-xs"}>Gaming & Entertainment</EmbloyP></li>
                                    </ul>
                                </EmbloyV>
                            }>
                                <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Area:</EmbloyP>
                            </EmbloyChildrenAdvanced>
                            { editable ?
                                <>
                                    <EmbloyInput
                                        variant="select-light"
                                        onChange={(e) => handleSave("job_type", e.target.value)}
                                        value={details.job_type !== null ? details.job_type : ""}
                                        className={`w-52 text-xs ${(details.job_type && details.job_type !== "") ? "text-black dark:text-white" : "text-testaccio dark:text-nebbiolo"}`}
                                    >
                                        <EmbloySelectOption placeholder={true} className="text-xs text-black dark:text-white">
                                            Select Job Area
                                        </EmbloySelectOption>
                                        {job_areas.map((area, index) => {
                                            return <EmbloySelectOption key={index} value={area.value} className={"max-w-52 text-xs text-black dark:text-white"} >
                                                        {area.label}
                                                    </EmbloySelectOption>
                                                })}
                                    </EmbloyInput>
                                    {details.job_type !== null && 
                                        <button className="hover:bg-primitivo/10 dark:hover:bg-primitivo/10 rounded-sm transition-colors duration-200" onClick={() => {handleSave("job_type", null)}}>
                                            <XIcon className="w-4 h-4 text-primitivo dark:text-primitivo" />
                                        </button>
                                    }
                                </>
                                :
                                <EmbloyH1 className="text-xs font-normal max-w-fit">{job_areas.find(area => area.value === details.job_type).label}</EmbloyH1>
                            }
                        </EmbloyH>
                    }
                    { (editable || (!editable && location_not_null)) &&
                        <EmbloyH className={"gap-1.5"}>
                            <EmbloyChildrenAdvanced html={true} tooltip={
                                <EmbloyV className="w-52 gap-1.5 p-2">
                                    <EmbloyH className="gap-1.5 items-center">
                                        <InfoCircledIcon className="w-4 h-4 text-capri dark:text-capri" />
                                        <EmbloyP className={"text-xs font-semibold underline"}>Job Location</EmbloyP> 
                                    </EmbloyH>
                                    <EmbloyP className={"max-w-52 italic text-xs"}>Geographical location of the Job Position. Remote, Hybrid, or On-Site options available.</EmbloyP> 
                                </EmbloyV>
                            }>
                                <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Location:</EmbloyP>
                            </EmbloyChildrenAdvanced>
                                { editable ?
                                    <>
                                        {!locationStatus && <EmbloyH1Editable block={true} onClick={() => {setLocationStatus(!locationStatus)}} className="text-xs font-normal" initialText={location_text || ""} placeholder="Add Location" onUpdate={() => {}} />}
                                        {locationStatus && 
                                            <EmbloyH className="gap-4 justify-between items-center w-full">
                                                <EmbloyH className="gap-0.5 items-center max-w-fit">
                                                    <input maxLength="150" className="w-24 h-4 text-xs text-black dark:text-white" placeholder="Address" value={location.address || ""} onChange={(e) => setLocation({...location, "address": e.target.value})} />
                                                    <div className="w-[1px] h-4 bg-etna dark:bg-nebbiolo" />
                                                    <input maxLength="45" className="w-24 h-4 text-xs text-black dark:text-white" placeholder="Postal Code" value={location.postal_code || ""} onChange={(e) => setLocation({...location, "postal_code": e.target.value})} />
                                                    <div className="w-[1px] h-4 bg-etna dark:bg-nebbiolo" />
                                                    <input maxLength="45" className="w-24 h-4 text-xs text-black dark:text-white" placeholder="City" value={location.city || ""} onChange={(e) => setLocation({...location, "city": e.target.value})} />
                                                    <div className="w-[1px] h-4 bg-etna dark:bg-nebbiolo" />
                                                    <EmbloyH className="max-w-28 gap-1.5">
                                                        <EmbloyInput
                                                            variant="select-light"
                                                            onChange={(e) => setLocation({...location, "country_code": e.target.value})}
                                                            value={location.country_code || ""}
                                                            className={`w-52 text-xs ${(location.country_code && location.country_code !== "") ? "text-black dark:text-white" : "text-testaccio dark:text-nebbiolo"}`}
                                                        >
                                                            <EmbloySelectOption placeholder={true} className="text-xs text-black dark:text-white">
                                                                Country
                                                            </EmbloySelectOption>
                                                            {country_codes.map((area, index) => {
                                                                return <EmbloySelectOption key={index} value={area.value} className={"max-w-52 text-xs text-black dark:text-white"} >
                                                                            {area.label}
                                                                        </EmbloySelectOption>
                                                                    })}
                                                        </EmbloyInput>
                                                        {location.country_code && 
                                                            <button className="hover:bg-primitivo/10 dark:hover:bg-primitivo/10 rounded-sm transition-colors duration-200" onClick={() => {setLocation({...location, "country_code": null})}}>
                                                                <XIcon className="w-4 h-4 text-primitivo dark:text-primitivo" />
                                                            </button>
                                                        }
                                                    </EmbloyH>
                                                    <div className="w-[1px] h-4 bg-etna dark:bg-nebbiolo" />
                                                </EmbloyH>
                                                <button className="hover:bg-capri/10 dark:hover:bg-capri/10 rounded-md px-1 transition-colors duration-200" onClick={() => {handleLocationSave()}}>
                                                    <EmbloyP className="text-xs text-capri dark:text-capri">Save Location</EmbloyP>
                                                </button>
                                            </EmbloyH>
                                        }
                                    </>
                                    :
                                    <EmbloyH1 className="text-xs font-normal max-w-fit">{location_text()}</EmbloyH1>
                                }
                        </EmbloyH>
                    }
                </EmbloyH>
            </EmbloyV>
        </EmbloyV>
    )   
}
