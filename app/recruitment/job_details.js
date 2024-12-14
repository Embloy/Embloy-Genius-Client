"use client";
import React, { useEffect, useState, useContext, useRef} from "react";
import "@/app/globals.css";
import { patch_core } from "@/lib/misc_requests";
import { useRouter } from "next/navigation";
import { ApplicationPreview } from "@/app/components/dom/main/misc/application_form_preview";
import { GenerateQRButton } from "@/app/components/dom/main/misc/QRGenerator";
import { GenerateGQButton } from "@/app/components/dom/main/misc/GQGenerator";
import { DuplicateJobButton } from "@/app/components/dom/main/misc/DuplicateJobButton";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloySeperator, EmbloyChildrenAdvanced, EmbloyToggle} from "@/app/components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { EmbloyH1Editable, EmbloyP, EmbloyH1} from "@/app/components/ui/misc/text";
import { RemovePosting } from "../components/dom/main/misc/RemovePosting";
import { cast_date_no_null, job_slug_to_host, slug_to_host } from "@/lib/utils/cast";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { UserContext } from "@/app/components/dom/main/wrappers/UserContext";
import { SaveIcon, Share2, XIcon } from "lucide-react";
import { EmbloySelectOption } from "../components/ui/misc/input";
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from "@heroicons/react/20/solid";
import { core_get, not_core_get } from "@/lib/api/core";
import { Spinner } from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import { Applications } from "./applications";
import { PostDetails } from "./post_details";
import { JobDetails2 } from "./job_details_2";

export function JobDetails({ job, onUploadSuccess, onClose, onRemove }) {
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
    setPosition(job["title"]);
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
  const new_job = job.job_slug === "new"
  const [draft, setDraft] = useState({
    "title": null,
  });
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
  const [editApplicationOptions, setEditApplicationOptions] = useState(false);
  const [rel, setRel] = useState(false);

  const relOn = () => {
    onUploadSuccess();
    if (!rel) {
    setRel(true);}
  }

  const handleApplicationForm = async (mode = "ao") => {
    if ((showApplicationOptions === false && mode === "ao") || (showBoard === false && mode === "p")) {
      if ((job && applicationOptions === null) || (job && rel === true)) {
        if (mode === "ao") {
          setApplicationOptionsStatus("loading");
        } else if (mode === "p") {
          setBoardStatus("loading");
        }
        
        
        setEditApplicationOptions(false);


        try {
          const res = await core_get(`/jobs/${job.id}`);
          if (res && res.job.application_options) {
            setBoard(res.job);
            setApplicationOptions(res.job);
            setApplicationOptionsStatus(null);
            setBoardStatus(null);
            if (job_slug_to_host(res.job.job_slug) === "Embloy" && res.job.activity_status === 1) {
              setEditApplicationOptions(true)
            }
            setRel(false);
            
            if (mode === "ao") {
              setShowApplicationOptions(true);
            } else if (mode === "p") {
              setShowBoard(true);
            }
            
          } else {
            if (mode === "ao") {
              setApplicationOptionsStatus("error");
            } else if (mode === "p") {
              setBoardStatus("error");
            }
           
            
          }
        } catch (e) {
          if (new_job) {
            setEditApplicationOptions(true)
            setApplicationOptionsStatus(null)
            setBoardStatus(null)
            if (mode === "ao") {
              setShowApplicationOptions(true);
            } else if (mode === "p") {
              setShowBoard(true);
            }
            

          } else {
            if (mode === "ao") {
              setApplicationOptionsStatus("error");
            } else if (mode === "p") {
              setBoardStatus("error");
            } 
          }
          
        }
      } 
      else {
        if (mode === "ao") {
          setShowApplicationOptions(true);
        } else if (mode === "p") {
          setShowBoard(true);
        }
      }
      
    } else {
      if (mode === "ao") {
        setShowApplicationOptions(false);
      } else if (mode === "p") {
        setShowBoard(false);
      }
      
    }
    
  }


  const [details, setDetails] = useState(null);
  const [detailStatus, setDetailStatus] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [algo, setDAlgo] = useState(null);
  const [algoStatus, setAlgoStatus] = useState(null);
  const [showAlgo, setShowAlgo] = useState(false);


  const [applications, setApplications] = useState(null);
  const [applicationsStatus, setApplicationsStatus] = useState(null);
  const [showApplications, setShowApplications] = useState(false);

  const handleApplications = async () => {
    if (showApplications === false) {
      if (job && applications === null) {
        setApplicationsStatus("loading");
        try {
          const res = await core_get(`/jobs/${job.id}/applications`);
          if (res && res.applications) {
            let applications = res.applications;
            applications.map((application) => {
              if (application.applicant) {
                application["first_name"] = application.applicant.first_name;
                application["last_name"] = application.applicant.last_name;
              }
              
            });
            setApplications(applications);
            await handleApplicants(applications);
            setApplicationsStatus(null);
            setShowApplications(true);
          } else {
            setApplications(null);
            setApplicationsStatus(null);
            setShowApplications(true);
          }
        } catch (e) {
          setApplicationsStatus("error");
        }

      } else {
        setShowApplications(true);
      }
    } else {
      setShowApplications(false);
    
    }
  }
  const handleApplicants = async (args) => {
    if (args && Array.isArray(args)) {
      args.map((application) => {
        if (application.user_id) {
          //try {}
        }
      });
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await handleApplications();
    };
    if (!new_job){
      fetchData();
    } 
  }, []);

  const handleAdd = (type, id) => {
    if (type === "remove") {
      onUploadSuccess();
      onClose();
    }
  }

  const handleSave = async () => {
    if (draft.title !== null) {
      const body = {
        "position": draft.title,
        "job_status": "unlisted",
        "title": draft.title,
      }
      try {
        const res = await not_core_get("POST", `/jobs`, body);
        onUploadSuccess();
      } catch (e) {
      }
    }
  }

  const [board, setBoard] = useState(null);
  const [boardStatus, setBoardStatus] = useState(null);
  const [showBoard, setShowBoard] = useState(false);

  const [listedStatus, setListedStatus] = useState(job.job_status === "listed" ? "active" : "inactive");
  const force = (status) => {
    setListedStatus(status);
  };
  const handleVisibility = async () => {
    if (listedStatus === "active" && job.job_status === "listed") {
      try {
        force("disconnect");
        await not_core_get("PATCH", `/jobs/${job.id}`, {job_status: "unlisted"});
        force("inactive");
        onUploadSuccess();
      } catch (e) {
        force("active");
      }
    } else {
      try {
        force("connect");
        await not_core_get("PATCH", `/jobs/${job.id}`, {job_status: "listed"});
        force("active");
        onUploadSuccess();
      } catch (e) {
        force("inactive");
      }
    }
  }

  const handlePositionSave = async (pos) => {
    if (pos !== null && pos !== undefined && pos !== job.title && pos.trim() !== "" ) {
      try {
        await not_core_get("PATCH", `/jobs/${job.id}`, {title: pos.trim()});
        onUploadSuccess();
        
      } catch (e) {
      }
    } 
  }


  return (
    <EmbloyV className={"justify-between cursor-default p-2 bg-ferrara dark:bg-transparent"}>
      <EmbloyV className="border border-palatinio bg-white rounded-md dark:bg-aglianico dark:border-biferno items-center gap-2 p-4">
        <EmbloyV className="gap-1.5">
          <EmbloyV className="gap-px">
            <EmbloyH className="justify-between">
              <EmbloyH className="max-w-fit gap-2.5">
                {!new_job && <EmbloyP className="text-xs text-testaccio dark:text-nebbiolo">Created: {created_at}</EmbloyP>}
                {created_at !== updated_at && <EmbloyP className="text-xs text-testaccio dark:text-nebbiolo">Last Update: {updated_at}</EmbloyP>}
                {!editable && <EmbloyP className="text-xs text-testaccio dark:text-nebbiolo">View only! Externally hosted on {ats}.</EmbloyP>}
              </EmbloyH>
              {job.job_status === "listed" && <Link href={board_url} target="_blank"><EmbloyP className="text-xs text-capri dark:text-capri underline">{"Go to post"}</EmbloyP></Link>}
            </EmbloyH>
            <EmbloySeperator className="bg-etna dark:bg-nebbiolo h-px"/>
          </EmbloyV>
          <EmbloyH className="justify-between gap-2">
            {!new_job ? (
              editable ? (
                  <EmbloyH1Editable className="page-header text-lg w-full" maxLength="100" initialText={job.title} keydown={(e) => {handlePositionSave(e)}} onUpdate={(e) => {handlePositionSave(e)}} />
                ) : (
                  <EmbloyH1 className="page-header text-lg whitespace-nowrap overflow-hidden text-ellipsis">{job.title}</EmbloyH1>
                )
              ) : (
                <EmbloyH1Editable placeholder="Enter Job Title" className="page-header text-lg w-full" maxLength="100" initialText={draft.title} onUpdate={(value) => {setDraft({...draft, "title": value})}} />
            )}

            {!new_job ?
              <EmbloyH className="max-w-fit items-center gap-2">
                {editable && <EmbloyToggle 
                  tooltip={`
                      ${(listedStatus=== "active") && "Unlist Job"
                      || (listedStatus === "inactive") && "Publish Job"
                      || (listedStatus === "connect" || listedStatus === "disconnect") && "Pending..."}
                  `} className="h-7"  unlock={`
                    ${(listedStatus === "active" && true) 
                    || (listedStatus !== "active" && false)}
                `}  forceStatus={listedStatus} onChange={handleVisibility} />}
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
                        <button onClick={() => {setShareDropdownOpen(false); }} disabled={true} className="block w-full px-4 py-2 text-left text-sm text-etna dark:text-vesuvio cursor-not-allowed ">
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
                  <GenerateQRButton jobId={job.id} />
                  <GenerateGQButton jobId={job.id} position={job.position} jobSlug={job.job_slug}/>
                  <DuplicateJobButton disabled={true} jobId={job.id} external={!editable} ats={ats}/>
                  {editable && <RemovePosting disabled={job.job_status === "listed"} jobId={job.id} onChange={(type, id) => handleAdd(type, id)}/> }
                </EmbloyToolbox> 
              </EmbloyH> :
              <EmbloyToolbox superClassName="h-7 border-2 dark:border-nebbiolo dark:bg-nebbiolo" >
                <EmbloyV className="max-w-fit">
                  <button
                    onClick={() => {handleSave()}}
                    className="bg-transparent p-0 text-black hover:text-capri dark:text-amarone dark:hover:text-barbera"
                  >
                    <EmbloyChildrenAdvanced tooltip="Create New Job">
                      <SaveIcon className="w-[12px] h-[12px] p-0 m-0 text-inherit dark:text-inherit" strokeWidth={3} />
                    </EmbloyChildrenAdvanced>
                  </button>
                </EmbloyV>  
                <EmbloyV className="max-w-fit">
                  <button
                    onClick={() => {
                        onClose()
                        onRemove()
                      }
                    }
                    className="bg-transparent p-0 text-black hover:text-capri dark:text-amarone dark:hover:text-barbera"
                  >
                    <EmbloyChildrenAdvanced tooltip="Dismiss">
                      <XIcon className="w-[12px] h-[12px] p-0 m-0 text-inherit dark:text-inherit" strokeWidth={3} />
                    </EmbloyChildrenAdvanced>
                  </button>
                </EmbloyV>                
              </EmbloyToolbox>
            }
          </EmbloyH>
          
          {!new_job && 
            <EmbloyV className="gap-1.5">
              <EmbloyH className="justify-start items-center gap-1.5 text-black dark:text-amarone">
                <button onClick={() => {
                  if (detailStatus !== "loading") {
                    setShowDetails(!showDetails);
                  }}} className={`px-2 py-px border border-etna dark:border-nebbiolo rounded-md max-w-fit flex flex-row gap-1.5 ${detailStatus === "loading" ? 'cursor-wait' : "cursor-pointer hover:text-capri hover:dark:text-barbera"} transition-colors duration-200`}>
                    <EmbloyP className="max-w-fit text-xs text-inherit dark:text-inherit">{detailStatus === "error" ? "Try again" : "Details"}</EmbloyP>
                    {detailStatus !== "loading" ? (
                      showDetails ? (
                        <ChevronDoubleUpIcon className="w-4 h-4 p-0 m-0" />
                      ) : (
                        <PlusIcon className="w-4 h-4 p-0 m-0" />
                      )
                    ) : (
                      <Spinner size="sm" color="current" className="w-4 h-4 p-0 m-0" />
                    )}
                  </button>

                  <button onClick={() => {
                    if (applicationsStatus !== "loading") {
                      handleApplications();
                    }}} className={`px-2 py-px border border-etna dark:border-nebbiolo rounded-md max-w-fit flex flex-row gap-1.5 ${applicationsStatus === "loading" ? 'cursor-wait' : "cursor-pointer hover:text-capri hover:dark:text-barbera"} transition-colors duration-200`}>
                      <EmbloyP className="max-w-fit text-xs text-inherit dark:text-inherit">{applicationsStatus === "error" ? "Try again" : "Applications"}</EmbloyP>
                      {applicationsStatus !== "loading" ? (
                        showApplications ? (
                          <ChevronDoubleUpIcon className="w-4 h-4 p-0 m-0" />
                        ) : (
                          <PlusIcon className="w-4 h-4 p-0 m-0" />
                        )
                      ) : (
                        <Spinner size="sm" color="current" className="w-4 h-4 p-0 m-0" />
                      )}
                  </button>

                  <button onClick={() => {
                    if (boardStatus !== "loading") {
                      handleApplicationForm("p");
                    }}} className={`px-2 py-px border border-etna dark:border-nebbiolo rounded-md max-w-fit flex flex-row gap-1.5 ${boardStatus === "loading" ? 'cursor-wait' : "cursor-pointer hover:text-capri hover:dark:text-barbera"} transition-colors duration-200`}>
                      <EmbloyP className="max-w-fit text-xs text-inherit dark:text-inherit">{boardStatus === "error" ? "Try again" : "Board Post"}</EmbloyP>
                      {boardStatus !== "loading" ? (
                        showBoard ? (
                          <ChevronDoubleUpIcon className="w-4 h-4 p-0 m-0" />
                        ) : (
                          <PlusIcon className="w-4 h-4 p-0 m-0" />
                        )
                      ) : (
                        <Spinner size="sm" color="current" className="w-4 h-4 p-0 m-0" />
                      )}
                  </button>

                  <button onClick={() => {
                    if (applicationOptionsStatus !== "loading") {
                      handleApplicationForm();
                    }}} className={`px-2 py-px border border-etna dark:border-nebbiolo rounded-md max-w-fit flex flex-row gap-1.5 ${applicationOptionsStatus === "loading" ? 'cursor-wait' : "cursor-pointer hover:text-capri hover:dark:text-barbera"} transition-colors duration-200`}>
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
                  <button disabled onClick={() => {
                    if (algoStatus !== "loading") {
                      //handleAlgo();
                    }}} className={`px-2 py-px border border-etna dark:border-nebbiolo rounded-md max-w-fit flex flex-row gap-1.5 ${algoStatus === "loading" ? 'cursor-wait' : "cursor-not-allowed text-testaccio dark:text-nebbiolo"} transition-colors duration-200`}>
                      <EmbloyP className="max-w-fit text-xs text-inherit dark:text-inherit">{algoStatus === "error" ? "Try again" : "Algorithm"}</EmbloyP>
                      {algoStatus !== "loading" ? (
                        showAlgo ? (
                          <ChevronDoubleUpIcon className="w-4 h-4 p-0 m-0" />
                        ) : (
                          <PlusIcon className="w-4 h-4 p-0 m-0" />
                        )
                      ) : (
                        <Spinner size="sm" color="current" className="w-4 h-4 p-0 m-0" />
                      )}
                  </button>
              </EmbloyH>
              <EmbloySeperator className="bg-etna dark:bg-nebbiolo h-px"/> 
            </EmbloyV>
          }
          {showDetails === true && (
            <EmbloyV className="gap-2">
              <div className={headerClass}>
                <JobDetails2 job={job} handleDataReload={() => {relOn()}}
                  onChange={() => {}}
                  editable={editable} />
              </div>
              <EmbloySeperator className="bg-etna dark:bg-nebbiolo h-px" />
            </EmbloyV>
          )}
          {showApplications === true && (
            <EmbloyV className="gap-2">
              <div className={headerClass}>
                {applications === null ? <EmbloyP className="text-xs text-center w-full text-testaccio dark:text-nebbiolo">No Applications</EmbloyP> : <Applications applications={applications} />}
              </div>
              <EmbloySeperator className="bg-etna dark:bg-nebbiolo h-px" />
            </EmbloyV>
          )}

          {showBoard=== true && (
            <EmbloyV className="gap-2">
              <div className={headerClass}>
                <PostDetails job={board} handleDataReload={() => {relOn()}}
                  onChange={() => {}}
                  editable={editApplicationOptions} />
              </div>
              <EmbloySeperator className="bg-etna dark:bg-nebbiolo h-px"/> 
            </EmbloyV>
          )}

          {showApplicationOptions === true && (
            <EmbloyV className="gap-2">
              <div className={headerClass}>
                <ApplicationPreview
                  data={applicationOptions}
                  handleDataReload={() => {relOn()}}
                  onChange={() => {}}
                  editable={editApplicationOptions}
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
