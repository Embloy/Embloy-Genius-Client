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

  return (
    <main className=" text-white flex min-h-screen h-full flex-col items-center justify-start">
      <div className="z-10 max-w-6xl w-full min-h-screen h-full border-l-[1px] border-r-[1px] border-gray-700 flex flex-col items-center justify-start">
        <div className="w-full flex flex-col items-center justify-start p-4">
          <div className="w-full flex flex-row items-center justify-between my-4">
            <h1 className="font-medium text-2xl ">Recruitment Portal</h1>
          </div>
          <div className="w-full h-4" />
        </div>

        <div className="w-full flex flex-col items-center justify-start">
          <ul className="text-sm w-full flex flex-row items-center justify-start">
            <li
              onClick={jobsSubPage}
              className={cn(
                currentSubPageID === jobsSubPageID
                  ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer"
                  : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-4 text-gray-400 hover:text-white cursor-pointer"
              )}
            >
              <div className="h-full w-full">
                <p>Jobs</p>
              </div>
            </li>
            <li
              onClick={applicationsSubPage}
              className={cn(
                currentSubPageID === applicationsSubPageID
                  ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer"
                  : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-4 text-gray-400 hover:text-white cursor-pointer"
              )}
            >
              <div className="h-full w-full">
                <p>Applications</p>
              </div>
            </li>
            <li
              onClick={promosSubPage}
              className={cn(
                currentSubPageID === promosSubPageID
                  ? "flex flex-row items-center justify-start border-b-[1px] border-embloy-green py-2 px-4 text-white cursor-pointer"
                  : "flex flex-row items-center justify-start border-b-[1px] border-gray-700 hover:border-gray-400 py-2 px-4 text-gray-400 hover:text-white cursor-pointer"
              )}
            >
              <div className="h-full w-full">
                <p>Promotions</p>
              </div>
            </li>
            <li className="cursor-default text-transparent select-none w-screen flex flex-row items-center justify-start border-b-[1px] border-gray-700 p-2 pointer-events-none">
              <button className="cursor-default">
                <p>Promotions</p>
              </button>
            </li>
          </ul>
        </div>

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
            <div className="container mx-auto">
              <ApplicationDataTable
                columns={applicationColumns}
                data={applications}
                handleDataReload={() => setReloadApplications(true)}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
