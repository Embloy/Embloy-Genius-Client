import React, {useEffect, useState} from "react";
import '@/app/globals.css'
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle} from "@/app/components/ui/misc/stuff";
import Note from "@/app/components/ui/misc/note";
import { EmbloyH1, EmbloyP } from "@/app/components/ui/misc/text";
import { IntegrationSync } from "@/app/components/dom/main/misc/IntegrationSync";
import { ResetWebhook } from "@/app/components/dom/main/misc/ResetWebhook";

function IntegrationElement({name, description, doc_link}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isActivated, setIsActivated] = useState(false);
    return (
        <EmbloyV className={"bg-chianti border border-biferno text-white rounded-lg p-4"}>
            <EmbloyH className={"items-center justify-between"}>
                <EmbloyH className={"items-center gap-2"}>
                    <EmbloyH1 className={"text-sm"}>{name}</EmbloyH1>
                    <div className="h-5 w-[1px] dark:bg-nebbiolo "/>
                    <EmbloyP className={"text-sm"}>{description}</EmbloyP>
                </EmbloyH>
                <EmbloyH className={"items-center justify-end gap-2"}>
                    <EmbloyToolbox superClassName="h-7 border-2 dark:border-nebbiolo dark:bg-nebbiolo" className={undefined} name={undefined} >
                        <IntegrationSync key="Sync" name={name} />
                        <ResetWebhook key="Reset" name={name} />
                        <EmbloyToolboxImgA tooltip={`Help`} href={doc_link} height="12" width="12" path="/icons/svg/black/ask.svg" path_hovered="/icons/svg/leidoveneta/ask.svg" dark_path="/icons/svg/amarone/ask.svg" dark_path_hovered="/icons/svg/barbera/ask.svg" target="_blank" />
                    </EmbloyToolbox>
                    <EmbloyToggle className="h-7" />

                </EmbloyH>
            </EmbloyH>
        </EmbloyV> 
    );
}
export function IntegrationControl({}) {
    return (
        <EmbloyV className={"gap-2 border-t dark:border-biferno pt-2"}>
            <EmbloyH className={"items-center justify-between"}>
                <EmbloyH1 className={"text-lg"}>Available Integrations</EmbloyH1>
            </EmbloyH>
            <EmbloyV className={"gap-2"}>
                <EmbloyV className={"gap-2"}>
                    <IntegrationElement name={"Lever"} description={"Use Embloy with Lever's recruiting software."} doc_link="https://developers.embloy.com/docs/guides/get-started-integrations-lever" />
                </EmbloyV>
            </EmbloyV>
        </EmbloyV> 
    );
}