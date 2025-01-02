import { EmbloyH1, EmbloyP } from "@/app/components/ui/misc/text";

export const JobParagraph = ({ children }) => (
    <EmbloyP className="text-sm mb-4">{children}</EmbloyP>
  );
  export const JobUl = ({ children }) => (
    <ul className="ml-8 list-disc text-sm mb-4">{children}</ul>
  );
  
  export const JobLi = ({ children }) => (
    <li className="text-sm text-black dark:text-white">{children}</li>
  );
  
  export const JobStrong = ({ children }) => (
    <strong className="font-heading text-sm">{children}</strong>
  );
  
  export const JobTitle = ({ children }) => (
    <EmbloyH1 className="font-heading text-base mb-4">{children}</EmbloyH1>
  );