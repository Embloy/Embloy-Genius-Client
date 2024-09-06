import React from "react";
import "@/app/globals.css";


import { EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyV} from "@/app/components/ui/misc/stuff";

export function IntegrationSync({name, ...props}) {


  return (
    <EmbloyV className="max-w-fit">
      <button
      onClick={() => {
        
      }}>
        <EmbloyToolboxImgAdvanced tooltip={`Synchronize with ${name}`} path="/icons/svg/black/sync.svg" path_hovered="/icons/svg/leidoveneta/sync.svg" dark_path="/icons/svg/amarone/sync.svg" dark_path_hovered="/icons/svg/barbera/sync.svg" height="12" width="12" {...props} />
      </button>
    </EmbloyV>
  
    
  );
}
