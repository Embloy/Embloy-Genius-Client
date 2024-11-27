"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import "@/app/globals.css";
import { patch_core } from "@/lib/misc_requests";
import { useRouter } from "next/navigation";
import { ApplicationPreview } from "@/app/components/dom/main/misc/application_form_preview";
import { GenerateQRButton } from "@/app/components/dom/main/misc/QRGenerator";
import { GenerateGQButton } from "@/app/components/dom/main/misc/GQGenerator";
import { DuplicateJobButton } from "@/app/components/dom/main/misc/DuplicateJobButton";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloySeperator, EmbloyChildrenAdvanced} from "@/app/components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyH1Editable, EmbloyP, EmbloyH1} from "@/app/components/ui/misc/text";
import { RemovePosting } from "../components/dom/main/misc/RemovePosting";
import { cast_date_no_null, job_slug_to_host, slug_to_host } from "@/lib/utils/cast";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { UserContext } from "@/app/components/dom/main/wrappers/UserContext";
import { Share2 } from "lucide-react";
import { EmbloySelectOption } from "../components/ui/misc/input";
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from "@heroicons/react/20/solid";
import { core_get } from "@/lib/api/core";
import { Spinner } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";

export function JobDetails({ job, onUploadSuccess, onClose }) {
  let { user, company } = useContext(UserContext);
  const router = useRouter();
  const [settingsIsHovered, setSettingsIsHovered] = useState(false);
  const handleSettingsHover = () => {
    setSettingsIsHovered(true);
  };
  const handleSettingsNotHover = () => {
    setSettingsIsHovered(false);
  };

  const [position, setPosition] = useState(null); // todo: make it like in calendar

  const headerClass = "w-full flex flex-row items-center justify-between";
  const textClass = "cursor-text";
  const set_data = () => {
    setPosition(job["position"]);
  };
  const [listIsHovered, setListIsHovered] = useState(false);
  const handleListHover = () => {
    setListIsHovered(true);
  };
  const handleListNotHover = () => {
    setListIsHovered(false);
  };
  const [unlistIsHovered, setUnlistIsHovered] = useState(false);
  const handleUnlistHover = () => {
    setUnlistIsHovered(true);
  };
  const handleUnlistNotHover = () => {
    setUnlistIsHovered(false);
  };
  const [removeIsHovered, setRemoveIsHovered] = useState(false);
  const handleRemoveHover = () => {
    setRemoveIsHovered(true);
  };
  const handleRemoveNotHover = () => {
    setRemoveIsHovered(false);
  };

  const [uploading, setUploading] = useState(false);
  const updateStatus = async (e, job_id, status) => {
    if (job_id && status) {
      setUploading(true);
      try {
        const result = await patch_core(`/jobs?id=${job_id}`, router, {
          job_status: status,
        });
        onUploadSuccess();
        if (status === "archived") {
          onClose();
        }
      } catch (e) {
        console.log(e);
      }
    }
    setUploading(false);
  };

  useEffect(() => {
    set_data();
  }, []);

  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const dropdownRef = useRef(null)
  const toggleShareDropdown = () => setShareDropdownOpen(!shareDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShareDropdownOpen(false);
        }
    };

    if (shareDropdownOpen) {
        document.addEventListener("mousedown", handleClickOutside);
    } else {
        document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [shareDropdownOpen]);

  const created_at = cast_date_no_null(job.created_at, "us");
  const updated_at = cast_date_no_null(job.updated_at, "us");
  let board_url = `${siteConfig.core_url}/board/${user.id}/${job.job_slug}`
  if (company !== null && company.company_slug !== undefined && company.company_slug !== null) {
    board_url = `${siteConfig.core_url}/board/${company.company_slug}/${job.job_slug}`;
  }
  const ats = job_slug_to_host(job.job_slug);
  const editable = ats === "Embloy";
  const [applicationOptions, setApplicationOptions] = useState(null);
  const [applicationOptionsStatus, setApplicationOptionsStatus] = useState(null);
  const [showApplicationOptions, setShowApplicationOptions] = useState(false);
  const handleApplicationForm = async () => {
    if (showApplicationOptions === false) {
      if (job && applicationOptions === null) {
        setApplicationOptionsStatus("loading");
        try {
          const res = await core_get(`/jobs/${job.id}`);
          if (res && res.job.application_options) {
            setApplicationOptions(res.job);
            setApplicationOptionsStatus(null);
            setShowApplicationOptions(true);
          } else {
            setApplicationOptionsStatus("error");
          }
        } catch (e) {
          setApplicationOptionsStatus("error");
        }
      } else {
        setShowApplicationOptions(true);
      }
      
    } else {
      setShowApplicationOptions(false);
    }
    
  }
  return (
    <EmbloyV className={"justify-between cursor-default p-2 bg-ferrara dark:bg-transparent"}>
      <EmbloyV className="border border-palatinio bg-white rounded-md dark:bg-aglianico dark:border-biferno items-center gap-2 p-4">
        <EmbloyV className="gap-1.5">
          <EmbloyV className="gap-px">
            <EmbloyH className="justify-between">
              <EmbloyH className="max-w-fit gap-2.5">
                <EmbloyP className="text-xs text-testaccio dark:text-nebbiolo">Created: {created_at}</EmbloyP>
                {created_at !== updated_at && <EmbloyP className="text-xs text-testaccio dark:text-nebbiolo">Last Update: {updated_at}</EmbloyP>}
                {!editable && <EmbloyP className="text-xs text-testaccio dark:text-nebbiolo">Can only be edited on {ats}!</EmbloyP>}
              </EmbloyH>
              {job.job_status === "listed" && <Link href={board_url} target="_blank"><EmbloyP className="text-xs text-capri dark:text-capri underline">{"Go to post"}</EmbloyP></Link>}
            </EmbloyH>
            <EmbloySeperator className="bg-palatinio dark:bg-nebbiolo h-px"/>
          </EmbloyV>
          <EmbloyH className="justify-between ">
            {editable ? (
              <EmbloyH1Editable className="page-header text-lg" initialText={job.position} />
            ) : (
              <EmbloyH1 className="page-header text-lg">{job.position}</EmbloyH1> 
            )}
            <EmbloyToolbox superClassName="h-7 border-2 dark:border-nebbiolo dark:bg-nebbiolo" >
              <EmbloyV className="max-w-fit">
                <button
                  onClick={() => {toggleShareDropdown(); }}
                  className="bg-transparent p-0 text-black hover:text-capri dark:text-amarone dark:hover:text-barbera"
                >
                  <EmbloyChildrenAdvanced tooltip="Share">
                    <Share2 className="w-[12px] h-[12px] p-0 m-0" />
                  </EmbloyChildrenAdvanced>
                </button>
              </EmbloyV>
              {shareDropdownOpen && job && (
                  <div ref={dropdownRef} className="absolute right-0 z-50 mt-2 min-w-48 rounded-md border border-etna dark:border-amarone bg-white p-2 shadow-lg dark:bg-nebbiolo">
                      <button onClick={() => {setShareDropdownOpen(false); }} disabled={true} className="block w-full px-4 py-2 text-left text-sm text-etna dark:text-vesuvio cursor-not-allowed">
                        <EmbloyP className="text-inherit dark:text-inherit">Share via email</EmbloyP>
                      </button>
                      <button onClick={() => {setShareDropdownOpen(false); }} disabled={true} className="block w-full px-4 py-2 text-left text-sm text-etna dark:text-vesuvio cursor-not-allowed">
                        <EmbloyP className="text-inherit dark:text-inherit">Share on LinkedIn</EmbloyP>
                      </button>
                      <button onClick={() => {
                          navigator.clipboard.writeText(`${board_url}`);
                          alert("Link copied to clipboard!"); 
                          setShareDropdownOpen(false); 
                          }} className="cursor-copy w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera">
                          <EmbloyP className="text-inherit dark:text-inherit">Copy Post Link</EmbloyP>
                      </button>
                  </div>
              )}
              <GenerateQRButton jobId={job.job_id} />
              <GenerateGQButton jobId={job.job_id} position={job.position} jobSlug={job.job_slug}/>
              <DuplicateJobButton disabled={true} jobId={job.job_id} external={!editable} ats={ats}/>
              {editable && <RemovePosting /> }
              
            </EmbloyToolbox>
          </EmbloyH>
          
          <EmbloyH className="justify-start items-center gap-1.5 text-black dark:text-amarone">
            <button onClick={() => {
              if (applicationOptionsStatus !== "loading") {
                handleApplicationForm();
              }}} className={`px-2 py-px border border-etna dark:border-nebbiolo rounded-md max-w-fit flex flex-row gap-1.5 ${applicationOptionsStatus === "loading" ? 'cursor-wait' : "cursor-pointer hover:text-capri hover:dark:text-barbera"}`}>
                <EmbloyP className="max-w-fit text-xs text-inherit dark:text-inherit">{applicationOptionsStatus === "error" ? "Try again" : "Application Form"}</EmbloyP>
                {applicationOptionsStatus !== "loading" ? (
                  showApplicationOptions ? (
                    <ChevronDoubleUpIcon className="w-4 h-4 p-0 m-0" />
                  ) : (
                    <PlusIcon className="w-4 h-4 p-0 m-0" />
                  )
                ) : (
                  <Spinner size="sm" color="current" className="w-4 h-4 p-0 m-0" />
                )}
            </button>
          </EmbloyH>

          {applicationOptions && showApplicationOptions === true && (
            <EmbloyV className="gap-2">
              <EmbloySeperator className="bg-etna dark:bg-nebbiolo h-px"/> 
              <div className={headerClass}>
                <ApplicationPreview
                  data={applicationOptions}
                  handleDataReload={() => {}}
                />
              </div>
              <EmbloySeperator className="bg-etna dark:bg-nebbiolo h-px"/> 
            </EmbloyV>
        )}
        </EmbloyV>
      
        
      </EmbloyV>
    </EmbloyV>
  );
}
