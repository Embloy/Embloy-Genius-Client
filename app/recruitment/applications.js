"use client";
import React, { useEffect, useState, useContext, useRef} from "react";
import { EmbloyP, EmbloyH1 } from "@/app/components/ui/misc/text"
import { EmbloyH, EmbloyV } from "@/app/components/ui/misc/stuff";
import { XIcon } from "lucide-react";
import { applicationColumns } from "@/app/recruitment/application_columns";
import { ApplicationDataTable } from "@/app/recruitment/ApplicationDataTable";

export const Applications = ({applications}) => {
    const total_candidates = applications.length;
    const rejected_candidates = applications.filter((app) => app.status === "rejected").length;
    const accepted_candidates = applications.filter((app) => app.status === "accepted").length;
    const pending_candidates = applications.filter((app) => app.status === "pending").length;
    const rate = ((accepted_candidates / total_candidates) * 100).toFixed(1);

    
    const get_by_status = (status) => {
        return applications.filter((app) => app.status === status);

    }

    const [showMetric, setShowMetric] = useState(false);
    const [metric, setMetric] = useState(null);
    const [name, setName] = useState("");
    const handle_metric = (applications, name) => {
        setName(name);
        if (showMetric) {
            if (metric !== applications) {
                setMetric(applications);
            }
        } else {
            setMetric(applications);
            setShowMetric(true);
        }
        
    }
    const handle_close = () => {
        setShowMetric(false)
        setMetric(null)
    }

    useEffect(() => {
        handle_metric(get_by_status("pending"), "pending");
    }, [applications])

    useEffect(() => {
        console.log("NAME", name)
    }, [name])
    
    return (
        <EmbloyV>
            <EmbloyH className={"justify-start"}>
                <EmbloyH1 className="text-sm">Application Overview</EmbloyH1>
              </EmbloyH>
            <EmbloyH className={"gap-2"}>
                
                <EmbloyV className="border border-etna dark:border-nebbiolo p-1.5 gap-px rounded-md max-w-fit">
                    <EmbloyP className={"text-xs flex"}>
                        Total Candidates
                    </EmbloyP>
                    <EmbloyH className={"justify-center"}>
                        <button 
                            onClick={() => {handle_metric(applications, "total")}}
                            className={`rounded-lg px-2 flex items-center justify-center transition-colors duration-200 ${name === "total" ? "bg-capri/10 text-capri dark:text-capri dark:bg-capri/10" : "text-black hover:text-capri dark:text-white dark:hover:text-capri bg-white hover:bg-capri/10 dark:bg-aglianico dark:hover:bg-capri/10"}`}
                        >
                            <EmbloyP className="font-heading text-lg text-center text-inherit dark:text-inherit">
                                {total_candidates}
                            </EmbloyP>
                        </button>
                    </EmbloyH>
                </EmbloyV>



                <EmbloyV className="border border-etna dark:border-nebbiolo p-1.5 gap-px rounded-md max-w-fit">
                    <EmbloyH className={"justify-center items-center gap-1.5"}>
                        <EmbloyP className={"text-xs"}>
                            {"Rejected"}
                        </EmbloyP>
                        
                        <EmbloyP className={"text-xs "}>
                            {"Pending"}
                        </EmbloyP>
                        
                        <EmbloyP className={"text-xs "}>
                            {"Accepted"}
                        </EmbloyP>
                    </EmbloyH>
                    <EmbloyH className={"justify-center items-center gap-px"}>
                        <button 
                            onClick={() => {handle_metric(get_by_status("rejected"), "rejected")}}
                            className={`rounded-lg px-2 flex items-center justify-center transition-colors duration-200 ${name === "rejected" ? "bg-primitivo/10 text-primitivo dark:text-primitivo dark:bg-primitivo/10" : "text-black hover:text-primitivo dark:text-white dark:hover:text-primitivo bg-white hover:bg-primitivo/10 dark:bg-aglianico dark:hover:bg-primitivo/10"}`}
                        >
                            <EmbloyP className="font-heading text-lg text-center text-inherit dark:text-inherit">
                                {rejected_candidates}
                            </EmbloyP>
                        </button>
                        <div className="h-3 w-px bg-etna dark:bg-nebbiolo rounded-full"/>
                        <button 
                            onClick={() => {handle_metric(get_by_status("pending"), "pending")}}
                            className={`rounded-lg px-2 flex items-center justify-center transition-colors duration-200 ${name === "pending" ? "bg-capri/10 text-capri dark:text-capri dark:bg-capri/10" : "text-black hover:text-capri dark:text-white dark:hover:text-capri bg-white hover:bg-capri/10 dark:bg-aglianico dark:hover:bg-capri/10"}`}
                        >
                            <EmbloyP className="font-heading text-lg text-center text-inherit dark:text-inherit">
                                {pending_candidates}
                            </EmbloyP>
                        </button>
                        <div className="h-3 w-px bg-etna dark:bg-nebbiolo rounded-full"/>
                        <button 
                            onClick={() => {handle_metric(get_by_status("accepted"), "accepted")}}
                            className={`rounded-lg px-2 flex items-center justify-center transition-colors duration-200 ${name === "accepted" ? "bg-lugana/10 text-lugana dark:text-lugana" : "text-black hover:text-lugana dark:text-white dark:hover:text-lugana bg-white hover:bg-lugana/10 dark:bg-aglianico dark:hover:bg-lugana/10"}`}
                        >
                            <EmbloyP className="font-heading text-lg text-center text-inherit dark:text-inherit">
                                {accepted_candidates}
                            </EmbloyP>
                        </button>
                    </EmbloyH>
                </EmbloyV>

                <EmbloyV className="border border-etna dark:border-nebbiolo p-1.5 gap-px rounded-md max-w-fit">
                    <EmbloyP className={"text-xs flex"}>
                        Candidate to Offer Rate
                    </EmbloyP>
                    <EmbloyH className={"justify-center"}>
                        <EmbloyP className="text-black dark:text-white font-heading text-lg text-center">
                            {rate}%
                        </EmbloyP>
                    </EmbloyH>
                </EmbloyV>

                <EmbloyV className="border border-etna dark:border-nebbiolo gap-px rounded-md w-full">
                    <EmbloyH className="justify-between p-1.5">
                        <EmbloyP className={"text-xs flex"}>
                            Overview
                        </EmbloyP>
                            {showMetric &&
                                <button 
                                    onClick={() => {handle_close()}}
                                >
                                    <XIcon className="w-3 h-3 text-black dark:text-white"/>
                                </button>
                            }
                    </EmbloyH>

                    {!showMetric && 
                        <EmbloyH className={"justify-center"}>
                            <EmbloyP className="text-testaccio dark:text-nebbiolo font-heading text-lg text-center">
                                No metric selected
                            </EmbloyP>
                        </EmbloyH>
                    }
                    {showMetric && 
                        <EmbloyH className={"justify-center"}>
                            <ApplicationDataTable
                                columns={applicationColumns}
                                data={metric}
                                handleDataReload={() => {}}
                            />
                            
                        </EmbloyH>
                    }
                </EmbloyV>



            </EmbloyH>
        </EmbloyV>
    )   
}
