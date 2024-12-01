import React from "react";
import "@/app/globals.css";


import { EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyV} from "@/app/components/ui/misc/stuff";
import { not_core_get } from "@/lib/api/core";

export function RemovePosting({ head, jobId, onChange }) {
  console.log("JOB US", jobId);

  const handleRemove = async () => {
    const body = {
      "job_status": "archived"
    }
    try {
      const res = await not_core_get("PATCH", `/job/${jobId}`, body);
      onChange("remove", jobId);
    }
    catch (e) {
      console.log(e);
    }
  }


  return (
    <EmbloyV className={undefined}>
      <button
      onClick={() => {
        handleRemove();
        
      }}>
        <EmbloyToolboxImgAdvanced tooltip={"Remove Posting"} path="/icons/svg/black/bin.svg" path_hovered="/icons/svg/capri/bin.svg" dark_path="/icons/svg/amarone/bin.svg" dark_path_hovered="/icons/svg/barbera/bin.svg" height="12" width="12" />
      </button>
    </EmbloyV>
  
    
  );
}
