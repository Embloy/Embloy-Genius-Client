"use client";
import { siteConfig } from '@/config/site';
import Image from 'next/image'
import React, {useState} from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';


  const newsItems = [
    {
      id: 1,
      imageUrl: '/img/developers.png',
      title: 'Developer Documentation Published',
      description: 'We are excited to announce the publication of our comprehensive developer documentation. Check it out to learn more about how to use our API.',
      link: 'https://developers.embloy.com',
      },
    {
      id: 2,
      imageUrl: '/img/github.png',
      title: 'Open Source GitHub Page Launched',
      description: 'We have launched our open source GitHub page. Feel free to contribute and help us improve our software.',
      link: 'https://github.com/embloy',
      },
    {
      id: 3,
      imageUrl: '/img/closed_beta.png',
      title: 'Closed Beta Started',
      description: 'Our closed beta has officially started. We are excited to get feedback from our early users to help us improve.',
      link: 'https://embloy-platforms.involve.me/beta',
      },

  ];

const jobItems = [
  {
    id: 1,
    imageUrl: '/img/openpositions.jpg',
    title: 'Secretary',
    description: 'Should have good taste in coffee, cocktails and music.',
    job_slug: '123456789',
  },
  {
    id: 2,
    imageUrl: '/img/openpositions.jpg',
    title: 'Chauffeur',
    description: 'Only 7-series allowed.',
    job_slug: '123456789',
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
  const [embedTopTypeScriptIsHovered, setEmbedTopTypeScriptIsHovered] = useState(false);
  const [topGoIsHovered, setTopGoIsHovered] = useState(false);
  const [embedTopGoIsHovered, setEmbedTopGoIsHovered] = useState(false);

  const [plusIsHovered, setPlusIsHovered] = useState(false);
  const [uploadIsHovered, setUploadIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);


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
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
  };

  const currentNews = newsItems[currentNewsIndex]; // Get the currently displayed news item

  //jobs box
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const handleNextJob = () => {
    setCurrentJobIndex((prevIndex) => (prevIndex + 1) % jobItems.length);
  };
  
  const handlePrevJob = () => {
    setCurrentJobIndex((prevIndex) => (prevIndex - 1 + jobItems.length) % jobItems.length);
  };
  const currentJob = jobItems[currentJobIndex]; // Get the currently displayed job item

  const handleApply = async () => {
    const requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
  
    const response = await fetch(`${siteConfig.api_url}/api/v0/handler?job_slug=${currentJob.job_slug}`, requestOptions);
    const data = await response.json();
    window.location.href = data.url;
  };

  return (

<main className="text-white flex min-h-screen h-full flex-col items-center ">
  <div className="overflow-hidden z-10 max-w-6xl w-full min-h-screen h-full border-l-[1px] border-r-[1px] border-gray-700 justify-between p-4">
    <div className="w-full flex sm:flex-col md:flex-row items-center justify-between my-4">
      <h1 className="font-medium text-2xl ">Genius Dashboard</h1>
      <div className="flex flex-row items-center justify-end gap-4 mt-4 md:mt-0">
        <a href="/recruitment" onMouseEnter={handlePlusMouseEnter} onMouseLeave={handlePlusMouseLeave}>
          <Image
              src={plusIsHovered ? "/icons/plus-light.svg" : "/icons/plus-dark.svg"}
              alt="Logo"
              height="35"
              width="35"
              className="relative"
          />
        </a>
        <a href="/recruitment" onMouseEnter={handleUploadMouseEnter} onMouseLeave={handleUploadMouseLeave}>
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

    <div className="w-full flex flex-col sm:flex-row items-start justify-start my-6 gap-6">

<div className="w-full sm:w-2/3 py-4 px-8 flex flex-col items-start justify-between gap-2 bg-embloy-purple text-white rounded-lg border-[1px] border-transparent transition duration-200 ease-in-out hover:border-white overflow-auto h-[750px]">
  <div className="px-4 py-2 rounded-full border-[2px] border-white">
  <h1 className="font-medium text-xl">Quicklink Integration</h1>
        </div>
        <div className="flex flex-col justify-start gap-0.5 w-full">
          <div className="h-[1px] w-full rounded-full bg-embloy-purple-lighter" />          <h1 className="font-medium text-sm text-embloy-purple-lighter">Note:</h1>
          <p>You need to be subscribed at least to&nbsp; 
                  <a className="font-medium hover:text-embloy-purple-lighter" href="https://embloy.com/dashboard/billing" target="_blank" rel="noopener noreferrer">
                      <strong>Embloy Free</strong>
                  </a>
                  .
              </p>
            </div>

            <div className="flex flex-col w-full">
                <div className="h-[1px] w-full rounded-full bg-embloy-purple-lighter" />
            </div>

            <div className="flex flex-row gap-5 text-md">
              <p>1.&nbsp;
                <a className="font-medium hover:text-embloy-purple-lighter" href="https://developers.embloy.com/docs/core/jobs/create_jobs" target="_blank" rel="noopener noreferrer">
                    <strong>Create or import</strong>
                </a> a job
              </p>
            </div>
            <div className="flex flex-row gap-5 text-md">
                <p>2. Copy the job's jobslug</p>
            </div>
            <div className="flex flex-row gap-5 text-md">
              <p>3.&nbsp;
                <a className="font-medium hover:text-embloy-purple-lighter" href="/settings?tab=access" target="_blank" rel="noopener noreferrer">
                    <strong>Generate a client token</strong>
                </a>
              </p>
            </div>
            <div className="flex flex-row gap-5 text-md">
                <p>4. Copy-Paste the following code in your client:</p>
            </div>

          <button 
        className={`w-full flex flex-col items-center justify-start border-white border-[1px] rounded-lg p-2 ${topJSXIsHovered ? 'h-[520px]' : 'h-[45px]'}`} 
        onMouseEnter={() => setTopJSXIsHovered(true)} 
        onMouseLeave={() => setTopJSXIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(`<button onClick={handleApplyClick}>
  <img src="https://embloy.com/images/button-black_large.svg" style={{ width: "300px", height: "auto" }} />
</button>`);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 3000);
        }}

      >        <div className="w-full flex flex-row items-center justify-between">
                  {!topJSXIsHovered && (
                        <><div className="flex flex-row items-center justify-start gap-2">
                          <Image
                            src="/icons/rev-v-purple-lighter.svg"
                            alt="Logo"
                            height="10"
                            width="10"
                            className="relative rotate-180" />
                          <p className="font-semibold text-sm text-embloy-purple-lighter">CLIENT-SIDE</p>
                          <p className="font-bold text-sm">JSX</p>
                        </div>
                        </>
                  )}
                  
                  {topJSXIsHovered && (
                      <div className="flex flex-row items-center justify-start gap-2">
                          <Image
                              src="/icons/rev-v-green.svg"
                              alt="Logo"
                              height="10"
                              width="10"
                              className="relative"
                              />
                          <p className="font-semibold text-sm text-embloy-green">CLIENT-SIDE</p>
                          <p className="font-bold text-sm">JSX</p>
                      </div>
                  )}
              <a
                href="#"
                onMouseEnter={() => setEmbedTopJSXIsHovered(true)}
                onMouseLeave={() => setEmbedTopJSXIsHovered(false)}
                      >
                <Image
                  src={embedTopJSXIsHovered ? "/icons/embed-purple-lighter.svg" : "/icons/embed-white.svg"}
                  alt="Logo"
                  height="25"
                  width="25"
                  className="relative"
                />
              </a>
            </div>
            {topJSXIsHovered && (
            <>
              <div className="w-full flex flex-row items-center justify-start g-2">
              {!isCopied && <p className="font-light text-xs text-embloy-purple-lighter opacity-60">Click to copy this code</p>}
              {isCopied && <p className='font-medium text-xs text-embloy-purple-lighter opacity-60'>Code copied to clipboard!</p>}
              </div>
              <SyntaxHighlighter 
                language="jsx" 
                style={nightOwl} 
                customStyle={{maxWidth: '100%', overflowX: 'auto'}}
              >
                {`<button onClick={handleApplyClick}>
  <img src="https://embloy.com/images/button-black_large.svg" style={{ width: "300px", height: "auto" }} />
</button>`}
              </SyntaxHighlighter>
            </>
          )}
          </button>

          <div>
              <p>5. Copy-Paste the following code in your server:</p>
          </div>

          <button 
        className={`w-full flex flex-col items-center justify-start border-white border-[1px] rounded-lg p-2 ${topGoIsHovered ? 'h-[520px]' : 'h-[45px]'}`} 
        onMouseEnter={() => setTopGoIsHovered(true)} 
        onMouseLeave={() => setTopGoIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(`func yourExampleEndpoint(c *gin.Context) {
// Call Embloy-Go SDK to get a request_token
client := embloy.NewEmbloyClient("your-client-token", map[string]string{
    "mode":        "job",
    "job_slug":    "your-job-slug",
    "success_url": "your-success-url",
    "cancel_url":  "your-cancel-url",
})

redirectURL, err := client.MakeRequest()
if err != nil {
    fmt.Println("Error:", err)
    return
}

// Redirect to the Embloy application portal
c.Redirect(http.StatusFound, redirectURL)`);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 3000);
        }}

      >        <div className="w-full flex flex-row items-center justify-between">
                  {!topGoIsHovered && (
                        <><div className="flex flex-row items-center justify-start gap-2">
                          <Image
                            src="/icons/rev-v-purple-lighter.svg"
                            alt="Logo"
                            height="10"
                            width="10"
                            className="relative rotate-180" />
                          <p className="font-semibold text-sm text-embloy-purple-lighter">SERVER-SIDE</p>
                          <p className="font-bold text-sm">Go</p>
                        </div>
                        </>
                  )}
                  
                  {topGoIsHovered && (
                      <div className="flex flex-row items-center justify-start gap-2">
                          <Image
                              src="/icons/rev-v-green.svg"
                              alt="Logo"
                              height="10"
                              width="10"
                              className="relative"
                              />
                          <p className="font-semibold text-sm text-embloy-green">SERVER-SIDE</p>
                          <p className="font-bold text-sm">Go</p>
                      </div>
                  )}
              <a
                href="#"
                onMouseEnter={() => setEmbedTopGoIsHovered(true)}
                onMouseLeave={() => setEmbedTopGoIsHovered(false)}
                      >
                <Image
                  src={embedTopGoIsHovered ? "/icons/embed-purple-lighter.svg" : "/icons/embed-white.svg"}
                  alt="Logo"
                  height="25"
                  width="25"
                  className="relative"
                />
              </a>
            </div>
            {topGoIsHovered && (
            <>
      <div className="w-full flex flex-row items-left justify-start g-2" style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {!isCopied && <p className="font-light text-xs text-embloy-purple-lighter opacity-60">Click to copy this code</p>}
        {isCopied && <p className='font-medium text-xs text-embloy-purple-lighter opacity-60'>Code copied to clipboard!</p>}

      </div>
      <SyntaxHighlighter 
        language="go" 
        style={nightOwl} 
        customStyle={{maxWidth: '100%', overflowX: 'auto', textAlign: 'left'}}
      >
        {`func yourExampleEndpoint(c *gin.Context) {
// Call Embloy-Go SDK to get a request_token
client := embloy.NewEmbloyClient("your-client-token", map[string]string{
    "mode":        "job",
    "job_slug":    "your-job-slug",
    "success_url": "your-success-url",
    "cancel_url":  "your-cancel-url",
})

redirectURL, err := client.MakeRequest()
if err != nil {
    fmt.Println("Error:", err)
    return
}

// Redirect to the Embloy application portal
c.Redirect(http.StatusFound, redirectURL)`}
      </SyntaxHighlighter>
            </>
          )}
          </button>

          <button 
        className={`w-full flex flex-col items-center justify-start border-white border-[1px] rounded-lg p-2 ${topTypeScriptIsHovered ? 'h-[520px]' : 'h-[45px]'}`} 
        onMouseEnter={() => setTopTypeScriptIsHovered(true)} 
        onMouseLeave={() => setTopTypeScriptIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(`const session = new EmbloySession({
  mode: "job",
  job_slug: "your-job-slug",
  success_url: "your-success-url",
  cancel_url: "your-cancel-url",
});
const embloy = new EmbloyClient("your-client-token", session);

embloy.makeRequest()
  .then(result => window.location.href = result)
  .catch(error => console.error(error.message));`);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 3000);
        }}

      >        <div className="w-full flex flex-row items-center justify-between">
                  {!topTypeScriptIsHovered && (
                        <><div className="flex flex-row items-center justify-start gap-2">
                          <Image
                            src="/icons/rev-v-purple-lighter.svg"
                            alt="Logo"
                            height="10"
                            width="10"
                            className="relative rotate-180" />
                          <p className="font-semibold text-sm text-embloy-purple-lighter">SERVER-SIDE</p>
                          <p className="font-bold text-sm">TypeScript</p>
                        </div>
                        </>
                  )}
                  
                  {topTypeScriptIsHovered && (
                      <div className="flex flex-row items-center justify-start gap-2">
                          <Image
                              src="/icons/rev-v-green.svg"
                              alt="Logo"
                              height="10"
                              width="10"
                              className="relative"
                              />
                          <p className="font-semibold text-sm text-embloy-green">SERVER-SIDE</p>
                          <p className="font-bold text-sm">TypeScript</p>
                      </div>
                  )}
              <a
                href="#"
                onMouseEnter={() => setEmbedTopTypeScriptIsHovered(true)}
                onMouseLeave={() => setEmbedTopTypeScriptIsHovered(false)}
                      >
                <Image
                  src={embedTopTypeScriptIsHovered ? "/icons/embed-purple-lighter.svg" : "/icons/embed-white.svg"}
                  alt="Logo"
                  height="25"
                  width="25"
                  className="relative"
                />
              </a>
            </div>
            {topTypeScriptIsHovered && (
            <>
      <div className="w-full flex flex-row items-left justify-start g-2" style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {!isCopied && <p className="font-light text-xs text-embloy-purple-lighter opacity-60">Click to copy this code</p>}
        {isCopied && <p className='font-medium text-xs text-embloy-purple-lighter opacity-60'>Code copied to clipboard!</p>}

      </div>
      <SyntaxHighlighter 
        language="ts" 
        style={nightOwl} 
        customStyle={{maxWidth: '100%', overflowX: 'auto', textAlign: 'left'}}
      >
        {`// Replace with your actual values
const session = new EmbloySession({
  mode: "job",
  job_slug: "your-job-slug",
  success_url: "your-success-url",
  cancel_url: "your-cancel-url",
});
const embloy = new EmbloyClient("your-client-token", session);

embloy.makeRequest()
  .then(result => window.location.href = result)
  .catch(error => console.error(error.message));`}
      </SyntaxHighlighter>
            </>
          )}
          </button>

          <button 
        className={`w-full flex flex-col items-center justify-start border-white border-[1px] rounded-lg p-2 ${topRubyIsHovered ? 'h-[520px]' : 'h-[45px]'}`} 
        onMouseEnter={() => setTopRubyIsHovered(true)} 
        onMouseLeave={() => setTopRubyIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(`# Replace 'YOUR_CLIENT_TOKEN' with your actual client token
      session = {
          mode: "job",
          job_slug: "your_job_slug",
          success_url: "your_success_url",
          cancel_url: "your_cancel_url"
      }
      client = Embloy::Client.new('YOUR_CLIENT_TOKEN', session)
      redirect_url = client.make_request
      redirect_to redirect_url`);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 3000);
        }}

      >        <div className="w-full flex flex-row items-center justify-between">
                  {!topRubyIsHovered && (
                        <><div className="flex flex-row items-center justify-start gap-2">
                          <Image
                            src="/icons/rev-v-purple-lighter.svg"
                            alt="Logo"
                            height="10"
                            width="10"
                            className="relative rotate-180" />
                          <p className="font-semibold text-sm text-embloy-purple-lighter">SERVER-SIDE</p>
                          <p className="font-bold text-sm">Ruby</p>
                        </div>
                        </>
                  )}
                  
                  {topRubyIsHovered && (
                      <div className="flex flex-row items-center justify-start gap-2">
                          <Image
                              src="/icons/rev-v-green.svg"
                              alt="Logo"
                              height="10"
                              width="10"
                              className="relative"
                              />
                          <p className="font-semibold text-sm text-embloy-green">SERVER-SIDE</p>
                          <p className="font-bold text-sm">Ruby</p>
                      </div>
                  )}
              <a
                href="#"
                onMouseEnter={() => setEmbedTopRubyIsHovered(true)}
                onMouseLeave={() => setEmbedTopRubyIsHovered(false)}
                      >
                <Image
                  src={embedTopRubyIsHovered ? "/icons/embed-purple-lighter.svg" : "/icons/embed-white.svg"}
                  alt="Logo"
                  height="25"
                  width="25"
                  className="relative"
                />
              </a>
            </div>
            {topRubyIsHovered && (
            <>
      <div className="w-full flex flex-row items-left justify-start g-2" style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {!isCopied && <p className="font-light text-xs text-embloy-purple-lighter opacity-60">Click to copy this code</p>}
        {isCopied && <p className='font-medium text-xs text-embloy-purple-lighter opacity-60'>Code copied to clipboard!</p>}

      </div>
      <SyntaxHighlighter 
        language="rb" 
        style={nightOwl} 
        customStyle={{maxWidth: '100%', overflowX: 'auto', textAlign: 'left'}}
      >
        {`# Replace 'YOUR_CLIENT_TOKEN' with your actual client token
      session = {
          mode: "job",
          job_slug: "your_job_slug",
          success_url: "your_success_url",
          cancel_url: "your_cancel_url"
      }
      client = Embloy::Client.new('YOUR_CLIENT_TOKEN', session)
      redirect_url = client.make_request
      redirect_to redirect_url`}
      </SyntaxHighlighter>
            </>
          )}
          </button>

          <button 
        className={`w-full flex flex-col items-center justify-start border-white border-[1px] rounded-lg p-2 ${topPythonIsHovered ? 'h-[520px]' : 'h-[45px]'}`} 
        onMouseEnter={() => setTopPythonIsHovered(true)} 
        onMouseLeave={() => setTopPythonIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          navigator.clipboard.writeText(`# Replace with your actual values
client_token = 'your_client_token'
session = {
    'mode': 'job',
    'job_slug': 'your_job_slug',
    'success_url': 'your_success_url',
    'cancel_url': 'your_cancel_url'
}

# Create an instance of the EmbloyClient
embloy_client = EmbloyClient(client_token, session)

# Make a request to the Embloy API
redirect_url = embloy_client.make_reques`);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 3000);
        }}

      >        <div className="w-full flex flex-row items-center justify-between">
                  {!topPythonIsHovered && (
                        <><div className="flex flex-row items-center justify-start gap-2">
                          <Image
                            src="/icons/rev-v-purple-lighter.svg"
                            alt="Logo"
                            height="10"
                            width="10"
                            className="relative rotate-180" />
                          <p className="font-semibold text-sm text-embloy-purple-lighter">SERVER-SIDE</p>
                          <p className="font-bold text-sm">Python</p>
                        </div>
                        </>
                  )}
                  
                  {topPythonIsHovered && (
                      <div className="flex flex-row items-center justify-start gap-2">
                          <Image
                              src="/icons/rev-v-green.svg"
                              alt="Logo"
                              height="10"
                              width="10"
                              className="relative"
                              />
                          <p className="font-semibold text-sm text-embloy-green">SERVER-SIDE</p>
                          <p className="font-bold text-sm">Python</p>
                      </div>
                  )}
              <a
                href="#"
                onMouseEnter={() => setEmbedTopPythonIsHovered(true)}
                onMouseLeave={() => setEmbedTopPythonIsHovered(false)}
                      >
                <Image
                  src={embedTopPythonIsHovered ? "/icons/embed-purple-lighter.svg" : "/icons/embed-white.svg"}
                  alt="Logo"
                  height="25"
                  width="25"
                  className="relative"
                />
              </a>
            </div>
            {topPythonIsHovered && (
            <>
      <div className="w-full flex flex-row items-left justify-start g-2" style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {!isCopied && <p className="font-light text-xs text-embloy-purple-lighter opacity-60">Click to copy this code</p>}
        {isCopied && <p className='font-medium text-xs text-embloy-purple-lighter opacity-60'>Code copied to clipboard!</p>}

      </div>
      <SyntaxHighlighter 
        language="python" 
        style={nightOwl} 
        customStyle={{maxWidth: '100%', overflowX: 'auto', textAlign: 'left'}}
      >
        {`# Replace with your actual values
client = 'your_client_token'
session = {
    'mode': 'job',
    'job_slug': 'your_job_slug',
    'success_url': 'your_success_url',
    'cancel_url': 'your_cancel_url'
}

# Create an instance of the EmbloyClient
embloy_client = EmbloyClient(client_token, session)

# Make a request to the Embloy API
redirect_url = embloy_client.make_reques`}
      </SyntaxHighlighter>
            </>
          )}
          </button>

          <div className='h-[475px]' />
          <div className="w-full flex flex-row items-center justify-between">
            <a className="font-medium text-sm text-embloy-purple-light hover:text-embloy-purple-lighter" href="https://developers.embloy.com/docs/sdks/overview" target="_blank" rel="noopener noreferrer">GO TO DOCUMENTATION</a>
          </div>
        </div>
  
        <div className="md:w-1/3">
          <div className=" py-4 items-start justify-start px-8 flex flex-col gap-2 bg-embloy-purple text-white rounded-lg border-[1px] border-transparent transition duration-200 ease-in-out hover:border-white overflow-auto h-[450px]">
          <div className="w-full flex flex-row items-start justify-between">
            <div className="px-4 py-2 rounded-full border-[2px] border-white">
              <h1 className="font-medium text-xl">News</h1>
            </div>

            <div className="py-2 flex flex-row items-center justify-between gap-2">
              <p className="font-normal text-sm text-embloy-purple-light">{currentNewsIndex + 1}</p>
              <p className="font-normal text-sm text-embloy-purple-light"> | </p>
              <p className="font-normal text-sm text-embloy-purple-light">{newsItems.length}</p>
            </div>

            <div className="py-2 flex flex-row items-center justify-between gap-2">
            <button className="p-1 font-medium text-sm text-embloy-purple-light hover:text-embloy-purple-lighter rounded-full" onClick={handlePrevNews}>Previous</button>
            <button className="p-1 font-medium text-sm text-embloy-purple-light hover:text-embloy-purple-lighter rounded-full" onClick={handleNextNews}>Next</button>
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
            <a className="font-medium text-sm text-embloy-purple-light hover:text-embloy-purple-lighter" href={currentNews.link} target="_blank" rel="noopener noreferrer">DETAILS</a>
          </div>
          </div>

          <div className="my-5 py-4 px-8 flex flex-col gap-2 bg-embloy-purple text-white rounded-lg border-[1px] border-transparent transition duration-200 ease-in-out hover:border-white overflow-auto h-[280px]">
            <div className="w-full flex flex-row items-start justify-between">
              <div className="px-4 py-2 rounded-full border-[2px] border-white">
                <h1 className="font-medium text-xl">Useful links</h1>
              </div>
            </div>

            <div className="w-full flex flex-row items-center justify-center">
            </div>

            <div className="w-full flex flex-col gap-2">
              <a href="/settings?tab=access" className="text-md hover:text-embloy-purple-lighter flex items-center gap-2">
                <img src="/icons/access-light.svg" alt="access icon" style={{width: '20px', height: '20px'}} />
                Generate client token
              </a>
              <a href="/recruitment" className="text-md hover:text-embloy-purple-lighter flex items-center gap-2">
                <img src="/icons/integrations-light.svg" alt="job icon" style={{width: '20px', height: '20px'}} />
                Your jobs
              </a>
              <a href="/settings?tab=profile" className="text-md hover:text-embloy-purple-lighter flex items-center gap-2">
                <img src="/icons/profile-light.svg" alt="profile icon" style={{width: '20px', height: '20px'}} />
                Account settings
              </a>
              <a href="https://developers.embloy.com" target="_blank" rel="noopener noreferrer" className="text-md hover:text-embloy-purple-lighter flex items-center gap-2">
                <img src="/icons/sm-plugged-in-light.svg" alt="api icon" style={{width: '20px', height: '20px'}} />
                Developer documentation
              </a>
              <a href="https://embloy.com/dashboard/billing" target="_blank" rel="noopener noreferrer" className="text-md hover:text-embloy-purple-lighter flex items-center gap-2">
                <img src="/icons/columns-light.svg" alt="billing icon" style={{width: '20px', height: '20px'}} />
                Billing
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  )
}
