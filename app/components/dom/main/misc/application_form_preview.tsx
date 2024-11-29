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
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon, EditIcon, MinusIcon, Plus, PlusIcon, Share2, Trash, TrashIcon } from "lucide-react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { CaretUpIcon } from "@radix-ui/react-icons";
const EditorBlock = dynamic(() => import("@/app/components/dom/main/misc/application_editor"), {ssr: false});

function EditorTool({ editable = false, onChange, index, children, title, required = false, ...props }) {
    const [label, setLabel] = useState(title);
    
    const [essential, setEssential] = useState(required);

    const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
    const dropdown2Ref = useRef(null)
    const toggleShareDropdown = () => setShareDropdownOpen(!shareDropdownOpen);
  
    const [hovered, setHovered] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleAdd = (type) => {
        onChange(type, index);
    }

    const handleRemove = () => {
        onChange("remove", index);
    }

    const handleRequire = () => {
        setEssential((prev) => !prev);
        onChange("require", index);
    }

    const handleMove = (direction) => {
        onChange(direction, index);
    }
    const toggleDropdown = () => {
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

    if (!editable) {
        return <EmbloyV className="">
         
        {children}
        </EmbloyV>;
        
    } else {
        return (
            <EmbloyH
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="w-full cursor-pointer items-center justify-between"
            >
                <EmbloyV className={`w-95%`}>
                    {children}
                    <div
                        onClick={toggleDropdown} // Fixed this line
                        className={`w-full flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
                            hovered ? ' h-3' : 'h-0'
                        }`}
                    >
                        <div className={`bg-etna dark:bg-nebbiolo rounded-full w-full transition-all duration-300 ease-in-out ${
                            hovered ? ' h-px' : 'h-0'} `}/>
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
                </EmbloyV>
                <EmbloyV className="justify-center w-5%">
                    <div
                        className={`w-full flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
                            hovered ? ' block h-fit' : 'hidden h-0'
                        }`}
                    >
                        <button
                        onClick={() => {toggleShareDropdown(); }}
                        className="bg-transparent p-0 text-black hover:text-capri dark:text-amarone dark:hover:text-barbera"
                        >
                            <EmbloyChildrenAdvanced tooltip="Edit Question" className={undefined}>
                            <EllipsisVerticalIcon className="w-[12px] h-[12px] p-0 m-0" />
                            </EmbloyChildrenAdvanced>
                        </button>
                    </div>
                    {shareDropdownOpen && (
                        <div
                            ref={dropdown2Ref}
                            className="absolute right-0 transform -translate-x-1/2 z-50 mt-2 min-w-48 rounded-md border border-etna dark:border-amarone bg-white p-2 shadow-lg dark:bg-nebbiolo"
                        >
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
                                    handleMove("down")
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
                            
                        </div>
                    )}
                </EmbloyV>
            </EmbloyH>
        );
    }
}


export function ApplicationPreview({data, handleDataReload, editable=false, onChange}) {
    const [locData, setLocData] = useState<{ application_options: any[] } | any>({ application_options: [] });
    const [original, setOriginal] = useState(null)

    useEffect(() => {
        if (
            data &&
            Object.keys(locData).length === 1 && // Corrected to use `.length` instead of `.length()`
            locData.application_options.length === 0 // Correctly checking if the array is empty
        ) {
            setLocData(data);
            setOriginal(data)
        } else {
        }
    }, []);


        
    
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
                if (required && value.trim() === '') {
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

    // Update function for multiple_choice question type
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




    const handleAdd = (type, key) => {
        let updated = locData.application_options;
        setLocData({ ...locData, application_options:[] });
        if (type === "up") {
            if (key > 0) { // Check if the element can move up
                const element = updated[key];
                updated.splice(key, 1); // Remove the element
                updated.splice(key - 1, 0, element); // Insert it at the new position
                setLocData({ ...locData, application_options: updated });
            }
        } else if (type === "down") {
            if (key < updated.length - 1) {
                const element = updated[key];
                updated.splice(key, 1); 
                updated.splice(key + 1, 0, element); 
                setLocData({ ...locData, application_options: updated });
            }
        } else {
            const element = {
                question_type: type,
                question: null,
                required: false,
                options: [],
            };
            updated.splice(key + 1, 0, element);
            setLocData({ ...locData, application_options: updated });
        }
    };
    useEffect(() => {
        console.log("data",locData);

    }, [locData])


    
   return (
    <EmbloyV className={"items-center "}>
        <div className="min-h-[250px] w-9/12 flex flex-col items-center justify-start gap-4 px-4 py-2 ">
            <EditorTool title={undefined} editable={editable} index={-1} onChange={(type, id) => { handleAdd(type, id); }}>
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
                //console.log("Option", option.question_type, option.question, index);

                return (
                    <EditorTool
                        key={index}
                        required={option.required}
                        title={option.question}
                        editable={editable}
                        index={index}
                        onChange={(type, id) => { handleAdd(type, id); }}
                        >
                        <EmbloyH className="justify-between">
                            {editable ? <legend><EmbloyH1Editable initialText={option.question} placeholder="Enter Question" className="font-heading text-base text-black dark:text-white" /></legend> : <legend><EmbloyH1 className="font-heading text-base text-black dark:text-white">{option.question}</EmbloyH1></legend>}
                            {option.required && <EmbloyP className={"text-xs italic text-primitivo dark:text-primitivo"}>* Required</EmbloyP>}
                    </EmbloyH>
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
                                                className="c0 p-2 border border-etna dark:border-biferno bg-palatinio dark:bg-nebbiolo text-inherit dark:text-inherit rounded-md outline-none focus:ring-2 focus:ring-white"
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
        <EmbloySpacer className={"h-8"} />
        <EmbloyButton className="py-0 px-8" name={"Apply"} onStatus={undefined} onClick={() => { }} onMessage={undefined} />
    </EmbloyV>
);
}