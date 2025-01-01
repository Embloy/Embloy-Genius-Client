import React, {use, useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils";
import {set, z} from 'zod';
import {Checkbox} from "@/app/components/ui/application_preview/checkbox";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/app/components/ui/application_preview/select";
import Image from "next/image";
import './locals.css';
import dynamic from "next/dynamic";
import {OutputData} from "@editorjs/editorjs";
import {editor_to_json, json_to_editor} from "@/lib/utils/formats";
import { EmbloyButton, EmbloyChildrenAdvanced, EmbloyH, EmbloySeperator, EmbloySpacer, EmbloyV } from "@/app/components/ui/misc/stuff";
import { EmbloyH1, EmbloyH1Editable, EmbloyP } from "@/app/components/ui/misc/text";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, DeleteIcon, EditIcon, MinusIcon, Plus, PlusIcon, Share2, Trash, TrashIcon, XIcon } from "lucide-react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { not_core_get } from "@/lib/api/core";
const EditorBlock = dynamic(() => import("@/app/components/dom/main/misc/application_editor"), {ssr: false});

function EditorTool({dummy=false, id=null, job_id, tag="", editable = false, onChange, index, children, title, required = false, options=[], defaultOptions = false, hasOptions=false, formats=[], ...props }) {
  
    const [label, setLabel] = useState(title);
    useEffect(() => {
        setLabel(title);
    } , [title])       
    
    const [essential, setEssential] = useState(required);
    useEffect(() => {
        setEssential(required);
    }, [required])

    const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
    const dropdown2Ref = useRef(null)
    const toggleShareDropdown = () => setShareDropdownOpen(!shareDropdownOpen);
  
    const [hovered, setHovered] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleAdd = (type) => {
        onChange(type, index);
    }

    const handleLabel = (body) => {
        onChange("label", index, body);
    }

    const handleRemove = async () => {
        if (editable && id !== null && id !== undefined && job_id !== null && job_id !== undefined) {
            try {
                await not_core_get("DELETE", `/jobs/${job_id}/options/${id}`, {}, true);
                onChange("remove", index);
            } catch (error) {
            };
        } else { 
            onChange("remove", index);
        }
    }

    const handleRequire = () => {
        setEssential((prev) => !prev);
        onChange("require", index);
    }

    const handleMove = (direction) => {
        onChange(direction, index);
    }
    const toggleDropdown = () => {
        setHovered(false);
        setDropdown((prev) => !prev);
        
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };

        if (dropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdown]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target)) {
                setShareDropdownOpen(false);
                setOptionsOpen(false);
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
    }, [shareDropdownOpen])
    const [localOptions, setLocalOptions] = useState(defaultOptions ? options : []);


    const [optionsOpen, setOptionsOpen] = useState(false);

    const handleAddOption = () => {
        const newOption = `Option ${localOptions?.length + 1}`;
        setLocalOptions((prev) => [...prev, newOption]);
        onChange("update_options", index, [...localOptions, newOption]);
    };

    const handleRemoveOption = (optIndex) => {
        const updatedOptions = localOptions.filter((_, i) => i !== optIndex);
        setLocalOptions(updatedOptions);
        onChange("update_options", index, updatedOptions);
    };

    const handleOptionChange = (optIndex, value) => {
        const updatedOptions = [...localOptions];
        updatedOptions[optIndex] = value;
        setLocalOptions(updatedOptions);
        onChange("update_options", index, updatedOptions);
    };
    const handleMultiSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map((option) => option.value);
        selectedOptions.forEach((option) => {
            if (!localOptions.includes(option)) {
                localOptions.push(option);
            } else {
                localOptions.splice(localOptions.indexOf(option), 1);
            }
        }
        );
        setLocalOptions(localOptions);
        onChange("update_options", index, localOptions);
    }

    
     
    if (!editable) {
        return <EmbloyV className="">
            <EmbloyH className="justify-between">
                <EmbloyH1 className="font-heading text-base text-black dark:text-white">{label}</EmbloyH1>
                {required && <EmbloyP className={"text-xs italic text-primitivo dark:text-primitivo"}>* Required</EmbloyP>}
            </EmbloyH>
        {children}
        </EmbloyV>;
        
    } else {
        return (
            <EmbloyH
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="w-full cursor-pointer items-center justify-between "
            >
                <div className="flex flex-col items-start justify-start w-[97%]">
                    <EmbloyH className="justify-between">
                        {editable && !dummy ? <legend className="w-10/12 "><EmbloyH1Editable onUpdate={(a) => { handleLabel(a); } } initialText={label} placeholder="Enter Question" className="font-heading text-base text-black dark:text-white w-full" onClick={undefined} /></legend> : <legend><EmbloyH1 className="font-heading text-base text-black dark:text-white">{title}</EmbloyH1></legend>}
                        <EmbloyH className={"max-w-fit gap-2"}>
                            {required && <EmbloyP className={"text-xs italic text-primitivo dark:text-primitivo"}>* Required</EmbloyP>}
                            {editable && !dummy && <input 
                                type="checkbox" 
                                checked={essential} 
                                onChange={handleRequire} 
                                className="form-checkbox h-4 w-4 rounded-md text-white dark:text-white focus:ring focus:ring-opacity-50 checked:bg-capri"
                            />
                            }
                        </EmbloyH>
                    </EmbloyH>
                    {children}
                    
                    <div
                        onClick={toggleDropdown}
                        className={`w-full flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
                            hovered ? 'h-3' : 'h-0'
                        }`}
                    >
                        <div
                            className={`relative bg-etna dark:bg-nebbiolo rounded-full w-full transition-all duration-300 ease-in-out ${
                                hovered ? 'h-px' : 'h-0'
                            }`}
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`bg-white hover:bg-capri dark:bg-biferno dark:hover:bg-barbera text-black hover:text-white dark:text-white border border-etna dark:border-nebbiolo p-2 rounded-full ${hovered ? 'block' : 'hidden'}`}>
                                    <Plus size={16} className="text-inherit dark:text-inherit" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {dropdown && (
                        <div
                            ref={dropdownRef}
                            className="absolute left-1/2 transform -translate-x-1/2 z-50 mt-2 min-w-48 rounded-md border border-etna dark:border-amarone bg-white p-2 shadow-lg dark:bg-nebbiolo"
                        >
                            <button
                                onClick={() => {
                                    setDropdown(false)
                                    handleAdd("short_text")
                                }}
                                disabled={false}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Short Text</EmbloyP>
                                <PlusIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                            <button
                                onClick={() => {
                                    setDropdown(false)
                                    handleAdd("long_text")
                                }}
                                disabled={false}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Long Text</EmbloyP>
                                <PlusIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                            <button
                                onClick={() => {
                                    setDropdown(false)
                                    handleAdd("link")
                                }}
                                disabled={false}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Link</EmbloyP>
                                <PlusIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                            <button
                                onClick={() => {
                                    setDropdown(false)
                                    handleAdd("number")
                                }}
                                disabled={false}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Number</EmbloyP>
                                <PlusIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                            <button
                                onClick={() => {
                                    setDropdown(false)
                                    handleAdd("yes_no")
                                }}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Yes/No</EmbloyP>
                                <PlusIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                            <button
                                onClick={() => {
                                    setDropdown(false)
                                    handleAdd("single_choice")
                                }}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Single Choice</EmbloyP>
                                <PlusIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                            <button
                                onClick={() => {
                                    setDropdown(false)
                                    handleAdd("multiple_choice")
                                }}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Multiple Choice</EmbloyP>
                                <PlusIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                            <button
                                onClick={() => setDropdown(false)}
                                disabled={true}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Location</EmbloyP>
                                <PlusIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                            <button
                                onClick={() => {
                                    setDropdown(false)
                                    handleAdd("date")
                                }}
                                disabled={false}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Date</EmbloyP>
                                <PlusIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                            <button
                                onClick={() => {
                                    setDropdown(false)
                                    handleAdd("file")
                                }}
                                disabled={false}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">File</EmbloyP>
                                <PlusIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-start justify-center w-[2%]">
                    <div
                        className={`w-full flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
                            hovered && !dummy ? ' block h-fit' : 'hidden h-0'
                        }`}
                    >   
    
                        <EmbloyChildrenAdvanced tooltip="Edit Question" className={"flex flex-col items-center justify-between"}>
                            <button
                                onClick={() => {handleMove("up"); }}
                                className="bg-transparent p-0.5 hover:bg-capri/10 dark:hover:bg-amarone/10 rounded-md text-black hover:text-capri dark:text-amarone dark:hover:text-barbera transition-all duration-200 ease-in-out"
                            >
                                <ChevronUpIcon className="w-[12px] h-[12px] p-0 m-0" />
                            </button>
                            <button
                                onClick={() => {toggleShareDropdown(); }}
                                className="bg-transparent p-0.5 hover:bg-capri/10 dark:hover:bg-amarone/10 rounded-md text-black hover:text-capri dark:text-amarone dark:hover:text-barbera transition-all duration-200 ease-in-out"
                            >
                                <EllipsisVerticalIcon className="w-[12px] h-[12px] p-0 m-0" />
                            </button>
                            <button
                                onClick={() => {handleMove("down"); }}
                                className="bg-transparent p-0.5 hover:bg-capri/10 dark:hover:bg-amarone/10 rounded-md text-black hover:text-capri dark:text-amarone dark:hover:text-barbera transition-all duration-200 ease-in-out"
                            >
                                <ChevronDownIcon className="w-[12px] h-[12px] p-0 m-0" />
                            </button>
                        </EmbloyChildrenAdvanced>
                    </div>
                    {shareDropdownOpen && !dummy && (
                        <div
                            ref={dropdown2Ref}
                            className="absolute right-0 transform -translate-x-1/2 z-50 mt-2 min-w-48 rounded-md border border-etna dark:border-amarone bg-white p-2 shadow-lg dark:bg-nebbiolo"
                        >
                            {hasOptions && <button
                                onClick={() => {
                                   setOptionsOpen(!optionsOpen)
                                }}
                                disabled={false}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Options</EmbloyP>
                               {optionsOpen && <ChevronUpIcon size={16} className="text-inherit dark:text-inherit"/>}
                               {!optionsOpen && <ChevronDownIcon size={16} className="text-inherit dark:text-inherit"/>}
                            </button>}
                            {optionsOpen && formats?.length === 0 && (
                        
                                <EmbloyV className="bg-transparnet border dark:border-none border-etna dark:bg-rubeno rounded-md p-2 gap-1.5">
                                    {localOptions.map((opt, optIndex) => (
                                        <EmbloyH
                                            key={optIndex}
                                            className="gap-1.5"
                                        >
                                            <input
                                                type="text"
                                                value={opt}
                                                onChange={(e) =>{
                                                    if (e.target.value?.trim() !== "") {
                                                    handleOptionChange(optIndex, e.target.value)
                                                    }}
                                                }
                                                className="text-black bg-palatinio dark:bg-transparent dark:text-white  border border-etna dark:border-amarone w-full rounded-md text-xs pl-1.5"
                                            />
                                            <button
                                                onClick={() => handleRemoveOption(optIndex)}
                                                className="text-primitivo dark:text-primitivo hover:bg-primitivo/10 dark:hover:bg-primitivo/10 p-px rounded-md"
                                            >
                                                <XIcon size={16} className="text-inherit dark:text-inherit"/>
                                            </button>
                                        </EmbloyH>
                                    ))}
                                    <button
                                        onClick={handleAddOption}
                                        className="mt-2 text-sm text-capri dark:text-barbera hover:bg-capri/10 dark:hover:bg-barbera/10 p-1.5 rounded-md"
                                    >
                                        <PlusIcon size={16} className="text-inherit dark:text-inherit"/>
                                    </button>
                                </EmbloyV>
                                
                            )}
                            {optionsOpen && formats?.length > 0 && (
                        
                                <EmbloyV className="bg-transparnet border dark:border-none border-etna dark:bg-rubeno rounded-md p-2 gap-1.5">
                                <EmbloyH
                                
                                    className="gap-1.5"
                                >
                                        <select
                                            multiple
                                            value={localOptions}
                                            onChange={handleMultiSelectChange}
                                            className="w-full text-black dark:text-white dark:text-inherit bg-transparent dark:bg-transparent"
                                        >
                                            {formats.map((format, idx) => (
                                                <option key={idx} value={format} className="relative flex items-center gap-2">
                                                    <span className="ml-6">{format}</span>
                                                </option>
                                            ))}
                                        </select>

                                    </EmbloyH>
                                </EmbloyV>
                                
                            )}
                            <button
                                onClick={() => {
                                    setShareDropdownOpen(false)
                                    handleRequire()
                                }}
                                disabled={false}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">{essential ? "Don't require answer" : "Require answer"}</EmbloyP>
                               {essential ? <MinusIcon size={16} className="text-inherit dark:text-inherit"/> :
                               <PlusIcon size={16} className="text-inherit dark:text-inherit"/>}
                               
                            </button>
                            <button
                                onClick={() => {
                                    setShareDropdownOpen(false)
                                    handleMove("up")
                                }}
                                disabled={false}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Move Up</EmbloyP>
                               <ChevronUpIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                            <button
                                onClick={() => {
                                    setShareDropdownOpen(false)
                                    handleMove("down")
                                }}
                                disabled={false}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-capri hover:dark:text-barbera flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Move Down</EmbloyP>
                               <ChevronDownIcon size={16} className="text-inherit dark:text-inherit"/>
                            </button>
                            <button
                                onClick={() => {
                                    setShareDropdownOpen(false)
                                    handleRemove()
                                }}
                                disabled={false}
                                className="block w-full px-4 py-2 text-left text-sm text-black dark:text-white hover:text-primitivo hover:dark:text-primitivo flex flex-row gap-2"
                            >   
                                <EmbloyP className="text-inherit dark:text-inherit text-xs">Remove</EmbloyP>
                                <TrashIcon size={16} className="text-inherit dark:text-inherit"/>
                                
                            </button>
                            <EmbloyP className="text-xs text-etna dark:text-rubeno text-center italic">{tag}</EmbloyP>
                            
                        </div>
                    )}
                </div>
            </EmbloyH>
        );
    }
}

const fileFormats = {
    text: ["pdf", "doc", "docx", "txt", "rtf", "odt", "xml"],
    image: ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "tif", "svg"],
    video: ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"],
    audio: ["ogg", "mp3", "wav", "wma", "aac", "m4a"],
    compressed: ["zip", "rar", "tar", "7z", "gz", "bz2"],
    spreadsheet: ["xls", "xlsx", "ods"],
    presentation: ["ppt", "pptx"],
};
const allFormats = Object.values(fileFormats).flat();

export function AnswerPreview({data, handleDataReload, editable=false, onChange}) { 
    console.log("Data", data);
    const [locData, setLocData] = useState<{ application_answers: any[] } | any>({ application_answers: [] });
    const [original, setOriginal] = useState(data)
    useEffect(() => {
        if (
            data &&
            Object.keys(locData)?.length === 1 && 
            locData.application_answers?.length === 0 
        ) { 
            let bin = data;
            bin.application_answers.sort((a, b) => a.application_option_id - b.application_option_id);
            setLocData(bin);
            setOriginal(bin);
        } else {
            
        }
    }, []);
    return (
        <EmbloyV className={"items-center "}>
            {((original.application_answers === undefined || original.application_answers === null)) ? (
                <EmbloyP className="text-xs text-center w-full text-testaccio dark:text-nebbiolo">No Answers provided</EmbloyP>
            ) : (
                <EmbloyV className="gap-2">
                    {locData.application_answers.map((option, index) => {
                        return (
                            <>
                            <EmbloyP className={undefined}>{JSON.stringify(option, null, 2)}</EmbloyP>
                            <EditorTool
                                id={option.application_option_id} 
                                job_id={original.job_id}
                                key={index}
                                required={false}
                                title={option.question}
                                editable={editable}
                                index={index}
                                onChange={(type, id, body="") => { }}
                                options={option.options}
                                hasOptions={option.question_type === "single_choice" || option.question_type === "multiple_choice" || option.question_type === "file"}
                                formats={option.question_type === "file" ? allFormats : []}
                                defaultOptions={option.options?.length === 0 ? false : true}
                                tag={option.question_type?.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                            >
                            {(() => {
                                switch (option.question_type) {
                                    case "link":
                                        return (
                                            <div className="w-full text-black dark:text-white">
                                                <input
                                                    type="text"
                                                    required={option.required}
                                                    placeholder="https://example.com"
                                                    value={option.answer}
                                                    className="c0 p-2 border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo rounded-md text-inherit dark:text-inherit outline-none w-full focus:ring-2 focus:ring-white"
                                                />
                                            </div>
                                        );
                                        case "short_text":
                                        return (
                                            <div className="w-full text-black dark:text-white">
                                                <input
                                                    type="text"
                                                    required={option.required}
                                                    className="c0 p-2 w-full border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo rounded-md text-inherit dark:text-inherit outline-none focus:ring-2 focus:ring-white"
                                                    onChange={() =>
                                                    {}}
                                                />
                                            </div>
                                        );
                                    case "long_text":
                                        
                                        return (
                                            <div className="w-full text-black dark:text-white">
                                                <textarea
                                                    required={option.required}
                                                    onChange={() => {}}
                                                    maxLength={200}
                                                    style={{ resize: 'none', overflow: 'auto' }}
                                                    className="h-20 w-full rounded-md border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo text-inherit dark:text-inherit p-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                                                    placeholder="Enter your response (max. 200 characters)"
                                                />
                                            </div>
                                        );
                                    case "yes_no":
                                        return (
                                            <div className="w-full text-black dark:text-white">
                                                <Select
                                                    required={option.required}
                                                    onValueChange={() => {}}
                                                >
                                                    <SelectTrigger className="border-etna dark:border-biferno bg-white dark:bg-biferno"><EmbloyP className="text-vesuvio dark:text-etna">{option.question}</EmbloyP></SelectTrigger>
                                                    <SelectContent className="border-etna dark:border-biferno bg-white dark:bg-biferno">
                                                        <SelectItem key="1" value={"Yes"}>
                                                            <EmbloyP className="text-inherit dark:text-inherit">Yes</EmbloyP>
                                                        </SelectItem>
                                                        <SelectItem key="2" value={"No"}>
                                                            <EmbloyP className="text-inherit dark:text-inherit">No</EmbloyP>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        );
                                    case "number":
                                        return (
                                            <div className="w-full text-black dark:text-white">
                                                
                                                <input
                                                    type="number"
                                                    required={option.required}
                                                    className="c0 p-2 w-full border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo rounded-md text-inherit dark:text-inherit outline-none focus:ring-2 focus:ring-white"
                                                    onChange={() => {}}
                                                />
                                            </div>
                                        );
                                    case "date":
                                        return (
                                            <div className="w-full text-black dark:text-white">
                                                
                                                <input
                                                    type="date"
                                                    required={option.required}
                                                    className="c0 p-2 border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo text-inherit dark:text-inherit rounded-md outline-none focus:ring-2 focus:ring-white w-full"
                                                    onChange={() => {}}
                                                />
                                            </div>
                                        );
                                    case "file":
                                        return (
                                            <div className="w-full text-black dark:text-white">
                                                
                                                <input
                                                    type="file"
                                                    required={option.required}
                                                    className="c0 p-2 border border-etna dark:border-biferno bg-white dark:bg-biferno text-inherit dark:text-inherit rounded-md outline-none w-full"
                                                    onChange={() => {}}
                                                />
                                            </div>
                                        );
                                    case "location":
                                        return (
                                            <div className="w-full text-black dark:text-white">
                                                
                                                <input
                                                    type="text"
                                                    required={option.required}
                                                    placeholder="Enter a location"
                                                    className="c0 p-2 w-full border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo rounded-md text-inherit dark:text-inherit outline-none focus:ring-2 focus:ring-white"
                                                    onChange={() => {}}
                                                />
                                            </div>
                                        );
                                    case "single_choice":
                                        return (
                                            <div className="w-full text-black dark:text-white">
                                                
                                                <Select
                                                    required={option.required}
                                                    onValueChange={() => {}}
                                                >
                                                    <SelectTrigger className="border-etna dark:border-biferno bg-white dark:bg-biferno"><EmbloyP className="text-vesuvio dark:text-etna">{option.question}</EmbloyP></SelectTrigger>
                                                    <SelectContent className="border-etna dark:border-biferno bg-white dark:bg-biferno">
                                                        {option.options.map((opt, optIndex) => (
                                                            <SelectItem key={optIndex} value={opt}>
                                                                <EmbloyP className="text-inherit dark:text-inherit">{opt}</EmbloyP>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        );
                                    case "multiple_choice":
                                        return (
                                            <fieldset className="flex flex-col space-y-2 w-full text-black dark:text-white">
                                                
                                                {option.options.map((opt, optIndex) => (
                                                    <label
                                                        key={optIndex}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <Checkbox
                                                            value={opt}
                                                            className="rounded-full border-etna dark:border-biferno"
                                                            onCheckedChange={() => {}}
                                                        />{" "}
                                                        <span>{opt}</span>
                                                    </label>
                                                ))}
                                            </fieldset>
                                        );
                                    default:
                                        return null;
                                }
                        })()}
                    </EditorTool>
                    </>
                );
            })}
                </EmbloyV>
            )}
        </EmbloyV>
    )

}

export function ApplicationPreview({data, handleDataReload, editable=false, onChange}) {
    const [locData, setLocData] = useState<{ application_options: any[] } | any>({ application_options: [] });
    const [original, setOriginal] = useState(data)

    useEffect(() => {
        
        if (
            data &&
            Object.keys(locData)?.length === 1 && 
            locData.application_options?.length === 0 
        ) { 
            let bin = data;
            bin.application_options.sort((a, b) => a.id - b.id);
            setLocData(bin);
            setOriginal(bin);
        } else {
        }
    }, []);
    const [altered, setAltered] = useState(false);
    useEffect(() => {
        const checkApplicationOptions = (ref, can) => {
            if (ref?.length !== can?.length) {
                return true;
            } else {
                for (let i = 0; i < ref?.length; i++) {
                    if (ref[i].question?.trim() !== can[i].question?.trim()) {
                        return true;
                    }
                    if (ref[i].required !== can[i].required) {
                        return true;
                    } 
                    if (ref[i].question_type !== can[i].question_type) {
                        return true;
                    } 
                    if (ref[i].options?.length > 0 && can[i].options?.length > 0) {
                        if (ref[i].options?.length !== can[i].options?.length) {
                            return true;
                        } else {
                            if (ref[i].question_type === "file" && can[i].question_type === "file") { 
                                for (let j = 0; j < ref[i].options?.length; j++) {
                                   if (!can[i].options.includes(ref[i].options[j])) {
                                       return true;
                                   }
                                }
                            } else {
                                for (let j = 0; j < ref[i].options?.length; j++) {
                                    if (ref[i].options[j] !== can[i].options[j]) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
                return false;
            }
        }
        const result = checkApplicationOptions(original.application_options, locData.application_options);
        if (result && !altered) {
            setAltered(true);
        } else if (!result && altered) {
            setAltered(false);
        }
    }, [locData])

    
    const [errorMessages, setErrorMessages] = useState({});
    const textSchema = z.string().nonempty({message: 'Input cannot be empty'});
    const idSchema = z.number().int().positive({message: 'ID must be a positive integer'});
    const [options, setOptions] = useState([]);

    const [cvFile, setCvFile] = useState<File | undefined>();


    const handleFileChange = (event) => {
        // New handler for the file input change
        setCvFile(event.target.files[0]);
    };


    const handleTextChange = (id: number, value: string, required: boolean) => {
        try {
            setErrorMessages((prevMessages) => {
                const newMessages = {...prevMessages};
                delete newMessages[id];
                return newMessages;
            });

            if (required) {
                idSchema.parse(id);
                if (required && value?.trim() === '') {
                    throw new Error('This field is required');
                }
                textSchema.parse(value);
            }

            setOptions((prevOptions) => {
                const index = prevOptions.findIndex(
                    (option) => option.application_option_id === id
                );
                if (index !== -1) {
                    const newOptions = [...prevOptions];
                    newOptions[index].answer = value;
                    return newOptions;
                } else {
                    return [...prevOptions, {application_option_id: id, answer: value}];
                }
            });
        } catch (error) {
            setErrorMessages((prevMessages) => ({...prevMessages, [id]: error.message}));
        }
    };

    const handleSingleChoiceChange = (id: number, value: string) => {
        try {
            setOptions((prevOptions) => {
                const index = prevOptions.findIndex(
                    (option) => option.application_option_id === id
                );
                if (index !== -1) {
                    const newOptions = [...prevOptions];
                    newOptions[index].answer = value;
                    return newOptions;
                } else {
                    return [...prevOptions, {application_option_id: id, answer: value}];
                }
            });

            setErrorMessages((prevMessages) => ({...prevMessages, [id]: null}));
        } catch (error) {
            setErrorMessages((prevMessages) => ({...prevMessages, [id]: error.message}));
        }
    };

    const handleMultipleChoiceChange = (
        id: number,
        value: string,
        isChecked: boolean,
    ) => {
        try {
            setOptions((prevOptions) => {
                const index = prevOptions.findIndex(
                    (option) => option.application_option_id === id
                );
                if (index !== -1) {
                    const newOptions = [...prevOptions];
                    if (isChecked) {
                        newOptions[index].answer += `, ${value}`;
                    } else {
                        newOptions[index].answer = newOptions[index].answer.replace(
                            `, ${value}`,
                            ""
                        );
                    }
                    return newOptions;
                } else {
                    return [
                        ...prevOptions,
                        {application_option_id: id, answer: isChecked ? value : ""},
                    ];
                }
            });

            setErrorMessages((prevMessages) => ({...prevMessages, [id]: null}));
        } catch (error) {
            setErrorMessages((prevMessages) => ({...prevMessages, [id]: error.message}));
        }
    };




    const handleAdd = (type, key, body="") => {
        setLocData((prevData) => {
            let updatedOptions = [...prevData.application_options];
            if (type === "up" && key > 0) {
                [updatedOptions[key - 1], updatedOptions[key]] = [updatedOptions[key], updatedOptions[key - 1]];
            } else if (type === "down" && key < updatedOptions?.length - 1) {
                [updatedOptions[key], updatedOptions[key + 1]] = [updatedOptions[key + 1], updatedOptions[key]];
            } else if (type === "remove") {
                updatedOptions.splice(key, 1);
            } else if (type === "require") {
                const updatedItem = { ...updatedOptions[key], required: !updatedOptions[key].required };
                updatedOptions[key] = updatedItem;
            } else if (type === "label") {
                const updatedItem = { ...updatedOptions[key], question: body };
                updatedOptions[key] = updatedItem;
            } else if (type === "update_options") {
                const updatedItem = { ...updatedOptions[key], options: body };
                updatedOptions[key] = updatedItem;
            } else if (type !== "up" && type !== "down" && type !== "remove" && type !== "require") {
                const newElement = {
                    question_type: type,
                    question: null,
                    required: false,
                    options: [],
                };
                updatedOptions.splice(key + 1, 0, newElement);
            }
    
            return { ...prevData, application_options: updatedOptions };
        });
    };
    const handleSave = async () => {
        if (altered) {
            let ao = [];
            const ids = locData.application_options.map((option) => option.id);
            let filterd_ids = ids.filter((id) => id !== undefined);
            filterd_ids = filterd_ids.sort((a, b) => a - b);
            locData.application_options.forEach((option, index) => {
                let newOption = {};
                if (option.question === null || option.question === undefined || option.question?.trim() === "") {
                    newOption["question"] = "Null";
                } else {
                    newOption["question"] = option.question?.trim();
                }
                newOption["question_type"] = option.question_type;
                newOption["required"] = option.required;
                if ((option.question_type === "single_choice" || option.question_type === "multiple_choice" || option.question_type === "file") && option.options?.length === 0) {
                    newOption["options"] = ["Null"];
                    if (option.question_type === "file" && option.options?.length === 0) {
                        newOption["options"] = ["pdf"];
                    }
                } else {
                    newOption["options"] = option.options;
                }
                if (filterd_ids[index] !== undefined) {
                    newOption["id"] = filterd_ids[index];
                    newOption["job_id"] = original.id;
                    newOption["ext_id"] = original.job_slug;
                } 
                ao.push(newOption);
                
            });
                
            const body = {
                "application_options_attributes": ao
            }
            try {
                const res = await not_core_get("PATCH", `/jobs/${original.id}`, body);
                setOriginal(locData);
                setAltered(false);
                handleDataReload();
                
            } catch (error) {
                setLocData(original);
            }
        }
    }

    const handleDelete = async () => {
        try {
            const res = await not_core_get("DELETE", `/jobs/${original.id}/options`, {}, true);
            handleDataReload();
            setOriginal({ application_options: [] });
            setLocData({ application_options: [] });
        } catch (error) {
        }
    }

    
   return (
    <EmbloyV className={"items-center "}>
        <EmbloyH className={"justify-start"}>
            <EmbloyH1 className="text-sm">Application Form</EmbloyH1>
        </EmbloyH>
        <EmbloyH className="justify-between ">
            <EmbloyP className="text-xs text-testaccio dark:text-nebbiolo">
                {locData.application_options?.length} Items 
                {locData.application_options?.length !== original.application_options?.length &&
                    ` - a difference of ${
                    locData.application_options?.length > original.application_options?.length ? '+' : '-'
                    }${Math.abs(
                    ((locData.application_options?.length - original.application_options?.length) / original.application_options?.length) * 100
                    ).toFixed(2)}%`}
            </EmbloyP>
            {(locData.application_options?.length > 0 && editable) && <EmbloyH className={"gap-1.5 max-w-fit"}>{altered && <button onClick={handleSave}><EmbloyP className="text-xs text-capri dark:text-capri underline">{"Save changes"}</EmbloyP></button>}<button onClick={handleDelete}><EmbloyP className="text-xs text-primitivo dark:text-primitivo underline">{"Delete all items"}</EmbloyP></button></EmbloyH>}
            
        </EmbloyH>
        <div className="min-h-[250px] w-9/12 flex flex-col items-center justify-start gap-4 px-4 py-2 ">
            <EditorTool dummy={true} job_id={original.id} title={undefined} editable={editable} index={-1} onChange={(type, id) => { handleAdd(type, id); }}>
                <div className="w-full flex flex-col text-center">
                    <EmbloyH1 className="text-lg font-heading tracking-tight">
                        Apply for {locData.title ?? "this job"}
                    </EmbloyH1>
                    <EmbloyP className="text-sm text-muted-foreground">
                        Enter your details below to apply
                    </EmbloyP>
                </div>
            </EditorTool>
            {locData.application_options.map((option, index) => {
                return (
                    <EditorTool
                        id={option.id} 
                        job_id={original.id}
                        key={index}
                        required={option.required}
                        title={option.question}
                        editable={editable}
                        index={index}
                        onChange={(type, id, body="") => { handleAdd(type, id, body); }}
                        options={option.options}
                        hasOptions={option.question_type === "single_choice" || option.question_type === "multiple_choice" || option.question_type === "file"}
                        formats={option.question_type === "file" ? allFormats : []}
                        defaultOptions={option.options?.length === 0 ? false : true}
                        tag={option.question_type?.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                        >
                        {(() => {
                            switch (option.question_type) {
                                case "link":
                                    return (
                                        <div className="w-full text-black dark:text-white">
                                            <input
                                                type="text"
                                                required={option.required}
                                                placeholder="https://example.com"
                                                className="c0 p-2 border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo rounded-md text-inherit dark:text-inherit outline-none w-full focus:ring-2 focus:ring-white"
                                                onChange={(event) =>
                                                    handleTextChange(option.id, event.target.value, option.required)
                                                }
                                            />
                                            {errorMessages[option.id] &&
                                                <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                        </div>
                                    );
                                    case "short_text":
                                    return (
                                        <div className="w-full text-black dark:text-white">
                                            <input
                                                type="text"
                                                required={option.required}
                                                className="c0 p-2 w-full border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo rounded-md text-inherit dark:text-inherit outline-none focus:ring-2 focus:ring-white"
                                                onChange={(event) =>
                                                    handleTextChange(option.id, event.target.value, option.required)
                                                }
                                            />
                                            {errorMessages[option.id] &&
                                                <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                        </div>
                                    );
                                case "long_text":
                                    
                                    return (
                                        <div className="w-full text-black dark:text-white">
                                            <textarea
                                                required={option.required}
                                                onChange={(event) =>
                                                    handleTextChange(option.id, event.target.value, option.required)
                                                }
                                                maxLength={200}
                                                style={{ resize: 'none', overflow: 'auto' }}
                                                className="h-20 w-full rounded-md border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo text-inherit dark:text-inherit p-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                                                placeholder="Enter your response (max. 200 characters)"
                                            />
                                            {errorMessages[option.id] &&
                                                <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                        </div>
                                    );
                                case "yes_no":
                                    return (
                                        <div className="w-full text-black dark:text-white">
                                            <Select
                                                required={option.required}
                                                onValueChange={(value) => {
                                                    handleSingleChoiceChange(option.id, value);
                                                }}
                                            >
                                                <SelectTrigger className="border-etna dark:border-biferno bg-white dark:bg-biferno"><EmbloyP className="text-vesuvio dark:text-etna">{option.question}</EmbloyP></SelectTrigger>
                                                <SelectContent className="border-etna dark:border-biferno bg-white dark:bg-biferno">
                                                    <SelectItem key="1" value={"Yes"}>
                                                        <EmbloyP className="text-inherit dark:text-inherit">Yes</EmbloyP>
                                                    </SelectItem>
                                                    <SelectItem key="2" value={"No"}>
                                                        <EmbloyP className="text-inherit dark:text-inherit">No</EmbloyP>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errorMessages[option.id] &&
                                                <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                        </div>
                                    );
                                case "number":
                                    return (
                                        <div className="w-full text-black dark:text-white">
                                            
                                            <input
                                                type="number"
                                                required={option.required}
                                                className="c0 p-2 w-full border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo rounded-md text-inherit dark:text-inherit outline-none focus:ring-2 focus:ring-white"
                                                onChange={(event) =>
                                                    handleTextChange(option.id, event.target.value, option.required)
                                                }
                                            />
                                            {errorMessages[option.id] &&
                                                <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                        </div>
                                    );
                                case "date":
                                    return (
                                        <div className="w-full text-black dark:text-white">
                                            
                                            <input
                                                type="date"
                                                required={option.required}
                                                className="c0 p-2 border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo text-inherit dark:text-inherit rounded-md outline-none focus:ring-2 focus:ring-white w-full"
                                                onChange={(event) =>
                                                    handleTextChange(option.id, event.target.value, option.required)
                                                }
                                            />
                                            {errorMessages[option.id] &&
                                                <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                        </div>
                                    );
                                case "file":
                                    return (
                                        <div className="w-full text-black dark:text-white">
                                            
                                            <input
                                                type="file"
                                                required={option.required}
                                                className="c0 p-2 border border-etna dark:border-biferno bg-white dark:bg-biferno text-inherit dark:text-inherit rounded-md outline-none w-full"
                                                onChange={(event) => handleFileChange(option.id)}
                                            />
                                            {errorMessages[option.id] &&
                                                <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                        </div>
                                    );
                                case "location":
                                    return (
                                        <div className="w-full text-black dark:text-white">
                                            
                                            <input
                                                type="text"
                                                required={option.required}
                                                placeholder="Enter a location"
                                                className="c0 p-2 w-full border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo rounded-md text-inherit dark:text-inherit outline-none focus:ring-2 focus:ring-white"
                                                onChange={(event) =>
                                                    handleTextChange(option.id, event.target.value, option.required)
                                                }
                                            />
                                            {errorMessages[option.id] &&
                                                <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                        </div>
                                    );
                                case "single_choice":
                                    return (
                                        <div className="w-full text-black dark:text-white">
                                            
                                            <Select
                                                required={option.required}
                                                onValueChange={(value) => {
                                                    handleSingleChoiceChange(option.id, value);
                                                }}
                                            >
                                                <SelectTrigger className="border-etna dark:border-biferno bg-white dark:bg-biferno"><EmbloyP className="text-vesuvio dark:text-etna">{option.question}</EmbloyP></SelectTrigger>
                                                <SelectContent className="border-etna dark:border-biferno bg-white dark:bg-biferno">
                                                    {option.options.map((opt, optIndex) => (
                                                        <SelectItem key={optIndex} value={opt}>
                                                            <EmbloyP className="text-inherit dark:text-inherit">{opt}</EmbloyP>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errorMessages[option.id] &&
                                                <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                        </div>
                                    );
                                case "multiple_choice":
                                    return (
                                        <fieldset className="flex flex-col space-y-2 w-full text-black dark:text-white">
                                            
                                            {option.options.map((opt, optIndex) => (
                                                <label
                                                    key={optIndex}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <Checkbox
                                                        value={opt}
                                                        className="rounded-full border-etna dark:border-biferno"
                                                        onCheckedChange={(isChecked) => {
                                                            handleMultipleChoiceChange(
                                                                option.id,
                                                                opt,
                                                                !!isChecked,
                                                            );
                                                        }}
                                                    />{" "}
                                                    <span>{opt}</span>
                                                </label>
                                            ))}
                                            {errorMessages[option.id] &&
                                                <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                        </fieldset>
                                    );
                                default:
                                    return null;
                            }
                        })()}
                    </EditorTool>
                );
            })}
        </div>
        {locData.application_options?.length > 0 && <>
        <EmbloySpacer className={"h-8"} />
        <EmbloyButton className="py-0 px-8" name={"Apply"} onStatus={undefined} onClick={() => { }} onMessage={undefined} />
        <EmbloyH className="justify-between ">
            <EmbloyP className="text-xs text-testaccio dark:text-nebbiolo">
                {locData.application_options?.length} Items 
                {locData.application_options?.length !== original.application_options?.length &&
                    ` - a difference of ${
                    locData.application_options?.length > original.application_options?.length ? '+' : '-'
                    }${Math.abs(
                    ((locData.application_options?.length - original.application_options?.length) / original.application_options?.length) * 100
                    ).toFixed(2)}%`}
            </EmbloyP>
        {altered && <button onClick={handleSave}><EmbloyP className="text-xs text-capri dark:text-capri underline">{"Save changes"}</EmbloyP></button>}
        </EmbloyH></>}
    </EmbloyV>
);
}