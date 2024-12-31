"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    JobTableRowExtendable,
} from "@/app/components/ui/misc/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/app/components/ui/misc/dropdown-menu"
import React, {useEffect, useState} from "react";
import {DataTablePagination} from "@/app/components/dom/main/datatable/DataTablePagination";
import {extractContent} from "@/lib/utils/helpers";
import {UploadJobFileButton} from "@/app/components/dom/main/misc/FileUploads";
import { Job } from "../../lib/types/job";
import {useRouter} from "next/navigation";
import LoadingScreen from "@/app/components/dom/main/screens/LoadingScreen";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyChildrenAdvanced} from "@/app/components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import '@/app/globals.css'
import { IntegrationSync } from "../components/dom/main/misc/IntegrationSync";
import { EmbloyH1, EmbloyP } from "../components/ui/misc/text";
import { RemoveJobButton } from "../components/dom/main/datatable/job_remove_button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    handleDataReload: () => void
    onNewJob: () => void;
}

export function JobDataTable<TData extends Job, TValue>({columns, data, handleDataReload, onNewJob}: DataTableProps<TData, TValue>) {
    const router = useRouter();
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    const default_hides = () => {
        table.getColumn("id").toggleVisibility(false)
        table.getColumn("job_slug").toggleVisibility(false)
        table.getColumn("start_slot").toggleVisibility(false)
    }
    useEffect(() => {
        default_hides()
    }, [])

    const [openRow, setOpenRow] = useState<number>(null)
    const toggle_row = (row) => {
        let new_row = null
        if (openRow !== Number(row)) {
            new_row = Number(row)
        }
        setOpenRow(new_row)
    }
    const invalidateRowModel = () => {
        handleDataReload()
    }
    const handleUploadSuccess = () => {
        setRowSelection({});
        invalidateRowModel();
    }

    const getSelectedRows = () => {
        return rowSelection;
    }
    const getJob = (row_id) => {
        return data.at(Number(row_id))
    }

    if (!data) {
        return <LoadingScreen />
    }
    return (
        <EmbloyV className={"gap-2 border-t border-etna dark:border-biferno pt-2"}>
            <EmbloyH className={"items-center justify-between"}>
                <EmbloyH className={"w-4/12 gap-3 justify-start"}>
                    <EmbloyH1 className={"text-lg"}>Active Postings</EmbloyH1>
                </EmbloyH>
                <EmbloyH className={"w-8/12 gap-3 justify-end"}>
                    <EmbloyToolbox superClassName="h-7 border-2 dark:border-chianti" className={undefined} name={undefined} >
                        <button className="" onClick={onNewJob}>
                            <EmbloyToolboxImgAdvanced tooltip="New Job" path="/icons/svg/black/plus.svg" path_hovered="/icons/svg/capri/plus.svg" dark_path="/icons/svg/amarone/plus.svg" dark_path_hovered="/icons/svg/barbera/plus.svg" height="11" width="11" disabled={undefined} path_disabled={undefined} dark_path_disabled={undefined} failure={undefined} path_failure={undefined} path_failure_hovered={undefined} success={undefined} action={undefined} path_success={undefined} path_success_hovered={undefined} path_action={undefined} path_hovered_action={undefined} dark_path_action={undefined} dark_path_hovered_action={undefined} />
                        </button>
                        <IntegrationSync disabled={true} key="Sync" name={""} />
                        {/*<UploadJobFileButton key="Upload" router={router}  formats={['.json']} head="Upload jobs" img="sm-upload" style="relative cursor-pointer" onUploadSuccess={() => handleUploadSuccess()}/>*/}
                        <RemoveJobButton key="Remove" getJob={(row_id) => getJob(row_id)} formats={['.json']} img="sm-delete" style="relative px-0.5 bg0-r-full cursor-pointer" getSelectedRows={() => getSelectedRows()} onUploadSuccess={() => handleUploadSuccess()}/>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="outline-none">
                                <button className="">
                                    <EmbloyToolboxImgAdvanced tooltip="Show/Hide Columns" path="/icons/svg/black/cols.svg" path_hovered="/icons/svg/capri/cols.svg" dark_path="/icons/svg/amarone/cols.svg" dark_path_hovered="/icons/svg/barbera/cols.svg" height="11" width="11" disabled={undefined} path_disabled={undefined} dark_path_disabled={undefined} failure={undefined} path_failure={undefined} path_failure_hovered={undefined} success={undefined} action={undefined} path_success={undefined} path_success_hovered={undefined} path_action={undefined} path_hovered_action={undefined} dark_path_action={undefined} dark_path_hovered_action={undefined} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Column selection:</DropdownMenuLabel>
                                {table
                                    .getAllColumns()
                                    .filter(
                                        (column) => column.getCanHide()
                                    )
                                    .map((column) => {
                                        const column_title = extractContent(column.columnDef.header.toString(), 'title')
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize text-page-text hover:text-capri dark:hover:text-barbera cursor-pointer"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column_title}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <EmbloyToolboxImgA tooltip="Help" href="https://developers.embloy.com/docs/category/genius" height="12" width="12" path="/icons/svg/black/ask.svg" path_hovered="/icons/svg/capri/ask.svg" dark_path="/icons/svg/amarone/ask.svg" dark_path_hovered="/icons/svg/barbera/ask.svg" target="_blank" disabled={undefined} path_disabled={undefined} dark_path_disabled={undefined} />
                    </EmbloyToolbox>
                    <input
                        className={"rounded-lg text-sm bg-white dark:bg-chianti dark:border-chianti text-black dark:text-white h-7 w-48 px-2 placeholder-etna dark:placeholder-amarone border-[1px] border-etna dark:border-none outline-none focus:outline-none focus:ring-2 focus:ring-golfotrieste dark:focus:ring-amarone select-all"}
                        type="text"
                        name="name"
                        placeholder="Filter..."
                        value={(table.getColumn("position")?.getFilterValue() as string) ?? ""}
                        onChange=
                            {
                                (event) => {
                                    if (window.scrollY !== 0) {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth"
                                        });
                                    }
                                    table.getColumn("position")?.setFilterValue(event.target.value)
                                }
                            }

                    />
                    
                </EmbloyH>
            </EmbloyH>
            
            <div className="bg-white dark:bg-chianti border border-etna dark:border-biferno text-black dark:text-white rounded-lg w-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="border-etna dark:border-biferno" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    if (typeof header.column.columnDef['accessorKey'] === "undefined") {
                                        return (
                                            <TableHead className="cursor-default" key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    }
                                    return (
                                        <TableHead
                                            key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="text-white">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows
                                .map((row) => (
                                <JobTableRowExtendable 
                                    className={`cursor-pointer border-etna dark:border-biferno hover:bg-ferrara dark:hover:bg-biferno`}
                                    key={row.id}
                                    extended={!!(openRow !== null && openRow === Number(row.id))}
                                    job={data.at(Number(row.id))}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={(event) => {
                                    const target = event.target as HTMLElement;
                                        if (target.getAttribute('role') === 'checkbox') {
                                            return;
                                        } else {
                                            toggle_row(row.id);
                                        }
                                    }}
                                    onUploadSuccess={() => handleUploadSuccess()}
                                    onClose={() => setOpenRow(null)}
                                    onRemove={() => {
                                        invalidateRowModel();
                           
                                    }}
                                    onExtending={() => table.getAllColumns().filter((column) => column.getIsVisible()).length}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}

                                </JobTableRowExtendable>

                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <EmbloyH className="bg-body dark:bg-chianti gap-1.5 items-center rounded-lg border border-etna dark:border-biferno p-2 max-w-fit">
                <DataTablePagination table={table}/>
                <div className="flex items-center justify-start space-x-2">
                    {table.getFilteredSelectedRowModel().rows.length > 0 && (
                        <EmbloyP className="text-xs">{table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.</EmbloyP>
                    )}
                </div>
            </EmbloyH>
        </EmbloyV>
    )
}