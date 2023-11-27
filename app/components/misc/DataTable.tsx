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
} from "@/app/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import {Button} from "@/app/components/ui/button"
import {cn} from "@/lib/utils";
import Image from "next/image";
import React, {useState} from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
    const [previousIsHovered, setPreviousIsHovered] = useState(false)
    const [nextIsHovered, setNextIsHovered] = useState(false)
    const [filterIsHovered, setFilterIsHovered] = useState(false);
    const [columnsIsHovered, setColumnsIsHovered] = useState(false)
    const handlePreviousHover = () => {
        setPreviousIsHovered(true)
    }
    const handlePreviousNotHover = () => {
        setPreviousIsHovered(false)
    }

    const handleNextHover = () => {
        setNextIsHovered(true)
    }
    const handleNextNotHover = () => {
        setNextIsHovered(false)
    }

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

    return (
        <div>
            <div className="text-sm w-full flex flex-row items-center justify-between select-none">
                <div className="px-4 bg-black hover:bg-gray-900 flex flex-row items-center justify-between"
                     onMouseEnter={handleFilterHover} onMouseLeave={handleFilterNotHover}>
                    <Image
                        src={"/icons/filter-dark.svg"}
                        alt="Logo"
                        height="25"
                        width="25"
                        className="relative"
                    />
                    <input
                        className={filterIsHovered ? "bg-gray-900 text-white h-10 w-96 px-2 placeholder-gray-900 border-none outline-none select-all" : "bg-black text-white h-10 w-96 px-2 placeholder-gray-900 border-none outline-none select-all"}
                        type="text"
                        name="name"
                        placeholder="Filter"
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
                </div>
                <div className="px-4 flex flex-row items-center justify-end gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="outline-none">
                            <button className="px-1">
                                <Image
                                    src={cn(columnsIsHovered ? "/icons/columns-light.svg" : "/icons/columns-dark.svg")}
                                    alt="columns"
                                    height="25"
                                    width="25"
                                    className="relative"
                                    onMouseEnter={handleColumnsHover}
                                    onMouseLeave={handleColumnsNotHover}
                                />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Hide columns</DropdownMenuLabel>
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize text-gray-400 hover:text-white"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-sm border-x-0 border-y border-gray-700 text-gray-400">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="border-gray-700" key={headerGroup.id}>
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
                                        <TableHead className="cursor-pointer hover:text-white hover:bg-gray-900"
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
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow className="border-gray-700 hover:bg-gray-900"
                                          key={row.id}
                                          data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
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
                    {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                        // If the condition is true
                        <p className="text-sm font-normal text-gray-700">{table.getFilteredSelectedRowModel().rows.length} of{" "}
                            {table.getFilteredRowModel().rows.length} row(s) selected.</p>
                    ) : (
                        <div/>
                    )
                    }
                </div>
                <div className="flex items-center justify-end space-x-2">

                    <button
                        onMouseEnter={handlePreviousHover}
                        onMouseLeave={handlePreviousNotHover}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className={cn(table.getCanPreviousPage() ? "cursor-pointer flex items-center justify-center" : "cursor-not-allowed flex items-center justify-center")}
                    >
                        <Image
                            src={cn(table.getCanPreviousPage() ? cn(previousIsHovered ? "/icons/left-white.svg" : "/icons/left-light.svg") : "/icons/left-dark.svg")}
                            alt="previous"
                            height="10"
                            width="10"
                            className="relative"
                        />
                    </button>
                    <button
                        onMouseEnter={handleNextHover}
                        onMouseLeave={handleNextNotHover}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className={cn(table.getCanNextPage() ? "cursor-pointer flex items-center justify-center" : "cursor-not-allowed flex items-center justify-center")}
                    >
                        <Image
                            src={cn(table.getCanNextPage() ? cn(nextIsHovered ? "/icons/right-white.svg" : "/icons/right-light.svg") : "/icons/right-dark.svg")}
                            alt="previous"
                            height="10"
                            width="10"
                            className="relative"
                        />
                    </button>
                </div>
            </div>

        </div>
    )
}