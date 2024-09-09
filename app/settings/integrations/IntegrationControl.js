"use client";
import React, {useState, useCallback, useEffect, use} from "react";
import '@/app/globals.css'
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgButton, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle} from "@/app/components/ui/misc/stuff";
import { EmbloyH1, EmbloyP } from "@/app/components/ui/misc/text";
import { 
    connect as leverConnect, 
    disconnect as leverDisconnect, 
    sync as leverSync, 
    reset as leverReset ,
    verify as leverVerify
} from "@/app/settings/integrations/lever";

function IntegrationElement({name, activeIntegrations, description, doc_link, onConnect, onDisconnect, onSync, onReset, onVerify, onReload}) {
    const [isError, setError] = useState(null);
    const [status, setStatus] = useState("inactive");

    const force = (status) => {
        setStatus(status);
    };

    const handleToggleChange = (newState) => {
        if (status === "inactive" && newState === true) {
            try {
                force("connect");
                onConnect();
                setError(null);
            } catch (error) {
                setError("Error connecting to " + name);
                force("inactive");
            } 
            onReload();
        } else if (status === "active" && newState === false) {
            try {
                force("disconnect");
                onDisconnect(activeIntegrations);
                setError(null);
                onReload();
            } catch (error) {
                setError("Error disconnecting from " + name);
                force("active");
            }
        }
      };

    useEffect(() => {
        if (onVerify(activeIntegrations) === true) {
            force("active");
        }
    }, [activeIntegrations]);

   

    return (
        <EmbloyV className={"bg-transparent dark:bg-chianti border border-etna dark:border-biferno text-white rounded-lg p-4"}>
            <EmbloyH className={"items-center justify-between"}>
                <EmbloyH className={"items-center gap-2"}>
                    <EmbloyH1 className={"text-sm"}>{name}</EmbloyH1>
                    <div className="h-5 w-[1px] dark:bg-nebbiolo "/>
                    <EmbloyP className={"text-sm"}>{description}</EmbloyP>
                </EmbloyH>
                <EmbloyH className={"items-center justify-end gap-2"}>
                    {(isError !== null) && <EmbloyP className={"text-xs text-red-500 dark:text-red-500"}>{isError}</EmbloyP>}
                    {(status === "connect") && <EmbloyP className={"text-xs text-yellow-500 dark:text-yellow-500"}>Connecting...</EmbloyP>}
                    {(status === "disconnect") && <EmbloyP className={"text-xs text-yellow-500 dark:text-yellow-500"}>Disconnecting...</EmbloyP>}
                    <EmbloyToolbox superClassName="h-7 border-2 dark:border-nebbiolo dark:bg-nebbiolo" className={undefined} name={undefined} >
                        {/*<IntegrationSync key="Sync" name={name} disabled={!isRequested} />
                        <ResetWebhook key="Reset" name={name} disabled={!isRequested}/>*/}
                        <EmbloyToolboxImgButton 
                            disabled={status !== "active"}
                            onClick={onSync} 
                            tooltip={`Synchronize with ${name}`} 
                            path="/icons/svg/black/sync.svg" 
                            path_hovered="/icons/svg/leidoveneta/sync.svg" 
                            path_disabled="/icons/svg/etna/sync.svg" 
                            dark_path="/icons/svg/amarone/sync.svg" 
                            dark_path_hovered="/icons/svg/barbera/sync.svg" 
                            dark_path_disabled="/icons/svg/biferno/sync.svg" 
                            height="12" width="12" 
                        />
                        <EmbloyToolboxImgButton 
                            disabled={status !== "active"}
                            onClick={onReset} 
                            tooltip={`Reset ${name} Webhooks`} 
                            path="/icons/svg/black/whk.svg" 
                            path_hovered="/icons/svg/leidoveneta/whk.svg" 
                            path_disabled="/icons/svg/etna/whk.svg" 
                            dark_path="/icons/svg/amarone/whk.svg" 
                            dark_path_hovered="/icons/svg/barbera/whk.svg" 
                            dark_path_disabled="/icons/svg/biferno/whk.svg"  
                            height="12" width="12"  
                        />
                        <EmbloyToolboxImgA tooltip={`Help`} href={doc_link} height="12" width="12" path="/icons/svg/black/ask.svg" path_hovered="/icons/svg/leidoveneta/ask.svg" dark_path="/icons/svg/amarone/ask.svg" dark_path_hovered="/icons/svg/barbera/ask.svg" target="_blank" />
                    </EmbloyToolbox>
                    <EmbloyToggle 
                        forceStatus={status} 
                        unlock={`
                            ${(status === "active" && true) 
                            || (status !== "active" && false)}
                        `} 
                        className="h-7" 
                        tooltip={`
                            ${(status === "active") && "Disconnect Embloy from " + name
                            || (status === "inactive") && "Connect Embloy to " + name
                            || (status === "connect" || status === "disconnect") && "Pending..."}
                        `} onChange={handleToggleChange} 
                    />
                </EmbloyH>
            </EmbloyH>
        </EmbloyV> 
    );
}
export function IntegrationControl({activeIntegrations, onReload}) {
    
    return (
        <EmbloyV className={"gap-2 border-t dark:border-biferno pt-2"}>
            <EmbloyH className={"items-center justify-between"}>
                <EmbloyH1 className={"text-lg"}>Integration Center</EmbloyH1>
            </EmbloyH>
            <EmbloyV className={"gap-2"}>
                <EmbloyV className={"gap-2"}>
                    <IntegrationElement name="Lever" activeIntegrations={activeIntegrations} description={"Use Embloy with Lever's recruiting software."} doc_link="https://developers.embloy.com/docs/guides/get-started-integrations-lever" onConnect={leverConnect} onDisconnect={leverDisconnect} onSync={leverSync} onReset={leverReset} onVerify={leverVerify} onReload={onReload}/>
                </EmbloyV>
            </EmbloyV>
        </EmbloyV> 
    );
}