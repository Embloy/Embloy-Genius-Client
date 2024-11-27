import React from "react";
import "@/app/globals.css";


import { EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyV} from "@/app/components/ui/misc/stuff";

export function IntegrationSync({name, disabled, ...props}) {


  return (
    <EmbloyV className="max-w-fit">
      <button
      onClick={() => {
        
      }}>
        <EmbloyToolboxImgAdvanced disabled={disabled} tooltip={`Synchronize ${name}`} path="/icons/svg/black/sync.svg" path_hovered="/icons/svg/capri/sync.svg" path_disabled="/icons/svg/etna/sync.svg" dark_path_disabled="/icons/svg/nebbiolo/sync.svg" dark_path="/icons/svg/amarone/sync.svg" dark_path_hovered="/icons/svg/barbera/sync.svg" height="12" width="12" {...props} />
      </button>
    </EmbloyV>
  
    
  );
}
