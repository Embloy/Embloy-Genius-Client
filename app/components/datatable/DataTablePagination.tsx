"use client";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/app/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select"
import {cn} from "@/lib/utils";
import Image from "next/image";
import React, {useState} from "react";

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export function DataTablePagination<TData>({
                                               table,
                                           }: DataTablePaginationProps<TData>) {

    const [previousIsHovered, setPreviousIsHovered] = useState(false)
    const [nextIsHovered, setNextIsHovered] = useState(false)
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

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center justify-end space-x-2 gap-4">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-normal text-gray-700">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-row items-center justify-end-rev gap-1">
                    <button
                        onMouseEnter={handlePreviousHover}
                        onMouseLeave={handlePreviousNotHover}
                        onClick={() => table.setPageIndex(0)}
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
                    <div className="flex w-[100px] items-center justify-center text-sm font-normal text-gray-700">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
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
                    <button
                        onMouseEnter={handleNextHover}
                        onMouseLeave={handleNextNotHover}
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
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
