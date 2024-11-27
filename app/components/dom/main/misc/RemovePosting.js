import React from "react";
import "@/app/globals.css";


import { EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyV} from "@/app/components/ui/misc/stuff";

export function RemovePosting({ head, jobId }) {


  return (
    <EmbloyV className={undefined}>
      <button
      onClick={() => {
        
      }}>
        <EmbloyToolboxImgAdvanced tooltip={"Remove Posting"} path="/icons/svg/black/bin.svg" path_hovered="/icons/svg/capri/bin.svg" dark_path="/icons/svg/amarone/bin.svg" dark_path_hovered="/icons/svg/barbera/bin.svg" height="12" width="12" />
      </button>
    </EmbloyV>
  
    
  );
}
