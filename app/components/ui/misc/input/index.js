import React, { forwardRef } from "react";
import '@/app/globals.css'
import { EmbloyBox } from "@/app/components/ui/misc/box";
import { EmbloyH1, EmbloyP } from "@/app/components/ui/misc/text";
import { EmbloyChildrenAdvanced, EmbloyH, EmbloyV } from "@/app/components/ui/misc/stuff";

export const EmbloyInputbox = ({ children, className, variant }) => {
  return (
    <EmbloyBox variant="chilled" className={`landscape:px-3.5 portrait:px-2 landscape:py-2.5 portrait:py-2 ${className}`}>
      {children}
    </EmbloyBox>
  );
};

export const EmbloyInputboxElement = ({ children, disabled = false, className, description, head, notes }) => {
  return (
    <EmbloyH className={`items-start justify-between min-h-10 ${className}`}>
      <EmbloyV className="h-full w-4/12 gap-1">
        <EmbloyH1 className="text-sm">{head}</EmbloyH1>
        <EmbloyP className="text-xs">{description}</EmbloyP>
      </EmbloyV>
      <EmbloyH className="h-full items-center w-6/12 gap-2">
        {React.Children.map(children, (child, index) => (
          <EmbloyChildrenAdvanced key={index} disabled={disabled} className={"w-6/12"}>
            {child}
          </EmbloyChildrenAdvanced>
        ))}
      </EmbloyH>
    </EmbloyH>
  );
};

export const EmbloyInput = forwardRef(({ sandboxed=true, children, className, variant, ...props }, ref) => {
  const disabledStyle = "dark:border-biferno cursor-not-allowed";
  const basicStyle = `${props.disabled ? disabledStyle : "dark:border-rubeno"} px-2 min-h-9 w-full border-[1px] rounded-lg dark:bg-nebbiolo border border-etna page-text placeholder-etna dark:placeholder-amarone focus:outline-none focus:ring-2 dark:focus:ring-amarone focus:ring-lagunaveneta select-all`;
  const disabledColorStyle = 'dark:text-etna text-vesuvio bg-pompei dark:bg-aglianico';
  if (sandboxed) {
    if (variant === "select") {
      return (
        <select className={`${basicStyle} ${props.disabled && disabledColorStyle} ${className}`} {...props}>
          {children}
        </select>
      );
    } else if (variant === "file") {
      return (
        <input type="file" ref={ref} {...props} />
      );
    } else if (variant === "single-choice") {
      return (
        <EmbloyV className={`${basicStyle} ${props.disabled && disabledColorStyle} p-2 gap-2 ${className}`}>
          {children}
        </EmbloyV>
      );

    } else if (variant === "password") {
      return (
        <input className={`${basicStyle} ${props.disabled && disabledColorStyle} ${className}`} type="password" {...props} />
      );
    } else {
      return (
        <input className={`${basicStyle} ${props.disabled && disabledColorStyle} ${className}`} type="text" {...props} />
      );
    }
  } else {
    return (
      <input className={`${basicStyle} ${disabledColorStyle} ${className}`} type="text" {...props} value="Not available in Sandbox mode" />
    );    
  }
});
EmbloyInput.displayName = "EmbloyInput";

export const EmbloySelectOption = ({ children, value, head }) => {
  return (
    <option value={value}>{children ?? head}</option>
  );
};

export const EmbloyRadioOption = ({ value, head, note, note_state, ...props }) => {
  const act = props.checked ? "cursor-default" : "cursor-pointer";
  let ns = "";
  if (note_state === "error") {
    ns = "text-primitivo dark:text-primitivo";
  } else if (note_state === "success") {
    ns = "text-lugana dark:text-lugana";
  } else {
    ns = "text-amber-400 dark:text-amber-400";
  }
  return (
    <label className={`flex items-center gap-2 select-none ${act}`}>
      <input type="radio" className={`border-primitivo ${act}`} value={value} {...props} />
      <EmbloyP className="text-sm page-text">{head}</EmbloyP>
      {note && <EmbloyP className={`text-xs ${ns}`}>{note}</EmbloyP>}
    </label>
  );
};
