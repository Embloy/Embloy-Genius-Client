"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import '@/app/globals.css'
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "@/app/components/ui/misc/stuff";
import { EmbloyPageMount, EmbloyPage, EmbloyPageBody, EmbloyPageBodySection, EmbloySubPage, EmbloyPageLight } from "@/app/components/ui/misc/page";
import { EmbloyH1, EmbloyP } from "@/app/components/ui/misc/text";
import { EmbloyBox, EmbloyBoxContent } from "@/app/components/ui/misc/box";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { login } from "@/lib/api/auth";

export const Signin = () => {
    const router = useRouter();
    const [loginError, setLoginError] = useState(false);
    const [internalError, setInternalError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("DOMAIN ",siteConfig.core_domain);
        setIsLoading(true);
        const res = await login(username, password);
       if (res === 200) {
            setInternalError(false);
            setLoginError(false);
            setIsLoading(false);
            router.replace("/");
        } else if (res === 401) {
            setLoginError(true);
            setUsername("");
            setPassword("");
            setIsLoading(false);
        } else {
            setInternalError(true);
            setUsername("");
            setPassword("");
            setIsLoading(false);
        }
        
    };
    const inputStyle = "mb-2 px-5 h-12 w-96 portrait:w-72 rounded-lg text-md dark:bg-nebbiolo border dark:border-amarone border-etna page-text text-md placeholder-etna dark:placeholder-amarone focus:outline-none focus:ring-2 dark:focus:ring-amarone focus:ring-lagunaveneta select-all";
    return (
        <EmbloyPageMount className="overflow-hidden">
            <EmbloyPageLight >
                <EmbloyPageBody>
                    <EmbloyPageBodySection>
                       <EmbloyV className={`fixed inset-0 flex flex-col justify-center items-center z-100 bg-body `}>
                           <EmbloyBox
                               className="dark:bg-aglianico border-[1px] border-etna dark:border-nebbiolo rounded-lg max-w-fit ">
                               <EmbloyBoxContent className="items-center">
                               <Image
                                   src="/img/logo_on_dark.svg"
                                   alt="Logo"
                                   height="50"
                                   width="185"
                                   className="mb-8 relative hidden dark:block"
                               />
                               <Image
                                   src="/img/logo_on_light.svg"
                                   alt="Logo"
                                   height="50"
                                   width="185"
                                   className="mb-8 dark:hidden"
                               />
                               <EmbloyH1 className="mb-4 text-2xl">Sign in</EmbloyH1>
                               <EmbloyP className="mb-8 ">Use your Embloy Account</EmbloyP>
                               <div className="flex flex-col items-center justify-center">
                                   <form onSubmit={handleLogin}>
                                       
                                          
                                       <EmbloyV className="items-center min-h-32">
                                           <input
                                               className={inputStyle}
                                               minLength="0"
                                               maxLength="150"
                                               name="username"
                                               id="username"
                                               type="text"
                                               placeholder="Email"
                                               required
                                               value={username}
                                               onChange={(e) => setUsername(e.target.value)}
                                           />
                                           <input
                                               className={inputStyle}
                                               minLength="8"
                                               maxLength="72"
                                               name="password"
                                               id="password"
                                               type="password"
                                               placeholder="Password"
                                               required
                                               value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                           />
                                           {loginError && (
                                               <EmbloyH className="gap-1">
                                                   <EmbloyP className="text-xs dark:text-red-500 text-red-500">Login failed.</EmbloyP>
                                                   <Link href={`${siteConfig.core_url}/password-reset`}>
                                                       <EmbloyP className="text-xs dark:text-red-500 text-red-500 cursor-pointer hover:underline">Forgot password?</EmbloyP>
                                                   </Link>
                                               </EmbloyH>
                                           )}
                                           {internalError && (
                                               <EmbloyH className="gap-1">
                                                   <EmbloyP className="text-xs dark:text-red-500 text-red-500">Login failed. This is not related to your credentials. Try again later.</EmbloyP>
                                               </EmbloyH>
                                           )}
                                       </EmbloyV>
                                       
                                       <div className="h-16"></div>
                                       <div className="flex flex-row items-center justify-between">
                                           <a
                                               type="button"
                                               className="mt-3 inline-flex mx-2 justify-center py-2 rounded-lg outline-none focus:outline-none focus:ring-2 dark:focus:ring-amarone focus:ring-lagunaveneta "
                                               href="https://www.embloy.com/en-US/register"
                                               target="_blank"
                                           >
                                               <EmbloyP className="font-semibold dark:hover:text-embloy-green hover:text-leidoveneta">
                                                   Create account
                                               </EmbloyP>
                                           </a>
                                           <button
                                               type="submit"
                                               className="mt-3 inline-flex w-20 h-10 rounded-lg border-[2px] items-center justify-center rounded-full text-sm font-semibold bg-lagunaveneta hover:bg-golfotrieste dark:bg-gradient-to-r from-embloy-green to-embloy-blue text-white dark:text-green-950 dark:hover:text-white border-2 border-lagunaveneta dark:border-embloy-green hover:border-golfotrieste placeholder-amarone outline-none focus:outline-none focus:ring-2 dark:focus:ring-amarone focus:ring-lagunaveneta select-all "
                                           >
                                           {isLoading ? (
                                               <svg aria-hidden="true"
                                                   className="inline w-7 h-7 text-gray-500 animate-spin fill-white"
                                                   viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path
                                                       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                       fill="currentColor"/>
                                                   <path
                                                       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                       fill="currentFill"/>
                                               </svg>
                                           ) : 'Next'}
                                           </button>
                                       </div>
                                   </form>

                               </div>
                               </EmbloyBoxContent>
                           </EmbloyBox>
                           <div className="flex flex-row text-xs items-center justify-center">
                               <a
                                   href="https://about.embloy.com/en/contact/"
                                   target="_blank"
                                   className="mt-3 inline-flex mx-2 justify-center py-2 "
                               >
                                   <EmbloyP className="text-xs dark:text-amarone dark:hover:text-barbera text-black hover:text-leidoveneta">
                                       Help
                                   </EmbloyP>

                               </a>
                               <a  
                                   target="_blank"
                                   href="https://embloy.com/resources/privacy"
                                   className="mt-3 inline-flex mx-2 justify-center py-2 "
                               >
                                   <EmbloyP className="text-xs dark:text-amarone dark:hover:text-barbera text-black hover:text-leidoveneta">
                                       Privacy & Terms
                                   </EmbloyP>
                                  
                               </a>
                           </div>


                           <EmbloyP className=" absolute bottom-5">©2024 • Embloy Platforms UG (haftungsbeschränkt)</EmbloyP>
                       </EmbloyV>
                   </EmbloyPageBodySection>
                </EmbloyPageBody>
            </EmbloyPageLight>
        </EmbloyPageMount>
    );
};

export default Signin;