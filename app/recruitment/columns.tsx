"use client"
import { ColumnDef } from "@tanstack/react-table"
import * as inspector from "inspector";

export type Jb = {
    id: number
    type: string
    start: string
    end: string
    status: "inactive" | "active"
    position: string
    salary: number
    currency: number
    address: string
    created_at: string
    view_count: number
    application_count: number
    notification_status: "inactive" | "active"
}

export type Job = {
    id: number
    position: string
    salary: number
    currency: number
}

export const columns: ColumnDef<Job>[] = [
    {
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "salary",
        header: "Salary",
    },
    {
        accessorKey: "currency",
        header: "Currency",
        cell: ({row}) => {
            const currencies = {0:"EUR", 1:"CHF", 2:"USD"}
            let new_currency = row.getValue('currency')
            if (currencies[row.getValue('currency')] !== undefined) {
                new_currency = currencies[row.getValue('currency')]
            }
            return <div>{new_currency}</div>
        }
    },
]