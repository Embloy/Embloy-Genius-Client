"use client";
import React, { useEffect, useState } from "react";
import { jobColumns } from "@/app/recruitment/job_columns";
import { JobDataTable } from "@/app/recruitment/JobDataTable";
import { applicationColumns } from "@/app/recruitment/application_columns";
import "./locals.css";
import { get_core } from "@/lib/misc_requests";
import { useRouter } from "next/navigation";
import { EmbloyPageMount, EmbloyPage, EmbloyPageBody, EmbloyPageBodySection, EmbloySubPage } from "@/app/components/ui/misc/page";

import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "@/app/components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA} from "@/app/components/ui/misc/toolbox";


import { ApplicantsTable } from "./ApplicantsTable";
import { useSearchParams } from 'next/navigation'

export default function Jobs() {

  const [currentSubPageID, setcurrentSubPageID] = useState(0);
  const [reloadJobs, setReloadJobs] = useState(false);
  const [reloadApplications, setReloadApplications] = useState(false);



  

  const router = useRouter();
  

  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    get_core("/user/jobs", router)
      .then((data) => {
        if (data.jobs) {
          setJobs(data.jobs.filter((job) => job.job_status !== "archived" ));
        } else {
          setJobs([]);
        }
        setReloadJobs(false);
      })
      .catch((e) => {
      });
  }, [reloadJobs]);

  const [applications, setApplications] = useState(null);
  useEffect(() => {
    get_core("/applications", router)
      .then((data) => {
        if (data.applications) {
          setApplications(data.applications);
        } else {
          setApplications([]);
        }
        setReloadApplications(false);
      })
      .catch((e) => {
      });
  }, [reloadApplications]);

  const new_job = () => {
    const new_job = {
      job_slug: "new"
    };
    setJobs([new_job, ...jobs]);
  }
    
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams && searchParams.has("tab")) {
        const tabToSubPageID = {
            postings: 0,
            candidates: 1,
        };
        const subPageID = tabToSubPageID[searchParams.get("tab")];

        if (subPageID !== undefined) {
            setcurrentSubPageID(subPageID);
        }
    } else {
        handlePageChange(currentSubPageID);
    }
}, [searchParams]);
  const subPages = [{name:'Postings', id:0}, {name:'Candidates', id:1}];
  const handlePageChange = (id) => {
    setcurrentSubPageID(id);
    const tabName = subPages.find(page => page.id === id).name.toLowerCase();
    router.push(`?tab=${tabName}`);
}


  return (
    <EmbloyPageMount className="overflow-hidden">
      <EmbloyPage sandboxed={true}>
        <EmbloyPageBody >
          <EmbloyPageBodySection>
            <EmbloyV>
              <EmbloyH className="justify-between">
                <h1 className="page-header">Jobs</h1>
                <EmbloyToolbox superClassName="portrait:hidden">
                  <EmbloyToolboxImgA href="https://developers.embloy.com/docs/category/genius" height="12" width="12" path="/icons/svg/black/ask.svg" path_hovered="/icons/svg/capri/ask.svg" dark_path="/icons/svg/amarone/ask.svg" dark_path_hovered="/icons/svg/barbera/ask.svg" target="_blank" />
                </EmbloyToolbox>
              </EmbloyH>
              <EmbloySpacer />
              <EmbloySubPage 
                pages={subPages} 
                onPageChange={handlePageChange}
                externalSetActivePage={currentSubPageID}
              >
                <EmbloyV id={0} className="gap-3 ">
                  <JobDataTable
                      columns={jobColumns}
                      data={jobs}
                      handleDataReload={() => setReloadJobs(true)}
                      onNewJob={() => {new_job()}}
                  />
                </EmbloyV>
                <EmbloyV id={1} className="gap-3">
                  <ApplicantsTable
                    columns={applicationColumns}
                    data={applications}
                    handleDataReload={() => setReloadApplications(true)}
                  />
                </EmbloyV>
              </EmbloySubPage>
            </EmbloyV>
          </EmbloyPageBodySection>
        </EmbloyPageBody >
      </EmbloyPage>
    </EmbloyPageMount>
  );
}
