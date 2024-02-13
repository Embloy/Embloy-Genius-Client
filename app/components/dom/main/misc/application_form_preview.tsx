"use client";
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {z} from 'zod';
import {Checkbox} from "@/app/components/ui/application_preview/checkbox";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/app/components/ui/application_preview/select";
import Image from "next/image";
import './locals.css';

export function ApplicationPreview({data, handleDataReload}) {

    const [errorMessages, setErrorMessages] = useState({});
    const textSchema = z.string().nonempty({message: 'Input cannot be empty'});
    const idSchema = z.number().int().positive({message: 'ID must be a positive integer'});
    const [options, setOptions] = useState([]);
    const [applicationText, setApplicationText] = useState("");
    const [cvFile, setCvFile] = useState<File | undefined>();
    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value.trim() === '') {
            setErrorMessages((prevMessages) => ({...prevMessages, 'applicationText': 'This field is required'}));
        } else {
            setErrorMessages((prevMessages) => ({...prevMessages, 'applicationText': null}));
        }
        setApplicationText(value);
    };

    const handleFileChange = (event) => {
        // New handler for the file input change
        setCvFile(event.target.files[0]);
    };


    // Update function for text and link question types
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

    // Update function for yes_no and single_choice question types
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

    const [testMode, setTestMode] = useState(false);
    const application_options = data.application_options;
    const cv_required = data.cv_required;
    const allowed_cv_formats = data.allowed_cv_formats;
    const title = data.title;
    const previewClass = "w-full rounded-lg border-[1px] flex flex-col items-center justify-start gap-2 cursor-default scrll";
    const containerStyle = "max-h-[245px] overflow-y-auto";
    const textClass = "cursor-text"
    const [plugIsHovered, setPlugIsHovered] = useState(false);
    const handlePlugHover = () => {
        setPlugIsHovered(true);
    };
    const handlePlugNotHover = () => {
        setPlugIsHovered(false);
    };
    return (
        <div className={cn(previewClass, containerStyle, cn(testMode ? "border-embloy-green overflow-hidden" : "border-gray-700"))}>
            <div className={cn("w-full flex flex-row items-center justify-between sticky top-0 bg0-r px-4 py-2 border-b z-10", cn(testMode ? "border-embloy-green" : "border-gray-700"))}>
                <p className={cn(textClass, "font-normal text-xs ", cn(testMode ? "text-embloy-green" : "c2-5"))}>Preview</p>

                <div className="flex flex-row items-center justify-start">
                    <p className={cn(testMode ? "font-normal text-xs text-embloy-green" : "font-normal text-xs c2-5")}>{`${testMode ? "Test" : "Spectator"} mode`}</p>
                    <button
                        onClick={() => setTestMode(!testMode)}
                        className="hover:bg0-r"
                        onMouseEnter={handlePlugHover}
                        onMouseLeave={handlePlugNotHover}
                    >

                        {
                            testMode ?
                                <Image
                                    src={`/icons/sm-plugged-in-green${plugIsHovered ? "-light" : ""}.svg`}
                                    alt="columns"
                                    height="25"
                                    width="25"
                                    className={"relative px-0.5 bg0-r-full cursor-pointer"}
                                />
                                :
                                <Image
                                    src={`/icons/sm-plugged-out-${plugIsHovered ? "light" : "dark"}.svg`}
                                    alt="columns"
                                    height="25"
                                    width="25"
                                    className={"relative px-0.5 bg0-r-full cursor-pointer"}
                                />
                        }

                    </button>

                </div>


            </div>
            {testMode ? (
                <div className="min-h-[200px] w-full flex flex-col items-center justify-start gap-2 px-4 py-2">
                </div>
            ) : (
                <div className="min-h-[250px] w-9/10 flex flex-col items-center justify-start gap-4 px-4 py-2">
                    <div className="flex flex-col text-center">
                        <h1 className="text-lg font-semibold tracking-tight">
                            Apply for {title ?? "this job"}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your details below to apply
                        </p>
                    </div>
                    <div className="w-full">
                        <textarea
                            maxLength={500}
                            onChange={handleInputChange}
                            value={applicationText}
                            style={{resize: 'none', overflow: 'auto'}}
                            className="h-32 w-full resize-none rounded-md border bg-secondary p-2 text-sm focus:outline-none focus:ring-2 focus:ring-white bg0-r border-gray-700"
                            placeholder="* Enter your application text here... (max. 500 characters)"
                        />
                    </div>
                    {cv_required && (
                        <div className="w-full">
                            <legend className="text-lg font-semibold">
                                Upload your CV *
                            </legend>
                            <div
                                className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                                <div className="space-y-1 text-center">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept={allowed_cv_formats.join(",")}
                                        className="w-full focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Allowed formats: {allowed_cv_formats.join(", ")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {application_options.map((option, index) => {
                        const label = option.required
                            ? `${option.question} *`
                            : option.question;
                        switch (option.question_type) {
                            case "link":
                                return (
                                    <div className="w-full">
                                        <legend className="text-lg font-semibold">{label}</legend>
                                        <input
                                            key={index}
                                            type="text"
                                            required={option.required}
                                            placeholder="https://example.com"
                                            className="c0 px-2 border border-gray-700 outline-none rounded-sm focus:ring-2 focus:ring-white"
                                            onChange={(event) =>
                                                handleTextChange(option.id, event.target.value, option.required)
                                            }
                                        />
                                        {errorMessages[option.id] &&
                                            <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                    </div>
                                );
                            case "text":
                                return (
                                    <div className="w-full">
                                        <legend className="text-lg font-semibold">{label}</legend>
                                        <textarea
                                            key={index}
                                            required={option.required}
                                            onChange={(event) =>
                                                handleTextChange(option.id, event.target.value, option.required)
                                            }
                                            maxLength={200}
                                            style={{resize: 'none', overflow: 'auto'}}
                                            className="h-20 w-full rounded-md border bg-secondary p-2 text-sm focus:outline-none focus:ring-2 focus:ring-white bg0-r border-gray-700"
                                            placeholder="Enter your response (max. 200 characters)"
                                        />
                                        {errorMessages[option.id] &&
                                            <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                    </div>
                                );
                            case "yes_no":
                                return (
                                    <div className="w-full">
                                        <Select
                                            key={index}
                                            required={option.required}
                                            onValueChange={(value) => {
                                                handleSingleChoiceChange(option.id, value);
                                            }}
                                        >
                                            <SelectTrigger>{label}</SelectTrigger>
                                            <SelectContent>
                                                <SelectItem key="1" value={"Yes"}>
                                                    {"Yes"}
                                                </SelectItem>
                                                <SelectItem key="2" value={"No"}>
                                                    {"No"}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errorMessages[option.id] &&
                                            <div className="text-sm text-red-500">{errorMessages[option.id]}</div>}
                                    </div>
                                );
                            case "single_choice":
                                return (
                                    <div className="w-full">
                                        <Select
                                            key={index}
                                            required={option.required}
                                            onValueChange={(value) => {
                                                handleSingleChoiceChange(option.id, value);
                                            }}
                                        >
                                            <SelectTrigger>{label}</SelectTrigger>
                                            <SelectContent>
                                                {option.options.map((opt, optIndex) => (
                                                    <SelectItem key={optIndex} value={opt}>
                                                        {opt}
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
                                    <fieldset key={index} className="flex flex-col space-y-2 w-full">
                                        <legend className="text-lg font-semibold">{label}</legend>
                                        {option.options.map((opt, optIndex) => (
                                            <label
                                                key={optIndex}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    value={opt}
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
                    })}
                </div>
            )}
        </div>
    );
}