"use client";
import Image from 'next/image'
import AuthWrapper from "@/app/components/misc/AuthWrapper";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {get_core} from "@/lib/misc_requests";
import LoadingScreen from "@/app/components/misc/LoadingScreen";


const newsItems = [
  {
    id: 1,
    imageUrl: '/img/news1.png',
    title: 'News 1',
    description: 'Description for News 1...',
    link: 'https://www.about.embloy.com',
  },
  {
    id: 2,
    imageUrl: '/img/news2.png',
    title: 'News 2',
    description: 'Description for News 2...',
    link: 'https://www.about.embloy.com',
  },
];


export default function Hme() {
  //todo: make analytics api endpoints
  //todo: make news endpoints


  // real time insights box



  const [topJobIsHovered, setTopJobIsHovered] = useState(false);
  const [embedTopJobIsHovered, setEmbedTopJobIsHovered] = useState(false);
  const [plusIsHovered, setPlusIsHovered] = useState(false);
  const [uploadIsHovered, setUploadIsHovered] = useState(false);


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


  const handleEmbedTopJobMouseEnter = () => {
    setEmbedTopJobIsHovered(true);
  };

  const handleEmbedTopJobMouseLeave = () => {
    setEmbedTopJobIsHovered(false);
  };


  const handleTopJobMouseEnter = () => {
    setTopJobIsHovered(true);
  };

  const handleTopJobMouseLeave = () => {
    setTopJobIsHovered(false);
  };

  //news box

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const handleNextNews = () => {
    // Increment the current index to move to the next news item
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };

  const handlePrevNews = () => {
    // Decrement the current index to move to the previous news item
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
  };

  const currentNews = newsItems[currentNewsIndex]; // Get the currently displayed news item



  return (

    <main className=" text-white flex min-h-screen h-full flex-col items-center ">
      <div className="z-10 max-w-6xl w-full min-h-screen h-full border-l-[1px] border-r-[1px] border-gray-700 justify-between p-4">
        <div className="w-full flex flex-row items-center justify-between my-4">
          <h1 className="font-medium text-2xl ">Genius Dashboard</h1>
          <div className="flex flex-row items-center justify-end gap-4">
            <a href="https://www.about.embloy.com" onMouseEnter={handlePlusMouseEnter} onMouseLeave={handlePlusMouseLeave}>
              <Image
                  src={plusIsHovered ? "/icons/plus-light.svg" : "/icons/plus-dark.svg"}
                  alt="Logo"
                  height="35"
                  width="35"
                  className="relative"
              />
            </a>
            <a href="https://www.about.embloy.com" onMouseEnter={handleUploadMouseEnter} onMouseLeave={handleUploadMouseLeave}>
              <Image
                  src={uploadIsHovered ? "/icons/upload-light.svg" : "/icons/upload-dark.svg"}
                  alt="Logo"
                  height="35"
                  width="35"
                  className="relative"
              />
            </a>
          </div>


        </div>
        <div className="w-screen h-6" />

        <div className="w-full flex flex-row items-start justify-first my-6 gap-6">

          <div className="max-w-3/10 py-4 px-8 flex flex-col items-start justify-start gap-2 bg-embloy-purple text-white rounded-lg border-[1px] border-transparent transition duration-200 ease-in-out hover:border-white ">
            <div className="px-4 py-2 rounded-full border-[1px] border-white">
              <h1 className="font-medium text-xl">Real-time insights</h1>
            </div>

            <div className="w-full flex flex-row items-center justify-center">
              <div className="my-2 h-[1px] w-10/12 rounded-full " />
            </div>

            <div className="flex flex-col gap-0.5 w-full" >
              <div className="h-[1px] w-full rounded-full bg-embloy-purple-lighter" />
              <h1 className="font-medium text-sm text-embloy-purple-lighter">Summary:</h1>
            </div>

            <div className="flex flex-row gap-5" >
              <p className="font-normal text-sm">You have <strong>8 jobs</strong> running publicly</p>
            </div>

            <div className="flex flex-row gap-5" >
              <p className="font-normal text-sm">Your jobs currently average <strong>750 clicks/hour</strong></p>
            </div>

            <div className="h-4" />

            <div className="flex flex-col gap-0.5 w-full" >
              <div className="h-[1px] w-full rounded-full bg-embloy-purple-lighter" />
              <h1 className="font-medium text-sm text-embloy-purple-lighter">Top job:</h1>
            </div>

            <button className="w-full flex flex-col items-center justify-start border-white border-[1px] rounded-lg p-2"  onMouseEnter={handleTopJobMouseEnter} onMouseLeave={handleTopJobMouseLeave}>
              <div className="w-full flex flex-row items-center justify-between">
                {!topJobIsHovered && (
                    <div className="flex flex-row items-center justify-start gap-2">
                      <Image
                          src="/icons/rev-v-purple-lighter.svg"
                          alt="Logo"
                          height="10"
                          width="10"
                          className="relative"
                      />
                      <p className="font-semibold text-sm text-embloy-purple-lighter">1430/hr</p>
                      <p className="font-bold text-sm">Barista</p>
                    </div>
                  )}
                {topJobIsHovered && (
                    <div className="flex flex-row items-center justify-start gap-2">
                      <Image
                          src="/icons/rev-v-green.svg"
                          alt="Logo"
                          height="10"
                          width="10"
                          className="relative"
                      />
                      <p className="font-semibold text-sm text-embloy-green">1430/hr</p>
                      <p className="font-bold text-sm">Barista</p>
                    </div>
                )}

                <a href="https://www.about.embloy.com" onMouseEnter={handleEmbedTopJobMouseEnter} onMouseLeave={handleEmbedTopJobMouseLeave}>
                  <Image
                      src={embedTopJobIsHovered ? "/icons/embed-purple-lighter.svg" : "/icons/embed-white.svg"}
                      alt="Logo"
                      height="25"
                      width="25"
                      className="relative"
                  />
                </a>
              </div>
              {topJobIsHovered && (
                  <>
                    <div className="h-2" />
                    <div className="w-full flex flex-row items-center justify-start g-2">
                      <p className="font-light text-xs text-embloy-purple-lighter opacity-50">00:42 2023/11/23</p>
                    </div>
                  </>
              )}

            </button>

            <div className="h-12" />

            <div className="w-full flex flex-row items-center justify-between">
              <a className="font-medium text-sm text-embloy-purple-light hover:text-embloy-purple-lighter" href="https://www.about.embloy.com">GO TO ANALYTICS</a>
            </div>
          </div>


          <div className="max-w-6/10 py-4 px-8 flex flex-col items-start justify-start gap-2 bg-embloy-purple text-white rounded-lg border-[1px] border-transparent transition duration-200 ease-in-out hover:border-white ">
            <div className="w-full flex flex-row items-start justify-between">
              <div className="px-4 py-2 rounded-full border-[1px] border-white">
                <h1 className="font-medium text-xl">News</h1>
              </div>

              <div className="py-2 flex flex-row items-center justify-between gap-2">
                <p className="font-normal text-sm text-embloy-purple-light">{currentNewsIndex + 1}</p>
                <p className="font-normal text-sm text-embloy-purple-light"> | </p>
                <p className="font-normal text-sm text-embloy-purple-light">{newsItems.length}</p>
              </div>

              <div className="py-2 flex flex-row items-center justify-between gap-2">
                <button className="font-medium text-sm text-embloy-purple-light hover:text-embloy-purple-lighter" onClick={handlePrevNews}>Previous</button>
                <button className="font-medium text-sm text-embloy-purple-light hover:text-embloy-purple-lighter" onClick={handleNextNews}>Next</button>
              </div>

            </div>

            <div className="w-full flex flex-row items-center justify-center">
              <div className="my-2 h-[1px] w-10/12 rounded-full " />
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <Image
                  src={currentNews.imageUrl}
                  alt={currentNews.title}
                  height="200"
                  width="300"
                  className="relative"
              />
              <div className="h-1" />
              <div className="h-[1px] w-full rounded-full bg-embloy-purple-lighter" />
              <p className="font-medium text-sm text-embloy-purple-lighter" >{currentNews.title}</p>
              <div className="h-1" />
              <p className="font-normal text-sm" >{currentNews.description}</p>
            </div>
            <div className="h-4" />
            <div className="w-full flex flex-row items-center justify-between">
              <a className="font-medium text-sm text-embloy-purple-light hover:text-embloy-purple-lighter" href={currentNews.description}>DETAILS</a>
            </div>
          </div>


        </div>



        <div className="w-full h-96" />


        <div className="w-full items-center justify-between font-mono text-sm lg:flex ">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Get started by editing&nbsp;
            <code className="font-mono font-bold">app/route.js</code>
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className="dark:invert"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Docs{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjNext.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Learn{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>



          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Deploy{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </a>
        </div>
      </div>
    </main>
  )
}
