"use client";
import Image from "next/image";
import React, { useState } from "react";
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
                  <h1 className="page-header">Genius Dashboard</h1>
                  <EmbloyToolbox superClassName="portrait:hidden">
                    <EmbloyToolboxImgA href="/recruitment" height="12" width="12" path="/icons/svg/black/plus.svg" path_hovered="/icons/svg/leidoveneta/plus.svg" dark_path="/icons/svg/amarone/plus.svg" dark_path_hovered="/icons/svg/barbera/plus.svg"  />
                    <EmbloyToolboxImgA href="https://developers.embloy.com/docs/category/genius" height="12" width="12" path="/icons/svg/black/ask.svg" path_hovered="/icons/svg/leidoveneta/ask.svg" dark_path="/icons/svg/amarone/ask.svg" dark_path_hovered="/icons/svg/barbera/ask.svg" target="_blank" />
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
                              <p className=" font-medium text-md text-page-head">
                              {currentNews.title}
                              </p>
                              <p className="max-w-[300px] font-light text-xs ">{currentNews.description}</p>
                              <div className=" flex justify-center items-center">
                              <div className="flex flex-row items-center justify-between gap-2">
                                <button
                                  className=" font-sm text-xs text-lagunaveneta dark:text-amarone hover:text-golfonapoli dark:hover:text-barbera rounded-full select-none"
                                  onClick={handlePrevNews}
                                >
                                  {"< Back"}
                                </button>
                                <div className="flex flex-row items-center justify-between gap-2">
                                  <p className="font-sm text-xs text-lagunaveneta dark:text-amarone">
                                    {currentNewsIndex + 1}
                                  </p>
                                  <p className="font-sm text-xs text-lagunaveneta dark:text-amarone">
                                    {" "}
                                    |{" "}
                                  </p>
                                  <p className="font-sm text-xs text-lagunaveneta dark:text-amarone">
                                    {newsItems.length}
                                  </p>
                                </div>
                                <button
                                  className=" font-sm text-xs text-lagunaveneta dark:text-amarone hover:text-golfonapoli dark:hover:text-barbera rounded-full select-none"
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
            
                        <ul className="w-full flex flex-col gap-2 text-sm font-light text-page-head list-disc pl-5" >
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
