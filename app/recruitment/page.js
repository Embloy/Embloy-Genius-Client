"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { jobColumns } from "@/app/recruitment/job_columns";
import { JobDataTable } from "@/app/recruitment/JobDataTable";
import { applicationColumns } from "@/app/recruitment/application_columns";
import { ApplicationDataTable } from "@/app/recruitment/ApplicationDataTable";
import "./locals.css";
import { get_core } from "@/lib/misc_requests";
import { useRouter } from "next/navigation";
import { EmbloyPageMount, EmbloyPage, EmbloyPageBody, EmbloyPageBodySection, EmbloySubPage } from "@/app/components/ui/misc/page";
import { EmbloyBox, EmbloyBoxContent } from "@/app/components/ui/misc/box";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "@/app/components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA} from "@/app/components/ui/misc/toolbox";

export default function Jobs() {
  // subpages
  const [currentSubPageID, setcurrentSubPageID] = useState(0);
  const [reloadJobs, setReloadJobs] = useState(false);
  const [reloadApplications, setReloadApplications] = useState(false);

  const switchSubPage = (id) => {
    if (currentSubPageID != id) {
      setcurrentSubPageID(id);
    }
  };
  const jobsSubPageID = 0;
  const jobsSubPage = () => {
    switchSubPage(jobsSubPageID);
  };
  const applicationsSubPageID = 1;
  const applicationsSubPage = () => {
    switchSubPage(applicationsSubPageID);
  };
  const promosSubPageID = 2;
  const promosSubPage = () => {
    switchSubPage(promosSubPageID);
  };

  const router = useRouter();
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    get_core("/user/jobs", router)
      .then((data) => {
        if (data.jobs) {
          setJobs(data.jobs.filter((job) => job.job_status !== "archived"));
        } else {
          setJobs([]);
        }
        setReloadJobs(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [reloadJobs]);

  const [applications, setApplications] = useState(null);
  useEffect(() => {
    get_core("/applications", router)
      .then((data) => {
        if (data.applications) {
          console.log("Applications: " + data.applications);
          setApplications(data.applications);
        } else {
          setApplications([]);
        }
        setReloadApplications(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [reloadApplications]);

  const new_job = () => {
    const new_job = {
      job_slug: "new"
    };
    setJobs([new_job, ...jobs]);
  }

  return (
    <EmbloyPageMount className="overflow-hidden">
      <EmbloyPage sandboxed={false}>
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
              <EmbloySubPage pages={[{name:'Postings', id:1}, {name:'Applications', id:2}]} >
                <EmbloyV id={1} className="gap-3 ">
                  <JobDataTable
                      columns={jobColumns}
                      data={jobs}
                      handleDataReload={() => setReloadJobs(true)}
                      onNewJob={() => {new_job()}}
                  />
                </EmbloyV>
                <EmbloyV id={2} className="gap-3">
                  <ApplicationDataTable
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

    
    {/* 

          

        <div className="w-full flex flex-col items-center justify-start">
          {currentSubPageID === jobsSubPageID && (
            <div className="container mx-auto">
              <JobDataTable
                columns={jobColumns}
                data={jobs}
                handleDataReload={() => setReloadJobs(true)}
              />
            </div>
          )}
          {currentSubPageID === applicationsSubPageID && (
            
          )}
        </div>
      </div>
    </main>
    */}
    </EmbloyPageMount>
  );
}
