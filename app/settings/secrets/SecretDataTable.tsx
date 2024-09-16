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
import { EmbloyLHPV, EmbloyV, EmbloyH, EmbloySpacer, EmbloyButton, EmbloySeperator} from "@/app/components/ui/misc/stuff";
import { EmbloyToolbox, EmbloyToolboxImgA, EmbloyToolboxImgAdvanced, EmbloyToolboxImgButton } from "@/app/components/ui/misc/toolbox";
import '@/app/globals.css'
import { Secret } from "@/lib/types/secret";
import {
    useDisclosure,
  } from "@nextui-org/react";
import { EmbloyModal } from "@/app/components/ui/misc/modal";
import { EmbloyP } from "@/app/components/ui/misc/text";
import { not_core_get } from "@/lib/api/core";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onInternal: () => void
    internal: boolean
    onExpired: () => void
    expired: boolean
    onTokenDelete: (token_id?: number[]) => void
    onTokenInvalidate: (token_id?: number[]) => void
    onTokenValidate: (token_id?: number[]) => void
}

export function SecretDataTable<TData extends Secret, TValue>({columns, data, onInternal, internal, expired, onExpired, onTokenDelete, onTokenValidate, onTokenInvalidate}: DataTableProps<TData, TValue>) {

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
        table.getColumn("last_used_at").toggleVisibility(false)
    }
    useEffect(() => {
        default_hides()
    }, [])

    
    const invalidateRowModel = () => {
        onTokenDelete()
    }

    const handleUploadSuccess = () => {
        setRowSelection({});
        invalidateRowModel();
    }

    const getToken = (row_id) => {
        return data.at(Number(row_id))
    }

    const getSelectedRows = () => {
        return rowSelection;
    }

    const clipboardModal = useDisclosure()
    const [clipboardData, setClipboardData] = useState<string[]>([])

    const handleTokenClipboard = () => {
        const selectedRows = getSelectedRows();
        setClipboardData([]);
        if (selectedRows && Object.keys(selectedRows).length > 0) {
            let token_data = []
            for (const token in selectedRows) {
                token_data.push(getToken(token))
            }
            setClipboardData(token_data)
            clipboardModal.onOpenChange();
        }
    }

    const handleTokenDelete = async () => {
        const invalidateToken = async (token_id) => {
            try {
                await not_core_get("DELETE", `/tokens/${token_id}`)
                return true
            } catch (e) {
                return false
            }
        }
        const selectedRows = getSelectedRows();
        if (selectedRows && Object.keys(selectedRows).length > 0) {
            let removed = []
            for (const token in selectedRows) {
                const res: boolean = await invalidateToken(getToken(token).id)
                if (res === true) {
                    removed.push(getToken(token).id)
                }
                
            }
            onTokenDelete(removed);
            setRowSelection({});
            
        }
    }
    const handleTokenDeactivate = async () => {
        const invalidateToken = async (token_id) => {
            try {
                await not_core_get("PATCH", `/tokens/${token_id}`, {active: false})
                return true
            } catch (e) {
                return false
            }
        }
        const selectedRows = getSelectedRows();
        if (selectedRows && Object.keys(selectedRows).length > 0) {
            let removed = []
            for (const token in selectedRows) {
                const res: boolean = await invalidateToken(getToken(token).id)
                if (res === true) {
                    removed.push(getToken(token).id)
                }
                
            }
            onTokenInvalidate(removed);
            setRowSelection({});
        }
    }
    const handleTokenActivate = async () => {
        const invalidateToken = async (token_id) => {
            try {
                await not_core_get("PATCH", `/tokens/${token_id}`, {active: true})
                return true
            } catch (e) {
                return false
            }
        }
        const selectedRows = getSelectedRows();
        if (selectedRows && Object.keys(selectedRows).length > 0) {
            let removed = []
            for (const token in selectedRows) {
                const res: boolean = await invalidateToken(getToken(token).id)
                if (res === true) {
                    removed.push(getToken(token).id)
                }
                
            }
            onTokenValidate(removed);
            setRowSelection({});
        }
    }

    return (
        <>
        <EmbloyV className={"gap-2"}>
            <EmbloyH className={"items-center justify-between"}>
                <EmbloyH className={"w-8/12 gap-3 justify-end"}>
                    <EmbloyToolbox superClassName="h-7 border-2 dark:border-chianti" className={undefined} name={undefined} >
                        <EmbloyToolboxImgButton tooltip={"Copy Token(s) to Clipboard"} success={undefined} failure={undefined} action={undefined} onClick={handleTokenClipboard} path="/icons/svg/black/cp.svg" path_action={undefined} path_success={undefined} path_failure={undefined} path_success_hovered={undefined} path_failure_hovered={undefined} path_hovered="/icons/svg/leidoveneta/cp.svg" path_hovered_action={undefined} path_disabled={undefined} dark_path="/icons/svg/amarone/cp.svg" dark_path_action={undefined} dark_path_hovered="/icons/svg/barbera/cp.svg" dark_path_hovered_action={undefined} dark_path_disabled={undefined} height="13" width="13" />
                        <EmbloyToolboxImgButton tooltip={"Activate Token(s)"} success={undefined} failure={undefined} action={undefined} onClick={handleTokenActivate} path="/icons/svg/black/success.svg" path_action={undefined} path_success={undefined} path_failure={undefined} path_success_hovered={undefined} path_failure_hovered={undefined} path_hovered="/icons/svg/leidoveneta/success.svg" path_hovered_action={undefined} path_disabled={undefined} dark_path="/icons/svg/amarone/success.svg" dark_path_action={undefined} dark_path_hovered="/icons/svg/barbera/success.svg" dark_path_hovered_action={undefined} dark_path_disabled={undefined} height="13" width="13" />
                        <EmbloyToolboxImgButton tooltip={"Deactivate Token(s)"} success={undefined} failure={undefined} action={undefined} onClick={handleTokenDeactivate} path="/icons/svg/black/no.svg" path_action={undefined} path_success={undefined} path_failure={undefined} path_success_hovered={undefined} path_failure_hovered={undefined} path_hovered="/icons/svg/leidoveneta/no.svg" path_hovered_action={undefined} path_disabled={undefined} dark_path="/icons/svg/amarone/no.svg" dark_path_action={undefined} dark_path_hovered="/icons/svg/barbera/no.svg" dark_path_hovered_action={undefined} dark_path_disabled={undefined} height="13" width="13" />
                        <EmbloyToolboxImgButton tooltip={"Delete Token(s)"} success={undefined} failure={undefined} action={undefined} onClick={handleTokenDelete} path="/icons/svg/black/bin.svg" path_action={undefined} path_success={undefined} path_failure={undefined} path_success_hovered={undefined} path_failure_hovered={undefined} path_hovered="/icons/svg/leidoveneta/bin.svg" path_hovered_action={undefined} path_disabled={undefined} dark_path="/icons/svg/amarone/bin.svg" dark_path_action={undefined} dark_path_hovered="/icons/svg/barbera/bin.svg" dark_path_hovered_action={undefined} dark_path_disabled={undefined} height="13" width="13" />
                        <EmbloyToolboxImgButton tooltip={internal ? "Hide Internal Authentication Tokens" : "Show Internal Authentication Tokens"} success={undefined} failure={undefined} action={undefined} onClick={onInternal} path="/icons/svg/black/embloy.svg" path_action={undefined} path_success={undefined} path_failure={undefined} path_success_hovered={undefined} path_failure_hovered={undefined} path_hovered="/icons/svg/leidoveneta/embloy.svg" path_hovered_action={undefined} path_disabled={undefined} dark_path="/icons/svg/amarone/embloy.svg" dark_path_action={undefined} dark_path_hovered="/icons/svg/barbera/embloy.svg" dark_path_hovered_action={undefined} dark_path_disabled={undefined} height="13" width="13" />
                        <EmbloyToolboxImgButton tooltip={expired ? "Hide Expired Tokens" : "Show Expired Tokens"} success={undefined} failure={undefined} action={undefined} onClick={onExpired} path="/icons/svg/black/exp.svg" path_action={undefined} path_success={undefined} path_failure={undefined} path_success_hovered={undefined} path_failure_hovered={undefined} path_hovered="/icons/svg/leidoveneta/exp.svg" path_hovered_action={undefined} path_disabled={undefined} dark_path="/icons/svg/amarone/exp.svg" dark_path_action={undefined} dark_path_hovered="/icons/svg/barbera/exp.svg" dark_path_hovered_action={undefined} dark_path_disabled={undefined} height="13" width="13" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="outline-none">
                                <button className="">
                                    <EmbloyToolboxImgAdvanced tooltip="Show/Hide Columns" path="/icons/svg/black/cols.svg" path_hovered="/icons/svg/leidoveneta/cols.svg" dark_path="/icons/svg/amarone/cols.svg" dark_path_hovered="/icons/svg/barbera/cols.svg" height="11" width="11" disabled={undefined} path_disabled={undefined} dark_path_disabled={undefined} failure={undefined} path_failure={undefined} path_failure_hovered={undefined} success={undefined} action={undefined} path_success={undefined} path_success_hovered={undefined} path_action={undefined} path_hovered_action={undefined} dark_path_action={undefined} dark_path_hovered_action={undefined} />
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
                                                className="capitalize page-text hover:text-leidoveneta dark:hover:text-barbera cursor-pointer"
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
                        <EmbloyToolboxImgA tooltip="Help" href="https://developers.embloy.com/docs/category/genius" height="12" width="12" path="/icons/svg/black/ask.svg" path_hovered="/icons/svg/leidoveneta/ask.svg" dark_path="/icons/svg/amarone/ask.svg" dark_path_hovered="/icons/svg/barbera/ask.svg" target="_blank" disabled={undefined} path_disabled={undefined} dark_path_disabled={undefined} />
                    </EmbloyToolbox>
                    <input
                        className={"rounded-lg text-sm bg-white dark:bg-chianti border-2 dark:border-chianti text-black dark:text-white h-7 w-48 px-2 placeholder-etna dark:placeholder-amarone border-none outline-none focus:outline-none focus:ring-2 focus:ring-golfotrieste dark:focus:ring-amarone select-all"}
                        type="text"
                        name="name"
                        placeholder="Filter..."
                        value={(table.getColumn("token_type")?.getFilterValue() as string) ?? ""}
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
            
            <div className="bg-white dark:bg-chianti border border-vesuvio dark:border-biferno text-black dark:text-white rounded-lg w-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="border-vesuvio dark:border-biferno" key={headerGroup.id}>
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
                                <JobTableRowExtendable className="cursor-copy active:cursor-progress border-vesuvio dark:border-biferno hover:bg-ferrara dark:hover:bg-biferno"
                                    key={row.id}
                                    extended={false}
                                    onClick={() => {
                                        const thisRow = data.at(Number(row.id))
                                        navigator.clipboard.writeText(thisRow.token)
                                    }}
                                    data-state={row.getIsSelected() && "selected"}
                                    onUploadSuccess={() => handleUploadSuccess()} onClose={function (): void {
                                        throw new Error("Function not implemented.");
                                    } } onExtending={function (): number {
                                        throw new Error("Function not implemented.");
                                    } }        
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
                        <EmbloyP className="text-xs">{table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.</EmbloyP>
                    )}
                </div>
                <DataTablePagination table={table}/>
            </div>

        </EmbloyV>
        <EmbloyModal
            isOpen={clipboardModal.isOpen}
            onOpenChange={clipboardModal.onOpenChange}
            head={"Copy the following token(s) to your clipboard:"}
            className="w-[750px]"
        >
            <EmbloyV className="gap-2">
                <EmbloyV className="gap-4">
                    {clipboardData.map((data:any, index) => (
                        <EmbloyH key={index} className="items-center justify-between gap-1.5">
                            <EmbloyP className="text-xs">{data.issuer}: {data.name}</EmbloyP>
                            <EmbloyButton type="text" name={undefined} className="text-xs italic" onStatus={undefined} onClick={() => { navigator.clipboard.writeText(data.token); } } onMessage="Copy" />              
                        </EmbloyH>
                    ))}
                </EmbloyV>
            </EmbloyV>
        </EmbloyModal>
        </>
    )
}