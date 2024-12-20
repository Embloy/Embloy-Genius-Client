"use client";
import React, { useEffect, useState, useRef } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { EmbloyP, EmbloyH1 } from "@/app/components/ui/misc/text";
import { EmbloyH, EmbloySeperator, EmbloyV } from "@/app/components/ui/misc/stuff";
import parse, { domToReact } from 'html-react-parser';
import { JobTitle, JobParagraph, JobUl, JobLi, JobStrong } from "@/lib/types/html_parts.tsx";
import {marked} from "marked";
import { not_core_get } from "@/lib/api/core";
import TurndownService from 'turndown';


const options = {
  replace: (domNode) => {
      if (domNode.name === 'h1') {
          return (
              <JobTitle>
                  {domToReact(domNode.children, options)}
              </JobTitle>
          );
      }
      if (domNode.name === 'p') {
          return (
              <JobParagraph>
                  {domToReact(domNode.children, options)}
              </JobParagraph>
          );
      }
      if (domNode.name === 'ul') {
          return <JobUl>{domToReact(domNode.children, options)}</JobUl>;
      }
      if (domNode.name === 'li') {
          return <JobLi>{domToReact(domNode.children, options)}</JobLi>;
      }
      if (domNode.name === 'strong') {
          return <JobStrong>{domToReact(domNode.children, options)}</JobStrong>;
      }
      if (domNode.name === 'a') {
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
export const checkBody = (original_body, new_body) => {
  if (original_body !== undefined && new_body !== undefined && original_body !== null && new_body !== null && original_body !== "" && new_body !== "") {
    const parser = new DOMParser();
    const original = parser.parseFromString(original_body, 'text/html');
    const other = parser.parseFromString(new_body, 'text/html');

    const original_serialized = original.body.innerHTML.trim();
    const other_serialized = other.body.innerHTML.trim();
    
    if (original_serialized !== other_serialized) {
      return true; 
    } else {
      return false;
    }

  } else if ((original_body === undefined || original_body === null || original_body === "") && new_body !== undefined && new_body !== null && new_body !== "") {
    return true;
  } else if (original_body !== undefined && original_body !== null && original_body !== "" && (new_body === undefined || new_body === null || new_body === "")) {
    return true;
  }
  return false;
}

export const html_to_markdown = (html) => {
  if (!html) {
    return null;
  }
  var turndownService = new TurndownService()
  turndownService.addRule('header', {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    replacement: function (content, node) {
      var hLevel = node.tagName.charAt(1);
      var hPrefix = '';
      for (var i = 0; i < hLevel; i++) {
        hPrefix += '#';
      }
      return '\n\n' + hPrefix + ' ' + content + '\n\n';
    }
  });
  var markdown = turndownService.turndown(html);
  return markdown;
}
  
export function PostDetails({ job, handleDataReload, onChange, editable }) {
  let bin = job?.description?.body;
  if (editable) {
    bin = html_to_markdown(bin);
  }
  const [markdown, setMarkdown] = useState({md:bin || "", cs:{line:0, ch:0}});
  const [previewStatus, setPreviewStatus] = useState(false);

  const handleSave = async () => {
    if (checkBody(job.description.body, markdown.md)) {
        let desc = { ...job.description };
        desc.body = marked(markdown.md);
        if (desc.body === "") {
            desc.body = null;
        }
        const body = {
            "description": desc.body
        }
        try {
            const res = await not_core_get("PATCH", `/jobs/${job.id}`, body);
        } catch (error) {
            setMarkdown(job.description.body); // Roll back on error
        }
    }
  }

  
  
  const handlePreview = () => {
    setPreviewStatus(!previewStatus);
  }

  return (
    <EmbloyV>
      {editable ? (
        <EmbloyH className="gap-2 justify-between">
          {!previewStatus &&
            <EmbloyV>
              <EmbloyH className={"justify-start"}>
                <EmbloyH1 className="text-sm">Board Post - Job Description</EmbloyH1>
              </EmbloyH>
              <SimpleMDE
                value={markdown.md}
                getCodemirrorInstance={(instance) => { 
                  instance.on('change', (editor) => {
                    const cursorPosition = editor.getCursor(); 
                    console.log("cursorPosition", cursorPosition);
                    const value = editor.getValue(); 
                    setMarkdown({md:value, cs:cursorPosition}); 
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
                      action: function customFunction(editor){
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
                      action: function customFunction(editor){
                        handleSave();
                      },
                      className: "fa fa-save",
                      title: "Save Button",
                    },
                  ],
                }}
              />
            </EmbloyV>
          }
          {previewStatus && <EmbloyV className="border border-etna dark:border-nebbiolo rounded-md ">
            <EmbloyH className={"justify-start gap-2 px-4 py-2"}>
              <button onClick={handlePreview}>
                <EmbloyP className="text-xs text-capri dark:text-capri underline">{"Return to Editor"}</EmbloyP>
              </button>
            </EmbloyH>
            <EmbloySeperator className="h-px w-full bg-etna dark:bg-nebbiolo" />
            <EmbloyV className="px-4 py-2">
              {markdown && parse(job?.description?.body || '', options)}
            </EmbloyV>
          </EmbloyV>}
        </EmbloyH>
      ) : (
        <EmbloyV className="border border-etna dark:border-nebbiolo rounded-md p-4">
            {markdown && parse(markdown.md || '', options)}
        </EmbloyV>
      )}
    </EmbloyV>
  );
}