import React from "react";
import "@/app/globals.css";


import { EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyV} from "@/app/components/ui/misc/stuff";

export function DuplicateJobButton({job_id, external=false, ats, disabled, ...props}) {

    let tip = `Copy Job`;
    if (external) {
        if (ats !== undefined && ats !== null) {
            tip = `Copy ${ats} Job. Note: Duplicate Job will be hosted on Embloy!`;
        } else {
            tip = `Copy Job. Note: Duplicate Job will be hosted on Embloy!`;
        }
      
    }

  return (
    <EmbloyV className="max-w-fit">
      <button
      onClick={() => {
        
      }}>
        <EmbloyToolboxImgAdvanced disabled={disabled} tooltip={tip} path="/icons/svg/black/cp.svg" path_hovered="/icons/svg/capri/cp.svg" path_disabled="/icons/svg/etna/cp.svg" dark_path_disabled="/icons/svg/biferno/cp.svg" dark_path="/icons/svg/amarone/cp.svg" dark_path_hovered="/icons/svg/barbera/cp.svg" height="12" width="12" {...props} />
      </button>
    </EmbloyV>
  
    
  );
}
