import React, {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/app/components/ui/misc/dropdown-menu";
import {OpenCloseScaffold} from "@/app/components/dom/main/misc/Scaffolds";
import '@/app/globals.css'


export function GeniusSettings() {

    const [genius, setGenius] = useState(false); //todo: replace with backend integration
    const [GeniusIsHovered, setGeniusIsHovered] = useState(false);
    const handleGeniusHover = () => {
        setGeniusIsHovered(true);
    };
    const handleGeniusNotHover = () => {
        setGeniusIsHovered(false);
    };


    return (
        <div
            className="text-sm c2 w-full flex flex-col items-start justify-start gap-4 py-4">
            <OpenCloseScaffold
                title="Embloy Genius"
                pre_text="Receive candidate suggestions aligning with your individual requirements."
                link_text="Learn more"
                link_url="https://developers.embloy.com/docs/category/genius"
                post_text=""
                button_text="Open controls"
                timeout={false}
                headerChild={
                    <div className="flex flex-col sm:flex-row items-center justify-start gap-3">
                        <div className="border border-transparent bg-red-500 px-2 rounded-full">
                            <p className="text-white text-xs">Inactive</p>
                        </div>
                        <div className="border border-gray-700 px-2 rounded-full">
                            <p className="c3 text-xs">Functionality disabled</p>
                        </div>
                    </div>}
                child={<div className="w-full flex flex-col items-start justify-start gap-1">

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="outline-none" onMouseEnter={handleGeniusHover}
                                             onMouseLeave={handleGeniusNotHover}
                                             disabled={true}

                        >
                            <button className="c0 h-7 w-full sm:w-40 px-2 border-[2px] border-gray-700 outline-none select-all rounded-lg text-left cursor-not-allowed">
                                <p className="c3">{genius ? "Enabled" : "Disabled"}</p>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuCheckboxItem
                                key={"Enabled"}
                                className="capitalize c2 hover:c0 cursor-pointer"
                                checked={genius == true}
                                onCheckedChange={(check) => {
                                    if (check) {
                                        setGenius(true)
                                    }
                                }}
                            >
                                {"Enabled"}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                key={"Disabled"}
                                className="capitalize c2 hover:c0 cursor-pointer"
                                checked={genius == false}
                                onCheckedChange={(check) => {
                                    if (check) {
                                        setGenius(false)
                                    }
                                }}
                            >
                                {"Disabled"}
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>}
            />
        </div>


    )
}