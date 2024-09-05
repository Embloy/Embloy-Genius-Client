"use client";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { GenerateQRButton } from "./components/dom/main/misc/QRGenerator";
import { useRouter } from "next/navigation";
import Note from "./components/ui/misc/note";
import InfoField from "./components/ui/misc/info-field";
import IntegrationStatus from "./components/ui/dashboard/integration-status";
import { EmbloyPageMount, EmbloyPage, EmbloyPageBody, EmbloyPageBodySection } from "@/app/components/ui/misc/page";
import { EmbloyBox, EmbloyBoxContent } from "@/app/components/ui/misc/box";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "./components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA} from "./components/ui/misc/toolbox";
const newsItems = [
  {
    id: 1,
    imageUrl: "/img/developers.png",
    title: "Developer Documentation Published",
    description:
      "We are excited to announce the publication of our comprehensive developer documentation. Check it out to learn more about how to use our API.",
    link: "https://developers.embloy.com",
  },
  {
    id: 2,
    imageUrl: "/img/github.png",
    title: "Open Source GitHub Page Launched",
    description:
      "We have launched our open source GitHub page. Feel free to contribute and help us improve our software.",
    link: "https://github.com/embloy",
  },
  {
    id: 3,
    imageUrl: "/img/closed_beta.png",
    title: "Closed Beta Started",
    description:
      "Our closed beta has officially started. We are excited to get feedback from our early users to help us improve.",
    link: "https://embloy-platforms.involve.me/beta",
  },
];

const jobItems = [
  {
    id: 1,
    imageUrl: "/img/openpositions.jpg",
    title: "Secretary",
    description: "Should have good taste in coffee, cocktails and music.",
    job_slug: "123456789",
  },
  {
    id: 2,
    imageUrl: "/img/openpositions.jpg",
    title: "Chauffeur",
    description: "Only 7-series allowed.",
    job_slug: "123456789",
  },
];

export default function Home() {
  const [topJSXIsHovered, setTopJSXIsHovered] = useState(false);
  const [embedTopJSXIsHovered, setEmbedTopJSXIsHovered] = useState(false);
  const [topPythonIsHovered, setTopPythonIsHovered] = useState(false);
  const [embedTopPythonIsHovered, setEmbedTopPythonIsHovered] = useState(false);
  const [topRubyIsHovered, setTopRubyIsHovered] = useState(false);
  const [embedTopRubyIsHovered, setEmbedTopRubyIsHovered] = useState(false);
  const [topTypeScriptIsHovered, setTopTypeScriptIsHovered] = useState(false);
  const [embedTopTypeScriptIsHovered, setEmbedTopTypeScriptIsHovered] =
    useState(false);
  const [topGoIsHovered, setTopGoIsHovered] = useState(false);
  const [embedTopGoIsHovered, setEmbedTopGoIsHovered] = useState(false);

  const [plusIsHovered, setPlusIsHovered] = useState(false);
  const [uploadIsHovered, setUploadIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const handleUploadMouseEnter = () => {
    setUploadIsHovered(true);
  };

  const handleUploadMouseLeave = () => {
    setUploadIsHovered(false);
  };

  const handlePlusMouseEnter = () => {
    setPlusIsHovered(true);
  };

  const handlePlusMouseLeave = () => {
    setPlusIsHovered(false);
  };

  //news box

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const handleNextNews = () => {
    // Increment the current index to move to the next news item
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };

  const handlePrevNews = () => {
    // Decrement the current index to move to the previous news item
    setCurrentNewsIndex(
      (prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length
    );
  };

  const currentNews = newsItems[currentNewsIndex]; // Get the currently displayed news item

  //jobs box
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const handleNextJob = () => {
    setCurrentJobIndex((prevIndex) => (prevIndex + 1) % jobItems.length);
  };

  const handlePrevJob = () => {
    setCurrentJobIndex(
      (prevIndex) => (prevIndex - 1 + jobItems.length) % jobItems.length
    );
  };
  const currentJob = jobItems[currentJobIndex]; // Get the currently displayed job item

  const handleApply = async () => {
    const requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    const response = await fetch(
      `${siteConfig.api_url}/api/v0/handler?job_slug=${currentJob.job_slug}`,
      requestOptions
    );
    const data = await response.json();
    window.location.href = data.url;
  };

  const news_notes = [
    { message: 'Last update: 2024/07/02' }
  ]

  const ana_notes = [
    { message: 'Embloy Free Subscription required!' }
  ]

  return (
    <EmbloyPageMount className="overflow-hidden">
      <EmbloyPage>
        <EmbloyPageBody >
            <EmbloyPageBodySection>
              <EmbloyV>
                <EmbloyH className="justify-between">
                  <h1 className="font-medium text-2xl text-white">Genius Dashboard</h1>
                  <EmbloyToolbox superClassName="portrait:hidden">
                    <EmbloyToolboxImgA href="/recruitment" height="12" width="12" path="/icons/svg/amarone/plus.svg" path_hovered="/icons/svg/barbera/plus.svg"  />
                    <EmbloyToolboxImgA href="https://developers.embloy.com/docs/category/genius" height="12" width="12" path="/icons/svg/amarone/ask.svg" path_hovered="/icons/svg/barbera/ask.svg" target="_blank" />
                  </EmbloyToolbox>
                </EmbloyH>
                <EmbloySpacer/>
                <EmbloyLHPV>
                  <EmbloyV className="gap-6">
                    <EmbloyLHPV className="gap-6">
                      <EmbloyBox className="max-w-fit portrait:max-w-full">
                        <EmbloyBoxContent boxhead="Traffic report" notes={ana_notes} >
                          <div className="flex flex-col items-start justify-start gap-1.5 ">
                          </div>
                        </ EmbloyBoxContent>
                      </EmbloyBox>
                      <EmbloyBox className="max-w-fit portrait:max-w-full">
                        <EmbloyBoxContent boxhead="Integration status">
                          <IntegrationStatus/>
                        </EmbloyBoxContent>
                      </EmbloyBox>
                      
                    </EmbloyLHPV>
                    <EmbloyLHPV className="gap-6">
                      <EmbloyBox className="max-w-fit portrait:max-w-full"> 
                        <EmbloyBoxContent boxhead="News" notes={news_notes} >
                          <div className="flex flex-row items-start">
                            <div className="flex flex-col items-center justify-start gap-1.5 ">
                              <Image
                                src={currentNews.imageUrl}
                                alt={currentNews.title}
                                height="175"
                                width="275"
                                className="relative"
                              />
                              <div className="h-1" />
                              <p className=" font-medium text-md text-white">
                              {currentNews.title}
                              </p>
                              <p className="max-w-[300px] font-light text-xs ">{currentNews.description}</p>
                              <div className=" flex justify-center items-center">
                              <div className="flex flex-row items-center justify-between gap-2">
                                <button
                                  className=" font-sm text-xs text-gray-700 hover:text-embloy-gray-light rounded-full select-none"
                                  onClick={handlePrevNews}
                                >
                                  {"< Back"}
                                </button>
                                <div className="flex flex-row items-center justify-between gap-2">
                                  <p className="font-sm text-xs text-gray-700">
                                    {currentNewsIndex + 1}
                                  </p>
                                  <p className="font-sm text-xs text-gray-700">
                                    {" "}
                                    |{" "}
                                  </p>
                                  <p className="font-sm text-xs text-gray-700">
                                    {newsItems.length}
                                  </p>
                                </div>
                                <button
                                  className=" font-sm text-xs text-gray-700 hover:text-embloy-gray-light rounded-full select-none"
                                  onClick={handleNextNews}
                                >
                                  {"Next >"}
                                </button>
                              </div>
                              </div>
                              
                              
                            </div>
                        </div>
                      </ EmbloyBoxContent>
                    </EmbloyBox>
                    <EmbloyBox className="max-w-fit portrait:max-w-full">
                      <EmbloyBoxContent boxhead="Useful links" >
            
                        <ul className="w-full flex flex-col gap-2 text-sm font-light text-white list-disc pl-5" >
                          <li>
                            <a
                              href="/settings?tab=secrets"
                              className="hover:text-embloy-gray flex items-center gap-2"
                            >
                              Generate client token
                            </a>
                          </li>
                          <li>
                            <a
                              href="/settings?tab=secrets"
                              className="hover:text-embloy-gray flex items-center gap-2"
                            >
                              Manage 3rd party API keys
                            </a>   
                          </li>
                          <li>
                            <a
                              href="/recruitment"
                              className="hover:text-embloy-gray flex items-center gap-2"
                            >
                              Your jobs
                            </a>
                          </li>
                          <li>
                            <a
                              href="/settings?tab=profile"
                              className="hover:text-embloy-gray flex items-center gap-2"
                            >
                              Account settings
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://developers.embloy.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-embloy-gray flex items-center gap-2"
                            >
                              Developer documentation
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://embloy.com/dashboard/billing"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-embloy-gray flex items-center gap-2"
                            >
                              Billing
                            </a>
                          </li>
                        </ul>
                                    
                      </EmbloyBoxContent>
                    </EmbloyBox>
                  </EmbloyLHPV>
                </EmbloyV>
              </EmbloyLHPV>
            </EmbloyV>
          </EmbloyPageBodySection>
      </EmbloyPageBody>        
    </EmbloyPage>
    </EmbloyPageMount>
  );
}
