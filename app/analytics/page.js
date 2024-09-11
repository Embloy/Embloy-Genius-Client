"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { jobColumns } from "@/app/recruitment/job_columns";
import { JobDataTable } from "@/app/recruitment/JobDataTable";
import { applicationColumns } from "@/app/recruitment/application_columns";
import { ApplicationDataTable } from "@/app/recruitment/ApplicationDataTable";
import { get_core } from "@/lib/misc_requests";
import { useRouter } from "next/navigation";
import { EmbloyPageMount, EmbloyPage, EmbloyPageBody, EmbloyPageBodySection, EmbloySubPage } from "@/app/components/ui/misc/page";
import { EmbloyBox, EmbloyBoxContent } from "@/app/components/ui/misc/box";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "@/app/components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA} from "@/app/components/ui/misc/toolbox";

export default function Analytics() {  return (
    <EmbloyPageMount className="overflow-hidden">
      <EmbloyPage sandboxed={false}>
        <EmbloyPageBody >
          
        </EmbloyPageBody >
      </EmbloyPage>

    
    
    </EmbloyPageMount>
  );
}
