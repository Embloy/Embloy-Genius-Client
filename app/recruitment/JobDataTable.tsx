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
import {cn} from "@/lib/utils";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {DataTablePagination} from "@/app/components/dom/main/datatable/DataTablePagination";
import {extractContent} from "@/lib/utils/helpers";
import {UploadJobFileButton} from "@/app/components/dom/main/misc/FileUploads";
import { Job } from "../../lib/types/job";
import {useRouter} from "next/navigation";
import LoadingScreen from "@/app/components/dom/main/screens/LoadingScreen";
import {RemoveJobButton} from "@/app/components/dom/main/datatable/job_remove_button";
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer} from "@/app/components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgAdvanced } from "@/app/components/ui/misc/toolbox";
import { button } from "@nextui-org/react";
import '@/app/globals.css'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    handleDataReload: () => void
}

export function JobDataTable<TData extends Job, TValue>({columns, data, handleDataReload}: DataTableProps<TData, TValue>) {
    const router = useRouter();
    const [filterIsHovered, setFilterIsHovered] = useState(false);
    const [columnsIsHovered, setColumnsIsHovered] = useState(false)


    const handleFilterHover = () => {
        setFilterIsHovered(true)
    }
    const handleFilterNotHover = () => {
        setFilterIsHovered(false)
    }

    const handleColumnsHover = () => {
        setColumnsIsHovered(true)
    }
    const handleColumnsNotHover = () => {
        setColumnsIsHovered(false)
    }

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
        table.getColumn("job_id").toggleVisibility(false)
        table.getColumn("job_type").toggleVisibility(false)
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
        <EmbloyV className={"gap-2 border-t dark:border-biferno pt-2"}>
            {
                /*
                
            <div className="text-sm w-full flex flex-row items-center justify-between select-none">
                
                <div className="px-4 flex flex-row items-center justify-end">
                    
                    
                    
                </div>
            </div>
            */}
            <EmbloyH className={"items-center justify-between"}>
                <p className="w-2/12 page-text text-sm text-normal">Active Postings:</p>
                <EmbloyH className={"w-8/12 gap-3 justify-end"}>
                    <EmbloyToolbox superClassName="h-7 border-2 dark:border-chianti" className={undefined} name={undefined} >
                        <UploadJobFileButton key="Upload" router={router}  formats={['.json']} head="Upload jobs" img="sm-upload" style="relative cursor-pointer" onUploadSuccess={() => handleUploadSuccess()}/>
                        <RemoveJobButton key="Remove" router={router} getJob={(row_id) => getJob(row_id)} formats={['.json']} img="sm-delete" style="relative px-0.5 bg0-r-full cursor-pointer" getSelectedRows={() => getSelectedRows()} onUploadSuccess={() => handleUploadSuccess()}/>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="outline-none">
                                <button className="">
                                    <EmbloyToolboxImgAdvanced tooltip="Show/Hide Columns" path="/icons/svg/black/cols.svg" path_hovered="/icons/svg/leidoveneta/cols.svg" dark_path="/icons/svg/amarone/cols.svg" dark_path_hovered="/icons/svg/barbera/cols.svg" height="11" width="11" />
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
                                                className="capitalize text-page-text hover:text-barbera cursor-pointer"
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
                        <EmbloyToolboxImgA tooltip="Help" href="https://developers.embloy.com/docs/category/genius" height="12" width="12" path="/icons/svg/black/ask.svg" path_hovered="/icons/svg/leidoveneta/ask.svg" dark_path="/icons/svg/amarone/ask.svg" dark_path_hovered="/icons/svg/barbera/ask.svg" target="_blank" />
                    </EmbloyToolbox>
                    <input
                        className={"rounded-lg text-sm dark:bg-chianti border-2 dark:border-chianti text-white h-7 w-48 px-2 placeholder-amarone border-none outline-none focus:outline-none focus:ring-2 focus:ring-amarone select-all"}
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
            
            <div className="bg-chianti border border-biferno text-white rounded-lg">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="border-biferno" key={headerGroup.id}>
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
                                <JobTableRowExtendable className="border-biferno hover:bg-biferno cursor-pointer"
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
            <div className="p-4 flex flex-row items-center justify-between">
                <div className="flex items-center justify-start space-x-2">
                    {table.getFilteredSelectedRowModel().rows.length > 0 && (
                        // If the condition is true
                        <p className="text-page-text">{table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.</p>
                    )}
                </div>
                <DataTablePagination table={table}/>
            </div>

        </EmbloyV>
    )
}