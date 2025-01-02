import React from "react";
import "@/app/globals.css";


import { EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyV} from "@/app/components/ui/misc/stuff";
import { not_core_get } from "@/lib/api/core";

export function RemovePosting({ head, jobId, onChange, disabled=false}) {

  const handleRemove = async () => {
    if (!disabled) {
      const body = {
        "job_status": "archived"
      }
      try {
        const res = await not_core_get("PATCH", `/jobs/${jobId}`, body);
        onChange("remove", jobId);
      }
      catch (e) {
        console.log(e);
      }
    }
  }


  return (
    <EmbloyV className={undefined}>
      <button
        onClick={handleRemove}
        disabled={disabled}
      >
        <EmbloyToolboxImgAdvanced tooltip={"Remove Posting"} disabled={disabled} path="/icons/svg/black/bin.svg" path_disabled="/icons/svg/etna/bin.svg" path_hovered="/icons/svg/capri/bin.svg" dark_path="/icons/svg/amarone/bin.svg" dark_path_disabled="/icons/svg/biferno/bin.svg" dark_path_hovered="/icons/svg/barbera/bin.svg" height="12" width="12" />
      </button>
    </EmbloyV>
  
    
  );
}
