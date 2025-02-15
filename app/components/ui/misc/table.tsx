import * as React from "react";
import { cn } from "@/lib/utils";
import { Job } from "@/lib/types/job";
import { JobDetails } from "@/app/recruitment/job_details";
import { Application } from "@/lib/types/application";
import ApplicationDetails from "@/app/recruitment/application_details";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const ApplicationTableRowExtendable = React.forwardRef<
  HTMLTableRowElement,
  {
    className?: string;
    extended?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    application?: Application;
    children?: React.ReactNode;
    onUpdateSuccess: () => void;
    onClose: () => void;
    onExtending: () => number;
  }
>(
  (
    {
      className,
      onUpdateSuccess,
      onExtending,
      onClose,
      extended,
      application,
      ...props
    },
    ref
  ) => {
    const rowClasses = cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    );

    const { children, ...otherProps } = props;

    return extended ? (
      <>
        <tr ref={ref} className={rowClasses} {...otherProps}>
          {children}
        </tr>
        <tr
          className={cn(
            rowClasses,
            "relative, w-screen, bg-transparent, hover:bg-transparent"
          )}
        >
          <td colSpan={onExtending()}>
            <div className="h-full">
              <ApplicationDetails
                application={application}
                onUpdateSuccess={() => onUpdateSuccess()}
                onClose={() => onClose()}
              />
            </div>
          </td>
        </tr>
      </>
    ) : (
      <>
        <tr ref={ref} className={rowClasses} {...otherProps}>
          {children}
        </tr>
      </>
    );
  }
);
ApplicationTableRowExtendable.displayName = "ApplicationTableRowExtendable";

const JobTableRowExtendable = React.forwardRef<
  HTMLTableRowElement,
  {
    className?: string;
    extended?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    job?: Job;
    children?: React.ReactNode;
    onUploadSuccess: () => void;
    onClose: () => void;
    onExtending: () => number;
  }
>(
  (
    {
      className,
      onUploadSuccess,
      onExtending,
      onClose,
      extended,
      job,
      ...props
    },
    ref
  ) => {
    const rowClasses = cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    );

    const { children, ...otherProps } = props;

    return extended ? (
      <>
        <tr ref={ref} className={rowClasses} {...otherProps}>
          {children}
        </tr>
        <tr
          className={cn(
            rowClasses,
            "relative, w-screen, bg-transparent, hover:bg-transparent"
          )}
        >
          <td colSpan={onExtending()}>
            <div className="h-full">
              <JobDetails
                job={job}
                onUploadSuccess={() => onUploadSuccess()}
                onClose={() => onClose()}
              />
            </div>
          </td>
        </tr>
      </>
    ) : (
      <>
        <tr ref={ref} className={rowClasses} {...otherProps}>
          {children}
        </tr>
      </>
    );
  }
);
JobTableRowExtendable.displayName = "JobTableRowExtendable";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-8 px-2 text-left align-middle font-normal text-xs text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-3 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-black dark:text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  JobTableRowExtendable,
  ApplicationTableRowExtendable,
  TableCell,
  TableCaption,
};
