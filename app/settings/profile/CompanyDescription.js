import React, {useContext, useEffect, useRef, useState} from "react";
import '@/app/globals.css'
import {AvatarButton} from "@/app/components/ui/misc/avatar";
import { not_core_get } from "@/lib/api/core";
import '@/app/globals.css'
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyToggle, EmbloyButton, EmbloySeperator} from "@/app/components/ui/misc/stuff";
import { EmbloyInput, EmbloyInputbox, EmbloyInputboxElement, EmbloyRadioOption, EmbloySelectOption } from "@/app/components/ui/misc/input";
import { EmbloyP, EmbloyH1} from "@/app/components/ui/misc/text";
import { XIcon } from "lucide-react";
import { FaLink } from "react-icons/fa";
import {marked} from "marked";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import TurndownService from 'turndown';
import { html_to_markdown, checkBody } from "@/app/recruitment/post_details";
const options = {
    replace: (domNode) => {
        if (domNode.name === "h1") {
            return <h1>{domToReact(domNode.children, options)}</h1>;
        }
        if (domNode.name === "p") {
            return <p>{domToReact(domNode.children, options)}</p>;
        }
        if (domNode.name === "ul") {
            return <ul>{domToReact(domNode.children, options)}</ul>;
        }
        if (domNode.name === "li") {
            return <li>{domToReact(domNode.children, options)}</li>;
        }
        if (domNode.name === "strong") {
            return <strong>{domToReact(domNode.children, options)}</strong>;
        }
        if (domNode.name === "a") {
            return (
                <a
                    href={domNode.attribs.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    {domToReact(domNode.children)}
                </a>
            );
        }
    },
};

export function CompanyDescription({ reload, company }) {
    let bin = html_to_markdown(company?.company_description?.body);
    const [markdown, setMarkdown] = useState({ md: bin || "", cs: { line: 0, ch: 0 } });
    const [previewStatus, setPreviewStatus] = useState(false);

    const handlePreview = () => {
        setPreviewStatus(!previewStatus);
    };

    const handleDescriptionSave = async () => {
        console.log("Saving description...");
        // Add your save logic here
    };

    return (
        <div>
            {!previewStatus ? (
                <EmbloyV className="gap-2">
                    <EmbloyH className="justify-start">
                        <EmbloyH1 className="text-sm">Company Description</EmbloyH1>
                    </EmbloyH>
                    <SimpleMDE
                        value={markdown.md}
                        getCodemirrorInstance={(instance) => {
                            instance.on("change", (editor) => {
                                const cursorPosition = editor.getCursor();
                                const value = editor.getValue();
                                setMarkdown({ md: value, cs: cursorPosition });
                            });
                            if (markdown.cs) {
                                instance.setCursor(markdown.cs);
                            }
                        }}
                        className="w-full text-black dark:text-white"
                        options={{
                            autofocus: true,
                            hideIcons: ["guide", "side-by-side", "fullscreen", "quote", "preview"],
                            toolbar: [
                                {
                                    name: "custom",
                                    action: function customFunction(editor) {
                                        handlePreview();
                                    },
                                    className: "fa fa-eye",
                                    title: "Custom Button",
                                },
                                "|",
                                "bold",
                                "italic",
                                "heading",
                                "unordered-list",
                                "ordered-list",
                                "link",
                                "image",
                                "|",
                                {
                                    name: "custom_save",
                                    action: function customFunction(editor) {
                                        handleDescriptionSave();
                                    },
                                    className: "fa fa-save",
                                    title: "Save Button",
                                },
                            ],
                        }}
                    />
                </EmbloyV>
            ) : (
                <EmbloyV className="gap-2">
                    <EmbloyH className="justify-start">
                        <EmbloyH1 className="text-sm">Company Description</EmbloyH1>
                    </EmbloyH>
                    <EmbloyV className="border border-etna dark:border-nebbiolo rounded-md">
                        <EmbloyH className="justify-start gap-2 px-4 py-2">
                            <button onClick={handlePreview}>
                                <EmbloyP className="text-xs text-capri dark:text-capri underline">Return to Editor</EmbloyP>
                            </button>
                        </EmbloyH>
                        <EmbloySeperator className="h-px w-full bg-etna dark:bg-nebbiolo" />
                        <EmbloyV className="px-4 py-2">
                            {markdown && parse(company?.company_description?.body || "", options)}
                        </EmbloyV>
                    </EmbloyV>
                </EmbloyV>
            )}
        </div>
    );
}