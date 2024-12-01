"use client";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { EmbloyP } from "@/app/components/ui/misc/text";
import { EmbloyV } from "@/app/components/ui/misc/stuff";
import parse, { domToReact } from 'html-react-parser';
import { JobTitle, JobParagraph, JobUl, JobLi, JobStrong } from "@/lib/types/html_parts.tsx";
export function PostDetails({ job, handleDataReload, onChange, editable }) {
  const [markdown, setMarkdown] = useState(job?.description?.body || "");

  const handleMarkdownChange = (value) => {
    setMarkdown(value);
    if (onChange) {
      onChange(value);
    }
  };

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
      ) : (
        <EmbloyV className="gap-2">
            {markdown && parse(markdown|| '', options)}
        </EmbloyV>
      )}
    </EmbloyV>
  );
}
