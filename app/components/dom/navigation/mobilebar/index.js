"use client";
import React from "react";
import '@/app/globals.css'
import { EmbloyBox, EmbloyBoxContent } from "@/app/components/ui/misc/box";
import { EmbloyH, EmbloyV, EmbloySeperator, EmbloySpacer } from "@/app/components/ui/misc/stuff";
import Image from 'next/image';
import xwIcon from "@/public/icons/x-icon-white.svg"
import xbIcon from "@/public/icons/x-icon-black.svg"
import edIcon from "@/public/icons/embloy-icon-dark.svg"
import ebIcon from "@/public/icons/embloy-icon-black.svg"
import Link from "next/link";
import {cn} from "@/lib/utils";

const PageItem = ({name, link, default_path, close}) => {
    return (
        <li className={cn(
            default_path === link ? "stylish-header-default stylish-header-text-default" : "stylish-header stylish-header-text"
        )}>
            {default_path === link ?
            (
                <Link href={link} >
                    <p className="text-xl">{name}</p>
                </Link>
            ):(
                <Link href={link} onClick={close}>
                    <p className="text-xl">{name}</p>
                </Link>
            )
            }
            
        </li>
    );
}

export const MobileBar = ({ isVisible, onClose, pageSection, pathname, userData, storeData }) => {
    return (
        <EmbloyBox className={`portrait:py-3 portrait:px-0 landscape:px-0 bg-white dark:bg-ciliegiolo z-50 absolute top-0 right-0 h-full transition-transform transform ${isVisible ? ' translate-x-0' : ' translate-x-full'}`}>
            <EmbloyBoxContent className={`items-center gap-5px`}>
                <EmbloyH className={`justify-between`}>
                    <div className='w-8 h-8 flex items-center justify-center' onClick={onClose}>
                        <Image src={edIcon} className='w-8 h-8 hidden dark:block' />
                        <Image src={ebIcon} className='w-8 h-8 block dark:hidden'/>
                    </div>
                    <div className='w-8 h-8 flex items-center justify-end' onClick={onClose}>
                        <Image src={xwIcon} className='w-8 h-8 hidden dark:block'/>
                        <Image src={xbIcon} className='w-8 h-8 block dark:hidden'/>
                    </div>

                </EmbloyH>
                <EmbloySeperator className={`h-2px my-5px`}/>
                <EmbloyV className={`items-start`}>
                    <ul className="md:flex gap-x-6 font-normal">
                        {pageSection.map((page, index)=>(
                            <PageItem key={index} name={page.name} link={page.link} default_path={pathname} close={onClose}/> 
                        ))}
                    </ul>
                </EmbloyV>
            </EmbloyBoxContent>
        </EmbloyBox>
    );
}