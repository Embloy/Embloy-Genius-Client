"use client";
import '@/app/globals.css'
import React, {use, useContext, useEffect} from "react";
import Link from "next/link";
import Logo from "./Logo";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {SearchBar} from "@/app/components/dom/navigation/navbar/SearchBar";
import {Notifications} from "@/app/components/dom/navigation/navbar/Notifications";
import {UserContext} from "@/app/components/dom/main/wrappers/UserContext";
import {UserBar} from "@/app/components/dom/navigation/userbar";
import {MobileBar} from "@/app/components/dom/navigation/mobilebar";
import {StoreContext} from "@/app/components/dom/main/wrappers/StoreWrapper";
import {AppContext} from "@/app/components/dom/main/wrappers/AppProvider";
import LoadingScreen from "@/app/components/dom/main/screens/LoadingScreen";
import {AvatarButton} from "@/app/components/ui/misc/avatar";
import Image from 'next/image';
import listIcon from "@/public/icons/list.svg"
import lightListIcon from "@/public/icons/listblack.svg"


const HeaderItem = ({name, link, default_path}) => {
    return (
        <li className={cn(
            default_path === link ? "stylish-header-default stylish-header-text-default" : "stylish-header stylish-header-text"
        )}>
            <Link href={link}>
                <p>{name}</p>
            </Link>
        </li>
    );
}

const Navbar = () => {
    const pathname = usePathname()

    let app = useContext(AppContext)
    let user = useContext(UserContext)
    let store = useContext(StoreContext)

    const headerPages = [{name:'Home', link:'/'}, {name:'Jobs', link:'/recruitment'}, {name:'Analytics', link:'/analytics'}]
    const {isUserbarVisible, toggleUserbar} = app;

    useEffect(() => {
      }, [isUserbarVisible]);


    return (
        <>{user ?
            (
                <>
                    <div
                        className="bg-body z-30 w-full h-14 sticky top-0 border-b-[1px] border-gray-700 flex flex-row items-center justify-center">
                        <div className="container h-full min-w-98% flex flex-row items-center justify-between">
                            <div className="flex horizontal start-0 items-center h-full gap-x-6">
                                <Logo/>
                                <div className=" h-3/5 w-[1px] rounded-full"/>
                                <ul className="hidden md:flex gap-x-6 font-normal">
                                    {headerPages.map((page, index)=>(
                                       <HeaderItem name={page.name} link={page.link} default_path={pathname} key={index} /> 
                                    ))}
                                </ul>

                            </div>
                            <div className="flex horizontal end-0 items-center h-full gap-x-6">
                                {/*
                                <div>
                                    <SearchBar />
                                </div>
                                
                                <Notifications  />
                                */}
                                <div onClick={toggleUserbar} className="flex items-center justify-center m-1">
                                    <AvatarButton updated_image={null} loading={false} user={user} w={40} h={40} styles="portrait:hidden w-10 h-10 rounded-full bg-transparent hover:bg-transparent"/>
                                    <div className='landscape:hidden w-10 h-10 flex items-center justify-center'>
                                        <Image src={listIcon} className='w-8 h-8 hidden dark:block'/>
                                        <Image src={lightListIcon} className='w-8 h-8 block dark:hidden'/>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='portrait:hidden'>
                        <UserBar isVisible={isUserbarVisible} onClose={toggleUserbar} userData={user}
                                storeData={store} />
                    </div>
                   {/* TODO: MAKE ANIMATON INSTEAD OF NOT SHOWN BUT BE AWaRE OF OVERFLOY
                    */}
                    {isUserbarVisible && (<div className='landscape:hidden'>
                        <MobileBar isVisible={isUserbarVisible} onClose={toggleUserbar} pageSection={headerPages} pathname={pathname}/>
                    </div>)}
                     
                                        
                    
                </>
            ) : (
                <LoadingScreen/>
            )
        }</>
    );
};

export default Navbar;