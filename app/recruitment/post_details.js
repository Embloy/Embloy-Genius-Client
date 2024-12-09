"use client";
import React, { useEffect, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { EmbloyP } from "@/app/components/ui/misc/text";
import { EmbloyH, EmbloyV } from "@/app/components/ui/misc/stuff";
import parse, { domToReact } from 'html-react-parser';
import { JobTitle, JobParagraph, JobUl, JobLi, JobStrong } from "@/lib/types/html_parts.tsx";
import {marked} from "marked";
import { not_core_get } from "@/lib/api/core";

export function PostDetails({ job, handleDataReload, onChange, editable }) {
  const [markdown, setMarkdown] = useState(job?.description?.body || "");
  const handleMarkdownChange = (value) => {
    setMarkdown(value);
    if (onChange) {
      onChange(value);
      
    }
  };
  const [altered, setAltered] = useState(false);
  useEffect(() => {
    const checkBody = (original_body, new_body) => {
      console.log("original_body", original_body !== undefined, original_body !== null, original_body !== "", original_body);
      console.log("new_body", new_body !== undefined, new_body !== null, new_body !== "", new_body);
      if (original_body !== undefined && new_body !== undefined && original_body !== null && new_body !== null && original_body !== "" && new_body !== "") {
        console.log("original_body", original_body, "new_body", new_body);
        const parser = new DOMParser();
        const original = parser.parseFromString(original_body, 'text/html');
        const other = parser.parseFromString(new_body, 'text/html');

        const original_serialized = original.body.innerHTML.trim();
        const other_serialized = other.body.innerHTML.trim();
        
        if (original_serialized !== other_serialized) {
          console.log("both not null - altered")
          return true; 
        } else {
          console.log("both not null - not altered")
          return false;
        }

      } else if ((original_body === undefined || original_body === null || original_body === "") && new_body !== undefined && new_body !== null && new_body !== "") {
        console.log("original_body empty new body not empty - altered")
        return true;
      } else if (original_body !== undefined && original_body !== null && original_body !== "" && (new_body === undefined || new_body === null || new_body === "")) {
        console.log("original_body not empty new body empty - altered")
        return true;
      }
      console.log("both empty - not altered")
      return false;
    }
    console.log("markdown", marked(markdown));  
    console.log("job.description.body", job.description.body);
    const result = checkBody(job.description.body, marked(markdown));
    if (result && !altered) {
        setAltered(true);
    } else if (!result && altered) {
        setAltered(false);
    }
  }, [markdown]);

  const handleSave = async () => {
    if (altered) {
        let desc = { ...job.description };
        desc.body = marked(markdown);
        console.log("desc", desc);
        const body = {
            "description": desc
        }
        try {
            const res = await not_core_get("PATCH", `/jobs/${job.id}`, body);
            setAltered(false);
            handleDataReload();
            
        } catch (error) {
            console.log("error", error);
            setMarkdown(job.description.body);
        }
    }
}


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

  return (
    <EmbloyV>
      {editable ? (
        <EmbloyV>
          <EmbloyH className={"justify-end"}>
            <EmbloyH className={"gap-1.5 max-w-fit"}>{altered && <button onClick={handleSave}><EmbloyP className="text-xs text-capri dark:text-capri underline">{"Save changes"}</EmbloyP></button>}<button onClick={() => {console.log("MAGA")}}><EmbloyP className="text-xs text-primitivo dark:text-primitivo underline">{"Delete all items"}</EmbloyP></button></EmbloyH>
          </EmbloyH>
          <SimpleMDE
            value={markdown}
            onChange={handleMarkdownChange}
            options={{
              autofocus: true,
              spellChecker: false,
              placeholder: "Write job description in Markdown...",
            }}
            className="w-full text-black dark:text-white"
          />
        </EmbloyV>
      ) : (
        <EmbloyV className="gap-2">
            {markdown && parse(markdown|| '', options)}
        </EmbloyV>
      )}
    </EmbloyV>
  );
}
