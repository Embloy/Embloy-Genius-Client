import React from "react";
import "@/app/globals.css";


import { EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyV} from "@/app/components/ui/misc/stuff";

export function ResetWebhook({name, ...props}) {


  return (
    <EmbloyV className="max-w-fit">
      <button
      onClick={() => {
        
      }}>
        <EmbloyToolboxImgAdvanced tooltip={`Reset ${name} Webhooks`} path="/icons/svg/black/whk.svg" path_hovered="/icons/svg/leidoveneta/whk.svg" dark_path="/icons/svg/amarone/whk.svg" dark_path_hovered="/icons/svg/barbera/whk.svg" height="12" width="12" {...props} />
      </button>
    </EmbloyV>
  
    
  );
}
