import { get_core } from "@/lib/misc_requests";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloySeperator, EmbloyChildrenAdvanced, EmbloyToggle} from "@/app/components/ui/misc/stuff";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import { EmbloyH1Editable, EmbloyP, EmbloyH1} from "@/app/components/ui/misc/text";
import Image from "next/image";
import {cast_date_no_null} from "@/lib/utils/cast"
import { FaAt, FaFacebook, FaGithub, FaInstagram, FaLink, FaLinkedin, FaPhone, FaTwitter } from "react-icons/fa";
import { toast } from "@/app/components/ui/use-toast";
import { CheckIcon, ClockIcon, XIcon, PlusIcon } from "lucide-react";
import { not_core_get } from "@/lib/api/core";
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from "@heroicons/react/20/solid";
import { Applications } from "./applications";
import { AnswerPreview } from "../components/dom/main/misc/application_form_preview";

export const Socials = ({ applicant }) => {
  const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9_.-]+\/?$/;
  const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?$/;
  const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(company|in)\/[A-Za-z0-9_-]+\/?$/;
  const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/;
  const twitterRegex = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_.-]+\/?$/;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Collect all URLs from applicant
  const urls = [
    applicant.linkedin_url,
    applicant.instagram_url,
    applicant.twitter_url,
    applicant.facebook_url,
    applicant.github_url,
    applicant.portfolio_url,
  ].filter(Boolean);

  // Categorize URLs
  const categorized = {
    facebook: [],
    github: [],
    linkedin: [],
    instagram: [],
    twitter: [],
    other_urls: [],
  };

  urls.forEach((url) => {
    if (facebookRegex.test(url)) {
      categorized.facebook.push(url);
    } else if (githubRegex.test(url)) {
      categorized.github.push(url);
    } else if (linkedinRegex.test(url)) {
      categorized.linkedin.push(url);
    } else if (instagramRegex.test(url)) {
      categorized.instagram.push(url);
    } else if (twitterRegex.test(url)) {
      categorized.twitter.push(url);
    } else {
      categorized.other_urls.push(url);
    }
  });

  return (
    <>
      { (categorized.facebook.length > 0 || categorized.github.length > 0 || categorized.linkedin.length > 0 || categorized.instagram.length > 0 || categorized.twitter.length > 0 || categorized.other_urls.length > 0) &&
        <button onClick={() => setIsModalOpen(true)} className="text-xs text-gray-800 dark:text-gray-200">
          <EmbloyP className="underline text-capri dark:text-capri text-xs">View Socials</EmbloyP>
        </button>
      }
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/75">
          <div className="w-11/12 rounded-md bg-white px-6 py-3 shadow-md dark:bg-gray-900 md:w-1/2">
            <div className="flex flex-row items-start justify-between">
              <EmbloyH1 className="mb-4 font-heading">Links:</EmbloyH1>
              <button
                onClick={() => setIsModalOpen(false)}
                className="font-heading text-xl text-gray-800 dark:text-gray-200"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {Object.keys(categorized).map((key) => {
                if (categorized[key].length > 0) {
                  return (
                    <div key={key} className="flex flex-col gap-2">
                      {categorized[key].map((url) => (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-fit flex-row items-center gap-1.5"
                        >
                          <FaLink className="text-xs text-gray-800 dark:text-gray-200" />
                          <EmbloyP className="text-xs">{url}</EmbloyP>
                        </a>
                      ))}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

  
const ApplicationDetails = ({
  application,
  onUpdateSuccess,
  onClose,
}) => {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState(null);
  const [applicationDetails, setApplicationDetails] = useState(null);



  const fetchApplicationDetails = async () => {
    if (!application) return;
    try {
      const data = await get_core(
        `/jobs/${application.job_id}/applications/${application.user_id}`,
        router
      );
      setDetails(data);
    } catch (e) {
    }
  };

  const handleMoreInfoClick = async () => {


  };

  useEffect(() => {
    const fetch_details = async () => {
      setStatus("loading");
      await fetchApplicationDetails();
      setStatus(null);

    }
    fetch_details();
  }, []);

  const handleAccept = async () => {
    if (!application) return;
    try {
      await not_core_get('PATCH', `/jobs/${application.job_id}/applications/${application.user_id}/accept`);
      setDetails({...details, application: {...details.application, status: "accepted"}});
      if (status === "update") {
        handleUpdate("done_update");
      }
      onUpdateSuccess();
    } catch (e) {
    }
  };

  const handlePending = async () => {
    if (!application) return;
    try {
      //await not_core_get('PATCH', `/jobs/${application.job_id}/applications/${application.user_id}/accept`);
      setDetails({...details, application: {...details.application, status:null}});
      if (status === "update") {
        handleUpdate("done_update");
      }
      onUpdateSuccess();
    } catch (e) {
    }
  };

  const handleReject = async () => {
    if (!application) return;
    try {
      await not_core_get('PATCH', `/jobs/${application.job_id}/applications/${application.user_id}/reject`);
        setDetails({...details, application: {...details.application, status: "rejected"}});
        if (status === "update") {
          handleUpdate("done_update");
        }
        onUpdateSuccess();
    } catch (e) {
    }
  };

  const handleUpdate = (who) => {

    if (status !== "update" && who === "update") {
      setStatus("update");
    } else if (status === "update" && who === "done_update") {
      setStatus(null);
    }
    
  }

  const [formStatus, setFormStatus] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <EmbloyV className={"justify-between cursor-default p-2 bg-ferrara dark:bg-transparent"}>
      <EmbloyV className="border border-palatinio bg-white rounded-md dark:bg-aglianico dark:border-biferno items-center gap-2 p-4">
        {
          status === "loading" || !details ? 
            <EmbloyH className="text-black dark:text-white">
              <EmbloyP>Loading</EmbloyP>
              <Spinner size="sm" color="current" className="w-4 h-4 p-0 m-0" />
            </EmbloyH> 
            :
            <EmbloyV className="gap-1.5">
              <EmbloyH className="gap-2">
                <EmbloyP className="text-xs text-testaccio dark:text-nebbiolo">Submitted: {cast_date_no_null(details.application.created_at, "us")}</EmbloyP>
                {details.application.created_at !== details.application.updated_at && <EmbloyP className="text-xs text-testaccio dark:text-nebbiolo">Last Update: {cast_date_no_null(details.application.updated_at, "us")}</EmbloyP>}
              </EmbloyH>
              <EmbloySeperator className="bg-etna dark:bg-nebbiolo h-px" />
              <EmbloyH className="gap-2">
              {details.application.applicant.image_url && (
                  <div className="rounded-full" style={{
                    backgroundImage: `url(${details.application.applicant.image_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "50%",
                    width: `${Math.min(80, 80)}px`,
                    height: `${Math.min(80, 75)}px`,
                  }} />
                    
                )}
                <EmbloyV>
                  <EmbloyH>
                    <EmbloyH1 className="text-base font-heading">{details.application.applicant.first_name}{" "}{details.application.applicant.last_name}</EmbloyH1>
                    {details.application.applicant.date_of_birth && <EmbloyP className="italic">{cast_date_no_null(details.application.applicant.date_of_birth)}</EmbloyP>}
                  </EmbloyH>
                  <EmbloyH>
                    <Socials applicant={details.application.applicant} />
                  </EmbloyH>
                </EmbloyV>
              </EmbloyH>
              <EmbloySpacer className="h-px" />
              <EmbloyH className="justify-start items-center gap-1.5 text-black dark:text-amarone">
                { (details.application_answers !== null && details.application_answers.length > 0) &&
                  <button onClick={() => {
                    if (formStatus !== "loading") {
                      setShowForm(!showForm);
                    }}} className={`px-2 py-px border border-etna dark:border-nebbiolo rounded-md max-w-fit flex flex-row gap-1.5 ${formStatus === "loading" ? 'cursor-wait' : "cursor-pointer hover:text-capri hover:dark:text-barbera"} transition-colors duration-200`}>
                      <EmbloyP className="max-w-fit text-xs text-inherit dark:text-inherit">{formStatus === "error" ? "Try again" : "Form Answers"}</EmbloyP>
                      {formStatus !== "loading" ? (
                        showForm ? (
                          <ChevronDoubleUpIcon className="w-4 h-4 p-0 m-0" />
                        ) : (
                          <PlusIcon className="w-4 h-4 p-0 m-0" />
                        )
                      ) : (
                        <Spinner size="sm" color="current" className="w-4 h-4 p-0 m-0" />
                      )}
                  </button>
                }
              </EmbloyH>
              {(showForm === true && details.application_answers !== undefined && details.application_answers !== null && details.application_answers.length > 0) && (
                <EmbloyV className="gap-2">
                  <EmbloyH className="items-center justify-between">
                    {(details.application_answers === undefined || details.application_answers === null) ? <EmbloyP className="text-xs text-center w-full text-testaccio dark:text-nebbiolo">No Answers provided</EmbloyP> : <AnswerPreview data={details} handleDataReload={onUpdateSuccess} editable={false} onChange={() => {}} />}
                  </EmbloyH >
                  <EmbloySeperator className="bg-etna dark:bg-nebbiolo h-px" />
                </EmbloyV>
              )}
              <EmbloySpacer className="h-2" />
              {
                (details.application.status !== "accepted" && details.application.status !== "rejected") ?
                  <EmbloyH className="gap-2 justify-center">
                    
                    <button onClick={handleReject} className="px-4 py-1 rounded-sm border border-etna dark:border-nebbiolo flex flex-row gap-2 items-center hover:bg-primitivo/10 dark:hover:bg-primitivo/10 transition-colors duration-200">
                      <XIcon className="w-4 h-4 text-primitivo dark:text-primitivo"  />
                      <EmbloyP className={"text-xs text-capri dark:text-capri"}>Reject</EmbloyP>
                    </button>
                    <button onClick={handleAccept} className="px-4 py-1 rounded-sm border border-etna dark:border-nebbiolo flex flex-row gap-2 items-center hover:bg-lugana/10 dark:hover:bg-lugana/10 transition-colors duration-200">
                      <CheckIcon className="w-4 h-4 text-lugana dark:text-lugana"  />
                      <EmbloyP className={"text-xs text-capri dark:text-capri"}>Invite</EmbloyP>
                    </button>

                  </EmbloyH>
                : 
                  <EmbloyH className="gap-2 justify-center">
                    {
                      details.application.status === "accepted" && 
                        <button className="px-4 py-1 rounded-sm border border-etna dark:border-nebbiolo flex flex-row gap-2 items-center bg-lugana/10 dark:bg-lugana/10 cursor-default">
                          <CheckIcon className="w-4 h-4 text-lugana dark:text-lugana" />
                          <EmbloyP className={"text-xs text-lugana dark:text-lugana"}>Accepted</EmbloyP>
                        </button>
                    }
                    {
                      details.application.status === "rejected" && 
                        <button className="px-4 py-1 rounded-sm border border-etna dark:border-nebbiolo flex flex-row gap-2 items-center bg-primitivo/10 dark:bg-primitivo/10 cursor-default">
                          <XIcon className="w-4 h-4 text-primitivo dark:text-primitivo" />
                          <EmbloyP className={"text-xs text-primitivo dark:text-primitivo"}>Rejected</EmbloyP>
                        </button>
                    }
                    
                    <button onClick={() => handleUpdate("update")} className="px-4 py-1 rounded-sm border border-transparent dark:border-transparent flex flex-row gap-2 items-center">
                      <EmbloyP className={"text-xs text-capri dark:text-capri"}>Update Status</EmbloyP>
                    </button>
                  </EmbloyH>
              }
              {
                status === "update" && 
                  <EmbloyV className="border border-etna dark:border-nebbiolo px-1.5 py-1 gap-px rounded-md  ">
                      <EmbloyH className="gap-2 justify-between items-start">
                        <EmbloyH className="gap-4 items-center">
                          <EmbloyP className="cursor-pointer font-semibold text-xs hover:underline decoration-dotted">Options:</EmbloyP>
                          <EmbloyH className="gap-2 justify-start items-center"> 
                            {
                              details.application.status !== "rejected" && 
                                <button onClick={handleReject} className="px-4 py-1 rounded-sm border border-etna dark:border-nebbiolo flex flex-row gap-2 items-center hover:bg-primitivo/10 dark:hover:bg-primitivo/10 transition-colors duration-200">
                                  <XIcon className="w-4 h-4 text-primitivo dark:text-primitivo"  />
                                  <EmbloyP className={"text-xs text-capri dark:text-capri"}>Reject</EmbloyP>
                                </button>
                            }
                            {
                              details.application.status !== "accepted" && 
                                <button onClick={handleAccept} className="px-4 py-1 rounded-sm border border-etna dark:border-nebbiolo flex flex-row gap-2 items-center hover:bg-lugana/10 dark:hover:bg-lugana/10 transition-colors duration-200">
                                  <CheckIcon className="w-4 h-4 text-lugana dark:text-lugana"  />
                                  <EmbloyP className={"text-xs text-capri dark:text-capri"}>Invite</EmbloyP>
                                </button>
                            }
                            <button onClick={handlePending} className="px-4 py-1 rounded-sm border border-etna dark:border-nebbiolo flex flex-row gap-2 items-center hover:bg-capri/10 dark:hover:bg-capri/10 transition-colors duration-200">
                              <ClockIcon className="w-4 h-4 text-capri dark:text-capri" />
                              <EmbloyP className={"text-xs text-capri dark:text-capri"}>Pending</EmbloyP>
                            </button>
                          </EmbloyH>
                        </EmbloyH>
                        <button
                          onClick={() => handleUpdate("done_update")}
                          className="font-heading text-xl text-gray-800 dark:text-gray-200"
                        >
                          &times;
                        </button>
                      </EmbloyH>
                    </EmbloyV>
              }
            </EmbloyV>
        }
      </EmbloyV>
    </EmbloyV>
  );
};

export default ApplicationDetails;
